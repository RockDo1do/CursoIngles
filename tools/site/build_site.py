"""Prepara a Torre do Inglês para publicar.

Uso (de qualquer pasta):
  python3 tools/site/build_site.py                 confere o conteúdo e atualiza as marcas de versão do site
  python3 tools/site/build_site.py --verificar     só confere (não muda nada); falha se faltar rodar o build
  python3 tools/site/build_site.py --artefato DIR  também monta em DIR a cópia para o Claude
  python3 tools/site/build_site.py --audio DIR     também copia os áudios gravados de DIR (com index.json)

O que fica onde:
  index.html   a página: aparência (CSS) e o carregador do conteúdo
  app.js       o código do curso
  conteudo/    a história e as questões (veja conteudo/LEIA-ME.md)
"""
import argparse, hashlib, json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
C = os.path.join(ROOT, 'conteudo')
PRATICA = ['escuta', 'leitura', 'vocabulario', 'escrita', 'nivelamento', 'sons']
SITE_ONLY = re.compile(r'<!-- só no site -->.*?<!-- /só no site -->\n?', re.S)


def rd(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def wr(p, s):
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)


def load(rel):
    p = os.path.join(C, rel + '.json')
    try:
        return json.loads(rd(p))
    except FileNotFoundError:
        sys.exit(f'ERRO: falta o arquivo conteudo/{rel}.json')
    except json.JSONDecodeError as e:
        sys.exit(f'ERRO: conteudo/{rel}.json tem um erro de formatação na linha {e.lineno}, coluna {e.colno}: {e.msg}')


def validar():
    """Confere a estrutura do conteúdo. Devolve a lista de arquivos que a página carrega."""
    erros, files = [], ['indice']
    ind = load('indice')
    pares = [(a, f'historia/{a}', f'questoes/{a}') for a in ind['arcos']] + [('bonus', 'historia/bonus', 'questoes/bonus')]
    for nome, hp, qp in pares:
        h, q = load(hp), load(qp)
        files += [hp, qp]
        caps = h.get('capitulos', [])
        if nome != 'bonus':
            for k in ('nome', 'descricao', 'agora_voce_consegue'):
                if k not in h:
                    erros.append(f'{hp}: falta "{k}"')
        if len(caps) != len(q):
            erros.append(f'{nome}: a história tem {len(caps)} capítulos, mas as questões têm {len(q)}')
        for i, (c, x) in enumerate(zip(caps, q), 1):
            onde = f'{nome}, capítulo {i} ("{c.get("t")}")'
            if x.get('capitulo') != c.get('t'):
                erros.append(f'{onde}: nas questões o título é "{x.get("capitulo")}"')
            for k in ('t', 'lv', 'topic', 'bg', 'hero', 'p'):
                if k not in c:
                    erros.append(f'{onde}: falta "{k}" na história')
            for j, p in enumerate(c.get('p', []), 1):
                for l in p.get('l', []) or []:
                    if not (isinstance(l, list) and len(l) == 3):
                        erros.append(f'{onde}, quadro {j}: fala fora do formato [personagem, inglês, português]: {l}')
            for j, pq in enumerate(x.get('perguntas', []), 1):
                o = pq.get('o', [])
                if not (isinstance(pq.get('a'), int) and 0 <= pq['a'] < len(o)):
                    erros.append(f'{onde}, pergunta {j}: "a" precisa ser a posição da resposta certa (0 = primeira opção)')
                if len(set(t.strip() for t in o)) != len(o):
                    erros.append(f'{onde}, pergunta {j}: há opções repetidas')
            for f in x.get('frases_extras', []) or []:
                if not (isinstance(f, list) and len(f) == 2):
                    erros.append(f'{onde}: frase extra fora do formato [inglês, português]: {f}')
    for n in PRATICA:
        load(f'pratica/{n}')
        files.append(f'pratica/{n}')
    if erros:
        print('O conteúdo tem problemas:')
        for e in erros:
            print(' -', e)
        sys.exit(1)
    return files


def carimbar_audio():
    """Põe ?v=<marca> no endereço de cada áudio: se um arquivo mudar, o aparelho baixa de novo."""
    p = os.path.join(ROOT, 'audio', 'index.json')
    idx = json.loads(rd(p))
    for fs in idx['files'].values():
        for k, u in list(fs.items()):
            if isinstance(u, str):
                base = u.split('?')[0]
                with open(os.path.join(ROOT, base), 'rb') as f:
                    fs[k] = base + '?v=' + hashlib.sha1(f.read()).hexdigest()[:8]
    return json.dumps(idx, ensure_ascii=False, separators=(',', ':'))


