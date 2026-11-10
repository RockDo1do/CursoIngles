/* ===================== PRÁTICA: ESCUTA, LEITURA, VOCABULÁRIO E ESCRITA ===================== */
function practiceCard(){
 const ln=Object.keys(S.lsn||{}).length, rd=Object.keys(S.rd||{}).length, wr=Object.keys(S.wr||{}).length, vc=Object.keys(S.voc||{}).length, due=vocDue().length;
 return `<div class="sysw"><div class="tag">[ PRÁTICA ]</div><h3>Treine além dos capítulos</h3>
 <div class="prgrid">
  <button class="prb" data-lsn><b>Ouvir e responder</b><span>${ln}/${LISTEN.length} diálogos</span></button>
  <button class="prb" data-read><b>Leitura</b><span>${rd}/${READ.length} textos</span></button>
  <button class="prb" data-voc><b>Vocabulário</b><span>${vc} palavras${due?` · ${due} para revisar`:''}</span></button>
  <button class="prb" data-wrt><b>Escrita guiada</b><span>${wr}/${WRITE.length} textos</span></button>
 </div></div>`;
}
function lvBadge(lv){return `<span class="lvl">${lv}</span>`;}
function prList(title,sub,items,attr,doneMap){
 return `<div class="wrap">${barHTML(title,sub)}
 <div class="eps">${items.map(x=>{const d=doneMap&&doneMap[x.id]!=null;return `<button class="ep" ${attr}="${x.id}"><div class="thumb pr-ic" aria-hidden="true">${x.ic||''}</div><div class="t"><small>${esc(x.kind||'')}${x.kind?' · ':''}${lvBadge(x.lv)}</small><b>${esc(x.t)}</b><span>${esc(x.sub||'')}</span></div>${d?`<span class="st done">${doneMap[x.id]}/${x.q.length}</span>`:`<span class="st new">NOVO</span>`}</button>`;}).join('')}</div></div>`;
}
/* perguntas de múltipla escolha usadas na escuta e na leitura */
let PQ=null;
function pqHTML(qs){
 return `<div id="pq">${qs.map((q,qi)=>{const o=shuffle(q.o.map((t,k)=>({t,k})));return `<div class="q" data-pqi="${qi}"><div class="qt">${qi+1}. ${esc(q.q)}</div><div class="opts">${o.map(x=>`<button class="opt" data-pqk="${x.k}">${esc(x.t)}</button>`).join('')}</div></div>`;}).join('')}<div id="pqres"></div></div>`;
}
function pqAnswer(btn){
 const qd=btn.closest('[data-pqi]'), qi=+qd.dataset.pqi; if(!PQ||PQ.ans[qi]!=null) return;
 const q=PQ.qs[qi], k=+btn.dataset.pqk, ok=k===q.a; PQ.ans[qi]=ok;
 qd.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.pqk===q.a) b.classList.add('ok');else if(b===btn) b.classList.add('no');});
 if(Object.keys(PQ.ans).length===PQ.qs.length){
  const sc=Object.values(PQ.ans).filter(Boolean).length, store=S[PQ.store]=S[PQ.store]||{}, prev=store[PQ.id];
  const gain=prev==null?sc*5:Math.max(0,sc-prev)*5; store[PQ.id]=Math.max(sc,prev||0); S.xp+=gain; markDay(); save();
  document.getElementById('pqres').innerHTML=`<div class="result"><div class="xp">${sc} de ${PQ.qs.length}${gain?` · +${gain} XP`:''}</div><p>${sc===PQ.qs.length?'Perfeito! Você entendeu tudo.':sc>=PQ.qs.length/2?'Bom trabalho. Ouça ou leia de novo para pegar os detalhes.':'Tente de novo com calma. Ver o texto e a tradução ajuda.'}</p></div><div class="row" style="margin-top:12px"><button class="btn ghost" ${PQ.back}>Voltar para a lista</button></div>`;
 }
}
/* ---------- ESCUTA ---------- */
function lsnList(){stopListening();cur=null;app.innerHTML=prList('Ouvir e responder','Diálogos longos, só com áudio',LISTEN.map(x=>({...x,kind:'Diálogo',sub:`${x.lines.length} falas · ${x.q.length} perguntas`,ic:'♪'})),'data-lsnid',S.lsn);window.scrollTo(0,0);}
function lsnView(id){
 const L=LISTEN.find(x=>x.id===id); if(!L) return lsnList(); stopListening(); cur=null;
 PQ={id,qs:L.q,ans:{},store:'lsn',back:'data-lsn'};
 const name=w=>w==='rafa'?esc(heroName()):w==='narr'?'Anúncio':w==='mina'?'Mina':'Jin';
 app.innerHTML=`<div class="wrap">${barHTML('Ouvir e responder',esc(L.t),'data-lsn')}
 <div class="chap-open"><div class="no">DIÁLOGO · ${L.lv}</div><h1 class="pq">${esc(L.t)}</h1><p>Ouça o diálogo inteiro sem ler. Depois responda. Se precisar, ouça de novo ou veja o texto.</p></div>
 <div class="sysw"><div class="row" style="justify-content:flex-start"><button class="btn" data-lplay>Ouvir o diálogo</button><button class="btn ghost" data-lplay="slow">Ouvir devagar</button><button class="btn ghost" data-ltext aria-expanded="false">Ver o texto</button></div>
 <div id="ltext" hidden style="margin-top:14px">${L.lines.map(l=>`<div class="lline"><b>${name(l[0])}:</b> <span lang="en">${esc(l[1])}</span><small>${esc(gtxt(l[2]))}</small></div>`).join('')}</div></div>
 <div class="sysw"><div class="tag">[ PERGUNTAS ]</div>${pqHTML(L.q)}</div></div>`;
 window.scrollTo(0,0);
}
function lsnPlay(slow){const L=LISTEN.find(x=>x.id===PQ.id); if(!L) return; const o=S.slow; if(slow) S.slow=true; speakSeq(L.lines.map(l=>({t:l[1],who:l[0]})),null); S.slow=o;}
/* ---------- LEITURA ---------- */
function readList(){stopListening();cur=null;app.innerHTML=prList('Leitura','Textos do B1 ao C1, com glossário',READ.map(x=>({...x,sub:`${READ_WORDS(x)} palavras · ${x.q.length} perguntas`,ic:'¶'})),'data-readid',S.rd);window.scrollTo(0,0);}
function READ_WORDS(x){return x.p.join(' ').split(/\s+/).length;}
function glossMark(par,g){
 let h=esc(par); const keys=Object.keys(g).sort((a,b)=>b.length-a.length); const used=new Set();
 keys.forEach(k=>{if(used.has(k)) return; const re=new RegExp('\\b('+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')\\b','i'); if(re.test(h)){h=h.replace(re,`<button class="gw" data-gw="${esc(k)}">$1</button>`);used.add(k);}});
 return h;
}
function readView(id){
 const R=READ.find(x=>x.id===id); if(!R) return readList(); stopListening(); cur=null;
 PQ={id,qs:R.q,ans:{},store:'rd',back:'data-read',g:R.g};
 app.innerHTML=`<div class="wrap">${barHTML('Leitura',esc(R.t),'data-read')}
 <div class="chap-open"><div class="no">${esc(R.kind.toUpperCase())} · ${R.lv}</div><h1 class="pq">${esc(R.t)}</h1><p>Leia com calma. Toque nas palavras sublinhadas para ver a tradução.</p></div>
 <div class="sysw"><div class="row" style="justify-content:flex-start;margin-bottom:12px"><button class="btn ghost" data-rplay>Ouvir o texto</button></div>
 <div class="rtext" lang="en">${R.p.map(p=>`<p>${glossMark(p,R.g)}</p>`).join('')}</div><div id="gwout" class="gwout" role="status" aria-live="polite"></div></div>
 <div class="sysw"><div class="tag">[ PERGUNTAS ]</div>${pqHTML(R.q)}</div></div>`;
 window.scrollTo(0,0);
}
function readPlay(){const R=READ.find(x=>x.id===PQ.id); if(R) speakSeq(R.p.map(t=>({t,who:'narr'})),null);}
/* ---------- VOCABULÁRIO (cartões com revisão espaçada) ---------- */
function vocAll(){return VOCAB.flatMap(([th,ws])=>ws.map(w=>({w:w[0],pt:w[1],ex:w[2],th})));}
function vocDue(){const t=ymd(new Date());return vocAll().filter(x=>S.voc&&S.voc[x.w]&&S.voc[x.w].d<=t);}
let VC=null;
function vocList(){
 stopListening();cur=null; const due=vocDue();
 app.innerHTML=`<div class="wrap">${barHTML('Vocabulário','Cartões por tema, com revisão')}
 ${due.length?`<div class="sysw"><div class="tag">[ REVISÃO DE HOJE ]</div><p style="margin:6px 0 10px">${due.length} palavra(s) para revisar hoje.</p><button class="btn" data-vocgo="due">Revisar agora</button></div>`:''}
 <div class="eps">${VOCAB.map(([th,ws],i)=>{const n=ws.filter(w=>S.voc&&S.voc[w[0]]).length;return `<button class="ep" data-vocgo="${i}"><div class="thumb pr-ic" aria-hidden="true">Aa</div><div class="t"><small>${ws.length} palavras</small><b>${esc(th)}</b><span>${ws.slice(0,4).map(w=>w[0]).join(', ')}...</span></div><span class="st ${n===ws.length?'done':'new'}">${n}/${ws.length}</span></button>`;}).join('')}</div>
 <p class="foot" style="font-size:13px">Cada palavra volta depois de 1, 3, 7, 14 e 30 dias. Quem acerta várias vezes seguidas para de ver a palavra por mais tempo.</p></div>`;
 window.scrollTo(0,0);
}
function vocStart(k){
 const all=vocAll(); let items;
 if(k==='due') items=vocDue(); else {const th=VOCAB[+k][0]; const ws=all.filter(x=>x.th===th); const fresh=ws.filter(x=>!(S.voc&&S.voc[x.w])); items=(fresh.length?fresh:ws).slice(0,8);}
 VC={items:shuffle(items).slice(0,12),i:0,ok:0,flip:false,k}; vocCard();
}
function vocCard(){
 if(VC.i>=VC.items.length){vocEnd();return;}
 const x=VC.items[VC.i];
 app.innerHTML=`<div class="wrap">${barHTML('Vocabulário',`Cartão ${VC.i+1} de ${VC.items.length}`,'data-voc')}
 <div class="vcard${VC.flip?' open':''}"><small>${esc(x.th)}</small><b lang="en">${esc(x.w)}</b>
 <button class="btn ghost sm" data-qsay="${esc(x.w)}" data-who="narr">Ouvir</button>
 ${VC.flip?`<div class="vback"><p class="vpt">${esc(x.pt)}</p><p lang="en" class="vex">${esc(x.ex)}</p><button class="btn ghost sm" data-qsay="${esc(x.ex)}" data-who="narr">Ouvir o exemplo</button></div>`:''}</div>
 <div class="row" style="margin-top:14px">${VC.flip?`<button class="btn ghost" data-vocans="0">Não sabia</button><button class="btn" data-vocans="1">Sabia</button>`:`<button class="btn" data-vocflip>Mostrar a tradução</button>`}</div></div>`;
 window.scrollTo(0,0);
 if(!VC.flip) speak(x.w,null,'narr');
}
function vocAnswer(ok){
 const x=VC.items[VC.i]; S.voc=S.voc||{}; const e=S.voc[x.w]; const b=ok?Math.min(e?e.b+1:1,5):0;
 S.voc[x.w]={b,d:addDays(SRS_INT[b])}; if(ok){VC.ok++;if(!e) S.xp+=1;} save();
 VC.i++; VC.flip=false; vocCard();
}
function vocEnd(){
 markDay(); save();
 app.innerHTML=`<div class="wrap">${barHTML('Vocabulário','Resultado','data-voc')}<div class="sysw"><div class="place-r"><div class="big">${VC.ok} de ${VC.items.length}</div><p>${VC.ok===VC.items.length?'Você já conhecia todas!':'As palavras que você não sabia voltam amanhã para revisão.'}</p>
 <div class="row"><button class="btn" data-vocgo="${VC.k}">Mais cartões</button><button class="btn ghost" data-voc>Voltar aos temas</button></div></div></div></div>`;
 window.scrollTo(0,0);
}
/* ---------- ESCRITA GUIADA ---------- */
function wrtParse(t){const out=[];let last=0;t.replace(/\[([^\]|]+)\|([^\]|]*)(?:\|([^\]]*))?\]/g,(m,a,h,alt,i)=>{out.push({s:t.slice(last,i)});out.push({a,h,alt:(alt||'').split('/').filter(Boolean)});last=i+m.length;return m;});out.push({s:t.slice(last)});return out;}
function wrtModel(t){return t.replace(/\[([^\]|]+)\|[^\]]*\]/g,'$1');}
function wrtList(){stopListening();cur=null;app.innerHTML=prList('Escrita guiada','Complete mensagens e e-mails reais',WRITE.map(x=>({...x,sub:`${wrtParse(x.text).filter(p=>p.a).length} lacunas`,q:wrtParse(x.text).filter(p=>p.a),ic:'✎'})),'data-wrtid',S.wr);window.scrollTo(0,0);}
let WR=null;
function wrtView(id){
 const W=WRITE.find(x=>x.id===id); if(!W) return wrtList(); stopListening(); cur=null;
 const parts=wrtParse(W.text); WR={id,parts,done:false}; let gi=0;
 app.innerHTML=`<div class="wrap">${barHTML('Escrita guiada',esc(W.t),'data-wrt')}
 <div class="chap-open"><div class="no">${esc(W.kind.toUpperCase())} · ${W.lv}</div><h1 class="pq">${esc(W.t)}</h1><p>Complete as lacunas em inglês. A dica em português aparece dentro de cada espaço. Depois compare com o modelo.</p></div>
 <div class="sysw"><div class="wtext" lang="en">${parts.map(p=>p.a?`<input class="gap" data-gi="${gi++}" type="text" autocomplete="off" spellcheck="false" autocapitalize="off" aria-label="Lacuna: ${esc(p.h)}" placeholder="${esc(p.h)}" style="width:${Math.max(5,Math.max(p.a.length,p.h.length*0.8)+2)}ch">`:esc(p.s)).join('')}</div>
 <div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn" data-wcheck>Conferir</button><button class="btn ghost" data-wmodel>Ver o modelo</button></div><div id="wres"></div></div></div>`;
 window.scrollTo(0,0);
}
function wrtCheck(){
 const W=WRITE.find(x=>x.id===WR.id), gaps=WR.parts.filter(p=>p.a); let ok=0;
 document.querySelectorAll('.gap').forEach(inp=>{const g=gaps[+inp.dataset.gi], v=inp.value.trim().toLowerCase().replace(/[.,!?]+$/,''); const good=[g.a,...g.alt].some(a=>{a=a.toLowerCase();return v===a||(a.length>=5&&fuzzyEq(v,a));}); inp.classList.toggle('g-ok',good); inp.classList.toggle('g-no',!good&&!!v); if(good) ok++;});
 const S0=S.wr=S.wr||{}, prev=S0[WR.id], gain=prev==null?ok*2:Math.max(0,ok-prev)*2; S0[WR.id]=Math.max(ok,prev||0); S.xp+=gain; markDay(); save();
 document.getElementById('wres').innerHTML=`<div class="result" style="margin-top:12px"><div class="xp">${ok} de ${gaps.length}${gain?` · +${gain} XP`:''}</div><p>${ok===gaps.length?'Tudo certo!':'As lacunas em vermelho ainda não estão certas. Tente de novo ou veja o modelo.'}</p></div>`;
}
function wrtShowModel(){
 const W=WRITE.find(x=>x.id===WR.id), m=wrtModel(W.text);
 document.getElementById('wres').innerHTML=`<div class="wmodel"><small>MODELO</small><p lang="en">${esc(m)}</p><button class="btn ghost sm" data-wplay>Ouvir o modelo</button></div>`;
}
/* ---------- CERTIFICADO ---------- */
function arcDone(ai){const a=ARCS[ai];for(let i=a.from;i<=a.to;i++) if(S.done[i]==null) return false;return true;}
function certView(ai){
 const a=ARCS[ai]; if(!a) return home(); stopListening(); cur=null;
 const lv=(a.d.match(/[ABC][12](?:–[ABC][12])?/)||[''])[0], dt=new Date().toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
 app.innerHTML=`<div class="wrap">${barHTML('Certificado',esc(a.n))}
 <div class="cert" id="cert"><div class="cert-in"><small>TORRE DO INGLÊS</small><h1>Certificado de conclusão</h1>
 <p>Certificamos que</p><div class="cert-name">${esc(S.name||'Explorador(a)')}</div>
 <p>concluiu o <b>${esc(a.n)}</b>${lv?`, nível <b>${lv}</b> do Quadro Europeu Comum de Referência (CEFR)`:''}, com ${a.to-a.from+1} capítulos.</p>
 <div class="cert-can"><small>AGORA VOCÊ CONSEGUE</small><ul>${(CANDO[ai]||[]).map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>
 <p class="cert-dt">${dt}</p><p class="cert-note">Certificado de progresso pessoal. Não substitui um exame oficial de proficiência.</p></div></div>
 <div class="row noprint" style="margin-top:14px"><button class="btn" data-print>Imprimir ou salvar em PDF</button><button class="btn ghost" data-home>Voltar</button></div></div>`;
 window.scrollTo(0,0);
}
