/* Worker do Whisper: baixa o modelo uma vez (guarda no Cache Storage) e transcreve a fala. */
importScripts('whisper-core.js');
const VER='tiny.en-q5_1-bf082f5209e3', PARTS=['model.bin.part0','model.bin.part1','model.bin.part2'], TOTAL=32166138;
let W=null, loading=null;
async function getPart(cache,url,onBytes){
  if(cache){const hit=await cache.match(url);if(hit){const b=await hit.arrayBuffer();onBytes(b.byteLength);return b;}}
  const r=await fetch(url,{cache:'no-cache'}); if(!r.ok) throw new Error('http '+r.status);
  let buf;
  if(r.body&&r.body.getReader){const rd=r.body.getReader(),chunks=[];let n=0;
    for(;;){const {done,value}=await rd.read();if(done)break;chunks.push(value);n+=value.length;onBytes(value.length);}
    const u=new Uint8Array(n);let o=0;for(const c of chunks){u.set(c,o);o+=c.length;}buf=u.buffer;
  } else {buf=await r.arrayBuffer();onBytes(buf.byteLength);}
  if(cache){try{await cache.put(url,new Response(buf.slice(0)));}catch(e){}}
  return buf;
}
async function init(base){
  if(W) return true;
  if(loading) return loading;
  loading=(async()=>{
    let cache=null; try{if(self.caches) cache=await caches.open('torre-whisper-'+VER);}catch(e){}
    let got=0,last=0; const tick=n=>{got+=n;const p=Math.min(99,Math.floor(got/TOTAL*100));if(p!==last){last=p;postMessage({type:'progress',pct:p});}};
    const wasm=await (await fetch(base+'whisper.wasm')).arrayBuffer();
    const parts=[]; for(const p of PARTS) parts.push(await getPart(cache,base+p,tick));
    const all=new Uint8Array(parts.reduce((a,b)=>a+b.byteLength,0)); let o=0; for(const b of parts){all.set(new Uint8Array(b),o);o+=b.byteLength;}
    const w=await whisperCreate(wasm,()=>{});
    if(!w.load(all.buffer)) throw new Error('model');
    W=w; return true;
  })();
  try{return await loading;}catch(e){loading=null;throw e;}
}
onmessage=async ev=>{
  const m=ev.data;
  try{
    if(m.type==='init'){await init(m.base);postMessage({type:'ready'});}
    else if(m.type==='cached'){let ok=false;try{const c=await caches.open('torre-whisper-'+VER);ok=!!(await c.match(m.base+PARTS[PARTS.length-1]));}catch(e){}postMessage({type:'cached',ok});}
    else if(m.type==='run'){await init(m.base);const t=performance.now();const r=W.run(m.pcm,m.audioCtx||0,'');postMessage({type:'result',id:m.id,text:r.text,conf:r.conf,ms:Math.round(performance.now()-t)});}
  }catch(e){postMessage({type:'error',id:m.id,msg:String(e&&e.message||e)});}
};