def montar(files):
    """Devolve {caminho: texto} de tudo o que o build escreve."""
    out = {}
    out['audio/index.json'] = carimbar_audio()
    page = rd(os.path.join(ROOT, 'index.html'))
    neutra = re.sub(r"const TORRE_V='[^']*'", "const TORRE_V=''", page)
    neutra = re.sub(r"sw\.js\?v=[0-9a-f]*", 'sw.js?v=', neutra)
    h = hashlib.sha1(neutra.encode())
    for rel in ['app.js'] + [f'conteudo/{f}.json' for f in sorted(files)] + ['audio/index.json']:
        h.update(rel.encode())
        h.update(out[rel].encode() if rel in out else open(os.path.join(ROOT, rel), 'rb').read())
    ver = h.hexdigest()[:10]
    out['index.html'] = neutra.replace("const TORRE_V=''", f"const TORRE_V='{ver}'", 1).replace('sw.js?v=', f'sw.js?v={ver}', 1)
    pre = ['./', 'index.html', f'app.js?v={ver}'] + [f'conteudo/{f}.json?v={ver}' for f in files] + [
        'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'audio/index.json',
        'whisper/whisper-core.js', 'whisper/whisper-worker.js', 'whisper/whisper.wasm', 'privacy.html',
        'fonts/AtkinsonHyperlegible-Regular.woff', 'fonts/AtkinsonHyperlegible-Bold.woff', 'fonts/LilitaOne-Regular.woff',
        'fonts/DotGothic16-Regular.woff', 'fonts/Fredoka-Medium.woff']
    out['sw.js'] = rd(os.path.join(HERE, 'sw-template.js')).replace('__VER__', ver).replace('__PRE__', json.dumps(pre, ensure_ascii=False))
    man = {"name": "Torre do Inglês", "short_name": "Torre do Inglês", "description": "Curso de inglês do básico ao avançado em formato de manhwa.",
           "lang": "pt-BR", "start_url": "./", "scope": "./", "display": "standalone", "orientation": "portrait",
           "background_color": "#0f0e17", "theme_color": "#0f0e17", "categories": ["education"],
           "icons": [{"src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
                     {"src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
    out['manifest.webmanifest'] = json.dumps(man, ensure_ascii=False, indent=1)
    out['.nojekyll'] = ''
    return ver, out


def artefato(dest, page):
    """Cópia para o Claude: mesma página, sem as partes que só fazem sentido no site."""
    os.makedirs(dest, exist_ok=True)
    s = SITE_ONLY.sub('', page)
    s = re.sub(r'<title>.*?</title>', '<title>Torre do Inglês</title>\n<meta name="claude:viewport-fit-sides" content="cover">', s, count=1)
    wr(os.path.join(dest, 'index.html'), s)
    shutil.copy(os.path.join(ROOT, 'app.js'), os.path.join(dest, 'app.js'))
    if os.path.exists(os.path.join(dest, 'conteudo')):
        shutil.rmtree(os.path.join(dest, 'conteudo'))
    shutil.copytree(C, os.path.join(dest, 'conteudo'), ignore=shutil.ignore_patterns('*.md'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--verificar', action='store_true')
    ap.add_argument('--artefato')
    ap.add_argument('--audio')
    a = ap.parse_args()
    files = validar()
    if a.audio and not a.verificar:
        shutil.rmtree(os.path.join(ROOT, 'audio'))
        shutil.copytree(a.audio, os.path.join(ROOT, 'audio'))
    ver, out = montar(files)
    if a.verificar:
        velhos = [p for p, s in out.items() if not os.path.exists(os.path.join(ROOT, p)) or rd(os.path.join(ROOT, p)) != s]
        if velhos:
            sys.exit('Falta rodar "python3 tools/site/build_site.py": desatualizados: ' + ', '.join(velhos))
        print('conteúdo ok, versão', ver)
        return
    for p, s in out.items():
        wr(os.path.join(ROOT, p), s)
    if a.artefato:
        artefato(a.artefato, out['index.html'])
    print('conteúdo ok, versão', ver)


if __name__ == '__main__':
    main()
