"""Vozes dos nomes dos alunos (os personagens falam o nome de quem estuda).

Os nomes ficam em audio/nomes/, em grupos pequenos (até 50 nomes por arquivo), para o aparelho baixar
só o grupo do nome do aluno. Cada nome é gravado em 4 vozes (mina, rafa, rafa_f, narr) e 2 velocidades
(n = normal, s = devagar), com a pronúncia do português (eSpeak pt-br).

Comandos (na raiz do repositório; KOKORO_DIR = pasta com kokoro.onnx, voices-v1.0.bin e piper/):
  python3 tools/vozes/nomes.py gerar --voz mina --vel n --saida DIR [--chaves arq.json] [--grupo g]
        grava os nomes (todos os de tools/vozes/nomes.json, ou só as chaves do arquivo) em DIR
  python3 tools/vozes/nomes.py juntar DIR [DIR ...] [--trocar-tudo]
        copia o que foi gravado para audio/nomes/ e atualiza audio/index.json
  python3 tools/vozes/nomes.py fila [--max 40]
        lê os nomes pedidos pelos alunos (planilha em conteudo/indice.json), confere, grava os novos e junta
"""
import argparse, csv, io, json, os, re, shutil, subprocess, sys, time, unicodedata, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SR = 24000
VOZES = {'mina': 'af_heart', 'rafa': 'am_michael', 'rafa_f': 'af_kore', 'narr': 'af_bella'}
VEL = {'n': 1.0, 's': 0.78}
GRUPO = 50
LISTA = os.path.join(HERE, 'nomes.json')


def norm(n):
    return ''.join(c for c in unicodedata.normalize('NFD', n.lower()) if unicodedata.category(c) != 'Mn')


def lista():
    return {k: (f, l) for k, f, l in json.load(open(LISTA, encoding='utf-8'))}


def grupos_padrao(chaves):
    ks = sorted(chaves)
    return {k: 'g%02d' % (i // GRUPO) for i, k in enumerate(ks)}


# ---------------------------------------------------------------- gravar
def gerar(voz, vel, saida, chaves=None, grupo=None):
    import numpy as np
    sys.path.insert(0, HERE)
    import kokoro_tts as K
    from build_helpers import trim
    nomes = lista()
    ks = sorted(chaves if chaves is not None else nomes)
    gr = {k: grupo for k in ks} if grupo else grupos_padrao(nomes)
    k = K.Kokoro()

    def ph(n, lang):
        K.LIB.espeak_SetVoiceByName(b'pt-br' if lang == 'pt' else b'en-us')
        p = K._chunk(n); K.LIB.espeak_SetVoiceByName(b'en-us')
        if lang == 'pt': p = p.replace('x', 'h')
        return ''.join(c for c in p if c in K.VOCAB).strip()

    def synth(p):
        toks = [K.VOCAB[c] for c in p if c in K.VOCAB][:500]
        st = k.v[VOZES[voz]][min(len(toks), len(k.v[VOZES[voz]])) - 1]
        a = k.s.run(None, {k.tok: np.array([[0, *toks, 0]], dtype=np.int64), 'style': np.asarray(st, dtype=np.float32),
                           'speed': np.array([VEL[vel]], dtype=np.float32)})[0]
        return np.clip(np.asarray(a).ravel() * 32767, -32768, 32767).astype(np.int16)

    os.makedirs(saida, exist_ok=True)
    por_grupo = {}
    for kk in ks: por_grupo.setdefault(gr[kk], []).append(kk)
    idx = {}; t0 = time.time(); feitos = 0
    PAD = int(0.12 * SR)
    for g, gks in sorted(por_grupo.items()):
        parts = [np.zeros(PAD, np.int16)]; pos = PAD
        for kk in gks:
            a = trim(synth(ph(*nomes[kk])))
            idx[kk] = [round(pos / SR - 0.02, 3), round(len(a) / SR + 0.04, 3), g]
            parts += [a, np.zeros(PAD, np.int16)]; pos += len(a) + PAD
            feitos += 1
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                        '-c:a', 'libmp3lame', '-b:a', '40k', os.path.join(saida, f'{voz}_{g}_{vel}.mp3')],
                       input=np.concatenate(parts).tobytes(), check=True)
        print(f'{voz}/{vel} grupo {g}: {feitos}/{len(ks)} em {time.time() - t0:.0f}s', flush=True)
    json.dump(idx, open(os.path.join(saida, f'{voz}_{vel}.json'), 'w'), ensure_ascii=False)


