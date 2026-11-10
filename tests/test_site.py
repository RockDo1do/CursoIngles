"""Teste automático da Torre do Inglês.

Abre o site num Chromium automático e confere:
- se todas as telas abrem sem erro de JavaScript;
- se as questões têm resposta válida e opções diferentes;
- se toda fala e toda frase extra tem áudio gravado.

Uso: python3 tests/test_site.py   (na raiz do repositório; precisa do pacote playwright)
"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIEWS = ['home()', 'wizard(0)', 'wizard(1)', 'wizard(2)', 'wizard(3)', 'wizard(4)', 'placement()',
         'weekView()', 'collectionView()', 'reviewView()', 'acctView()', 'earView()', 'pronView()',
         'home();openSettings()', 'trainView(12)']

CHECK_DATA = r'''(()=>{
 const P=[], src=HERO_SRC||{ch:CH,bonus:BONUS};
 [...src.ch,...src.bonus].forEach((c,i)=>{
  (c.q||[]).forEach((q,k)=>{
   if(!(q.a>=0&&q.a<q.o.length)) P.push(`cap ${i+1} q${k}: resposta inválida`);
   const low=q.o.map(o=>o.trim().toLowerCase()); if(new Set(low).size!==low.length) P.push(`cap ${i+1} q${k}: opções repetidas`);
  });
  c.p.forEach(p=>(p.l||[]).forEach(l=>{
   if(l[1]&&!l[2]) P.push(`cap ${i+1}: fala sem tradução`);
   if(!l[1]) return;
   const ws=l[0]==='rafa'?['rafa','rafa_f']:[l[0]];
   ws.forEach(w=>{if(REC.man&&!REC.man.k[w+'|'+ttsText(l[1])]) P.push(`cap ${i+1}: sem áudio: ${w}|${l[1]}`);});
  }));
  (c.xs||[]).forEach(x=>{if(REC.man&&!REC.man.k['narr|'+ttsText(x[0])]) P.push(`cap ${i+1}: frase extra sem áudio: ${x[0]}`);});
 });
 return P;})()'''


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def main():
    srv = serve()
    url = f'http://127.0.0.1:{srv.server_address[1]}/index.html'
    problems = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 390, 'height': 800})
        page.on('pageerror', lambda e: problems.append(f'erro de JavaScript: {e}'))
        # o reconhecimento de fala real derruba o Chromium sem tela
        await page.add_init_script('delete window.SpeechRecognition;delete window.webkitSpeechRecognition;'
                                   'localStorage.setItem("torre-ingles-v2",JSON.stringify({name:"Ana",welcomed:true}))')
        await page.goto(url)
        await page.wait_for_function("typeof REC !== 'undefined' && !!REC.man", timeout=20000)
        n = await page.evaluate('CH.length')
        for i in range(n):
            await page.evaluate(f'reader({i})')
        for v in VIEWS:
            await page.evaluate(v)
        problems += await page.evaluate(CHECK_DATA)
        width = await page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
        if width > 1:
            problems.append(f'a página rola para o lado ({width}px)')
        await browser.close()
    srv.shutdown()
    for p in problems:
        print('PROBLEMA:', p)
    print(f'{len(problems)} problema(s)')
    sys.exit(1 if problems else 0)


asyncio.run(main())
