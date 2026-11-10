/* Worker da pronúncia som por som: baixa o modelo de fonemas uma vez (guarda no Cache Storage),
   reconhece os sons da fala gravada e compara com os sons esperados da frase. Tudo no aparelho. */
importScripts('avaliar.js');
const VER = 'w2v2-light-36bc8d65f114', TOTAL = 89420336, NV = 392;
const PARTS = ['modelo.bin.part0', 'modelo.bin.part1', 'modelo.bin.part2', 'modelo.bin.part3', 'modelo.bin.part4', 'modelo.bin.part5', 'modelo.bin.part6', 'modelo.bin.part7'];
let E = null, DADOS = null, loading = null;

async function getPart(cache, url, onBytes) {
  if (cache) { const hit = await cache.match(url); if (hit) { const b = await hit.arrayBuffer(); onBytes(b.byteLength); return b; } }
  const r = await fetch(url, { cache: 'no-cache' }); if (!r.ok) throw new Error('http ' + r.status);
  let buf;
  if (r.body && r.body.getReader) {
    const rd = r.body.getReader(), chunks = []; let n = 0;
    for (;;) { const { done, value } = await rd.read(); if (done) break; chunks.push(value); n += value.length; onBytes(value.length); }
    const u = new Uint8Array(n); let o = 0; for (const c of chunks) { u.set(c, o); o += c.length; } buf = u.buffer;
  } else { buf = await r.arrayBuffer(); onBytes(buf.byteLength); }
  if (cache) { try { await cache.put(url, new Response(buf.slice(0))); } catch (e) {} }
  return buf;
}

async function init() {
  if (E) return true;
  if (loading) return loading;
  loading = (async () => {
    let cache = null; try { if (self.caches) cache = await caches.open('torre-fonemas-' + VER); } catch (e) {}
    let got = 0, last = -1; const tick = n => { got += n; const p = Math.min(99, Math.floor(got / TOTAL * 100)); if (p !== last) { last = p; postMessage({ type: 'progress', pct: p }); } };
    const stub = () => 0;
    const inst = await WebAssembly.instantiate(await (await fetch('fonemas.wasm')).arrayBuffer(), { wasi_snapshot_preview1: { fd_close: stub, fd_seek: stub, fd_write: stub } });
    const ex = inst.instance.exports; ex._initialize();
    DADOS = await (await fetch('dados.json', { cache: 'no-cache' })).json();
    /* cada parte vai direto para a memória do motor, sem juntar uma cópia inteira antes */
    const p = ex.f_alloc(TOTAL); if (!p) throw new Error('memória');
    let o = 0;
    for (const part of PARTS) { const b = new Uint8Array(await getPart(cache, part, tick)); new Uint8Array(ex.memory.buffer, p + o, b.length).set(b); o += b.length; }
    if (o !== TOTAL || !ex.f_init(p, TOTAL)) throw new Error('modelo');
    E = ex; return true;
  })();
  try { return await loading; } catch (e) { loading = null; throw e; }
}

function run(pcm, frase) {
  const pa = E.f_alloc(pcm.length * 4);
  new Float32Array(E.memory.buffer, pa, pcm.length).set(pcm);
  const o = E.f_run(pa, pcm.length), T = E.f_frames();
  E.f_free(pa);
  if (!o || !T) return null;
  const lg = new Float32Array(E.memory.buffer, o, T * NV).slice();
  return FonAvaliar.avaliar(lg, T, NV, frase, DADOS.vocab);
}

onmessage = async ev => {
  const m = ev.data;
  try {
    if (m.type === 'init') { await init(); postMessage({ type: 'ready' }); }
    else if (m.type === 'cached') {
      let ok = false; try { const c = await caches.open('torre-fonemas-' + VER); ok = !!(await c.match(PARTS[PARTS.length - 1])); } catch (e) {}
      postMessage({ type: 'cached', ok });
    }
    else if (m.type === 'run') {
      await init();
      const frase = DADOS.frases[m.key];
      if (!frase) { postMessage({ type: 'result', id: m.id, r: null }); return; }
      const t = performance.now(); const r = run(m.pcm, frase);
      postMessage({ type: 'result', id: m.id, r, frase, ms: Math.round(performance.now() - t) });
    }
  } catch (e) { postMessage({ type: 'error', id: m.id, msg: String(e && e.message || e) }); }
};