# ---------------------------------------------------------------- juntar
def juntar(dirs, trocar_tudo=False):
    p = os.path.join(ROOT, 'audio', 'index.json')
    man = json.load(open(p, encoding='utf-8'))
    nm = man.setdefault('nm', {'parts': {}, 'names': {}})
    dest = os.path.join(ROOT, 'audio', 'nomes'); os.makedirs(dest, exist_ok=True)
    if trocar_tudo:
        # tira os arquivos antigos (um arquivo grande por voz) e os grupos anteriores
        for voz in VOZES:
            man['files'].pop('nm_' + voz, None)
            for vel in VEL:
                f = os.path.join(ROOT, 'audio', f'nm_{voz}_{vel}.mp3')
                if os.path.exists(f): os.remove(f)
            nm['names'][voz] = {}
        for g in [g for g in man['files'] if re.match(r'nm_(mina|rafa|rafa_f|narr)_[gq]', g)]: man['files'].pop(g)
        for f in os.listdir(dest): os.remove(os.path.join(dest, f))
    novos = set()
    for d in dirs:
        for f in sorted(os.listdir(d)):
            m = re.fullmatch(r'(mina|rafa_f|rafa|narr)_(n|s)\.json', f)
            if not m: continue
            voz, vel = m.groups(); o = 0 if vel == 'n' else 2
            for kk, (st, du, g) in json.load(open(os.path.join(d, f), encoding='utf-8')).items():
                e = nm['names'].setdefault(voz, {}).setdefault(kk, [0, 0, 0, 0, g])
                if len(e) < 5: e[:] = [0, 0, 0, 0, g]
                e[o], e[o + 1], e[4] = st, du, g
                novos.add(kk)
                man['files'].setdefault(f'nm_{voz}_{g}', {})[vel] = f'audio/nomes/{voz}_{g}_{vel}.mp3'
        for f in os.listdir(d):
            if f.endswith('.mp3'): shutil.copy(os.path.join(d, f), os.path.join(dest, f))
    # confere: todo nome tem as duas velocidades e todo arquivo citado existe
    for voz, ns in nm['names'].items():
        for kk, e in ns.items():
            assert e[1] > 0 and e[3] > 0, (voz, kk, e)
            fk = f'nm_{voz}_{e[4]}' if len(e) == 5 else f'nm_{voz}'      # 4 valores: formato antigo, um arquivo por voz
            for vel in VEL:
                assert os.path.exists(os.path.join(ROOT, man['files'][fk][vel].split('?')[0])), (voz, kk)
    json.dump(man, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(f'{len(novos)} nomes juntados; total {len(nm["names"].get("mina", {}))}')


# ---------------------------------------------------------------- fila de pedidos
PROIBIDOS = set('''porra caralho merda bosta cu cuzao buceta boceta xoxota piroca pica rola puta puto putinha vadia
viado veado bicha sapatao traveco corno otario otaria idiota imbecil burro burra babaca arrombado arrombada
foda fodase foder punheta bunda peido cocô coco xixi teta tetas pinto pau pentelho prostituta safado safada
nazi nazista hitler macaco macaca preto negro escravo crioulo fuck fucker shit bitch dick cock pussy cunt ass
asshole bastard whore slut nigger nigga fag faggot retard sex sexo porn porno anal penis vagina teste test
admin null undefined nome name asdf qwerty abc aaa xxx'''.split())


def limpar(n):
    """primeiro nome, só letras, de 2 a 20 letras; devolve None se não servir"""
    n = (n or '').strip().split()[0] if (n or '').strip() else ''
    if not re.fullmatch(r"[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}", n): return None
    k = norm(n)
    if not re.fullmatch(r'[a-z]{2,20}', k) or k in PROIBIDOS: return None
    if re.search(r'(.)\1\1', k) or not re.search(r'[aeiouy]', k): return None   # "aaa", "zzz", sem vogal
    return n[0].upper() + n[1:].lower()


def fila(maximo):
    cfg = json.load(open(os.path.join(ROOT, 'conteudo', 'indice.json'), encoding='utf-8')).get('fila_nomes') or {}
    url = cfg.get('planilha_csv')
    if not url:
        print('fila desligada: falta "planilha_csv" em conteudo/indice.json'); return False
    with urllib.request.urlopen(url, timeout=60) as r:
        txt = r.read().decode('utf-8', 'replace')
    rows = list(csv.reader(io.StringIO(txt)))
    if not rows: return False
    head = [h.strip().lower() for h in rows[0]]
    col = next((i for i, h in enumerate(head) if 'nome' in h or 'name' in h), len(head) - 1)
    ja = lista()
    pedidos = []
    for r in rows[1:]:
        if col < len(r):
            n = limpar(r[col])
            if n and norm(n) not in ja and norm(n) not in [norm(x) for x in pedidos]: pedidos.append(n)
    pedidos = pedidos[:maximo]
    if not pedidos:
        print('nenhum nome novo'); return False
    print('nomes novos:', ', '.join(pedidos))
    todos = json.load(open(LISTA, encoding='utf-8'))
    todos += [[norm(n), n, 'pt'] for n in pedidos]
    json.dump(sorted(todos), open(LISTA, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    g = 'q' + time.strftime('%y%m%d%H%M', time.gmtime())
    tmp = os.path.join(ROOT, '.nomes_tmp'); shutil.rmtree(tmp, ignore_errors=True)
    ks = [norm(n) for n in pedidos]
    for voz in VOZES:
        for vel in VEL:
            gerar(voz, vel, tmp, ks, g)
    juntar([tmp]); shutil.rmtree(tmp)
    return True


if __name__ == '__main__':
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest='cmd', required=True)
    a = sub.add_parser('gerar'); a.add_argument('--voz', required=True, choices=list(VOZES)); a.add_argument('--vel', required=True, choices=list(VEL))
    a.add_argument('--saida', required=True); a.add_argument('--chaves'); a.add_argument('--grupo')
    b = sub.add_parser('juntar'); b.add_argument('dirs', nargs='+'); b.add_argument('--trocar-tudo', action='store_true')
    c = sub.add_parser('fila'); c.add_argument('--max', type=int, default=40)
    x = ap.parse_args()
    if x.cmd == 'gerar': gerar(x.voz, x.vel, x.saida, json.load(open(x.chaves)) if x.chaves else None, x.grupo)
    elif x.cmd == 'juntar': juntar(x.dirs, x.trocar_tudo)
    else: fila(x.max)
