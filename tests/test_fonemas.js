/* Teste do motor de pronúncia som por som (fonemas/): roda o modelo de verdade em duas falas gravadas.
   - certo.wav: "I think you will be great." bem pronunciado -> nenhum erro
   - erros.wav: a mesma frase com o TH virando T e o W virando V -> os dois erros encontrados
   Uso: node tests/test_fonemas.js   (na raiz do repositório) */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), F = path.join(ROOT, 'fonemas');
const A = require(path.join(F, 'avaliar.js'));
const stub = () => 0;
const E = new WebAssembly.Instance(new WebAssembly.Module(fs.readFileSync(path.join(F, 'fonemas.wasm'))), { wasi_snapshot_preview1: { fd_close: stub, fd_seek: stub, fd_write: stub } }).exports;
E._initialize();
const worker = fs.readFileSync(path.join(F, 'fonemas-worker.js'), 'utf8');
const parts = JSON.parse(worker.match(/PARTS = (\[[^\]]*\])/)[1].replace(/'/g, '"')), total = +worker.match(/TOTAL = (\d+)/)[1];
const p = E.f_alloc(total); let o = 0;
for (const n of parts) { const b = fs.readFileSync(path.join(F, n)); new Uint8Array(E.memory.buffer, p + o, b.length).set(b); o += b.length; }
const problemas = [];
if (o !== total) problemas.push(`o modelo tem ${o} bytes, o worker espera ${total}`);
if (!E.f_init(p, total)) { console.log('PROBLEMA: o motor não aceitou o modelo'); process.exit(1); }
const dados = JSON.parse(fs.readFileSync(path.join(F, 'dados.json'), 'utf8'));
function wav(n) { const b = fs.readFileSync(path.join(__dirname, 'fonemas', n)); const s = new Int16Array(b.buffer.slice(b.byteOffset + 44, b.byteOffset + b.length)); return Float32Array.from(s, x => x / 32768); }
function roda(n, key) {
  const a = wav(n), pa = E.f_alloc(a.length * 4); new Float32Array(E.memory.buffer, pa, a.length).set(a);
  const t = Date.now(), out = E.f_run(pa, a.length), T = E.f_frames(), ms = Date.now() - t; E.f_free(pa);
  const lg = new Float32Array(E.memory.buffer, out, T * 392).slice();
  const r = A.avaliar(lg, T, 392, dados.frases[key], dados.vocab);
  console.log(`${n}: ${(a.length / 16000).toFixed(1)} s de fala em ${ms} ms; ouvido: ${A.ouvido(lg, T, 392, dados.vocab)}`);
  return r;
}
const key = 'i think you will be great';
if (!dados.frases[key]) problemas.push('a frase de teste sumiu de fonemas/dados.json');
else {
  const c = roda('certo.wav', key), e = roda('erros.wav', key);
  const errs = r => r.palavras.flatMap((w, i) => w.erros.map(x => `${key.split(' ')[i]}:${x.ph}>${x.como}`).concat(w.extra ? [`${key.split(' ')[i]}:+vogal`] : []));
  if (errs(c).length) problemas.push('fala certa marcada com erro: ' + errs(c).join(', '));
  for (const x of ['think:θ>t', 'will:w>v']) if (!errs(e).includes(x)) problemas.push(`erro não encontrado: ${x} (achou: ${errs(e).join(', ') || 'nada'})`);
}
problemas.forEach(x => console.log('PROBLEMA:', x));
console.log(`${problemas.length} problema(s)`);
process.exit(problemas.length ? 1 : 0);
