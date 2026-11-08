/* Whisper (whisper.cpp → WebAssembly) — núcleo mínimo, sem dependências.
   Roda o modelo tiny.en no próprio aparelho. Usado pelo whisper-worker.js. */
function makeWasi(getMem, log){
  const E={OK:0,BADF:8,NOSYS:52};
  const dv=()=>new DataView(getMem().buffer);
  let line='';
  return {
    environ_get:()=>E.OK,
    environ_sizes_get:(c,s)=>{const d=dv();d.setUint32(c,0,true);d.setUint32(s,0,true);return E.OK;},
    clock_time_get:(id,prec,out)=>{dv().setBigUint64(out,BigInt(Math.round((typeof performance!=='undefined'?performance.timeOrigin+performance.now():Date.now())*1e6)),true);return E.OK;},
    fd_write:(fd,iovs,n,nw)=>{const d=dv(),m=new Uint8Array(getMem().buffer);let t=0;
      for(let i=0;i<n;i++){const p=d.getUint32(iovs+i*8,true),l=d.getUint32(iovs+i*8+4,true);line+=new TextDecoder().decode(m.subarray(p,p+l));t+=l;}
      let k;while((k=line.indexOf('\n'))>=0){log&&log(line.slice(0,k));line=line.slice(k+1);}
      d.setUint32(nw,t,true);return E.OK;},
    fd_close:()=>E.OK, fd_fdstat_get:(fd,o)=>{if(fd>2) return E.BADF;const d=dv();d.setUint8(o,2);d.setUint16(o+2,0,true);d.setBigUint64(o+8,0n,true);d.setBigUint64(o+16,0n,true);return E.OK;},
    fd_fdstat_set_flags:()=>E.NOSYS, fd_prestat_get:()=>E.BADF, fd_prestat_dir_name:()=>E.BADF,
    fd_read:()=>E.BADF, fd_seek:()=>E.BADF, path_open:()=>E.BADF,
    proc_exit:(c)=>{throw new Error('whisper exit '+c);}
  };
}
async function whisperCreate(wasmBytes, log){
  let inst;
  const wasi=makeWasi(()=>inst.exports.memory,log);
  const r=await WebAssembly.instantiate(wasmBytes,{wasi_snapshot_preview1:wasi});
  inst=r.instance||r; inst.exports._initialize();
  const X=inst.exports, mem=()=>new Uint8Array(X.memory.buffer);
  const cstr=p=>{const m=mem();let e=p;while(m[e])e++;return new TextDecoder().decode(m.subarray(p,e));};
  return {
    load(modelBytes){const n=modelBytes.byteLength,p=X.w_alloc(n);mem().set(new Uint8Array(modelBytes),p);const ok=X.w_init(p,n);X.w_free(p);return !!ok;},
    run(pcm,audioCtx,prompt){
      const p=X.w_alloc(pcm.length*4); new Float32Array(X.memory.buffer,p,pcm.length).set(pcm);
      let pp=0; if(prompt){const b=new TextEncoder().encode(prompt+'\0');pp=X.w_alloc(b.length);mem().set(b,pp);}
      const t=cstr(X.w_run(p,pcm.length,audioCtx|0,pp)); X.w_free(p); if(pp) X.w_free(pp);
      return {text:t.trim(),conf:X.w_conf()};
    }
  };
}
if(typeof module!=='undefined') module.exports={whisperCreate};
