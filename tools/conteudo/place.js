/* Nivelamento adaptativo: 20 perguntas que sobem ou descem de nível conforme as respostas */
const PLACE_N=20, PLACE_LV=['A1','A2','B1','B2','C1'];
let P=null;
function placement(){stopListening(); cur=null; P={i:0,lv:1,lock:false,used:new Set(),stat:PLACE_LV.map(()=>({n:0,ok:0})),cur:null}; renderPlace();}
function placePick(){
 for(let d=0;d<5;d++){for(const lv of [P.lv+d,P.lv-d]){if(lv<0||lv>4) continue;const pool=PLACE.map((q,k)=>({q,k})).filter(x=>x.q.lv===lv&&!P.used.has(x.k));if(pool.length) return pool[Math.floor(Math.random()*pool.length)];}}
 return null;
}
function renderPlace(){
 if(P.i>=PLACE_N){placeResult();return;}
 const pk=placePick(); if(!pk){placeResult();return;}
 P.cur=pk; P.used.add(pk.k); const q=pk.q, opts=shuffle(q.o.map((t,k)=>({t,k})));
 app.innerHTML=`<div class="wrap"><div class="bar"><button class="back" data-home aria-label="Sair do nivelamento">${ICON.back}</button><div class="ti"><b>Nivelamento</b><span>Pergunta ${P.i+1} de ${PLACE_N}</span></div></div>
 <div class="chap-open"><div class="no">NÍVEL ${PLACE_LV[q.lv]}</div><h1 class="pq">${esc(q.q)}</h1><p>As perguntas ficam mais fáceis ou mais difíceis conforme suas respostas. Se não souber, escolha “Não sei”.</p></div>
 <div class="sysw"><div class="opts">${opts.map(o=>`<button class="opt" data-pk="${o.k}"${enAttr(o.t)}>${esc(o.t)}</button>`).join('')}<button class="opt idk" data-pk="-1">Não sei</button></div>
 <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn ghost sm" data-pstop>${P.i>=8?'Terminar e ver o resultado':''}</button></div></div></div>`;
 const st=document.querySelector('[data-pstop]'); if(st&&P.i<8) st.remove();
 P.lock=false; window.scrollTo(0,0);
}
function placeAnswer(btn){
 if(P.lock) return; P.lock=true;
 const q=P.cur.q, k=+btn.dataset.pk, ok=k===0, s=P.stat[q.lv];
 s.n++; if(ok) s.ok++;
 btn.closest('.opts').querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.pk===0)b.classList.add('ok');else if(b===btn)b.classList.add('no');});
 P.lv=Math.max(0,Math.min(4,P.lv+(ok?1:-1)));
 setTimeout(()=>{P.i++;renderPlace();},S.calm?900:650);
}
function placeLevel(){
 /* primeiro nível ainda não dominado: menos de 60% de acerto, ou poucas perguntas certas */
 for(let l=0;l<5;l++){const s=P.stat[l]; if(s.n===0) return l; if(s.ok/s.n<.6) return l;}
 return 5;
}
function placeResult(){
 const l=placeLevel(), ARC_OF=[0,2,3,4,5,7], ai=ARC_OF[l], A0=ARCS[ai], score=P.stat.reduce((a,s)=>a+s.ok,0), n=P.stat.reduce((a,s)=>a+s.n,0);
 S.placed={score,arc:ai,lv:l}; S.start=A0.from; save();
 const lvTxt=l===0?'iniciante (antes do A1)':l===5?'C1 ou acima':'entre '+PLACE_LV[l-1]+' e '+PLACE_LV[l];
 app.innerHTML=`<div class="wrap"><div class="bar"><button class="back" data-home aria-label="Voltar">${ICON.back}</button><div class="ti"><b>Nivelamento</b><span>Resultado</span></div></div>
 <div class="panel bg-gate has-chr" style="min-height:240px"><div class="chr l">${av('me','happy')}</div><div class="chr r">${av('mina','happy')}</div>
  <div class="bubble r" tabindex="0" role="button"><span class="who">MINA</span><span class="en" lang="en">${l>=3?'Wow! You already know a lot.':'Great start! Let’s build it step by step.'}</span><span class="hint">toque para traduzir</span><span class="pt">${l>=3?'Uau! Você já sabe muito.':'Ótimo começo! Vamos construir passo a passo.'}</span></div></div>
 <div class="sysw"><div class="tag">[ RESULTADO ]</div><div class="place-r">
  <div class="big">${score} de ${n}</div>
  <p>Seu nível estimado: <b>${lvTxt}</b>.</p>
  <div class="plv">${PLACE_LV.map((v,i)=>{const s=P.stat[i];return `<div><small>${v}</small><b>${s.n?Math.round(s.ok/s.n*100)+'%':'—'}</b></div>`;}).join('')}</div>
  <p>Sugestão: comece no <b>${A0.n}</b>.<br>${A0.d}</p>
  <button class="btn" data-open="${A0.from}">Começar no capítulo ${A0.from+1}</button>
  ${A0.from>0?`<button class="btn ghost" data-fromzero>Prefiro começar do capítulo 1</button>`:''}
  <p style="font-size:14px">Os capítulos anteriores continuam abertos para revisar quando quiser.</p>
 </div></div></div>`;
 window.scrollTo(0,0);
}
