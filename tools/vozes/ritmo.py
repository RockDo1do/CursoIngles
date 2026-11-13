"""Iguala o ritmo das vozes gravadas no modo normal (arquivos n_*.mp3 e os nomes).

Cada voz do Kokoro tem um ritmo próprio: algumas falam bem mais rápido que outras. Este script mede o ritmo
de cada voz (sílabas por segundo nas falas do curso) e acelera ou desacelera cada trecho gravado até um ritmo
comum, sem mudar o tom da voz (filtro atempo do ffmpeg). Atualiza as posições em audio/index.json.

  python3 tools/vozes/ritmo.py medir                 mostra o ritmo de cada voz no modo normal
  python3 tools/vozes/ritmo.py igualar [--alvo 4.2]  ajusta os arquivos e o índice (só voz com diferença > 2%)

Gravações novas: depois de gravar, rode "igualar" de novo. Só os trechos fora do ritmo mudam.
"""
import argparse, json, os, re, statistics, subprocess
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SR = 24000
GAP = 0.3          # silêncio entre os trechos no arquivo novo
IDX = os.path.join(ROOT, 'audio', 'index.json')


def silabas(t):
    n = 0
    for w in re.findall(r"[a-zA-Z']+", t.lower()):
        c = len(re.findall(r'[aeiouy]+', w))
        if w.endswith('e') and c > 1 and not w.endswith(('le', 'ee')): c -= 1
        n += max(1, c)
    return n


def medir(man):
    """sílabas por segundo de cada voz, no modo normal, nas falas com 6 sílabas ou mais"""
    r = {}
    for k, e in man['k'].items():
        who, t = k.split('|', 1)
        s = silabas(t)
        if s >= 6 and e[2]: r.setdefault(who, []).append(s / e[2])
    return {w: (statistics.median(v), len(v)) for w, v in r.items()}


def ler(path):
    out = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(out, np.int16)


def tempo(pcm, f):
    if abs(f - 1) < 1e-6: return pcm
    out = subprocess.run(['ffmpeg', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-filter:a', f'atempo={f:.5f}',
                          '-f', 's16le', '-ar', str(SR), '-ac', '1', '-'], input=pcm.tobytes(), capture_output=True, check=True).stdout
    return np.frombuffer(out, np.int16)


def gravar(pcm, path):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '48k', path],
                   input=pcm.tobytes(), check=True)


def igualar(alvo):
    man = json.load(open(IDX, encoding='utf-8'))
    rit = medir(man)
    fat = {w: alvo / r for w, (r, n) in rit.items() if n >= 10 and abs(alvo / r - 1) > 0.02}
    for w, (r, n) in sorted(rit.items()):
        print(f'{w:8} {r:.2f} sílabas/s ({n} falas) -> ' + (f'x{fat[w]:.3f}' if w in fat else 'fica como está'))
    if not fat: return
    # todas as referências a trechos do modo normal, por arquivo: (arquivo, voz, função que lê [st,du], função que grava)
    refs = {}
    def ref(url, voz, get, put):
        refs.setdefault(url.split('?')[0], []).append((voz, get, put))
    F = man['files']
    for k, e in man['k'].items():
        voz = k.split('|', 1)[0]
        ref(F[e[0]]['n'], voz, (lambda e=e: (e[1], e[2])), (lambda st, du, e=e: e.__setitem__(slice(1, 3), [st, du])))
        if F[e[0]].get('s') == F[e[0]]['n']:   # arquivo único para as duas velocidades
            ref(F[e[0]]['n'], voz, (lambda e=e: (e[3], e[4])), (lambda st, du, e=e: e.__setitem__(slice(3, 5), [st, du])))
    for w, e in man.get('w', {}).items():
        if len(e) > 2 and e[2]:
            ref(F[e[2]]['n'], '_palavra', (lambda e=e: (e[0], e[1])), (lambda st, du, e=e: e.__setitem__(slice(0, 2), [st, du])))
    nm = man.get('nm', {})
    for k, ps in nm.get('parts', {}).items():
        voz = k.split('|', 1)[0]
        for p in ps:
            if p: ref(F['nm_parts']['n'], voz, (lambda p=p: (p[0], p[1])), (lambda st, du, p=p: p.__setitem__(slice(0, 2), [st, du])))
    for voz, ns in nm.get('names', {}).items():
        for e in ns.values():
            g = f'nm_{voz}_{e[4]}' if len(e) == 5 else f'nm_{voz}'
            ref(F[g]['n'], voz, (lambda e=e: (e[0], e[1])), (lambda st, du, e=e: e.__setitem__(slice(0, 2), [st, du])))
    mudou = 0
    for url, rs in sorted(refs.items()):
        if not any(v in fat for v, _, _ in rs): continue
        pcm = ler(os.path.join(ROOT, url))
        # trechos únicos, em ordem; trechos repetidos (mesma posição) compartilham o resultado
        seg = {}
        for voz, get, put in rs:
            st, du = get(); seg.setdefault((round(st, 3), round(du, 3), voz), []).append(put)
        partes, pos = [np.zeros(int(0.1 * SR), np.int16)], 0.1
        for (st, du, voz), puts in sorted(seg.items()):
            a = pcm[max(0, int(st * SR)):int((st + du) * SR)]
            a = tempo(a, fat.get(voz, 1.0))
            for put in puts: put(round(pos, 3), round(len(a) / SR, 3))
            partes += [a, np.zeros(int(GAP * SR), np.int16)]; pos += len(a) / SR + GAP
        gravar(np.concatenate(partes), os.path.join(ROOT, url))
        mudou += 1
    json.dump(man, open(IDX, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(f'{mudou} arquivos ajustados')
    for w, (r, n) in sorted(medir(man).items()):
        print(f'  agora {w:8} {r:.2f} sílabas/s')


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('medir')
    a = sub.add_parser('igualar'); a.add_argument('--alvo', type=float, default=4.2)
    x = ap.parse_args()
    man = json.load(open(IDX, encoding='utf-8'))
    if x.cmd == 'medir':
        for w, (r, n) in sorted(medir(man).items()): print(f'{w:8} {r:.2f} sílabas/s ({n} falas)')
    else: igualar(x.alvo)
