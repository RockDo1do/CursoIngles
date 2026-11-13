"""Teste automático da Torre do Inglês.

Abre o site num Chromium automático e confere:
- se todas as telas abrem sem erro de JavaScript;
- se as questões têm resposta válida e opções diferentes;
- se toda fala e toda frase extra tem áudio gravado;
- se um arquivo de conteúdo quebrado mostra o aviso de erro em vez de uma tela vazia;
- se toda frase que o aluno pode falar tem os fonemas esperados (pronúncia som por som).

Uso: python3 tests/test_site.py   (na raiz do repositório; precisa do pacote playwright)
"""
import asyncio, functools, http.server, os, sys, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIEWS = ['home()', 'wizard(0)', 'wizard(1)', 'wizard(2)', 'wizard(3)', 'wizard(4)', 'placement()',
         'weekView()', 'collectionView()', 'reviewView()', 'acctView()', 'earView()', 'pronView()',
         'home();openSettings()', 'trainView(12)', 'lsnList()', 'lsnView("l1")', 'readList()', 'readView("r1")',
         'vocList()', 'vocStart(0)', 'wrtList()', 'wrtView("w1")', 'certView(0)', 'tourStart(false)', 'tourGo(8,1)', 'tourEnd()', 'prodList("escrever")', 'prodView("e5")', 'prodList("mediar")', 'prodView("m1")', 'reviewView(2)', 'sbList()', 'sbView("2.0")', 'earView("th","2.0")', 'simList()', 'simView("s-b1")', 'simStart("s-a2")', 'simStart("s-b2");simNext();simNext();simNext()']

CHECK_DATA = r'''(()=>{
 const P=[], src=HERO_SRC||{ch:CH,bonus:BONUS};
 [...src.ch,...src.bonus].forEach((c,i)=>{
  (c.q||[]).forEach((q,k)=>{
   if(!(q.a>=0&&q.a<q.o.length)) P.push(`cap ${i+1} q${k}: resposta inválida`);
   const low=q.o.map(o=>o.trim()); /* maiúsculas contam: ba-NA-na x BA-na-na */ if(new Set(low).size!==low.length) P.push(`cap ${i+1} q${k}: opções repetidas`);
  });
  c.p.forEach(p=>(p.l||[]).forEach(l=>{
   if(l[1]&&!l[2]) P.push(`cap ${i+1}: fala sem tradução`);
   if(!l[1]) return;
   const ws=l[0]==='rafa'?['rafa','rafa_f']:[l[0]];
   ws.forEach(w=>{if(REC.man&&!REC.man.k[w+'|'+ttsText(l[1])]) P.push(`cap ${i+1}: sem áudio: ${w}|${l[1]}`);});
  }));
  (c.xs||[]).forEach(x=>{if(REC.man&&!REC.man.k['narr|'+ttsText(x[0])]) P.push(`cap ${i+1}: frase extra sem áudio: ${x[0]}`);});
 });
 const has=(w,t)=>!REC.man||REC.man.k[w+'|'+ttsText(t)];
 LISTEN.forEach(L=>{L.lines.forEach(l=>(l[0]==='rafa'?['rafa','rafa_f']:[l[0]]).forEach(w=>{if(!has(w,l[1])) P.push(`escuta ${L.id}: sem áudio: ${l[1]}`);}));
  L.q.forEach((q,k)=>{if(q.a!==0||q.o.length<2) P.push(`escuta ${L.id} q${k}: resposta inválida`);});});
 READ.forEach(R=>{R.p.forEach(t=>{if(!has('narr',t)) P.push(`leitura ${R.id}: parágrafo sem áudio`);});
  Object.keys(R.g).forEach(k=>{if(!new RegExp('\\b'+k+'\\b','i').test(R.p.join(' '))) P.push(`leitura ${R.id}: palavra do glossário fora do texto: ${k}`);});});
 VOCAB.forEach(([th,ws])=>ws.forEach(w=>{if(!has('narr',w[0])||!has('narr',w[2])) P.push(`vocabulário: sem áudio: ${w[0]}`);}));
 WRITE.forEach(W=>{if(!wrtParse(W.text).some(p=>p.a)) P.push(`escrita ${W.id}: sem lacunas`);});
 EAR_PAIRS.forEach(p=>[p[0],p[1]].forEach(w=>{if(REC.man&&!REC.man.w[w]) P.push(`treino de sons: sem áudio: ${w}`);}));
 ['falar','escrever','mediar'].forEach(t=>(PRODUCAO[t]||[]).forEach(x=>{if(!has('narr',x.modelo.replace(/\n/g,' '))) P.push(`produção (${x.capitulo||x.id}): resposta-modelo sem áudio`);}));
 SIMULADOS.forEach(X=>X.partes.forEach(p=>{(p.lines||[]).forEach(l=>{if(!has(l[0],l[1])) P.push(`simulado ${X.id}: fala sem áudio: ${l[1].slice(0,40)}`);});if(p.tarefa&&!has('narr',p.tarefa.modelo.replace(/\n/g,' '))) P.push(`simulado ${X.id}: resposta-modelo sem áudio`);}));
 SOM_BANCO.forEach(g=>g.sons.forEach(x=>{x.ex.forEach(e=>{if(!has('narr',e[0])) P.push(`banco de sons: sem áudio: ${e[0]}`);});if(!has('narr',x.frase[0])) P.push(`banco de sons: sem áudio: ${x.frase[0]}`);}));
 if(REC.man&&REC.man.nm) Object.entries(REC.man.nm.names).forEach(([who,ns])=>Object.entries(ns).forEach(([k,e])=>{const f=REC.man.files['nm_'+who+(e[4]?'_'+e[4]:'')];if(!f||!f.n||!f.s) P.push(`nome sem arquivo de áudio: ${who} ${k}`);}));
 return P;})()'''


