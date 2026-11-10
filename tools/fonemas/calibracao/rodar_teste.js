const fs=require('fs'), A=require(__dirname+'/../../../fonemas/avaliar.js');
const stub=()=>0;
const E=new WebAssembly.Instance(new WebAssembly.Module(fs.readFileSync(__dirname+'/../../../fonemas/fonemas.wasm')),{wasi_snapshot_preview1:{fd_close:stub,fd_seek:stub,fd_write:stub}}).exports; E._initialize();
const bin=fs.readFileSync(process.argv[2]); const p=E.f_alloc(bin.length); new Uint8Array(E.memory.buffer,p,bin.length).set(bin); E.f_init(p,bin.length);
const vocab=JSON.parse(fs.readFileSync(process.argv[3])), alts=JSON.parse(fs.readFileSync(process.argv[4]));
const L=JSON.parse(fs.readFileSync(process.argv[5])); const res=[];
let tm=0,ta=0;
for(const c of L){
  const a=new Float32Array(fs.readFileSync(c.f).buffer.slice(0)); const pa=E.f_alloc(a.length*4); new Float32Array(E.memory.buffer,pa,a.length).set(a);
  let t=Date.now(); const o=E.f_run(pa,a.length); const T=E.f_frames(); tm+=Date.now()-t; E.f_free(pa);
  const lg=new Float32Array(E.memory.buffer,o,T*392).slice();
  t=Date.now(); const r=A.avaliar(lg,T,392,c.esp,vocab); ta+=Date.now()-t;
  res.push(Object.assign({},c,{r,ouvido:A.ouvido(lg,T,392,vocab),seg:a.length/16000}));
}
fs.writeFileSync(process.argv[6],JSON.stringify(res));
console.error('modelo',tm,'ms; avaliação',ta,'ms');
