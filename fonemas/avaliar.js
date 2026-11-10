/* Avaliação de pronúncia som por som (GOP-CTC), focada nos erros típicos de quem fala português.
 *
 * Recebe as pontuações do modelo de fonemas (392 valores a cada 20 ms) e os fonemas esperados da frase.
 * Para cada som que costuma dar problema (TH, V, W, H, NG, vogais curtas e longas, R, L final...), compara
 * a chance da frase certa com a chance da mesma frase com aquele som trocado pelo erro típico.
 * Se o erro for mais provável que o certo (por uma margem), o som é marcado.
 * Também testa vogais a mais: antes de S + consoante ("iscool") e depois de consoante final ("bigui").
 *
 * Calibrado com falas sintéticas certas e com erros (ver tools/fonemas/LEIA-ME.md):
 * 0,3% de alarmes falsos (1 em 384 sons) e 24 de 29 erros encontrados. Nas vogais a margem é maior,
 * porque o modelo as confunde mais: melhor deixar passar um erro do que acusar um acerto.
 */
(function (root) {
  const BLANK = 0, WILD = -1, MARGEM = 0.5, MARGEM_VOGAIS = 1.5, MARGEM_EXTRA = 0.7;
  const LSE = (a, b) => (a === -Infinity ? b : b === -Infinity ? a : a > b ? a + Math.log1p(Math.exp(b - a)) : b + Math.log1p(Math.exp(a - b)));

  /* som certo -> trocas típicas -> chave da dica (PTIPS no app.js) */
  const TROCAS = {
    'θ': { s: 'th', t: 'th', f: 'th' },
    'ð': { d: 'thv', z: 'thv', v: 'thv' },
    'v': { b: 'v', w: 'v' },
    'w': { v: 'w' },
    'h': { '': 'h', 'ʁ': 'h', 'x': 'h', 'χ': 'h' },
    'ŋ': { n: 'ing' },
    'iː': { 'ɪ': 'vow' }, 'ɪ': { 'iː': 'vow' }, 'uː': { 'ʊ': 'vow' }, 'ʊ': { 'uː': 'vow' },
    'æ': { 'ɛ': 'vow2' }, 'ɛ': { 'æ': 'vow2', 'eɪ': 'vow2' },
    'ʌ': { 'ɔ': 'vow2', 'o': 'vow2' },
    'ɹ': { h: 'lr', 'ʁ': 'lr', x: 'lr', 'χ': 'lr' },
    't': { 'tʃ': 'tch' }, 'd': { 'dʒ': 'tch' },          // só antes de "i": "tchi", "dji"
    'l': { w: 'lfin', 'ʊ': 'lfin', u: 'lfin' }           // só no fim da palavra: "hoteu"
  };
  const ANTES_I = new Set(['i', 'iː', 'ɪ']);
  const VOGAIS = ['ɪ', 'i', 'ə'];
  const vogal = ph => /[aeiouɪəɛæʌʊɑɔɚɜᵻɐ]/.test(ph || '');

  function logSoftmax(lg, T, V) {
    const lp = new Float32Array(T * V);
    for (let t = 0; t < T; t++) {
      let m = -Infinity; for (let v = 0; v < V; v++) if (lg[t * V + v] > m) m = lg[t * V + v];
      let s = 0; for (let v = 0; v < V; v++) s += Math.exp(lg[t * V + v] - m);
      const l = m + Math.log(s); for (let v = 0; v < V; v++) lp[t * V + v] = lg[t * V + v] - l;
    }
    return lp;
  }

  /* chance (log) de a fala ser a sequência seq, somando todos os alinhamentos (CTC). WILD aceita qualquer som. */
  function ctc(lp, T, V, seq) {
    const N = seq.length, S = 2 * N + 1, lab = new Int32Array(S);
    for (let j = 0; j < S; j++) lab[j] = j % 2 ? seq[(j - 1) >> 1] : BLANK;
    let a = new Float64Array(S).fill(-Infinity), b = new Float64Array(S);
    const em = (l, t) => (l === WILD ? 0 : lp[t * V + l]);
    a[0] = em(BLANK, 0); if (S > 1) a[1] = em(lab[1], 0);
    for (let t = 1; t < T; t++) {
      for (let j = 0; j < S; j++) {
        let v = a[j];
        if (j > 0) v = LSE(v, a[j - 1]);
        if (j > 1 && lab[j] !== BLANK && lab[j] !== lab[j - 2]) v = LSE(v, a[j - 2]);
        b[j] = v === -Infinity ? v : v + em(lab[j], t);
      }
      const x = a; a = b; b = x;
    }
    return S > 1 ? LSE(a[S - 1], a[S - 2]) : a[0];
  }

  /* frase: "f o n|e m a s" (palavras separadas por |; "*" = nome do aluno, aceita qualquer som)
     Devolve {palavras:[{erros:[{ph, como, dica, forca}], extra}], checados, certos} */
  function avaliar(logits, T, V, frase, vocab) {
    if (T < 2) return null;
    const lp = logSoftmax(logits, T, V);
    const words = frase.split('|').map(w => (w.trim() === '*' ? ['*'] : w.trim().split(' ').filter(p => vocab[p] != null)));
    const seq = [], pos = [];
    words.forEach((w, wi) => w.forEach((p, k) => { seq.push(p === '*' ? WILD : vocab[p]); pos.push([wi, k]); }));
    if (!seq.some(x => x !== WILD)) return null;
    const L0 = ctc(lp, T, V, seq);
    const out = words.map(() => ({ erros: [], extra: null }));
    let checados = 0, certos = 0;
    seq.forEach((id, i) => {
      if (id === WILD) return;
      const [wi, k] = pos[i], ph = words[wi][k], nxt = words[wi][k + 1];
      const tr = TROCAS[ph]; if (!tr) return;
      if ((ph === 't' || ph === 'd') && !ANTES_I.has(nxt)) return;
      if (ph === 'l' && nxt) return;
      if (ph === 'æ' && nxt === 'ŋ') return;                 // "thank": no inglês americano o A fica fechado
      checados++;
      let best = null;
      for (const q in tr) {
        if (q && vocab[q] == null) continue;
        const s = seq.slice(); if (q) s[i] = vocab[q]; else s.splice(i, 1);
        const d = ctc(lp, T, V, s) - L0;
        const m = /^vow/.test(tr[q]) ? MARGEM_VOGAIS : MARGEM;   // vogais: o modelo confunde mais, então só com certeza
        if (d > m && (!best || d > best.d)) best = { q, d };
      }
      if (best) out[wi].erros.push({ ph, como: best.q, dica: tr[best.q], forca: Math.round(best.d * 10) / 10 });
      else certos++;
    });
    /* vogal a mais */
    let idx = 0;
    words.forEach((w, wi) => {
      const ws = idx; idx += w.length;
      if (w[0] === '*') return;
      const at = [];
      if (w[0] === 's' && w[1] && !vogal(w[1])) at.push([ws, 'antes', 'sc']);
      if (/^(p|b|t|d|k|ɡ|tʃ|dʒ)$/.test(w[w.length - 1]) && !(words[wi + 1] && vogal(words[wi + 1][0]))) at.push([idx, 'depois', 'epi']);
      for (const [p, onde, dica] of at) {
        checados++;
        let tot = 0;
        for (const v of VOGAIS) { if (vocab[v] == null) continue; const s = seq.slice(); s.splice(p, 0, vocab[v]); tot += Math.exp(Math.min(50, ctc(lp, T, V, s) - L0)); }
        if (Math.log(tot || 1e-30) > MARGEM_EXTRA) out[wi].extra = { onde, dica }; else certos++;
      }
    });
    return { palavras: out, checados, certos };
  }

  /* o que o modelo ouviu, sem comparar com nada (para testes) */
  function ouvido(logits, T, V, vocab) {
    const inv = {}; for (const k in vocab) inv[vocab[k]] = k;
    const out = []; let prev = -1;
    for (let t = 0; t < T; t++) {
      let m = 0; for (let v = 1; v < V; v++) if (logits[t * V + v] > logits[t * V + m]) m = v;
      if (m !== prev && m !== BLANK) out.push(inv[m]);
      prev = m;
    }
    return out.join(' ');
  }

  const API = { avaliar, ouvido, ctc, logSoftmax, TROCAS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.FonAvaliar = API;
})(typeof self !== 'undefined' ? self : this);
