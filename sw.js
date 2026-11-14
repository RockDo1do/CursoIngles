/* Service worker da Torre do Inglês: funciona offline depois do primeiro uso.
   A página, o código (app.js) e o conteúdo (conteudo/) vêm sempre da internet quando ela existe;
   a cópia guardada só é usada sem internet. Os áudios e as fontes ficam guardados de vez. */
const VER='84f0a44da8', SHELL='torre-shell-'+VER, MEDIA='torre-media-v1', FONTS='torre-fonts-v1';
const PRE=["./", "index.html", "app.js?v=84f0a44da8", "conteudo/indice.json?v=84f0a44da8", "conteudo/historia/arco-01.json?v=84f0a44da8", "conteudo/questoes/arco-01.json?v=84f0a44da8", "conteudo/historia/arco-02.json?v=84f0a44da8", "conteudo/questoes/arco-02.json?v=84f0a44da8", "conteudo/historia/arco-03.json?v=84f0a44da8", "conteudo/questoes/arco-03.json?v=84f0a44da8", "conteudo/historia/arco-04.json?v=84f0a44da8", "conteudo/questoes/arco-04.json?v=84f0a44da8", "conteudo/historia/arco-05.json?v=84f0a44da8", "conteudo/questoes/arco-05.json?v=84f0a44da8", "conteudo/historia/arco-06.json?v=84f0a44da8", "conteudo/questoes/arco-06.json?v=84f0a44da8", "conteudo/historia/arco-07.json?v=84f0a44da8", "conteudo/questoes/arco-07.json?v=84f0a44da8", "conteudo/historia/arco-08.json?v=84f0a44da8", "conteudo/questoes/arco-08.json?v=84f0a44da8", "conteudo/historia/arco-09.json?v=84f0a44da8", "conteudo/questoes/arco-09.json?v=84f0a44da8", "conteudo/historia/arco-10.json?v=84f0a44da8", "conteudo/questoes/arco-10.json?v=84f0a44da8", "conteudo/historia/bonus.json?v=84f0a44da8", "conteudo/questoes/bonus.json?v=84f0a44da8", "conteudo/pratica/escuta.json?v=84f0a44da8", "conteudo/pratica/leitura.json?v=84f0a44da8", "conteudo/pratica/vocabulario.json?v=84f0a44da8", "conteudo/pratica/escrita.json?v=84f0a44da8", "conteudo/pratica/nivelamento.json?v=84f0a44da8", "conteudo/pratica/sons.json?v=84f0a44da8", "conteudo/pratica/confusoes.json?v=84f0a44da8", "conteudo/pratica/producao.json?v=84f0a44da8", "conteudo/pratica/simulados.json?v=84f0a44da8", "conteudo/pratica/imersao.json?v=84f0a44da8", "conteudo/pratica/conversa.json?v=84f0a44da8", "conteudo/pratica/erros.json?v=84f0a44da8", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "audio/index.json", "whisper/whisper-core.js", "whisper/whisper-worker.js", "whisper/whisper.wasm", "privacy.html", "fonts/AtkinsonHyperlegible-Regular.woff", "fonts/AtkinsonHyperlegible-Bold.woff", "fonts/LilitaOne-Regular.woff", "fonts/DotGothic16-Regular.woff", "fonts/Fredoka-Medium.woff"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('torre-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
async function netFirst(req){
  const c=await caches.open(SHELL);
  try{const r=await fetch(req,{cache:'no-cache'});if(r.ok) c.put(req,r.clone());return r;}
  catch(e){
    const hit=(await c.match(req))||(await c.match(req,{ignoreSearch:true}));
    if(hit) return hit;
    if(req.mode==='navigate') return (await c.match('index.html'))||Response.error();
    return Response.error();
  }
}
async function cacheFirst(req,name){
  const c=await caches.open(name); const hit=await c.match(req); if(hit) return hit;
  const r=await fetch(req); if(r.ok||r.type==='opaque') c.put(req,r.clone()); return r;
}
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const u=new URL(req.url);
  if(u.origin===location.origin){
    if(u.pathname.includes('/whisper/model.bin')||u.pathname.includes('/fonemas/modelo.bin')) return;   // os workers guardam os modelos
    if(req.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')||u.pathname.endsWith('/app.js')||u.pathname.includes('/conteudo/')) {e.respondWith(netFirst(req));return;}
    if(u.pathname.endsWith('audio/index.json')||u.pathname.includes('/whisper/')||u.pathname.includes('/fonemas/')) {e.respondWith(netFirst(req));return;}
    if(u.pathname.includes('/audio/')) {e.respondWith(cacheFirst(req,MEDIA));return;}
    e.respondWith(cacheFirst(req,SHELL)); return;
  }
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(cacheFirst(req,FONTS));}
});
