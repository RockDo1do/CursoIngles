/* Service worker da Torre do Inglês: funciona offline depois do primeiro uso. */
const VER='477a220195', SHELL='torre-shell-'+VER, MEDIA='torre-media-v1', FONTS='torre-fonts-v1';
const PRE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','audio/index.json','whisper/whisper-core.js','whisper/whisper-worker.js','whisper/whisper.wasm'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('torre-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
async function netFirst(req){
  const c=await caches.open(SHELL);
  try{const r=await fetch(req,{cache:'no-cache'});if(r.ok) c.put(req,r.clone());return r;}
  catch(e){return (await c.match(req))||(await c.match('index.html'))||Response.error();}
}
async function cacheFirst(req,name){
  const c=await caches.open(name); const hit=await c.match(req); if(hit) return hit;
  const r=await fetch(req); if(r.ok||r.type==='opaque') c.put(req,r.clone()); return r;
}
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const u=new URL(req.url);
  if(u.origin===location.origin){
    if(u.pathname.includes('/whisper/model.bin')) return;            // o worker do Whisper guarda o modelo
    if(req.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')) {e.respondWith(netFirst(req));return;}
    if(u.pathname.endsWith('audio/index.json')||u.pathname.includes('/whisper/')) {e.respondWith(netFirst(req));return;}
    if(u.pathname.includes('/audio/')) {e.respondWith(cacheFirst(req,MEDIA));return;}
    e.respondWith(cacheFirst(req,SHELL)); return;
  }
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(cacheFirst(req,FONTS));}
});
