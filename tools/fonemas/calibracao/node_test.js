// Testa o fonemas.wasm no Node: node node_test.js fonemas.wasm fonemas.bin audio.f32 saida.f32
const fs=require('fs');
const [wasmP,binP,aP,oP]=process.argv.slice(2);
const stub=()=>0;
const inst=new WebAssembly.Instance(new WebAssembly.Module(fs.readFileSync(wasmP)),{wasi_snapshot_preview1:{fd_close:stub,fd_seek:stub,fd_write:stub}});
const E=inst.exports; E._initialize();
const bin=fs.readFileSync(binP); const p=E.f_alloc(bin.length); new Uint8Array(E.memory.buffer,p,bin.length).set(bin);
console.log('init',E.f_init(p,bin.length));
const a=new Float32Array(fs.readFileSync(aP).buffer.slice(0)); const pa=E.f_alloc(a.length*4); new Float32Array(E.memory.buffer,pa,a.length).set(a);
let t=Date.now(); const o=E.f_run(pa,a.length); const ms=Date.now()-t; const n=E.f_frames();
console.log('quadros',n,'tempo',ms,'ms para',(a.length/16000).toFixed(2),'s de áudio');
fs.writeFileSync(oP,Buffer.from(new Float32Array(E.memory.buffer,o,n*392).slice().buffer));
