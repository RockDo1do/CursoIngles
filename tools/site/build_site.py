import os, re, shutil, json, hashlib, subprocess
SRC='torre-do-ingles.html'; OUT='/home/claude/site'
s=open(SRC).read()
s=s.replace('<title>Torre do Inglês</title>\n','',1).replace('<meta name="claude:viewport-fit-sides" content="cover">\n','',1)
ver=hashlib.sha1(s.encode()).hexdigest()[:10]
head=f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Torre do Inglês · Inglês em formato de manhwa</title>
<meta name="description" content="Curso de inglês do básico ao avançado contado como um manhwa. Vozes naturais, treino de fala com Whisper no aparelho e ajustes para TDAH e TPAC.">
<meta name="theme-color" content="#0f0e17">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Torre do Inglês">
<meta property="og:title" content="Torre do Inglês">
<meta property="og:description" content="Aprenda inglês do básico ao avançado lendo um manhwa.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://rockdo1do.github.io/CursoIngles/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://rockdo1do.github.io/CursoIngles/">
<link rel="canonical" href="https://rockdo1do.github.io/CursoIngles/">
<link rel="preload" href="fonts/AtkinsonHyperlegible-Regular.woff" as="font" type="font/woff" crossorigin>
<meta name="twitter:card" content="summary_large_image">
<style>html{{background:#0f0e17}}@media (prefers-color-scheme: light){{html{{background:#f3f1f8}}}}body{{margin:0}}</style>
</head>
<body>
'''
tail=f'''
<script>
try{{if(navigator.storage&&navigator.storage.persist) navigator.storage.persisted().then(p=>{{if(!p) navigator.storage.persist();}});}}catch(e){{}}
if('serviceWorker' in navigator&&location.protocol==='https:'){{
 const had=!!navigator.serviceWorker.controller;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{{
  if(!had||document.getElementById('upd')) return;
  const d=document.createElement('div');d.id='upd';d.setAttribute('role','status');
  d.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99;background:#1a1826;color:#fff;border:2px solid #62d6ff;border-radius:12px;padding:10px 14px;font:15px system-ui;display:flex;gap:12px;align-items:center;max-width:calc(100% - 32px)';
  d.innerHTML='Nova versão do curso disponível. <button style="font:inherit;font-weight:700;padding:8px 12px;border-radius:8px;border:0;background:#ff8a3d;color:#111">Atualizar</button>';
  d.querySelector('button').onclick=()=>location.reload(); document.body.appendChild(d);
 }});
 window.addEventListener('load',()=>{{navigator.serviceWorker.register('sw.js?v={ver}').catch(()=>{{}});}});
}}
</script>
</body>
</html>
'''
os.makedirs(OUT,exist_ok=True)
open(f'{OUT}/index.html','w').write(head+s+tail)
# áudio
if os.path.exists(f'{OUT}/audio'): shutil.rmtree(f'{OUT}/audio')
shutil.copytree('tts/out/audio',f'{OUT}/audio')
# versão no nome do arquivo de áudio: se um arquivo mudar, o aparelho baixa de novo
idx=json.load(open(f'{OUT}/audio/index.json'))
for g,fs in idx['files'].items():
    for kk,u in list(fs.items()):
        if isinstance(u,str):
            h=hashlib.sha1(open(f'{OUT}/'+u.split('?')[0],'rb').read()).hexdigest()[:8]
            fs[kk]=u.split('?')[0]+'?v='+h
json.dump(idx,open(f'{OUT}/audio/index.json','w'),ensure_ascii=False,separators=(',',':'))
shutil.copy('privacy.html',f'{OUT}/privacy.html')
if os.path.isdir('/home/claude/site/fonts') and OUT!='/home/claude/site': shutil.copytree('/home/claude/site/fonts',f'{OUT}/fonts',dirs_exist_ok=True)
open(f'{OUT}/.nojekyll','w').write('')
man={"name":"Torre do Inglês","short_name":"Torre do Inglês","description":"Curso de inglês do básico ao avançado em formato de manhwa.","lang":"pt-BR","start_url":"./","scope":"./","display":"standalone","orientation":"portrait","background_color":"#0f0e17","theme_color":"#0f0e17","categories":["education"],
 "icons":[{"src":"icons/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icons/icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icons/maskable-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
json.dump(man,open(f'{OUT}/manifest.webmanifest','w'),ensure_ascii=False,indent=1)
sw=open('sw-template.js').read().replace('__VER__',ver)
open(f'{OUT}/sw.js','w').write(sw)
print('built',ver)