# toda fala, frase extra, diálogo de escuta, palavra e exemplo de vocabulário precisa dos fonemas esperados
CHECK_FONEMAS = r'''(async()=>{
 const P=[], D=await (await fetch('fonemas/dados.json')).json(), src=HERO_SRC||{ch:CH,bonus:BONUS}, T=new Set();
 [...src.ch,...src.bonus].forEach(c=>{c.p.forEach(p=>(p.l||[]).forEach(l=>{if(l[1]) T.add(l[1]);}));(c.xs||[]).forEach(x=>T.add(x[0]));});
 LISTEN.forEach(L=>L.lines.forEach(l=>T.add(l[1]))); VOCAB.forEach(([th,ws])=>ws.forEach(w=>{T.add(w[0]);T.add(w[2]);}));
 EAR_PAIRS.forEach(p=>{T.add(p[0]);T.add(p[1]);});
 SOM_BANCO.forEach(g=>g.sons.forEach(x=>{x.ex.forEach(e=>T.add(e[0]));T.add(x.frase[0]);}));
 const keys=new Set([...T].map(t=>t.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]+/g,' ').trim().split(/\s+/).filter(Boolean).join(' ')).filter(Boolean));
 [...keys].forEach(k=>k.split(' ').forEach(w=>keys.add(w)));
 keys.forEach(k=>{if(!D.frases[k]) P.push('sem fonemas (rode tools/fonemas/gerar_frases.py): '+k);});
 return P.slice(0,20).concat(P.length>20?[`... e mais ${P.length-20} frases sem fonemas`]:[]);})()'''


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
        await page.wait_for_function("window.TORRE_ERRO || (typeof REC !== 'undefined' && !!REC.man)", timeout=20000)
        erro = await page.evaluate('window.TORRE_ERRO || ""')
        if erro:
            print('PROBLEMA: o conteúdo não carregou:', erro)
            sys.exit(1)
        n = await page.evaluate('CH.length')
        for i in range(n):
            await page.evaluate(f'reader({i})')
        for v in VIEWS:
            await page.evaluate(v)
        problems += await page.evaluate(CHECK_DATA)
        problems += await page.evaluate(CHECK_FONEMAS)
        width = await page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
        if width > 1:
            problems.append(f'a página rola para o lado ({width}px)')
        # arquivo de conteúdo com título trocado: a página tem que avisar, não ficar vazia
        bad = await browser.new_page()
        async def troca(route):
            r = await route.fetch(); d = await r.json(); d[0]['capitulo'] = 'Outro título'
            await route.fulfill(response=r, json=d)
        await bad.route('**/conteudo/questoes/arco-01.json*', troca)
        await bad.goto(url)
        await bad.wait_for_function('!!window.TORRE_ERRO', timeout=20000)
        if not await bad.locator('[role=alert]').count():
            problems.append('conteúdo quebrado não mostrou o aviso de erro')
        await browser.close()
    srv.shutdown()
    for p in problems:
        print('PROBLEMA:', p)
    print(f'{len(problems)} problema(s)')
    sys.exit(1 if problems else 0)


asyncio.run(main())
