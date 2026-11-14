"""Vozes do conteúdo novo: grava, em normal e devagar, tudo da prática que ainda não tem áudio:
a palavra e a frase de exemplo do vocabulário (voz narr), os parágrafos das leituras (narr) e as falas das escutas
(na voz de cada personagem; o protagonista é gravado nas duas vozes, rafa e rafa_f).

Comandos (na raiz do repositório; KOKORO_DIR = pasta com kokoro.onnx, voices-v1.0.bin e piper/):
  python3 tools/vozes/vocabulario.py faltando                      mostra quantos textos estão sem áudio
  python3 tools/vozes/vocabulario.py gerar --parte 0 --de 6 --grupo v12 --saida DIR
        grava a parte 0 de 6 dos textos sem áudio, no grupo v12_0 (audio/n_v12_0.mp3 e s_v12_0.mp3)
  python3 tools/vozes/vocabulario.py juntar DIR [DIR ...]          copia para audio/ e atualiza audio/index.json

No GitHub, a tarefa "Vozes do vocabulário" faz tudo sozinha quando um lote novo chega numa branch vocabulario/...
"""
import argparse, json, os, re, shutil, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SR = 24000
VOZES = {'mina': 'af_heart', 'rafa': 'am_michael', 'rafa_f': 'af_kore', 'jin': 'am_puck', 'narr': 'af_bella',
         'monster': 'am_fenrir', 'olivia': 'bf_emma', 'harry': 'bm_george'}


def tts_text(t):
    """Mesma limpeza que a função ttsText do app.js: a chave do áudio é "narr|" + este texto."""
    A = re.ASCII
    x = re.sub(r'["“”]', '', str(t))
    x = re.sub(r'\bThx\b', 'Thanks', x, flags=A)
    x = re.sub(r'\s*\+[^,.!?/→]*', '', x)
    x = re.sub(r'\(([^)]*)\)', r', \1,', x)
    x = re.sub(r'\s*→\s*', ', ', x)
    x = re.sub(r'\s+/\s+', ', ', x)
    x = re.sub(r'\.{3}|…', ', ', x)
    x = re.sub(r'(\w)-([A-Z]{2,})', r'\1\2', x, flags=A)
    x = re.sub(r'[A-Z]{2,}', lambda m: m.group(0) if re.fullmatch(r'UK|USA|US|TV|OK|ID|PC|DJ|CEO|ATM', m.group(0)) else m.group(0).lower(), x)
    x = re.sub(r'([.!?])\s*,', r'\1', x)
    x = re.sub(r'(\s*,\s*)+', ', ', x)
    x = re.sub(r'\s*,\s*([.!?])', r'\1', x)
    x = re.sub(r'^[\s,]+|[\s,]+$', '', x)
    return x


def faltando():
    """lista de chaves "voz|texto" sem áudio, na ordem do conteúdo"""
    man = json.load(open(os.path.join(ROOT, 'audio', 'index.json'), encoding='utf-8'))
    P = os.path.join(ROOT, 'conteudo', 'pratica')
    out, vistos = [], set()
    def add(voz, t):
        k = voz + '|' + tts_text(t)
        if k not in man['k'] and k not in vistos: vistos.add(k); out.append(k)
    for _, ws in json.load(open(os.path.join(P, 'vocabulario.json'), encoding='utf-8')):
        for w in ws: add('narr', w[0]); add('narr', w[2])
    for r in json.load(open(os.path.join(P, 'leitura.json'), encoding='utf-8')):
        for t in r['p']: add('narr', t)
    for e in json.load(open(os.path.join(P, 'escuta.json'), encoding='utf-8')):
        for l in e['lines']:
            for voz in (('rafa', 'rafa_f') if l[0] == 'rafa' else (l[0],)): add(voz, l[1])
    return out


def gerar(parte, de, grupo, saida):
    import numpy as np
    sys.path.insert(0, HERE)
    import kokoro_tts as K
    from build_helpers import trim
    textos = faltando()[parte::de]
    g = f'{grupo}_{parte}'
    os.makedirs(saida, exist_ok=True)
    if not textos:
        json.dump({'k': {}, 'g': g}, open(os.path.join(saida, f'{g}.json'), 'w')); print('nada a gravar'); return
    k = K.Kokoro(); PAD = int(0.3 * SR); idx = {t: [g, 0, 0, 0, 0, 0, 0] for t in textos}   # t = "voz|texto"
    for vel, sp, o in (('n', 1.0, 1), ('s', 0.78, 3)):
        parts = [np.zeros(PAD, np.int16)]; pos = PAD
        for i, t in enumerate(textos):
            voz, txt = t.split('|', 1)
            a = trim(np.clip(k.synth(txt, VOZES[voz], sp)[0] * 32767, -32768, 32767).astype(np.int16))
            idx[t][o] = round(pos / SR - 0.04, 3); idx[t][o + 1] = round(len(a) / SR + 0.1, 3)
            parts += [a, np.zeros(PAD, np.int16)]; pos += len(a) + PAD
            if i % 50 == 0: print(f'{vel}: {i}/{len(textos)}', flush=True)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '40k',
                        os.path.join(saida, f'{vel}_{g}.mp3')], input=np.concatenate(parts).tobytes(), check=True)
    json.dump({'k': idx, 'g': g}, open(os.path.join(saida, f'{g}.json'), 'w'), ensure_ascii=False)
    print(f'{len(textos)} textos gravados no grupo {g}')


def juntar(dirs):
    p = os.path.join(ROOT, 'audio', 'index.json')
    man = json.load(open(p, encoding='utf-8')); n = 0
    for d in dirs:
        for f in sorted(os.listdir(d)):
            if not f.endswith('.json'): continue
            j = json.load(open(os.path.join(d, f), encoding='utf-8'))
            if not j['k']: continue
            g = j['g']
            for vel in ('n', 's'):
                shutil.copy(os.path.join(d, f'{vel}_{g}.mp3'), os.path.join(ROOT, 'audio', f'{vel}_{g}.mp3'))
            man['files'][g] = {'n': f'audio/n_{g}.mp3', 's': f'audio/s_{g}.mp3'}
            for t, e in j['k'].items():
                man['k'][t] = e; n += 1
    json.dump(man, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(f'{n} textos juntados; faltam {len(faltando())}')


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('faltando')
    a = sub.add_parser('gerar'); a.add_argument('--parte', type=int, required=True); a.add_argument('--de', type=int, required=True)
    a.add_argument('--grupo', required=True); a.add_argument('--saida', required=True)
    b = sub.add_parser('juntar'); b.add_argument('dirs', nargs='+')
    x = ap.parse_args()
    if x.cmd == 'faltando': print(len(faltando()), 'textos sem áudio')
    elif x.cmd == 'gerar': gerar(x.parte, x.de, x.grupo, x.saida)
    else: juntar(x.dirs)
