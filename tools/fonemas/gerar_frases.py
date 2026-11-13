"""Gera fonemas/dados.json: o vocabulário do modelo e os fonemas esperados de cada frase e palavra que o
aluno pode falar no curso. Rode de novo sempre que entrar conteúdo novo (o teste do site avisa quando falta).

Uso (na raiz do repositório): ESPEAK_DIR=/caminho/piper python3 tools/fonemas/gerar_frases.py
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from g2p import key, esperado
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
C = os.path.join(ROOT, 'conteudo'); OUT = os.path.join(ROOT, 'fonemas', 'dados.json')
V = json.load(open(os.path.join(os.path.dirname(__file__), 'vocab.json')))


def textos():
    t = set()
    ind = json.load(open(f'{C}/indice.json'))
    for a in ind['arcos'] + ['bonus']:
        for c in json.load(open(f'{C}/historia/{a}.json'))['capitulos']:
            for p in c['p']:
                for l in p.get('l') or []:
                    if l[1]: t.add(l[1])
        for q in json.load(open(f'{C}/questoes/{a}.json')):
            for x in q.get('frases_extras') or []: t.add(x[0])
    for L in json.load(open(f'{C}/pratica/escuta.json')):
        for l in L['lines']: t.add(l[1])
    for th, ws in json.load(open(f'{C}/pratica/vocabulario.json')):
        for w in ws: t.add(w[0]); t.add(w[2])
    for p in json.load(open(f'{C}/pratica/sons.json'))['pares']: t.add(p[0]); t.add(p[1])
    for gr in json.load(open(f'{C}/pratica/sons.json')).get('banco', []):
        for x in gr['sons']:
            t.update(e[0] for e in x['ex']); t.add(x['frase'][0])
    ks = set(key(x) for x in t if key(x))
    return ks | set(w for k in ks for w in k.split())


if __name__ == '__main__':
    fr = {k: esperado(k, V) for k in sorted(textos())}
    json.dump({'vocab': V, 'frases': fr}, open(OUT, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(len(fr), 'frases e palavras em', OUT)
