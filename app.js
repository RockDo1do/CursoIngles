/* Torre do Inglês · © 2026 RockDo1do · https://github.com/RockDo1do/CursoIngles
   Licença CC BY-NC-SA 4.0: uso livre para estudar e compartilhar com crédito; proibido o uso comercial.
   Este arquivo tem só o código. A história e as questões ficam na pasta conteudo/. */
/* ===================== CONTEÚDO DO CURSO ===================== */
/* O conteúdo (CH, ARCS, CANDO, LISTEN, READ, VOCAB, WRITE) vem de conteudo/*.json, carregado pelo index.html antes deste arquivo. */

/* ===================== PERSONAGENS (SVG) ===================== */
const K='#1a1626';
const EYES={
 normal:`<path d="M39 52 Q46 49 53 52 M67 52 Q74 49 81 52" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="46" cy="62" rx="4.5" ry="5.5" fill="${K}"/><ellipse cx="74" cy="62" rx="4.5" ry="5.5" fill="${K}"/><circle cx="47.5" cy="60" r="1.6" fill="#fff"/><circle cx="75.5" cy="60" r="1.6" fill="#fff"/>`,
 happy:`<path d="M39 51 Q46 48 53 51 M67 51 Q74 48 81 51" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M40 64 Q46 56 52 64 M68 64 Q74 56 80 64" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="73" rx="5" ry="3" fill="#ff8fa3" opacity=".6"/><ellipse cx="82" cy="73" rx="5" ry="3" fill="#ff8fa3" opacity=".6"/>`,
 shock:`<path d="M39 47 Q46 43 53 47 M67 47 Q74 43 81 47" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="46" cy="62" r="6" fill="#fff" stroke="${K}" stroke-width="2"/><circle cx="74" cy="62" r="6" fill="#fff" stroke="${K}" stroke-width="2"/><circle cx="46" cy="62" r="1.8" fill="${K}"/><circle cx="74" cy="62" r="1.8" fill="${K}"/><path d="M98 38 Q104 49 98 54 Q92 49 98 38Z" fill="#8fd3ff" stroke="${K}" stroke-width="1"/>`,
 det:`<path d="M38 50 L53 55 M82 50 L67 55" stroke="${K}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="46" cy="62" rx="4.5" ry="4.5" fill="${K}"/><ellipse cx="74" cy="62" rx="4.5" ry="4.5" fill="${K}"/><circle cx="47.5" cy="60.5" r="1.5" fill="#fff"/><circle cx="75.5" cy="60.5" r="1.5" fill="#fff"/>`,
 sad:`<path d="M38 55 L53 50 M82 55 L67 50" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="46" cy="63" rx="4" ry="5" fill="${K}"/><ellipse cx="74" cy="63" rx="4" ry="5" fill="${K}"/><circle cx="47.3" cy="61" r="1.4" fill="#fff"/><circle cx="75.3" cy="61" r="1.4" fill="#fff"/>`
};
const MOUTH={
 normal:`<path d="M54 80 Q60 84 66 80" stroke="#7a3b3b" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
 happy:`<path d="M51 77 Q60 92 69 77Z" fill="#8a2f3a" stroke="${K}" stroke-width="1.5"/>`,
 shock:`<ellipse cx="60" cy="83" rx="4.5" ry="6" fill="#5a1f2a"/>`,
 det:`<path d="M53 81 L67 79" stroke="#7a3b3b" stroke-width="3" stroke-linecap="round"/>`,
 sad:`<path d="M54 84 Q60 78 66 84" stroke="#7a3b3b" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
};
/* ===================== ARTE DOS PERSONAGENS (estilo manhwa, SVG) ===================== */
let UID=0;
function shade(hex,f){let n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;const t=f<0?0:255,p=Math.abs(f);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
const LN='#1a1626';
const FACE_M='M30 53 Q30 22 60 21 Q90 22 90 53 Q90 72 86 82 Q77 96 60 97.5 Q43 96 34 82 Q30 72 30 53Z';
const FACE='M30.5 54 Q30.5 23 60 22 Q89.5 23 89.5 54 Q89.5 71 83.5 81 Q74 94.5 60 96.5 Q46 94.5 36.5 81 Q30.5 71 30.5 54Z';
const EYEP={
 normal:'M38 61 Q40 54 47 54 Q54 54 56.5 59.5 Q53.5 66 47 66.5 Q41 66 38 61Z',
 shock:'M38 60 Q39.5 51 47 51 Q55 51 56.5 59 Q54.5 68 47 68.5 Q40 68 38 60Z',
 det:'M38 61 Q41 57 47 56.5 Q54 56.5 56.5 59.5 Q53.5 66 47 66.5 Q41 66 38 61Z',
 sad:'M38.5 59.5 Q41 54.5 47 54.5 Q54 54.5 56.5 61 Q53 66.5 47 66.5 Q41 65.5 38.5 59.5Z'
};
const EYED={
 normal:{lash:'M37 61 Q39 52.5 47 52.5 Q55 52.5 57.5 59',brow:'M37 48 Q44 44.5 54 47',ir:[48,60.5,4.6,5.6]},
 shock:{lash:'M37 60 Q38.5 49.5 47 49.5 Q55.5 49.5 57.5 58.5',brow:'M37 44 Q44 39.5 54 42.5',ir:[47,60,3.2,3.6]},
 det:{lash:'M37 61 Q41 55.5 47 55.2 Q54 55.2 57.5 59.5',brow:'M37 47.5 Q46 48.5 54.5 52.5',ir:[48.5,61.5,4.6,5.2]},
 sad:{lash:'M37.5 59.5 Q41 53 47 53 Q54 53 57.5 61.5',brow:'M38 51 Q46 49 54 45.5',ir:[47.5,61,4.6,5.6]}
};
function faceSide(m,u,Hd,sx){
 const happy=m==='happy', male=sx==='m';
 const blush=male?(happy?`<ellipse cx="40" cy="72" rx="5" ry="2.4" fill="#e07a6a" opacity=".18"/>`:''):`<ellipse cx="40" cy="71.5" rx="5.5" ry="2.8" fill="#ff8a9a" opacity="${happy?.5:.25}"/>`+(happy?`<path d="M37.5 70 L36 73 M40.5 70 L39 73 M43.5 70 L42 73" stroke="#ff6f86" stroke-width="1" opacity=".7" stroke-linecap="round"/>`:'');
 if(happy) return blush+`<path d="M38.5 62 Q47 53.5 56 61.5" stroke="${LN}" stroke-width="3" fill="none" stroke-linecap="round"/>${male?'':`<path d="M39.5 63 L37.5 65" stroke="${LN}" stroke-width="1.6" stroke-linecap="round"/>`}<path d="${male?'M36.5 46.5 Q44 43 54.5 45.5':'M37 46 Q44 42 54 45'}" stroke="${Hd}" stroke-width="${male?3.8:2.8}" fill="none" stroke-linecap="round"/>`;
 const E=EYED[m]||EYED.normal, [x,y,rx,ry]=E.ir;
 return blush+`<path d="${EYEP[m]||EYEP.normal}" fill="#fff"/><g clip-path="url(#${u}c)"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${u}i)"/><ellipse cx="${x}" cy="${y+.4}" rx="${(rx*.46).toFixed(2)}" ry="${(ry*.52).toFixed(2)}" fill="#120c1c"/><circle cx="${x+1.8}" cy="${y-2.2}" r="1.6" fill="#fff"/><circle cx="${x-1.6}" cy="${y+2.5}" r=".85" fill="#fff" opacity=".85"/><path d="M36 55 Q47 50 58 56 L58 58.6 Q47 54 36 58.4Z" fill="#000" opacity=".13"/></g><path d="${E.lash}" stroke="${LN}" stroke-width="3" fill="none" stroke-linecap="round"/>${male?'':`<path d="M38 59.5 L35.5 57.3" stroke="${LN}" stroke-width="1.8" stroke-linecap="round"/>`}<path d="M41.5 66.3 Q47 68.2 52.5 65.9" stroke="#000" stroke-opacity=".28" stroke-width="1" fill="none"/><path d="${E.brow}" stroke="${Hd}" stroke-width="${male?(m==='det'?4.2:3.8):(m==='det'?3.3:2.6)}" fill="none" stroke-linecap="round"/>`;
}
const MOUTHS={
 normal:`<path d="M55 80.5 Q60 83.5 65 80.5" stroke="#7a3340" stroke-width="2" fill="none" stroke-linecap="round"/>`,
 happy:`<path d="M53 78 Q60 79.6 67 78 Q66 86.5 60 87.5 Q54 86.5 53 78Z" fill="#6b1f2e" stroke="${LN}" stroke-width="1.2" stroke-linejoin="round"/><path d="M54.2 78.4 Q60 79.8 65.8 78.4 L65.3 80 Q60 81 54.7 80Z" fill="#fff"/><path d="M56 84.3 Q60 82.3 64 84.3 Q62.5 87.2 60 87.3 Q57.5 87.2 56 84.3Z" fill="#e46a7c"/>`,
 shock:`<ellipse cx="60" cy="82" rx="3.6" ry="4.8" fill="#5a1a28" stroke="${LN}" stroke-width="1"/><ellipse cx="60" cy="84.6" rx="2.2" ry="1.5" fill="#e46a7c"/>`,
 det:`<path d="M54.5 81 Q60 79.6 65.5 81" stroke="#7a3340" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M64.5 81.5 L66 83" stroke="#7a3340" stroke-width="1.4" stroke-linecap="round"/>`,
 sad:`<path d="M55 83 Q60 79.5 65 83" stroke="#7a3340" stroke-width="2" fill="none" stroke-linecap="round"/>`
};
const circ=(L,C)=>L.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${C}"/>`).join('');
const HAIR={
 spiky:{back:H=>`<path d="M28 60 Q22 30 44 19 L40 6 L55 14 L63 1 L71 14 L87 8 L82 22 Q100 32 92 60Z" fill="${H}"/>`,
  front:C=>`<path d="M30 54 Q31 30 50 25 L46 43 L56 30 L58 45 L66 30 L70 44 L76 31 L81 45 Q88 37 90 54 Q93 32 80 25 Q62 17 44 23 Q29 31 30 54Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M47 18 Q56 12 67 14.5" stroke="${Hl}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".75"/><path d="M56 31 L54.5 41 M68 31.5 L69 41 M44 28 L38.5 38" stroke="${Hd}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`},
 long:{back:H=>`<path d="M26 96 Q12 42 36 23 Q60 9 84 23 Q108 42 94 96 Q92 106 86 110 L34 110 Q28 106 26 96Z" fill="${H}"/>`,
  front:C=>`<path d="M30 60 Q27 25 60 20.5 Q93 23 90 60 Q88 45 80 37 Q75 45 64 41 Q71 34 66 29 Q56 42 41 42.5 Q33 47 30 60Z" fill="${C}"/><path d="M30.5 50 Q26 72 31 92 Q35.5 77 35 62Z M89.5 50 Q94 72 89 92 Q84.5 77 85 62Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M39 30 Q51 23 64 24.5" stroke="${Hl}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".65"/><path d="M66 29 Q62 38 56 41 M80 37 Q82 44 84 52" stroke="${Hd}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`},
 short:{back:H=>`<path d="M29 58 Q25 25 60 19 Q95 25 91 58Z" fill="${H}"/>`,
  front:C=>`<path d="M30 56 Q29 27 58 21.5 Q91 21 90.5 54 Q86 40 80 36 L78.5 45 L72 36.5 L66 43 L60 34.5 L53 42.5 L48.5 34.5 Q38 40 34 56Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M44 24.5 Q56 19 70 21" stroke="${Hl}" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".7"/><path d="M60 34.5 L59 27 M72 36.5 L73 28" stroke="${Hd}" stroke-width="1.2" stroke-linecap="round"/>`},
 curly:{back:H=>circ([[28,50,11],[30,34,12],[42,22,13],[60,17,14],[78,22,13],[90,34,12],[92,50,11],[26,64,8],[94,64,8]],H),
  front:C=>circ([[36,40,8],[47,31,8.5],[60,28.5,8.5],[73,31,8.5],[84,40,7.5]],C),
  extra:(Hd,Hl)=>`<path d="M43 27 Q47 24 51 26 M56 24 Q60 21 64 23 M69 26.5 Q73 24 77 26.5 M56 13 Q61 10 66 12.5" stroke="${Hl}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".55"/>`},
 bun:{back:H=>`<path d="M29 58 Q25 25 60 19 Q95 25 91 58Z" fill="${H}"/><circle cx="60" cy="13" r="12" fill="${H}"/>`,
  front:C=>`<path d="M30 58 Q29 25 60 22 Q91 25 90 58 Q85 36 63 31.5 L60 34 L57 31.5 Q35 36 30 58Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M53 8.5 Q60 4.5 67 8.5" stroke="${Hl}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/><path d="M45 25.5 Q53 21.5 60 22.5" stroke="${Hl}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/><path d="M50 21 Q60 25.5 70 21" stroke="${Hd}" stroke-width="1.6" fill="none" opacity=".6"/>`},
 buzz:{back:H=>`<path d="M30 52 Q28 22 60 20 Q92 22 90 52Z" fill="${H}"/>`,
  front:C=>`<path d="M31 50 Q31 24 60 22 Q89 24 89 50 Q86 36 60 33 Q34 36 31 50Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M46 25 Q58 21 70 24" stroke="${Hl}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".5"/>`},
 swept:{back:H=>`<path d="M29 58 Q25 25 60 19 Q95 25 91 58Z" fill="${H}"/>`,
  front:C=>`<path d="M30 56 Q28 24 60 19.5 Q92 21 91 52 Q85 35 70 31 Q57 29 45 37 Q37 43 34 56Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M44 24 Q58 18 74 22" stroke="${Hl}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/><path d="M70 31 Q74 26 72 21 M58 30 Q62 25 60 21" stroke="${Hd}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`},
 curlyshort:{back:H=>circ([[33,40,9],[38,28,10],[49,21,10.5],[62,19,10.5],[75,22,10],[85,30,9.5],[88,42,8]],H),
  front:C=>circ([[39,35,6.5],[50,30,7],[62,28.5,7],[74,31,6.5],[83,37,5.5]],C),
  extra:(Hd,Hl)=>`<path d="M47 22 Q50 20 53 22 M60 20 Q63 18 66 20 M72 23 Q75 21 78 23" stroke="${Hl}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".5"/>`},
 ponytail:{back:H=>`<path d="M29 58 Q25 25 60 19 Q95 25 91 58Z" fill="${H}"/><path d="M84 28 Q110 36 104 92 Q99 104 94 96 Q100 66 86 50Z" fill="${H}"/>`,
  front:C=>`<path d="M30 60 Q27 25 60 20.5 Q93 23 90 60 Q88 45 80 37 Q75 45 64 41 Q71 34 66 29 Q56 42 41 42.5 Q33 47 30 60Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M39 30 Q51 23 64 24.5 M98 50 Q103 66 100 86" stroke="${Hl}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/><rect x="84" y="27" width="8" height="6" rx="2" fill="#ff7ab6" transform="rotate(30 88 30)"/>`},
 bob:{back:H=>`<path d="M26 78 Q16 24 60 19 Q104 24 94 78 Q88 84 80 82 L40 82 Q32 84 26 78Z" fill="${H}"/>`,
  front:C=>`<path d="M30 57 Q29 24 60 21 Q91 24 90 57 Q86 44 76 42 L44 42 Q34 44 30 57Z" fill="${C}"/><path d="M30 52 Q26 68 31 80 Q35 70 35 58Z M90 52 Q94 68 89 80 Q85 70 85 58Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M40 30 Q52 24 66 25" stroke="${Hl}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/>`},
 side:{back:()=>'',
  front:C=>`<path d="M29.5 70 Q24 46 37 35 Q34.5 52 37.5 68Z M90.5 70 Q96 46 83 35 Q85.5 52 82.5 68Z" fill="${C}"/>`,
  extra:(Hd,Hl)=>`<path d="M47 27 Q60 22.5 73 27" stroke="${Hl}" stroke-width="1.4" fill="none" opacity=".8"/>`}
};
const DECO={
 lines:(T,Td,Sk)=>`<path d="M36 109.5 Q60 128 84 109.5" stroke="${Td}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M53 113 L51 134 M67 113 L69 134" stroke="#f4f1ea" stroke-width="2" stroke-linecap="round"/><circle cx="51" cy="135" r="1.8" fill="#f4f1ea"/><circle cx="69" cy="135" r="1.8" fill="#f4f1ea"/>`,
 v:(T,Td,Sk)=>`<path d="M50 103 L60 119 L70 103Z" fill="${Sk}"/><path d="M42 105 L60 124 L78 105" stroke="#fbfaff" stroke-width="3.2" fill="none" stroke-linejoin="round"/><path d="M60 124 L60 152" stroke="${Td}" stroke-width="1.4" opacity=".6"/>`,
 armor:(T,Td,Sk)=>`<path d="M8 134 Q10 112 38 107 L46 124 Q24 124 8 134Z M112 134 Q110 112 82 107 L74 124 Q96 124 112 134Z" fill="#aeb6c8" stroke="${LN}" stroke-width="1.6"/><path d="M46 112 L60 120 L74 112 L72 140 L60 146 L48 140Z" fill="#c9d0de" stroke="${LN}" stroke-width="1.6"/><circle cx="60" cy="130" r="4" fill="#62d6ff" stroke="${LN}" stroke-width="1"/>`,
 zip:(T,Td,Sk)=>`<path d="M44 101 L47 116 L60 111 L73 116 L76 101 Q60 108 44 101Z" fill="${Td}" stroke="${LN}" stroke-width="1.6" stroke-linejoin="round"/><path d="M60 111 L60 152" stroke="${shade(T,-.5)}" stroke-width="2.4"/><rect x="58.2" y="116" width="3.6" height="6" rx="1" fill="#c9ccd8"/>`
};
const ACC={
 phones:H=>`<path d="M27 56 Q26 12 60 12 Q94 12 93 56" stroke="#2b2d42" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="21" y="50" width="13" height="22" rx="6" fill="#ff8a3d" stroke="${LN}" stroke-width="1.6"/><rect x="86" y="50" width="13" height="22" rx="6" fill="#ff8a3d" stroke="${LN}" stroke-width="1.6"/><path d="M24.5 55 L24.5 66 M95.5 55 L95.5 66" stroke="#ffd0a8" stroke-width="2" stroke-linecap="round"/>`,
 cap:H=>`<path d="M29 42 Q29 11 60 10 Q91 11 91 42 Q60 33 29 42Z" fill="#3f6ad8" stroke="${LN}" stroke-width="1.8"/><path d="M48 37 Q78 30 104 41 Q97 48 62 42Z" fill="#2a4ba8" stroke="${LN}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="60" cy="10.5" r="2.4" fill="#2a4ba8"/><circle cx="45" cy="27" r="5" fill="#ffcf3f" stroke="${LN}" stroke-width="1.2"/>`,
 cat:H=>`<path d="M33 34 L36 8 L54 25Z M87 34 L84 8 L66 25Z" fill="${H}" stroke="${LN}" stroke-width="1.8" stroke-linejoin="round"/><path d="M37.5 27 L38.5 14.5 L48 24Z M82.5 27 L81.5 14.5 L72 24Z" fill="#ff9fb2"/>`,
 star:H=>`<path d="M82 22 L84.6 28 L91 28.6 L86 32.6 L87.6 39 L82 35.5 L76.4 39 L78 32.6 L73 28.6 L79.4 28Z" fill="#ffcf3f" stroke="${LN}" stroke-width="1.4" stroke-linejoin="round"/>`,
 crown:H=>`<path d="M40 24 L43 4 L52 15 L60 0.5 L68 15 L77 4 L80 24Z" fill="#ffcf3f" stroke="${LN}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="60" cy="18" r="3" fill="#ff5d73"/><circle cx="48" cy="20" r="2" fill="#62d6ff"/><circle cx="72" cy="20" r="2" fill="#62d6ff"/>`
};
function avatarSVG(c,mood){
 mood=mood||'normal'; const u='av'+(++UID);
 const H=c.hair,Hd=shade(H,-.4),Hl=shade(H,.45),Sk=c.skin,Sd=shade(Sk,-.17),T=c.top,Td=shade(T,-.32),Tl=shade(T,.2),I=c.iris||'#5b3a24';
 const hs=HAIR[c.style]||HAIR.short, side=faceSide(mood,u,Hd,c.sex), FC=c.sex==='m'?FACE_M:FACE;
 return `<svg viewBox="0 0 120 150" aria-hidden="true"><defs>
<linearGradient id="${u}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(I,-.5)}"/><stop offset=".55" stop-color="${I}"/><stop offset="1" stop-color="${shade(I,.5)}"/></linearGradient>
<linearGradient id="${u}t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${Tl}"/><stop offset="1" stop-color="${T}"/></linearGradient>
<clipPath id="${u}c"><path d="${EYEP[mood]||EYEP.normal}"/></clipPath><clipPath id="${u}f"><path d="${FC}"/></clipPath></defs>
${(c.acc==='cap'&&c.style!=='long'?HAIR.short:hs).back(H)}
<path d="M5 152 Q7 117 38 108.5 L52 102 Q60 106 68 102 L82 108.5 Q113 117 115 152Z" fill="url(#${u}t)" stroke="${LN}" stroke-width="2"/>
<path d="M70 104 L82 108.5 Q113 117 115 152 L76 152 Q80 126 70 104Z" fill="${Td}" opacity=".45"/>
<path d="M51 84 L51 104 Q60 109 69 104 L69 84Z" fill="${Sk}" stroke="${LN}" stroke-width="1.6"/><path d="M51 88 Q60 99 69 88 L69 95.5 Q60 103 51 95.5Z" fill="${Sd}"/>
${(DECO[c.deco]||DECO.v)(T,Td,Sk)}
<ellipse cx="31" cy="62" rx="4.6" ry="7.6" fill="${Sk}" stroke="${LN}" stroke-width="1.6"/><ellipse cx="89" cy="62" rx="4.6" ry="7.6" fill="${Sk}" stroke="${LN}" stroke-width="1.6"/><path d="M31.5 58 Q29.5 62 31.5 66 M88.5 58 Q90.5 62 88.5 66" stroke="${Sd}" stroke-width="1.4" fill="none"/>
<path d="${FC}" fill="${Sk}" stroke="${LN}" stroke-width="2"/>${c.beard==='stubble'?`<path d="M36 74 Q39 93 60 97.5 Q81 93 84 74 Q80 88 60 91 Q40 88 36 74Z" fill="${H}" opacity=".32"/>`:c.beard==='full'?`<path d="M34 66 Q35 97 60 101 Q85 97 86 66 Q82 82 72 81 Q60 77 48 81 Q38 82 34 66Z" fill="${H}" stroke="${shade(H,-.3)}" stroke-width="1"/>`:''}
<g clip-path="url(#${u}f)"><path d="M89.5 54 Q89.5 71 83.5 81 Q74 94.5 60 96.5 Q72 92 79 80 Q85 70 85 56Z" fill="${Sd}" opacity=".6"/><g transform="translate(.6 3.4)" opacity=".5">${hs.front(Sd)}</g></g>
<path d="M60.6 66.5 Q58.8 71 61.6 72.2" stroke="${Sd}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
${c.old?`<path d="M50 38 Q60 36 70 38 M52 42 Q60 40.5 68 42" stroke="${Sd}" stroke-width="1.1" fill="none" stroke-linecap="round"/><path d="M35.5 66 L33 68 M84.5 66 L87 68" stroke="${Sd}" stroke-width="1.1" stroke-linecap="round"/>`:''}
${side}<g transform="matrix(-1 0 0 1 120 0)">${side}</g>
${MOUTHS[mood]||MOUTHS.normal}${c.earrings?`<circle cx="30.5" cy="72" r="2.6" fill="#ffcf3f" stroke="${LN}" stroke-width=".8"/><circle cx="89.5" cy="72" r="2.6" fill="#ffcf3f" stroke="${LN}" stroke-width=".8"/>`:''}
${c.mustache?`<path d="M51.5 77.5 Q55.5 73.5 60 75.6 Q64.5 73.5 68.5 77.5 Q64.5 79.4 60 78 Q55.5 79.4 51.5 77.5Z" fill="${H}" stroke="${shade(H,-.35)}" stroke-width=".9"/>`:''}
${hs.front(H)}${hs.extra(Hd,Hl)}
${c.clip?`<g transform="rotate(-25 82 33)"><rect x="75" y="30.5" width="15" height="5" rx="2.5" fill="#3ee6c4" stroke="${LN}" stroke-width="1"/><circle cx="78.2" cy="33" r="1.2" fill="#fff"/></g>`:''}
${c.acc&&ACC[c.acc]?ACC[c.acc](H):''}
${c.glasses?`<g fill="#fff" fill-opacity=".14" stroke="${LN}" stroke-width="2.2"><rect x="36.5" y="52.5" width="21" height="16" rx="6"/><rect x="62.5" y="52.5" width="21" height="16" rx="6"/></g><path d="M57.5 59 Q60 57 62.5 59 M36.5 58 L31.5 59.5 M83.5 58 L88.5 59.5" stroke="${LN}" stroke-width="2" fill="none"/><path d="M40 56 L45 55 M66 56 L71 55" stroke="#fff" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>`:''}
${mood==='shock'?`<path d="M96 38 Q102.5 50 96 55.5 Q89.5 50 96 38Z" fill="#9ad8ff" stroke="${LN}" stroke-width="1"/><path d="M94.5 47 Q94 51 96 52.5" stroke="#fff" stroke-width="1.2" fill="none"/>`:''}
</svg>`;
}
function monsterSVG(tint){
 const u='mo'+(++UID), t=tint||'#ff5d73', tl=shade(t,.4), tw=shade(t,.7);
 return `<svg viewBox="0 0 140 150" aria-hidden="true"><defs>
<radialGradient id="${u}a" cx=".5" cy=".6" r=".5"><stop offset="0" stop-color="${t}" stop-opacity=".45"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a78"/><stop offset=".6" stop-color="#2a1748"/><stop offset="1" stop-color="#120820"/></linearGradient>
<radialGradient id="${u}e" cx=".4" cy=".5" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="${tw}"/><stop offset="1" stop-color="${t}"/></radialGradient></defs>
<ellipse cx="70" cy="98" rx="68" ry="54" fill="url(#${u}a)"/>
<path d="M10 152 Q8 94 33 68 Q38 48 52 41 L38 6 L63 33 Q70 30 77 33 L102 6 L88 41 Q102 48 107 68 Q132 94 130 152Z" fill="url(#${u}b)" stroke="${t}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M44 14 L58 36 M96 14 L82 36" stroke="#7d4bc0" stroke-width="2" stroke-linecap="round"/>
<path d="M52 41 Q70 50 88 41" stroke="#120820" stroke-width="3" fill="none" opacity=".6"/>
<path d="M36 72 L64 84 L40 92Z M104 72 L76 84 L100 92Z" fill="${t}" opacity=".35" stroke="${t}" stroke-width="6" stroke-linejoin="round"/>
<path d="M38 73 L63 84 L41 91Z M102 73 L77 84 L99 91Z" fill="url(#${u}e)" stroke="#2a0a14" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M50 83 L53 88 M90 83 L87 88" stroke="#2a0a14" stroke-width="2.4" stroke-linecap="round"/>
<path d="M42 111 Q70 132 98 109 L98 114 Q70 140 42 117Z" fill="#0a0412" stroke="${t}" stroke-width="1.6"/>
<path d="M44 112 L50 121 L55 115 L61 125 L67 116 L73 126 L79 116 L85 124 L90 114 L96 111" fill="#f4eefc" stroke="#2a0a14" stroke-width="1" stroke-linejoin="round"/>
<path d="M28 136 L40 124 L38 112 M112 136 L100 124 L102 112 M70 52 L66 60 L72 65 M58 140 L64 130" stroke="${tl}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/>
<g fill="#120820" opacity=".8"><ellipse cx="22" cy="150" rx="18" ry="7"/><ellipse cx="60" cy="152" rx="22" ry="6"/><ellipse cx="104" cy="150" rx="20" ry="7"/></g>
</svg>`;
}
const PEOPLE={
 rafa:{sex:'m',style:'spiky',hair:'#3b2a22',top:'#e8743b',skin:'#f0c39d',deco:'lines',iris:'#7a4a28'},
 mina:{sex:'f',style:'long',hair:'#1f1d33',top:'#6f5bd6',skin:'#f7d6bf',deco:'v',clip:true,iris:'#7b5bd6'},
 jin:{sex:'m',style:'short',hair:'#d9dcea',top:'#2f6b57',skin:'#eec4a2',deco:'zip',iris:'#4d7fa8'},
 olivia:{sex:'f',style:'bob',hair:'#a8432a',top:'#1f4e8c',skin:'#f6d6c6',deco:'zip',iris:'#3f7a5a',earrings:true},
 harry:{sex:'m',style:'swept',hair:'#c9a76b',top:'#7a2e3b',skin:'#efc8a8',deco:'lines',iris:'#4a6fa5'}
};
const AV_PRESETS=[
 {sex:'m',style:'spiky',hair:'#2a1d17',top:'#3f8cff',skin:'#d9a066',deco:'lines',iris:'#4a2e1c'},
 {sex:'f',style:'long',hair:'#7a3e1d',top:'#e0457b',skin:'#f7d6bf',deco:'v',iris:'#4f8a5b'},
 {sex:'f',style:'curly',hair:'#1b1410',top:'#f2b134',skin:'#6e4326',deco:'v',iris:'#3b2414',earrings:true},
 {sex:'f',style:'bun',hair:'#c9a13b',top:'#3fbf8f',skin:'#f0c39d',deco:'zip',iris:'#3d6fb0'},
 {sex:'m',style:'side',hair:'#d4d4dc',top:'#7a5bd6',skin:'#e8b88f',deco:'v',glasses:true,old:true,mustache:true,iris:'#5b4636'},
 {sex:'m',style:'short',hair:'#101418',top:'#d94b3b',skin:'#a86b3c',deco:'zip',glasses:true,iris:'#2d1f18'},
 {sex:'m',style:'buzz',hair:'#15100c',top:'#2f8f5b',skin:'#6e4326',deco:'zip',iris:'#2d1f18',beard:'stubble'},
 {sex:'m',style:'swept',hair:'#6b4a2b',top:'#2b3a55',skin:'#f0c39d',deco:'lines',iris:'#3d6fb0',beard:'full'},
 {sex:'m',style:'curlyshort',hair:'#2a1a12',top:'#e8743b',skin:'#8d5524',deco:'v',iris:'#3b2414'},
 {sex:'f',style:'ponytail',hair:'#241612',top:'#14b8a6',skin:'#a86b3c',deco:'v',iris:'#2d1f18',earrings:true},
 {sex:'f',style:'bob',hair:'#cfcfd8',top:'#8a5bd6',skin:'#e8b88f',deco:'zip',glasses:true,old:true,iris:'#5b4636'},
 {sex:'f',style:'long',hair:'#0f0c14',top:'#f2b134',skin:'#d9a066',deco:'v',iris:'#4a2e1c',earrings:true}
];
/* Palpite pelo primeiro nome: lista de nomes comuns e a terminação (Ana, João...) */
const NAMES_M=new Set('luca luka joshua jonas lucas thomas tomas nicolas davi david rafael gabriel miguel samuel daniel manuel emanuel ismael joel abel noel raul saul paul luis luiz jose andre felipe filipe henrique guilherme enzo bernardo arthur artur heitor theo teo levi ravi benjamin benicio matheus mateus vinicius caio igor victor vitor walter wagner william willian alex max kevin ryan john mike michael james robert adam jin rafa junior elias tobias matias ze jorge gustavo eduardo ricardo marcos carlos antonio francisco paulo sergio rui tiago thiago diogo hugo bruno fabio leonardo renato roberto alberto fernando cristiano ronaldo neymar kaique kaua luan juan ian yan noah nathan natan bento otavio pietro lorenzo murilo rodrigo danilo marcelo sandro alexandre alessandro jean gil isaac nuno joao pedro diego mario sebastiao vicente lourenco simao goncalo afonso tomas martim duarte'.split(' '));
const NAMES_F=new Set('beatriz isabel raquel rachel ester esther ruth rute carmen irene alice denise gisele giselle michele michelle rose ingrid miriam mirian judith judite lourdes mercedes dolores luz ines liz lis elizabeth sarah hannah agnes jasmin yasmin iasmin karen kelly emily nicole madison mel evelyn helen heloise heloisa sophie zoe jade chloe mary jennifer catherine ellen fernanda mina bia bea dani gabi vivi lu cris pri thais tais lais raissa clarice beatrice adele joyce kim cleo flor leonor matilde constanca'.split(' '));
const NOT_F=new Set(['luca','luka','joshua','sasha','nikita','elias','jonas']);
function guessSex(name){
 const n=String(name||'').trim().split(/\s+/)[0].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z]/g,'');
 if(n.length<2) return '';
 if(NAMES_M.has(n)) return 'm';
 if(NAMES_F.has(n)) return 'f';
 if(/a$/.test(n)&&!NOT_F.has(n)) return 'f';
 if(/(o|os|us|son|ton|or|er|el)$/.test(n)) return 'm';
 if(/(ane|ine|ele|ice|ete|ia|iz|is|ly|ie)$/.test(n)) return 'f';
 return '';
}
function avSex(){return S.avSex||guessSex(S.name)||((AV_PRESETS[S.avatar]||{}).sex)||'m';}
function avGridHTML(){
 const sx=avSex();
 return AV_PRESETS.map((c,i)=>c.sex===sx?`<button class="avb" data-av="${i}" aria-pressed="${(S.avatar||0)===i}" aria-label="Avatar ${i+1}">${avatarSVG(c,'happy')}</button>`:'').join('');
}
function avSexSeg(){const sx=avSex();return `<div class="seg" role="group" aria-label="Tipo de avatar" style="margin-bottom:10px"><button class="segb" data-avsex="m" aria-pressed="${sx==='m'}">Masculinos</button><button class="segb" data-avsex="f" aria-pressed="${sx==='f'}">Femininos</button></div>`;}
function refreshAvatars(){
 const sx=avSex();
 if((AV_PRESETS[S.avatar]||{}).sex!==sx){const k=AV_PRESETS.findIndex(c=>c.sex===sx);if(k>=0) S.avatar=k;}
 const g=document.getElementById('avgrid'); if(g) g.innerHTML=avGridHTML();
 const sg=document.getElementById('avsex'); if(sg) sg.innerHTML=avSexSeg();
}
function cfgWith(e){const base=AV_PRESETS[S.avatar]||AV_PRESETS[0];const eq=Object.assign({},S.equip||{},e||{});const o=eq.outfit&&COSM[eq.outfit];return Object.assign({},base,o?o.cfg:{},{acc:eq.acc||null});}
function myCfg(){return cfgWith();}
function heroSex(){return (AV_PRESETS[S.avatar]||AV_PRESETS[0]).sex||'m';}
function gtxt(x){return String(x==null?'':x).replace(/\{([^{}|]*)\|([^{}|]*)\}/g,(m,a,b)=>heroSex()==='f'?b:a);}
/* O(a) protagonista é o(a) aluno(a): o nome dele(a) entra nos diálogos */
function heroName(){const w=String(S.name||'').trim().split(/\s+/)[0]||'';const c=w.replace(/[^\p{L}'-]/gu,'');return c?c.charAt(0).toUpperCase()+c.slice(1):'Alex';}
function nmNorm(x){return String(x).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
let HERO_SRC=null, HERO_APPLIED=null;
function heroWalk(src,dst,nm){
 if(Array.isArray(src)){src.forEach((v,i)=>{if(typeof v==='string') dst[i]=v.replace(/\bRafa\b/g,nm);else if(v&&typeof v==='object') heroWalk(v,dst[i],nm);});}
 else for(const k in src){const v=src[k];if(typeof v==='string') dst[k]=v.replace(/\bRafa\b/g,nm);else if(v&&typeof v==='object'&&dst[k]) heroWalk(v,dst[k],nm);}
}
function applyHeroName(){
 const nm=heroName(); if(nm===HERO_APPLIED) return;
 if(!HERO_SRC) HERO_SRC={ch:JSON.parse(JSON.stringify(CH)),bonus:JSON.parse(JSON.stringify(BONUS)),cards:JSON.parse(JSON.stringify(CARDS))};
 heroWalk(HERO_SRC.ch,CH,nm); heroWalk(HERO_SRC.bonus,BONUS,nm); heroWalk(HERO_SRC.cards,CARDS,nm); HERO_APPLIED=nm;
}
function voiceWho(w){return (w==='rafa'&&heroSex()==='f')?'rafa_f':(w||'narr');}
function av(who,mood,tint){
 if(who==='monster') return monsterSVG(tint);
 return avatarSVG((who==='me'||who==='rafa')?myCfg():(PEOPLE[who]||PEOPLE.rafa),mood);
}
/* BONUS vem de conteudo/historia/bonus.json e conteudo/questoes/bonus.json */

/* ===================== BAÚ DO PORTAL: dados ===================== */
const MONC={'SILÊNCIO':'#9fb2c8','ECO':'#ff7ab6','SOMBRA DA PONTE':'#5db8ff','CAPITÃO SOMBRIO':'#ff5d73','GOLEM':'#e0a83a','O JUIZ':'#b46bff','ARREPENDIMENTO':'#3fd68a','GUARDIÃO':'#ffcf3f','NÉVOA':'#b8c4d6'};
const COSM={
 phones:{n:'Fones do Portal',kind:'acc'},
 neon:{n:'Moletom Neon',kind:'outfit',cfg:{top:'#14b8a6',deco:'lines'}},
 cap:{n:'Boné do Clube',kind:'acc'},
 hunter:{n:'Jaqueta de Explorador',kind:'outfit',cfg:{top:'#2b3a55',deco:'zip'}},
 cat:{n:'Orelhas de Gato',kind:'acc'},
 guild:{n:'Uniforme do Clube',kind:'outfit',cfg:{top:'#7b1e3a',deco:'v'}},
 star:{n:'Presilha de Estrela',kind:'acc'},
 armor:{n:'Armadura do Portal',kind:'outfit',cfg:{top:'#6b7489',deco:'armor'}},
 crown:{n:'Coroa da Torre',kind:'acc'}
};
const COS_ORDER=Object.keys(COSM);
const TITLES=['Leitor(a) Dedicado(a)','Voz da Torre','Vencedor(a) de Chefes','Mestre dos Phrasal Verbs','Lenda da Torre'];
const CARDS=CH.map((c,i)=>c.boss?{id:'b'+i,n:c.mon,kind:'boss',tint:MONC[c.mon],how:'Vença o chefe do capítulo '+(i+1)}:null).filter(Boolean).concat([
 {id:'r_rafa',n:'Rafa',kind:'rare',who:'rafa',tint:'#a8501f',how:'Baú de Ouro'},
 {id:'r_mina',n:'Mina',kind:'rare',who:'mina',tint:'#5a46b8',how:'Baú de Ouro'},
 {id:'r_jin',n:'Jin',kind:'rare',who:'jin',tint:'#1f5a47',how:'Baú de Ouro'},
 {id:'r_sys',n:'A Torre',kind:'rare',sys:true,tint:'#0b4a6e',how:'Baú de Ouro'}]);
const SYS_SVG=`<svg viewBox="0 0 120 150" aria-hidden="true"><rect x="16" y="44" width="88" height="70" rx="6" fill="#0b1b31" stroke="#62d6ff" stroke-width="2.5"/><path d="M26 58 H94" stroke="#62d6ff" stroke-width="2" opacity=".6"/><path d="M28 72 H80 M28 84 H88 M28 96 H66" stroke="#62d6ff" stroke-width="3.5" stroke-linecap="round" opacity=".85"/><circle cx="60" cy="28" r="9" fill="none" stroke="#62d6ff" stroke-width="2.5"/><path d="M56 25 Q60 21 64 25 Q64 29 60 30 L60 32" stroke="#62d6ff" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`;
const MISSIONS={
 ch2:{t:'Leia 2 capítulos',n:2},
 perfect:{t:'Gabarite 2 Testes do Portal',n:2},
 boss:{t:'Vença um chefe sem errar nenhuma pergunta',n:1},
 nopt:{t:'Leia um capítulo sem abrir nenhuma tradução',n:1},
 gloss:{t:'Busque 5 palavras no Glossário',n:5},
 review:{t:'Faça 2 revisões rápidas',n:2},
 listen:{t:'Ouça 15 falas dos personagens',n:15},
 train:{t:'Faça 2 treinos extras',n:2},
 speak10:{t:'Acerte 10 frases no microfone',n:10,mic:true},
 speak90:{t:'Fale 5 frases com 90% ou mais',n:5,mic:true}
};
const TIERS=[
 {k:'bronze',n:'Bronze',c:'#c98a4b',d:'Treine em 2 dias',p:'Prêmio: item para o seu avatar'},
 {k:'silver',n:'Prata',c:'#c3cbd9',d:'Cumpra sua meta',p:'Prêmio: capítulo extra da história'},
 {k:'gold',n:'Ouro',c:'#f2c94c',d:'Meta + as 3 missões',p:'Prêmio: carta rara e um título'}
];
const DOW=['seg','ter','qua','qui','sex','sáb','dom'];

/* ===================== BAÚ DO PORTAL: motor ===================== */
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function mondayOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-(x.getDay()+6)%7);return x;}
function weekId(d){return ymd(mondayOf(d||new Date()));}
function todayKey(){return ymd(new Date());}
function monthKey(){return todayKey().slice(0,7);}
function isSunday(){return new Date().getDay()===0;}
function weeksBetween(a,b){const pa=a.split('-').map(Number),pb=b.split('-').map(Number);return Math.round((new Date(pb[0],pb[1]-1,pb[2])-new Date(pa[0],pa[1]-1,pa[2]))/(7*864e5));}
function hashStr(x){let h=2166136261;for(let i=0;i<x.length;i++){h^=x.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function pickMissions(seed,exclude){
 const keys=Object.keys(MISSIONS).filter(k=>!(MISSIONS[k].mic&&(!SR||A.blocked))&&!(exclude||[]).includes(k));
 let h=hashStr(seed); const out=[];
 while(out.length<3&&keys.length){out.push(keys.splice(h%keys.length,1)[0]);h=Math.imul(h^0x9e3779b9,2654435761)>>>0;}
 return out;
}
function newWeek(id){return {id,days:{},dayPhr:{},missions:pickMissions(id),mp:{},claimed:{},nt:{},reroll:false,sunday:false,gq:[],stats:{ch:0,phr:0,boss:0,rev:0}};}
function daysDone(w){return Object.keys(w.days).length;}
function missionsDone(w){return w.missions.filter(k=>(w.mp[k]||0)>=MISSIONS[k].n).length;}
function tierReached(k,w){const d=daysDone(w),g=S.goal||4;if(k==='bronze')return d>=2;if(k==='silver')return d>=g;return d>=g&&missionsDone(w)===w.missions.length;}
function tierProgress(k,w){const d=daysDone(w),g=S.goal||4;if(k==='bronze')return Math.min(d,2)+'/2 dias';if(k==='silver')return Math.min(d,g)+'/'+g+' dias';return missionsDone(w)+'/3 missões';}
function rollWeek(){
 const id=weekId();
 if(!S.week){S.week=newWeek(id);save();return;}
 if(S.week.id===id) return;
 const w=S.week, days=daysDone(w), goal=S.goal||4, goalMet=days>=goal;
 const auto=[]; TIERS.forEach(t=>{if(!w.claimed[t.k]&&tierReached(t.k,w)) auto.push(grantTier(t.k,w));});
 const gap=Math.max(1,weeksBetween(w.id,id)), missed=(goalMet?0:1)+(gap-1);
 let streak=S.streak||0, shieldUsed=false;
 if(missed===0) streak++;
 else if(missed===1&&streak>0&&S.shieldMonth!==monthKey()){S.shieldMonth=monthKey();shieldUsed=true;}
 else streak=0;
 S.streak=streak;
 S.lastWeek={id:w.id,days,goal,goalMet,stats:w.stats,missionsDone:missionsDone(w),auto,shieldUsed,streak};
 S.week=newWeek(id); save();
}
let TQ=[],TT=null;
function toast(msg){TQ.push(msg);if(!TT) nextToast();}
function nextToast(){
 let el=document.getElementById('toast');
 const m=TQ.shift();
 if(!m){if(el) el.hidden=true;TT=null;return;}
 if(!el){el=document.createElement('div');el.id='toast';el.className='toast';el.setAttribute('role','status');document.body.appendChild(el);}
 el.textContent=m; el.hidden=false; TT=setTimeout(nextToast,2800);
}
function checkTiers(){const w=S.week;TIERS.forEach(t=>{if(!w.claimed[t.k]&&!w.nt[t.k]&&tierReached(t.k,w)){w.nt[t.k]=1;toast('Baú '+t.n+' liberado! Abra no Baú do Portal.');}});}
function markDay(){const k=todayKey();if(!S.week.days[k]){S.week.days[k]=1;toast('Dia de treino registrado no Baú do Portal');}checkTiers();}
function prog(k){const w=S.week;if(!w.missions.includes(k))return;const b=w.mp[k]||0;w.mp[k]=b+1;if(b<MISSIONS[k].n&&b+1>=MISSIONS[k].n)toast('Missão concluída: '+MISSIONS[k].t);checkTiers();}
function nextCosmetic(){return COS_ORDER.find(k=>!(S.cos||[]).includes(k))||null;}
function nextBonus(){for(let i=0;i<BONUS.length;i++) if(!(S.bonus||[]).includes(100+i)) return 100+i; return null;}
function nextRare(){const r=CARDS.find(c=>c.kind==='rare'&&!(S.cards||{})[c.id]);return r?r.id:null;}
function nextTitle(){const t=TITLES.findIndex((_,i)=>!(S.titles||[]).includes(i));return t<0?null:t;}
function applyReward(r){
 S.cos=S.cos||[];S.bonus=S.bonus||[];S.cards=S.cards||{};S.titles=S.titles||[];
 if(r.type==='cos'&&!S.cos.includes(r.id)) S.cos.push(r.id);
 if(r.type==='story'&&!S.bonus.includes(r.id)) S.bonus.push(r.id);
 if(r.type==='gold'){if(r.card)S.cards[r.card]=1;if(r.title!=null&&!S.titles.includes(r.title))S.titles.push(r.title);}
 if(r.type==='xp') S.xp+=r.n;
}
function grantTier(k,w){
 let r;
 if(k==='bronze'){const c=nextCosmetic();r=c?{type:'cos',id:c}:{type:'xp',n:30};}
 else if(k==='silver'){const b=nextBonus();if(b!=null)r={type:'story',id:b};else{const c=nextCosmetic();r=c?{type:'cos',id:c}:{type:'xp',n:50};}}
 else{const card=nextRare(),ti=nextTitle();r=(card==null&&ti==null)?{type:'xp',n:80}:{type:'gold',card,title:ti};}
 applyReward(r); w.claimed[k]=r; return r;
}
function cardById(id){return CARDS.find(c=>c.id===id);}
function rewardName(r){
 if(!r) return '';
 if(r.type==='cos') return COSM[r.id].n;
 if(r.type==='story') return 'História extra: '+BONUS[r.id-100].t;
 if(r.type==='gold') return [r.card?'Carta '+cardById(r.card).n:null,r.title!=null?'Título “'+TITLES[r.title]+'”':null].filter(Boolean).join(' + ');
 return '+'+r.n+' XP';
}
function titleLabel(){return (S.title!=null&&(S.titles||[]).includes(S.title)?TITLES[S.title]:'Explorador(a)').toUpperCase();}

/* ===================== ESTADO ===================== */
function defaultS(){return {done:{},xp:0,showAll:false,slow:false,voice:'',spoken:{},name:'',avatar:0,zoom:1,look:'auto',calm:false,welcomed:false,start:0,placed:null,goal:4,week:null,lastWeek:null,recapSeen:'',streak:0,shieldMonth:'',cos:[],equip:{},cards:{},titles:[],title:null,bonus:[],bdone:{},mistakes:[],srs:{},audioMode:'rec',asr:'auto',fon:false,avSex:'',pron:{n:0,sum:0,w:{},t:{},tw:{}},clear:false,karaoke:true,repeat:false,contrast:false,nudgeOff:false,ear:{n:0,ok:0,c:{}},_ts:0};}
let S=defaultS();
try{
 const raw=localStorage.getItem('torre-ingles-v2');
 if(raw){S=Object.assign(S,JSON.parse(raw));}
 else{
  const old=localStorage.getItem('torre-ingles-v1');
  if(old){const o=JSON.parse(old);const map=[0,1,3,6,12,13,16,17,19,21,28,35];S.xp=o.xp||0;S.showAll=!!o.showAll;Object.keys(o.done||{}).forEach(k=>{if(map[k]!=null)S.done[map[k]]=o.done[k];});}
 }
}catch(e){}
function save(){S._ts=Date.now();try{localStorage.setItem('torre-ingles-v2',JSON.stringify(S));}catch(e){}cloudPush();}
const doneCount=()=>Object.keys(S.done).length;
const level=()=>1+Math.floor(S.xp/80);
function rank(){const f=doneCount()/CH.length;return f>=1?'Lenda':f>=.85?'Mestre':f>=.68?'Experiente':f>=.5?'Avançado':f>=.33?'Intermediário':f>=.16?'Aprendiz':'Iniciante';}
function nextIdx(){const st=S.start||0;for(let i=st;i<CH.length;i++) if(!S.done[i]) return i;for(let i=0;i<st;i++) if(!S.done[i]) return i;return CH.length-1;}
const ZOOMS=[[.9,'A-'],[1,'A'],[1.15,'A+'],[1.3,'A++']];
function applyLook(){
 const r=document.documentElement;
 if(S.look==='light'||S.look==='dark') r.setAttribute('data-look',S.look); else r.removeAttribute('data-look');
 r.style.setProperty('--zoom',String(S.zoom||1));
 if(S.calm) r.setAttribute('data-calm',''); else r.removeAttribute('data-calm');
 if(S.contrast) r.setAttribute('data-contrast',''); else r.removeAttribute('data-contrast');
}
function syncComfort(){
 document.querySelectorAll('button[data-zoom]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.zoom===(S.zoom||1))));
 document.querySelectorAll('button[data-look]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.look===(S.look||'auto'))));
 document.querySelectorAll('button[data-calm]').forEach(b=>{b.setAttribute('aria-pressed',String(!!S.calm));b.textContent=S.calm?'Ligado':'Desligado';});
}

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ICON={
 gear:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
 x:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
 mic:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>`,
 speak:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>`,
 back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`
};
const canSpeak=('speechSynthesis' in window);
/* ===================== ÁUDIO: voz + reconhecimento no aparelho ===================== */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition||null;
const SR_OPTS={langs:['en-US'],processLocally:true};
const A={status:SR?'checking':'none',blocked:false,installing:false,installFailed:false,rec:null,active:null};
const BLOCKED_MSG='O microfone está bloqueado nesta janela. Abra o curso no Chrome e permita o microfone para treinar a fala. Ouvir as frases continua funcionando.';
let voices=[];
/* Limpa o texto para a voz: tira setas, barras, notas em português e maiúsculas que viram soletração */
function ttsText(t){
 let x=String(t).replace(/["“”]/g,'').replace(/\bThx\b/g,'Thanks');
 x=x.replace(/\s*\+[^,.!?\/→]*/g,'');            // "+ verbo-ING", "+ particípio", "+ TO"
 x=x.replace(/\(([^)]*)\)/g,', $1,');              // (I am) → pausa
 x=x.replace(/\s*→\s*/g,', ').replace(/\s+\/\s+/g,', ');
 x=x.replace(/\.{3}|…/g,', ');
 x=x.replace(/(\w)-([A-Z]{2,})/g,'$1$2').replace(/[A-Z]{2,}/g,m=>/^(UK|USA|US|TV|OK|ID|PC|DJ|CEO|ATM)$/.test(m)?m:m.toLowerCase());
 x=x.replace(/([.!?])\s*,/g,'$1').replace(/(\s*,\s*)+/g,', ').replace(/\s*,\s*([.!?])/g,'$1').replace(/^[\s,]+|[\s,]+$/g,'');
 return x;
}
/* Vozes de brincadeira ou antigas, que pronunciam mal: nunca usar */
const NOVELTY=/\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|princess|bruce|agnes|vicki|victoria|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|hysterical|deranged)\b/i;
const FEM=/female|samantha|karen|moira|tessa|fiona|zira|aria|jenny|\bava\b|allison|susan|michelle|emma|libby|sonia|joanna|salli|kendra|kimberly|\bivy\b|serena|\bkate\b|veena|nicky|\bzoe\b|evie|catherine|hazel|linda|heather|ellie|clara|\bamy\b|\bjane\b|nancy|\bsara\b|joelle|noelle|martha|google us english$/i;
const MAL=/\bmale\b|daniel|\balex\b|david|\bmark\b|\bguy\b|\btom\b|aaron|arthur|ryan|christopher|\beric\b|roger|steffan|oliver|george|rishi|gordon|matthew|joey|justin|brian|russell|james|andrew|brandon|davis|jason|\btony\b|nathan|\bevan\b/i;
function gender(v){return FEM.test(v.name)?'f':MAL.test(v.name)?'m':'?';}
function vLang(v){return String(v.lang||'en-US').replace('_','-');}
function voiceScore(v){
 let s=0;
 if(/natural|neural|premium|enhanced|online/i.test(v.name)) s+=8;
 if(/^google/i.test(v.name)) s+=6;
 if(/samantha|\balex\b|aaron|nicky|\bava\b|allison|susan|\btom\b|\bevan\b|joelle|nathan|noelle|\bzoe\b|jenny|aria|\bguy\b|davis|\bjane\b|jason|nancy|\btony\b|\bsara\b|michelle|christopher|\beric\b|roger|steffan|daniel|serena|\bkate\b|oliver|arthur|martha|libby|sonia|ryan|zira|david|\bmark\b/i.test(v.name)) s+=3;
 if(/en-us/i.test(vLang(v))) s+=2;
 if(v.localService) s+=1;
 return s;
}
function usableVoices(){return voices.filter(v=>!NOVELTY.test(v.name));}
let CAST={};
function buildCast(){
 const all=usableVoices().sort((a,b)=>voiceScore(b)-voiceScore(a));
 const fixed=S.voice?voices.find(v=>v.name===S.voice):null;
 // Um sotaque só para todos: americano se houver, senão o da melhor voz
 const base=all.some(v=>/^en-us$/i.test(vLang(v)))?'en-us':(all[0]?vLang(all[0]).toLowerCase():'en-us');
 const pool=all.filter(v=>vLang(v).toLowerCase()===base);
 const best=fixed||pool[0]||all[0]||null;
 const good=v=>voiceScore(v)>=3&&!/en-in/i.test(vLang(v));
 let f=pool.filter(v=>gender(v)==='f'), m=pool.filter(v=>gender(v)==='m');
 if(!f.length) f=all.filter(v=>gender(v)==='f'&&good(v));
 if(!m.length) m=all.filter(v=>gender(v)==='m'&&good(v));
 if(fixed||(!f.length&&!m.length)){
  // Uma voz só: diferença pequena de tom, para não distorcer a pronúncia
  CAST={narr:{v:best,p:1,r:1},mina:{v:best,p:1.12,r:1},rafa:{v:best,p:1,r:1},rafa_f:{v:best,p:1.06,r:1},jin:{v:best,p:.92,r:1},monster:{v:best,p:.7,r:.88}};
  return;
 }
 const fm=f[0]||null, m1=m[0]||null, m2=m.find(v=>v!==m1)||m1;
 CAST={
  narr:{v:best,p:1,r:1},
  mina:{v:fm||best,p:fm?1:1.12,r:1},
  rafa:{v:m1||best,p:1,r:1},
  jin:{v:m2||best,p:m2&&m2!==m1?1:.92,r:1},
  monster:{v:m1||best,p:.7,r:.88}
 };
 const f2=f.find(v=>v!==fm);
 CAST.rafa_f={v:f2||fm||best,p:f2?1:(fm?.94:1.06),r:1};
 if(CAST.mina.v===CAST.rafa.v) CAST.mina.p=1.12;
 if(CAST.jin.v===CAST.rafa.v) CAST.jin.p=.92;
}
/* Olivia e Harry (Arco 10) falam com sotaque britânico; sem voz britânica, usam as vozes da Mina e do Jin com outro tom */
function castGB(){
 if(!CAST.narr) return;
 const gb=S.voice?[]:usableVoices().filter(v=>/^en-gb/i.test(vLang(v))).sort((a,b)=>voiceScore(b)-voiceScore(a));
 const f=gb.find(v=>gender(v)==='f'), m=gb.find(v=>gender(v)==='m'&&v!==f);
 CAST.olivia=f?{v:f,p:1,r:1}:{v:CAST.mina.v,p:(CAST.mina.p||1)*1.05,r:1};
 CAST.harry=m?{v:m,p:1,r:1}:{v:CAST.jin.v,p:(CAST.jin.p||1)*1.06,r:1};
}
function loadVoices(){
 if(!canSpeak) return;
 try{voices=speechSynthesis.getVoices().filter(v=>/^en([-_]|$)/i.test(v.lang));}catch(e){voices=[];}
 buildCast(); castGB(); renderAudio();
}
function localFallback(who){
 const loc=usableVoices().filter(v=>v.localService).sort((a,b)=>voiceScore(b)-voiceScore(a));
 const g=(who==='mina'||who==='olivia')?'f':(who==='rafa'||who==='jin'||who==='harry'||who==='monster')?'m':null;
 return (g&&loc.find(v=>gender(v)===g))||loc[0]||null;
}
/* Motor de fala: guarda as falas vivas (evita bug do Chrome), fala em partes curtas e troca de voz se a online travar */
let live=[], tStart=null, tWatch=null, tokenN=0;
function clearSpeaking(){document.querySelectorAll('.speaking').forEach(e=>e.classList.remove('speaking'));}
/* ===================== VOZES GRAVADAS (neurais) ===================== */
/* Cada capítulo tem um arquivo de áudio com todas as falas; index.json diz onde cada fala começa. */
const REC={man:null,ctx:null,bufs:{},raw:{},cur:null,failed:false};
try{fetch('audio/index.json').then(r=>r.ok?r.json():null).then(m=>{if(m&&m.k&&m.files){REC.man=m;renderAudio();if(cur!==null)recPrefetch(cur);}}).catch(()=>{});}catch(e){}
function recKey(t,who){
 const k=(who||'narr')+'|'+ttsText(t), nm=heroName();
 if(!REC.man||REC.man.k[k]||nm==='Rafa') return k;
 const k2=k.replace(new RegExp('\\b'+nm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'),'Rafa');
 return REC.man.k[k2]?k2:k;
}
function nameSplice(key,who){
 const nm=REC.man&&REC.man.nm; if(!nm||heroName()==='Rafa'||!/\bRafa\b/.test(key.split('|')[1]||'')) return null;
 const parts=nm.parts[key]; if(!parts) return null;
 const ne=(nm.names[who]||{})[nmNorm(heroName())]||null;
 return {parts,ne,who};
}
function playBuf(ctx,buf,st,du){
 return new Promise(res=>{try{const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);src.onended=()=>{if(REC.cur===src)REC.cur=null;res(true);};REC.cur=src;src.start(0,Math.max(0,st),du);}catch(err){res(false);}});
}
function speakName(who){
 return new Promise(res=>{
  if(!canSpeak) return res(true);
  try{if(!CAST.narr){buildCast();castGB();}const role=CAST[who]||CAST[who==='rafa_f'?'mina':'rafa']||CAST.narr||{};
   const u=new SpeechSynthesisUtterance(heroName());u.lang='en-US';if(role.v) u.voice=role.v;u.rate=(S.slow||S.clear?.8:.95);
   let done=false;const fin=()=>{if(!done){done=true;res(true);}};u.onend=fin;u.onerror=fin;setTimeout(fin,2500);speechSynthesis.speak(u);
  }catch(e){res(true);}
 });
}
async function recPlaySplice(sp,slow,tok){
 const ctx=recCtx(); if(!ctx) return false;
 const m=slow||S.clear?'s':'n', o=m==='s'?2:0;
 let pb,nb=null; try{pb=await recBuf(REC.man.files.nm_parts[m]);if(sp.ne) nb=await recBuf(REC.man.files['nm_'+sp.who+(sp.ne[4]?'_'+sp.ne[4]:'')][m]);}catch(err){return false;}
 if(tok!==tokenN) return true;
 if(ctx.state!=='running'){try{await ctx.resume();}catch(err){}}
 if(sp.parts[0]){if(!await playBuf(ctx,pb,sp.parts[0][o],sp.parts[0][o+1])) return false;}
 if(tok!==tokenN) return true;
 if(nb){if(!await playBuf(ctx,nb,sp.ne[o],sp.ne[o+1])) return false;} else await speakName(sp.who);
 if(tok!==tokenN) return true;
 if(sp.parts[1]){await new Promise(r=>setTimeout(r,60));if(!await playBuf(ctx,pb,sp.parts[1][o],sp.parts[1][o+1])) return false;}
 return true;
}
function recOn(){return !!REC.man&&!REC.failed&&S.audioMode!=='tts';}
function recHas(segs){return recOn()&&segs.length>0&&segs.every(x=>REC.man.k[recKey(x.t,x.who)]);}
function recCtx(){
 try{
  if(!REC.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C) return null;REC.ctx=new C();}
  if(REC.ctx.state!=='running') REC.ctx.resume().catch(()=>{});
  return REC.ctx;
 }catch(e){return null;}
}
function recFetch(url){if(!REC.raw[url]){REC.raw[url]=fetch(url).then(r=>{if(!r.ok) throw new Error('http');return r.arrayBuffer();});REC.raw[url].catch(()=>{delete REC.raw[url];});}return REC.raw[url];}
function recBuf(url){
 if(!REC.bufs[url]){
  const ctx=recCtx();
  REC.bufs[url]=recFetch(url).then(ab=>new Promise((res,rej)=>{const p=ctx.decodeAudioData(ab.slice(0),res,rej);if(p&&p.catch)p.catch(rej);}));
  REC.bufs[url].catch(()=>{delete REC.bufs[url];});
 }
 return REC.bufs[url];
}
function recGroup(i){return i>=100?'b'+(i-100):'c'+i;}
function recPrefetch(i){if(!recOn()) return;const f=REC.man.files[recGroup(i)];if(f) recFetch(f[S.slow?'s':'n']).catch(()=>{});}
function recStop(){if(REC.cur){try{REC.cur.stop();}catch(e){}REC.cur=null;}if(REC.kt) kClear();}
/* Legenda sincronizada: acende as palavras enquanto a voz fala */
function kWrap(el,text){
 if(!el) return null;
 const tts=ttsText(text).split(/\s+/).filter(Boolean), disp=el.textContent.trim().split(/\s+/).filter(Boolean);
 if(!tts.length||disp.length!==tts.length) return null;
 if(el.querySelectorAll('.kw').length!==disp.length) el.innerHTML=disp.map(w=>`<span class="kw">${esc(w)}</span>`).join(' ');
 return [...el.querySelectorAll('.kw')];
}
function kClear(){(REC.kt||[]).forEach(clearTimeout);REC.kt=[];document.querySelectorAll('.kw.on,.kw.seen').forEach(x=>x.classList.remove('on','seen'));}
function kSchedule(spans,blocks,rate){
 kClear();
 blocks.forEach(([t,d,a,b])=>{
  REC.kt.push(setTimeout(()=>{spans.forEach((sp,i)=>{if(i>=a&&i<=b){sp.classList.add('on');sp.classList.remove('seen');}else if(sp.classList.contains('on')){sp.classList.remove('on');sp.classList.add('seen');}});},Math.max(0,t*1000/rate)));
 });
}
function estBlocks(text,dur){
 const w=ttsText(text).split(/\s+/).filter(Boolean), L=w.reduce((x,y)=>x+y.length+1,0), span=Math.max(.2,dur-.18); let t=.06;
 return w.map((x,i)=>{const d=span*(x.length+1)/L;const r=[t,d,i,i];t+=d;return r;});
}
async function recPlay(segs,slow,tok,hl){
 const ctx=recCtx(); if(!ctx) return false;
 const reps=S.repeat&&segs.length===1?2:1;
 for(let rep=0;rep<reps;rep++){
  if(rep){await new Promise(r=>setTimeout(r,700));}
  for(const x of segs){
   if(tok!==tokenN) return true;
   const key=recKey(x.t,x.who), e=REC.man.k[key];
   const spl=nameSplice(key,x.who);
   if(spl){const ok=await recPlaySplice(spl,slow,tok);if(!ok) return false;continue;}
   const mode=S.clear&&e[5]?'c':(slow?'s':'n'), url=REC.man.files[e[0]][mode];
   if(!url) return false;
   const st=mode==='c'?e[5]:mode==='s'?e[3]:e[1], du=mode==='c'?e[6]:mode==='s'?e[4]:e[2];
   let buf; try{buf=await recBuf(url);}catch(err){return false;}
   if(tok!==tokenN) return true;
   if(ctx.state!=='running'){try{await ctx.resume();}catch(err){}}
   const spans=S.karaoke&&hl&&segs.length===1?kWrap(hl,x.t):null;
   const ok=await new Promise(res=>{
    try{
     const src=ctx.createBufferSource(); src.buffer=buf; src.connect(ctx.destination);
     src.onended=()=>{if(REC.cur===src) REC.cur=null;res(true);};
     REC.cur=src; src.start(0,Math.max(0,st),du);
     if(spans){const bl=mode==='c'&&REC.man.ch&&REC.man.ch[key]?REC.man.ch[key]:estBlocks(x.t,du);kSchedule(spans,bl,1);}
    }catch(err){res(false);}
   });
   if(spans) REC.kt.push(setTimeout(kClear,250));
   if(!ok) return false;
  }
 }
 return true;
}
async function recPlayWord(w,tok){
 const ctx=recCtx(); const e=REC.man&&REC.man.w&&REC.man.w[w]; if(!ctx||!e) return false;
 let buf; try{buf=await recBuf(e[2]?REC.man.files[e[2]].n:REC.man.files.misc.c);}catch(err){return false;}
 if(tok!==tokenN) return true;
 if(ctx.state!=='running'){try{await ctx.resume();}catch(err){}}
 return await new Promise(res=>{try{const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);src.onended=()=>{if(REC.cur===src)REC.cur=null;res(true);};REC.cur=src;src.start(0,Math.max(0,e[0]),e[1]);}catch(err){res(false);}});
}
function sayWords(list){
 const tok=++tokenN; recStop(); try{if(canSpeak) speechSynthesis.cancel();}catch(e){}
 recCtx();
 (async()=>{for(let i=0;i<list.length;i++){if(tok!==tokenN) return;if(i) await new Promise(r=>setTimeout(r,650));const ok=recOn()&&await recPlayWord(list[i],tok);if(!ok){ttsSeq([{t:list[i],who:'narr'}],null);return;}}})();
}
function speakSeq(segs,btn){
 segs=segs.filter(x=>x&&x.t).map(x=>({t:x.t,who:voiceWho(x.who)}));
 if(recHas(segs)){
  const tok=++tokenN, slow=!!S.slow;
  clearTimeout(tStart); clearTimeout(tWatch);
  try{if(canSpeak) speechSynthesis.cancel();}catch(e){}
  recStop(); clearSpeaking(); if(btn) btn.classList.add('speaking');
  recCtx();
  const hl=btn?((btn.closest('.bubble')||{}).querySelector?.('.en')||null):null;
  recPlay(segs,slow,tok,hl).then(ok=>{
   if(tok!==tokenN) return;
   if(btn) btn.classList.remove('speaking');
   if(!ok){REC.failed=true;renderAudio();ttsSeq(segs,btn);}
  });
  return;
 }
 ttsSeq(segs,btn);
}
const CL_FUNC=new Set('and but or so because to with in on at for of from that which who when if than as about into after before under over near behind between during without until while'.split(' '));
function clearText(t){
 const w=t.split(/\s+/); let out=[],n=0;
 w.forEach((x,i)=>{const lw=x.toLowerCase().replace(/[^a-z']/g,'');if(n>=2&&CL_FUNC.has(lw)){out[out.length-1]+=',';n=0;}out.push(x);n++;if(/[,.!?;:]$/.test(x)) n=0;else if(n>=4&&i<w.length-1){out[out.length-1]+=',';n=0;}});
 return out.join(' ').replace(/,([,.!?;:])/g,'$1');
}
function ttsSeq(segs,btn){
 recStop();
 if(!canSpeak) return;
 segs=segs.map(s=>({t:S.clear?clearText(ttsText(s.t)):ttsText(s.t),who:s.who||'narr'})).filter(s=>s.t);
 if(!segs.length) return;
 if(!CAST.narr) buildCast();
 clearTimeout(tStart); clearTimeout(tWatch);
 const busy=speechSynthesis.speaking||speechSynthesis.pending;
 try{speechSynthesis.cancel();}catch(e){}
 clearSpeaking(); live=[];
 const tok=++tokenN;
 if(btn) btn.classList.add('speaking');
 const go=()=>runSeq(segs,btn,tok,false);
 if(busy) tStart=setTimeout(go,90); else go();   // primeira fala síncrona (iPhone exige)
}
function runSeq(segs,btn,tok,fallback){
 if(tok!==tokenN) return;
 const parts=[];
 segs.forEach(s=>{(s.t.length>180?(s.t.match(/[^.!?]+[.!?]*\s*/g)||[s.t]):[s.t]).forEach(p=>{p=p.trim();if(p)parts.push({t:p,who:s.who});});});
 let started=false, firstNet=false;
 const off=()=>{if(tok===tokenN){clearTimeout(tWatch);if(btn)btn.classList.remove('speaking');live=[];}};
 parts.forEach((pt,k)=>{
  const role=CAST[pt.who]||CAST.narr||{v:null,p:1,r:1};
  const v=fallback?localFallback(pt.who):role.v;
  const u=new SpeechSynthesisUtterance(pt.t);
  if(v){u.voice=v;u.lang=vLang(v);}else u.lang='en-US';
  u.pitch=role.p; u.rate=(S.clear?.72:S.slow?.7:.95)*role.r; u.volume=1;
  if(k===0&&v&&!v.localService) firstNet=true;
  u.onstart=()=>{started=true;clearTimeout(tWatch);};
  if(k===parts.length-1) u.onend=off;
  u.onerror=ev=>{
   if(tok!==tokenN||ev.error==='interrupted'||ev.error==='canceled') return;
   if(!fallback&&!started){tokenN++;const nt=tokenN;try{speechSynthesis.cancel();}catch(e){}live=[];setTimeout(()=>runSeq(segs,btn,nt,true),60);}
   else off();
  };
  live.push(u);
 });
 try{speechSynthesis.resume();}catch(e){}
 live.forEach(u=>speechSynthesis.speak(u));
 if(!fallback&&firstNet) tWatch=setTimeout(()=>{
  if(tok===tokenN&&!started){tokenN++;const nt=tokenN;try{speechSynthesis.cancel();}catch(e){}live=[];runSeq(segs,btn,nt,true);}
 },2200);
}
function speak(t,btn,who){speakSeq([{t,who}],btn);}
if(canSpeak){try{speechSynthesis.addEventListener('voiceschanged',loadVoices);}catch(e){} loadVoices(); setTimeout(loadVoices,400);}

/* Disponibilidade do modelo no aparelho (Web Speech API: SpeechRecognition.available / install) */
async function checkSR(){
 if(!SR){A.status='none';renderAudio();return;}
 let st=null;
 try{if(typeof SR.available==='function') st=await SR.available(SR_OPTS);}catch(e){}
 if(st==null){try{if(typeof SR.availableOnDevice==='function') st=await SR.availableOnDevice('en-US');}catch(e){}}
 A.status=st||'cloud';
 renderAudio();
}
async function installSR(){
 if(!SR||A.installing) return false;
 A.installing=true; A.installFailed=false; A.status='downloading'; renderAudio();
 let ok=false;
 try{
  if(typeof SR.install==='function') ok=await SR.install(SR_OPTS);
  else if(typeof SR.installOnDevice==='function') ok=await SR.installOnDevice('en-US');
 }catch(e){ok=false;}
 A.installing=false;
 await checkSR();
 if(!ok&&A.status!=='available'){A.installFailed=true;renderAudio();}
 return A.status==='available';
}

/* ===================== WHISPER (whisper.cpp em WebAssembly, no aparelho) ===================== */
const WH={st:'checking',worker:null,pct:0,cached:false,ids:0,cb:{},base:'whisper/'};
function whCan(){try{return typeof WebAssembly==='object'&&typeof Worker==='function'&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)&&location.protocol!=='file:';}catch(e){return false;}}
function whWorker(){
 if(WH.worker) return WH.worker;
 const w=new Worker(WH.base+'whisper-worker.js');
 w.onmessage=ev=>{const m=ev.data;
  if(m.type==='progress'){WH.pct=m.pct;WH.st='loading';whStatusUI();}
  else if(m.type==='ready'){WH.st='ready';WH.cached=true;whStatusUI();(WH.cb.init||[]).forEach(f=>f(true));WH.cb.init=[];}
  else if(m.type==='cached'){WH.cached=m.ok;if(WH.st==='checking') WH.st=m.ok?'cached':'idle';renderAudio();}
  else if(m.type==='result'){const f=WH.cb[m.id];delete WH.cb[m.id];if(f) f(m);}
  else if(m.type==='error'){if(m.id&&WH.cb[m.id]){const f=WH.cb[m.id];delete WH.cb[m.id];f({error:m.msg});}else{WH.st='fail';whStatusUI();(WH.cb.init||[]).forEach(f=>f(false));WH.cb.init=[];}}
 };
 w.onerror=()=>{WH.st='off';WH.worker=null;renderAudio();(WH.cb.init||[]).forEach(f=>f(false));WH.cb.init=[];};
 WH.worker=w; return w;
}
async function whProbe(){
 if(!whCan()){WH.st='off';renderAudio();return;}
 try{const r=await fetch(WH.base+'whisper.wasm',{method:'HEAD',cache:'no-store'});if(!r.ok) throw 0;}catch(e){WH.st='off';renderAudio();return;}
 try{whWorker().postMessage({type:'cached',base:''});}catch(e){WH.st='off';renderAudio();}
}
function whInit(){
 if(WH.st==='ready') return Promise.resolve(true);
 return new Promise(res=>{(WH.cb.init=WH.cb.init||[]).push(res);if(WH.st!=='loading'){WH.st='loading';whStatusUI();}try{whWorker().postMessage({type:'init',base:''});}catch(e){res(false);}});
}
function whRun(pcm,audioCtx){
 return new Promise(res=>{const id=++WH.ids;WH.cb[id]=res;try{whWorker().postMessage({type:'run',id,pcm,audioCtx,base:''},[pcm.buffer]);}catch(e){delete WH.cb[id];res({error:'post'});}});
}
function whStatusUI(){renderAudio();const o=document.querySelector('.pron.whload');if(o&&WH.st==='loading') o.innerHTML=`Preparando o reconhecimento de voz no aparelho: ${WH.pct}%<br><small>São 32 MB, baixados só uma vez. Depois funciona sem internet.</small>`;}
function useWhisper(){
 if(WH.st==='off'||WH.st==='fail') return false;
 if(fnOn()) return true;
 if(S.asr==='browser'&&SR) return false;
 if(S.asr==='whisper') return true;
 return !SR||WH.cached||WH.st==='ready'||A.blocked||A.status==='none'||A.status==='cloud'||A.status==='unavailable';
}
/* ===================== PRONÚNCIA SOM POR SOM (modelo de fonemas wav2vec2, no aparelho) ===================== */
/* Opcional: baixa 90 MB uma vez. Confere os sons que mais dão problema para quem fala português. */
const FN={st:'checking',worker:null,pct:0,cached:false,ids:0,cb:{},base:'fonemas/'};
function fnWorker(){
 if(FN.worker) return FN.worker;
 const w=new Worker(FN.base+'fonemas-worker.js');
 w.onmessage=ev=>{const m=ev.data;
  if(m.type==='progress'){FN.pct=m.pct;FN.st='loading';fnStatusUI();}
  else if(m.type==='ready'){FN.st='ready';FN.cached=true;fnStatusUI();(FN.cb.init||[]).forEach(f=>f(true));FN.cb.init=[];}
  else if(m.type==='cached'){FN.cached=m.ok;if(FN.st==='checking') FN.st=m.ok?'cached':'idle';renderAudio();}
  else if(m.type==='result'){const f=FN.cb[m.id];delete FN.cb[m.id];if(f) f(m);}
  else if(m.type==='error'){if(m.id&&FN.cb[m.id]){const f=FN.cb[m.id];delete FN.cb[m.id];f({error:m.msg});}else{FN.st='fail';fnStatusUI();(FN.cb.init||[]).forEach(f=>f(false));FN.cb.init=[];}}
 };
 w.onerror=()=>{FN.st='off';FN.worker=null;renderAudio();(FN.cb.init||[]).forEach(f=>f(false));FN.cb.init=[];};
 FN.worker=w; return w;
}
async function fnProbe(){
 if(!whCan()){FN.st='off';renderAudio();return;}
 try{const r=await fetch(FN.base+'fonemas.wasm',{method:'HEAD',cache:'no-store'});if(!r.ok) throw 0;}catch(e){FN.st='off';renderAudio();return;}
 try{fnWorker().postMessage({type:'cached'});}catch(e){FN.st='off';renderAudio();}
}
function fnInit(){
 if(FN.st==='ready') return Promise.resolve(true);
 return new Promise(res=>{(FN.cb.init=FN.cb.init||[]).push(res);if(FN.st!=='loading'){FN.st='loading';fnStatusUI();}try{fnWorker().postMessage({type:'init'});}catch(e){res(false);}});
}
function fnOn(){return !!S.fon&&FN.st!=='off'&&FN.st!=='fail'&&WH.st!=='off'&&WH.st!=='fail';}
function fnPronto(){return FN.st==='ready'||FN.cached;}
/* mesma normalização de tools/fonemas/g2p.py; o nome do aluno volta a ser "Rafa" */
function fnKey(t){
 const nm=heroName(); let x=String(t);
 if(nm!=='Rafa') x=x.replace(new RegExp('\\b'+nm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','g'),'Rafa');
 return x.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]+/g,' ').trim().split(/\s+/).filter(Boolean).join(' ');
}
function fnRun(pcm,target){
 return new Promise(res=>{const id=++FN.ids;FN.cb[id]=m=>res(m&&!m.error?m.r:null);try{fnWorker().postMessage({type:'run',id,pcm,key:fnKey(target)},[pcm.buffer]);}catch(e){delete FN.cb[id];res(null);}});
}
function fnText(){
 const m={checking:'Verificando...',idle:'Confere cada som da sua fala (TH, V, W, H, R, vogais curtas e longas...) e mostra qual saiu diferente. Baixa 90 MB uma vez e depois funciona sem internet. Usa também o Whisper.',cached:'Pronta no aparelho. Funciona até sem internet.',ready:'Pronta no aparelho. Funciona até sem internet.',loading:'Baixando o modelo de sons: '+FN.pct+'%',fail:'Não deu para preparar agora. Tente de novo mais tarde.'};
 return m[FN.st]||'';
}
function fnStatusUI(){renderAudio();}
const SOM={'θ':'TH','ð':'TH',s:'S',t:'T',f:'F',d:'D',z:'Z',v:'V',b:'B',w:'W',h:'H','ʁ':'R do português',x:'R do português','χ':'R do português','ŋ':'NG',n:'N','iː':'I longo','ɪ':'I curto','uː':'U longo','ʊ':'U curto','æ':'A de cat','ɛ':'É de bed','eɪ':'EI','ʌ':'A de cup','ɔ':'Ó',o:'Ô','ɹ':'R inglês','tʃ':'TCH','dʒ':'DJ',l:'L',u:'U'};
/* junta o resultado dos sons ao resultado das palavras: dicas, palavras marcadas e a nota de sons */
function fnMerge(g,fr,target){
 if(!fr||!fr.checados) return g;
 const map=[]; g.toks.forEach((t,i)=>{const k=fnKey(t);if(k) k.split(' ').forEach(()=>map.push(i));});
 const own=map.length===fr.palavras.length?map:null, keyw=fnKey(target).split(' ');
 const snd=g.toks.map(()=>false), notas=[], tips={};
 g.tips.forEach(t=>{tips[t.k]=t;});
 const addTip=(k,w)=>{tips[k]=tips[k]||{k,words:[]};if(w&&!tips[k].words.includes(w)) tips[k].words.push(w);};
 fr.palavras.forEach((p,i)=>{
  const ti=own?own[i]:null, wtxt=ti!=null?g.toks[ti].replace(/^[^A-Za-z']+|[^A-Za-z']+$/g,''):keyw[i];
  if(ti!=null&&!g.ok[ti]) return;        /* a palavra já foi marcada como errada: não repete */
  p.erros.forEach(e=>{
   if(ti!=null) snd[ti]=true; addTip(e.dica,wtxt.toLowerCase());
   notas.push(`<b>${esc(wtxt)}</b>: ${e.como?`o ${SOM[e.ph]||e.ph} saiu parecido com ${SOM[e.como]||e.como}`:`faltou o ${SOM[e.ph]||e.ph}`}`);
  });
  if(p.extra){if(ti!=null) snd[ti]=true; addTip(p.extra.dica,wtxt.toLowerCase()); notas.push(`<b>${esc(wtxt)}</b>: ${p.extra.onde==='antes'?'entrou uma vogal antes do S':'entrou uma vogal no final'}`);}
 });
 const order=['th','thv','v','w','h','lr','ing','vow','vow2','tch','sc','epi','lfin','ed','s','fin','small','flu','fast','clr','gen'];
 g.tips=Object.values(tips).sort((a,b)=>order.indexOf(a.k)-order.indexOf(b.k));
 g.snd=snd; g.sndNotas=notas; g.sons=Math.round(fr.certos/fr.checados*100);
 return g;
}
/* Grava a fala com detecção de silêncio e converte para 16 kHz */
async function whCapture(onLevel,ctl){
 const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}});
 const C=window.AudioContext||window.webkitAudioContext, ac=new C(); if(ac.state!=='running') try{await ac.resume();}catch(e){}
 const src=ac.createMediaStreamSource(stream), sp=ac.createScriptProcessor(4096,1,1), mute=ac.createGain(); mute.gain.value=0;
 const chunks=[]; let floor=0, nF=0, speechAt=-1, lastLoud=-1, t=0; const sr=ac.sampleRate;
 const cleanup=()=>{try{sp.disconnect();src.disconnect();mute.disconnect();}catch(e){}stream.getTracks().forEach(x=>x.stop());try{ac.close();}catch(e){}};
 const done=await new Promise(res=>{
  ctl.stop=()=>res('manual'); ctl.cancel=()=>res('cancel');
  sp.onaudioprocess=ev=>{
   const d=ev.inputBuffer.getChannelData(0); chunks.push(new Float32Array(d));
   let s=0; for(let i=0;i<d.length;i++) s+=d[i]*d[i]; const rms=Math.sqrt(s/d.length); const dur=d.length/sr; t+=dur;
   if(t<.35){floor=(floor*nF+rms)/(nF+1);nF++;return;}
   const thr=Math.max(.012,floor*3.2); onLevel&&onLevel(Math.min(1,rms/(thr*3)));
   if(rms>thr){if(speechAt<0) speechAt=t;lastLoud=t;}
   if(speechAt>=0&&t-lastLoud>1.0) res('silence');
   else if(speechAt<0&&t>7) res('nospeech');
   else if(t>12) res('max');
  };
  src.connect(sp); sp.connect(mute); mute.connect(ac.destination);
 });
 cleanup();
 if(done==='cancel') return null;
 if(speechAt<0&&done!=='manual') return {nospeech:true};
 const n=chunks.reduce((a,c)=>a+c.length,0), all=new Float32Array(n); let o=0; for(const c of chunks){all.set(c,o);o+=c.length;}
 const a0=Math.max(0,Math.floor(((speechAt<0?0.35:speechAt)-.3)*sr)), a1=Math.min(n,Math.ceil(((lastLoud<0?t:lastLoud)+.35)*sr));
 const cut=all.subarray(a0,a1), sec=cut.length/sr;
 const off=new OfflineAudioContext(1,Math.max(1,Math.ceil(sec*16000)),16000), b=off.createBuffer(1,cut.length,sr); b.copyToChannel(cut,0);
 const bs=off.createBufferSource(); bs.buffer=b; bs.connect(off.destination); bs.start(); const r=await off.startRendering();
 return {pcm:new Float32Array(r.getChannelData(0)),speechSec:Math.max(.3,((lastLoud<0?t:lastLoud)-(speechAt<0?.35:speechAt)))};
}
async function whListen(bubble,target,out){
 const ctl={}; A.active=bubble; A.rec={abort:()=>ctl.cancel&&ctl.cancel()}; bubble.classList.add('listening');
 const mc=bubble.querySelector('.mic'); if(mc) mc.setAttribute('aria-pressed','true');
 if(WH.st!=='ready'){showPron(out,'info whload','Preparando o reconhecimento de voz no aparelho...');const ok=await whInit();if(A.active!==bubble) return;if(!ok){stopUI();WH.st='fail';renderAudio();if(SR){startRec(bubble,target,out,A.status==='available');}else showPron(out,'warn','Não consegui preparar o reconhecimento de voz agora. Tente de novo mais tarde.');return;}}
 showPron(out,'info','Ouvindo... fale a frase em inglês. <span class="lvl-m"><i></i></span><br><small>Termina sozinho quando você parar de falar, ou toque no microfone.</small>');
 A.rec={abort:()=>ctl.cancel&&ctl.cancel(),stop:()=>ctl.stop&&ctl.stop()};
 let cap;
 try{cap=await whCapture(v=>{const i=out.querySelector('.lvl-m i');if(i) i.style.width=Math.round(v*100)+'%';},ctl);}
 catch(e){stopUI();if(e&&(e.name==='NotAllowedError'||e.name==='SecurityError')){A.blocked=true;renderAudio();showPron(out,'warn',BLOCKED_MSG);}else showPron(out,'warn','Nenhum microfone encontrado neste aparelho.');return;}
 if(!cap){return;}
 stopUI();
 if(cap.nospeech){showPron(out,'warn','Não ouvi nada. Toque no microfone e fale logo em seguida.');return;}
 const fon=fnOn()&&fnPronto();
 showPron(out,'info',fon?'Analisando sua fala e cada som...':'Analisando sua fala...');
 if(fnOn()&&!fnPronto()&&FN.st!=='loading') fnInit();
 const sec=cap.pcm.length/16000, actx=Math.min(1500,Math.max(384,Math.ceil(sec*50)+96));
 const fp=fon?fnRun(cap.pcm.slice(),target):Promise.resolve(null);
 const [r,fr]=await Promise.all([whRun(cap.pcm,actx),fp]);
 if(r.error||!r.text){showPron(out,'warn',r.error?'Não deu para analisar agora. Tente de novo.':'Não entendi. Fale um pouco mais alto e perto do microfone.');return;}
 const who=bubble.dataset.who||((bubble.querySelector('.say')||{}).dataset||{}).who||'narr';
 let nativeSec=null; if(REC.man){const e=REC.man.k[recKey(target,voiceWho(who))];if(e) nativeSec=Math.max(.4,e[2]-.1);}
 if(!nativeSec) nativeSec=.3+.3*target.split(/\s+/).length;
 const heard=r.text.replace(/\[[^\]]*\]|\([^)]*\)/g,'').trim();
 const g=fnMerge(analyzeSpeech(target,heard,r.conf||0,cap.speechSec,nativeSec),fr,target);
 renderGrade(bubble,out,g,'whisper');
}

/* Comparação da fala com a frase */
const CONTR=[[/\bcan't\b/g,'can not'],[/\bwon't\b/g,'will not'],[/n't\b/g,' not'],[/'re\b/g,' are'],[/'m\b/g,' am'],[/'ll\b/g,' will'],[/'ve\b/g,' have'],[/'d\b/g,' would'],[/'s\b/g,' is']];
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function numWords(n){
 if(n<20) return ONES[n];
 if(n<100) return TENS[Math.floor(n/10)]+(n%10?' '+ONES[n%10]:'');
 if(n<1000) return ONES[Math.floor(n/100)]+' hundred'+(n%100?' '+numWords(n%100):'');
 return String(n);
}
function norm(s){
 s=String(s).toLowerCase().replace(/[’‘]/g,"'");
 CONTR.forEach(([r,v])=>{s=s.replace(r,v);});
 s=s.replace(/\b\d{1,3}\b/g,m=>numWords(+m));
 return s.replace(/[^a-z0-9' ]+/g,' ').replace(/'/g,'').split(/\s+/).filter(Boolean);
}
function grade(target,heard){
 const toks=target.split(/\s+/).filter(Boolean);
 const tw=[],owner=[];
 toks.forEach((t,i)=>norm(t).forEach(w=>{tw.push(w);owner.push(i);}));
 const hw=norm(heard), n=tw.length, m=hw.length;
 const dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
 for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) dp[i][j]=tw[i]===hw[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 const hit=new Array(n).fill(false); let i=0,j=0;
 while(i<n&&j<m){ if(tw[i]===hw[j]){hit[i]=true;i++;j++;} else if(dp[i+1][j]>=dp[i][j+1]) i++; else j++; }
 const ok=toks.map(()=>true);
 tw.forEach((w,k)=>{if(!hit[k]) ok[owner[k]]=false;});
 return {score:n?Math.round(hit.filter(Boolean).length/n*100):0,toks,ok,heard};
}

/* ===================== AVALIAÇÃO DA FALA ===================== */
/* Alinha o que foi dito com a frase, acha os erros típicos de quem fala português e explica como corrigir. */
const VOICED_TH=new Set('the this that these those they them their theirs there then than though with without mother father brother other others together weather either neither whether bathe breathe clothes'.split(' '));
const SMALL_W=new Set('a an the to of and in on at is are am it for or but as'.split(' '));
const VOWEL_PAIRS=[['ship','sheep'],['live','leave'],['sit','seat'],['it','eat'],['fill','feel'],['bit','beat'],['full','fool'],['pull','pool'],['will','well'],['bed','bad'],['man','men'],['hat','hot'],['cup','cap'],['walk','work'],['beach','bitch'],['sheet','shit'],['three','tree'],['where','were'],['heart','hurt'],['bird','bed'],['want','won']];
const PTIPS={
 th:{t:'Som de TH',d:'Ponha a ponta da língua entre os dentes e solte o ar. Não troque por T, F ou S.'},
 thv:{t:'TH com voz',d:'Língua entre os dentes e a garganta vibrando, como um D bem suave. Em the, this e that não é "dê" nem "zê".'},
 ed:{t:'Final -ED',d:''},
 s:{t:'S no final',d:'Plural e verbo com he/she terminam com S que se ouve. Segure o S no fim da palavra.'},
 fin:{t:'Consoante final',d:'Termine a palavra: o T, D, K ou P final precisa aparecer, mesmo curtinho. E sem acrescentar "i" depois ("big", não "bigui").'},
 h:{t:'H no começo',d:'O H inglês é um sopro, parecido com o "r" de "rato". Só é mudo em hour, honest e honor.'},
 vow:{t:'Vogal curta e longa',d:'Ship tem /i/ curto e relaxado; sheep tem /ii/ longo, com sorriso. Trocar uma pela outra muda a palavra.'},
 v:{t:'Som de V',d:'Encoste os dentes de cima no lábio de baixo e vibre. Não feche os lábios como no B.'},
 w:{t:'Som de W',d:'Comece com um biquinho de "u" e abra: "uórk". Não use o V.'},
 ing:{t:'Final -ING',d:'Termine com um som nasal no fundo da boca, sem falar "gui" no final.'},
 lr:{t:'L e R',d:'No L, a ponta da língua encosta atrás dos dentes de cima. No R inglês, a língua não encosta em nada e fica um pouco enrolada para trás.'},
 sc:{t:'S no começo da palavra',d:'Comece direto no S: "school", não "iscool". Nada de vogal antes do S.'},
 vow2:{t:'A e É do inglês',d:'Em cat, abra bem a boca, entre um A e um É. Em bed, é um É médio. Em cup, o A é curto e fechado, quase um "â". Trocar um pelo outro muda a palavra.'},
 tch:{t:'T e D antes de I',d:'Antes de I, o T e o D do inglês continuam T e D: team é "tiim", não "tchiim"; did é "did", não "djid".'},
 lfin:{t:'L no final',d:'O L final não vira U: em hotel e school, termine com a ponta da língua encostada atrás dos dentes de cima.'},
 epi:{t:'Sem vogal no final',d:'Termine na consoante: big, não "bigui"; book, não "buki". Segure o som final sem soltar um "i".'},
 small:{t:'Palavras pequenas',d:'The, a, to, of e and são rápidas, mas precisam aparecer. Cole cada uma na palavra seguinte: "to-the-park".'},
 flu:{t:'Ritmo',d:'Tente dizer a frase de uma vez, sem pausar entre as palavras. Ouça devagar, depois acompanhe a voz na velocidade normal.'},
 fast:{t:'Calma no ritmo',d:'Fale um pouco mais devagar e abra bem a boca em cada palavra.'},
 clr:{t:'Clareza',d:'Fale um pouco mais alto, perto do microfone, abrindo bem a boca.'},
 gen:{t:'Articulação',d:'Ouça devagar, repita a palavra separando as sílabas e depois junte tudo no ritmo normal.'}
};
function edSound(w){const st=w.slice(0,-2);if(/[td]$/.test(st)) return 'id';if(/(p|k|f|s|sh|ch|x|ss|c)$/.test(st)||/(ck|gh)$/.test(st)) return 't';return 'd';}
function edTip(w){const k=edSound(w);return k==='id'?`Em "${w}", o -ED vira uma sílaba a mais: /id/.`:`Em "${w}", o -ED é só um /${k}/ curtinho, sem criar sílaba nova.`;}
function tipFor(t,h){
 if(h==null&&SMALL_W.has(t)) return 'small';
 if(/th/.test(t)&&h!==t) return VOICED_TH.has(t)?'thv':'th';
 if(/ed$/.test(t)&&t.length>4&&(h==null||h===t.slice(0,-2)||h===t.slice(0,-1)||!/d$/.test(h))) return 'ed';
 if(/ing$/.test(t)&&(h==null||!/ing$/.test(h))&&t.length>4) return 'ing';
 if(h&&VOWEL_PAIRS.some(([a,b])=>(a===t&&b===h)||(b===t&&a===h))) return 'vow';
 if(h&&/s$/.test(t)&&h===t.slice(0,-1)) return 's';
 if(/^h/.test(t)&&!/^(hour|honest|honor|heir)/.test(t)&&h&&(h===t.slice(1)||h[0]!=='h')) return 'h';
 if(h&&/v/.test(t)&&/[bwf]/.test(h)&&lev(h.replace(/[bwf]/g,'v'),t)<=1) return 'v';
 if(h&&/^w/.test(t)&&/^v/.test(h)) return 'w';
 if(h&&t.startsWith(h)&&t.length-h.length<=2&&/[tdkpgb]$/.test(t)) return 'fin';
 if(h==null&&SMALL_W.has(t)) return 'small';
 return 'gen';
}
const SPELL_EQ={okay:'ok',grey:'gray',colour:'color',favourite:'favorite',centre:'center',theatre:'theater',mum:'mom'};
function canonW(w){w=SPELL_EQ[w]||w;return w.replace(/z/g,'s').replace(/(.)\1/g,'$1');}
function analyzeSpeech(target,heard,conf,userSec,nativeSec){
 const HN=canonW(nmNorm(heroName()).replace(/[^a-z']/g,'')), EQ=(a,b)=>canonW(a)===canonW(b)||canonW(a)===HN;
 const toks=target.split(/\s+/).filter(Boolean), tw=[], owner=[];
 toks.forEach((t,i)=>norm(t).forEach(w=>{tw.push(w);owner.push(i);}));
 const hw=norm(heard), n=tw.length, m=hw.length;
 const D=Array.from({length:n+1},(_,i)=>{const r=new Array(m+1).fill(0);r[0]=i;return r;});
 for(let j=0;j<=m;j++) D[0][j]=j;
 for(let i=1;i<=n;i++) for(let j=1;j<=m;j++) D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+(EQ(tw[i-1],hw[j-1])?0:1));
 const ops=[]; let i=n,j=m;
 while(i>0||j>0){
  if(i>0&&j>0&&D[i][j]===D[i-1][j-1]+(EQ(tw[i-1],hw[j-1])?0:1)){ops.push([EQ(tw[i-1],hw[j-1])?'ok':'sub',i-1,j-1]);i--;j--;}
  else if(i>0&&D[i][j]===D[i-1][j]+1){ops.push(['del',i-1,null]);i--;}
  else {ops.push(['ins',null,j-1]);j--;}
 }
 ops.reverse();
 const hit=new Array(n).fill(false), tips={};
 const addTip=(k,w)=>{tips[k]=tips[k]||{k,words:[]};if(w&&!tips[k].words.includes(w)) tips[k].words.push(w);};
 ops.forEach((o,x)=>{
  if(o[0]==='ok') hit[o[1]]=true;
  else if(o[0]==='sub'||o[0]==='del') addTip(tipFor(tw[o[1]],o[0]==='sub'?hw[o[2]]:null),tw[o[1]]);
  else if(o[0]==='ins'&&/^(is|es|e|i|a|it)$/.test(hw[o[2]])){const nx=ops[x+1];if(nx&&nx[1]!=null&&/^s[ptkcmnl]/.test(tw[nx[1]])) addTip('sc',tw[nx[1]]);}
 });
 const ok=toks.map(()=>true); tw.forEach((w,k)=>{if(!hit[k]) ok[owner[k]]=false;});
 const acc=n?Math.round(hit.filter(Boolean).length/n*100):0;
 let ratio=null; if(userSec&&nativeSec) ratio=userSec/nativeSec;
 if(ratio!=null&&acc>=60){if(ratio>2.2) addTip('flu');else if(ratio<.6) addTip('fast');}
 const c=conf>0?Math.round(conf*100):null;
 if(c!=null&&c<65&&acc>=70) addTip('clr');
 const order=['th','thv','ed','s','fin','ing','vow','v','w','h','sc','small','flu','fast','clr','gen'];
 const tl=Object.values(tips).sort((a,b)=>order.indexOf(a.k)-order.indexOf(b.k));
 return {score:acc,acc,toks,ok,heard,ratio,conf:c,tips:tl,tw,hit};
}
function rhythmInfo(r){if(r==null) return null;if(r<.6) return ['mid','Rápido',55];if(r<=1.5) return ['ok','Natural',100];if(r<=2.2) return ['mid','Um pouco lento',70];return ['no','Lento',40];}
function recordPron(g){
 const P=S.pron=S.pron||{n:0,sum:0,w:{},t:{},tw:{}};
 P.n++; P.sum+=g.acc;
 g.tw.forEach((w,k)=>{if(w.length<2) return;const e=P.w[w]||[0,0];if(g.hit[k]) e[1]++; else e[0]++;P.w[w]=e;});
 const ks=Object.keys(P.w); if(ks.length>300){ks.sort((a,b)=>(P.w[a][0]+P.w[a][1])-(P.w[b][0]+P.w[b][1]));ks.slice(0,ks.length-300).forEach(k=>delete P.w[k]);}
 g.tips.forEach(t=>{P.t[t.k]=(P.t[t.k]||0)+1;if(t.words.length){P.tw[t.k]=Array.from(new Set(t.words.concat(P.tw[t.k]||[]))).slice(0,6);}});
}
function tipHTML(t){
 const T=PTIPS[t.k]||PTIPS.gen;
 const d=t.k==='ed'&&t.words.length?t.words.slice(0,2).map(edTip).join(' '):T.d;
 return `<div class="ptip"><b>${T.t}</b>${t.words.length?` <span class="pwords">${t.words.slice(0,4).map(esc).join(', ')}</span>`:''}<p>${d}</p></div>`;
}

function showPron(out,kind,html){out.hidden=false;out.className='pron '+kind;out.innerHTML=html;}
function stopUI(){
 if(A.active){A.active.classList.remove('listening');const mc=A.active.querySelector('.mic');if(mc) mc.setAttribute('aria-pressed','false');}
 A.rec=null; A.active=null;
}
function stopListening(){if(A.rec){try{A.rec.abort();}catch(e){}} stopUI();document.body.style.overflow='';}
function finishListening(){if(A.rec&&A.rec.stop){A.rec.stop();return true;}return false;}

async function listen(bubble){
 const target=bubble.querySelector('.en').textContent, out=bubble.querySelector('.pron');
 if(A.active===bubble){if(finishListening()) return;stopListening();out.hidden=true;return;}
 if(useWhisper()){stopListening();recStop();if(canSpeak){try{speechSynthesis.cancel();}catch(e){}}whListen(bubble,target,out);return;}
 if(!SR){showPron(out,'warn',WH.st==='off'?'Este navegador não reconhece fala. Use o Chrome ou o Edge, ou abra o curso pelo site.':'Não consegui preparar o reconhecimento de voz agora. Tente de novo.');return;}
 if(A.blocked){showPron(out,'warn',BLOCKED_MSG);return;}
 stopListening();
 recStop();
 if(canSpeak){try{speechSynthesis.cancel();}catch(e){}}
 if(A.status==='downloadable'){
  showPron(out,'info','Baixando o modelo de inglês para o seu aparelho. Isso acontece só uma vez...');
  await installSR();
 }
 startRec(bubble,target,out,A.status==='available');
}
function startRec(bubble,target,out,local){
 let rec;
 try{rec=new SR();}catch(e){showPron(out,'warn','Não consegui ligar o reconhecimento de voz.');return;}
 rec.lang='en-US'; rec.interimResults=true; rec.maxAlternatives=3; rec.continuous=false;
 if(local){try{rec.processLocally=true;}catch(e){} try{rec.options=SR_OPTS;}catch(e){}}
 A.rec=rec; A.active=bubble; bubble.classList.add('listening');
 const mc=bubble.querySelector('.mic'); if(mc) mc.setAttribute('aria-pressed','true');
 showPron(out,'info','Ouvindo... fale a frase em inglês.');
 let done=false, t0=0, t1=0;
 rec.onspeechstart=()=>{t0=performance.now();};
 rec.onspeechend=()=>{t1=performance.now();};
 rec.onresult=ev=>{
  const res=ev.results[ev.results.length-1];
  if(!res.isFinal){showPron(out,'info','Ouvindo: '+esc(res[0].transcript));return;}
  done=true; let best=null;
  const end=t1||performance.now(), userSec=t0?Math.max(.3,(end-t0)/1000-.15):null;
  const who=bubble.dataset.who||((bubble.querySelector('.say')||{}).dataset||{}).who||'narr';
  let nativeSec=null;
  if(REC.man){const e=REC.man.k[recKey(target,voiceWho(who))];if(e) nativeSec=Math.max(.4,e[2]-.1);}
  if(!nativeSec) nativeSec=.3+.3*target.split(/\s+/).length;
  for(let k=0;k<res.length;k++){const g=analyzeSpeech(target,res[k].transcript,res[k].confidence||0,userSec,nativeSec); if(!best||g.acc>best.acc) best=g;}
  renderGrade(bubble,out,best,local);
 };
 rec.onerror=ev=>{
  const e=ev.error; done=true;
  if(local&&(e==='language-not-supported'||e==='service-not-allowed')){A.status='cloud';renderAudio();if(A.rec===rec) stopUI();startRec(bubble,target,out,false);return;}
  if(e==='not-allowed'||e==='service-not-allowed'){A.blocked=true;renderAudio();showPron(out,'warn',BLOCKED_MSG);}
  else if(e==='no-speech') showPron(out,'warn','Não ouvi nada. Toque no microfone e fale logo em seguida.');
  else if(e==='audio-capture') showPron(out,'warn','Nenhum microfone encontrado neste aparelho.');
  else if(e==='network') showPron(out,'warn','Sem conexão para analisar a fala. Baixe o modelo de inglês no painel Áudio para treinar offline.');
  else if(e!=='aborted') showPron(out,'warn','Não deu para ouvir agora. Tente de novo.');
 };
 rec.onend=()=>{
  if(A.rec===rec) stopUI();
  if(!done) showPron(out,'warn','Não ouvi nada. Toque no microfone e fale logo em seguida.');
 };
 try{rec.start();}catch(e){stopUI();showPron(out,'warn','Não consegui ligar o microfone. Tente de novo.');}
}
function renderGrade(bubble,out,g,local){
 /* com a pronúncia som por som, a nota junta palavras (60%) e sons (40%); "Perfeito" só sem nada para ajustar */
 const tot=g.sons!=null?Math.round(g.acc*.6+g.sons*.4):g.acc, temSom=!!(g.sndNotas&&g.sndNotas.length);
 const lab=tot>=90&&!temSom?['ok','Perfeito!']:tot>=70?['ok','Muito bom!']:tot>=40?['mid','Quase lá.']:['no','Vamos de novo.'];
 if(g.acc>=70&&S.week){const tk=todayKey(),w=S.week;w.dayPhr[tk]=(w.dayPhr[tk]||0)+1;w.stats.phr++;if(w.dayPhr[tk]>=3) markDay();prog('speak10');if(g.acc>=90) prog('speak90');}
 let xp=''; const key=bubble.dataset.key;
 if(g.acc>=70&&key&&!S.spoken[key]){S.spoken[key]=1;S.xp+=2;xp=' <span class="pxp">+2 XP</span>';}
 recordPron(g); save();
 bubble.dataset.score=g.acc;
 if(bubble.dataset.qx) setTimeout(()=>qxSpoke(bubble,g.acc),0);
 const rh=rhythmInfo(g.ratio);
 const meter=(lbl,val,txt,cls)=>`<div class="pm ${cls}"><small>${lbl}</small><i><b style="width:${Math.max(4,Math.min(100,val))}%"></b></i><span>${txt}</span></div>`;
 const meters=meter('Palavras',g.acc,g.acc+'%',g.acc>=90?'ok':g.acc>=60?'mid':'no')
  +(g.conf!=null?meter('Clareza',g.conf,g.conf>=85?'Alta':g.conf>=65?'Média':'Baixa',g.conf>=85?'ok':g.conf>=65?'mid':'no'):'')
  +(g.sons!=null?meter('Sons',g.sons,g.sons+'%',g.sons>=90?'ok':g.sons>=70?'mid':'no'):'')
  +(rh?meter('Ritmo',rh[2],rh[1],rh[0]):'');
 const tips=g.tips.slice(0,2).map(tipHTML).join('');
 const praise=!g.tips.length&&g.acc>=90&&(g.sons==null||g.sons>=90)?`<div class="ptip good"><b>Dicção clara!</b><p>Agora tente dizer a frase sem olhar o texto, ou acompanhe a voz na velocidade normal.</p></div>`:'';
 showPron(out,lab[0],`<div class="ph"><b>${lab[1]}</b> ${tot}%${xp}</div><div class="pw">${g.toks.map((t,k)=>`<span class="${!g.ok[k]?'w-no':g.snd&&g.snd[k]?'w-snd':'w-ok'}">${esc(t)}</span>`).join(' ')}</div>
 <div class="meters">${meters}</div>${g.sndNotas&&g.sndNotas.length?`<ul class="pnotas">${g.sndNotas.slice(0,4).map(n=>`<li>${n}</li>`).join('')}</ul>`:''}${tips}${praise}
 <div class="ph2">Ouvi: “${esc(g.heard)}”${local==='whisper'?(g.sons!=null?' · palavras pelo Whisper e sons pelo modelo de fonemas, no aparelho':' · analisado pelo Whisper no aparelho'):local?' · analisado no aparelho':''}</div>
 <div class="prow"><button class="pbtn" data-pslow>Ouvir devagar</button><button class="pbtn" data-pagain>Tentar de novo</button><button class="pbtn" data-pron>Meu relatório</button></div>`);
}

/* Painel de áudio (tela inicial) */
const PROFILES={
 padrao:{n:'Padrão',d:'O curso no jeito normal.',set:{calm:false,clear:false,karaoke:true,repeat:false,contrast:false,zoom:1,slow:false}},
 foco:{n:'Foco',d:'Para TDAH: menos movimento e distração.',set:{calm:true,clear:false,karaoke:true,repeat:false,contrast:false,zoom:1,slow:false}},
 audicao:{n:'Audição',d:'Para TPAC: fala clara, palavras destacadas e repetição.',set:{calm:true,clear:true,karaoke:true,repeat:true,contrast:false,zoom:1,slow:false}},
 leitura:{n:'Leitura confortável',d:'Letra grande e alto contraste.',set:{calm:false,clear:false,karaoke:true,repeat:false,contrast:true,zoom:1.3,slow:false}}
};
function curProfile(){return Object.keys(PROFILES).find(k=>Object.entries(PROFILES[k].set).every(([a,v])=>(a==='zoom'?(S.zoom||1):!!S[a])===v))||'';}
/* Perfis podem ser combinados: cada um liga só os seus ajustes */
const PROF_ON={foco:{calm:true},audicao:{clear:true,karaoke:true,repeat:true,calm:true},leitura:{contrast:true,zoom:1.3}};
const PROF_KEYS=['foco','audicao','leitura'];
function profOn(k){if(k==='padrao') return !PROF_KEYS.some(profOn);return Object.entries(PROF_ON[k]).every(([a,v])=>a==='zoom'?(S.zoom||1)>=v:!!S[a]===v);}
function toggleProfile(k){
 if(k==='padrao'){Object.assign(S,PROFILES.padrao.set);return;}
 if(profOn(k)){
  const others=PROF_KEYS.filter(x=>x!==k&&profOn(x));
  for(const a of Object.keys(PROF_ON[k])){if(a==='karaoke') continue;if(!others.some(o=>a in PROF_ON[o])) S[a]=a==='zoom'?1:false;}
 } else Object.entries(PROF_ON[k]).forEach(([a,v])=>{S[a]=a==='zoom'?Math.max(S.zoom||1,v):v;});
}
function profLabel(){const on=PROF_KEYS.filter(profOn);return on.length?on.map(k=>PROFILES[k].n).join(' + '):'Padrão';}
function profilesHTML(){return Object.keys(PROFILES).map(k=>{const on=profOn(k);return `<button class="prof" data-profile="${k}" role="checkbox" aria-checked="${on}" aria-pressed="${on}"><i class="pchk" aria-hidden="true"></i><b>${PROFILES[k].n}</b><span>${PROFILES[k].d}</span></button>`;}).join('');}
function lookSeg(){return `<div class="seg" role="group" aria-label="Tema">${[['auto','Automático'],['light','Claro'],['dark','Escuro']].map(([v,l])=>`<button class="segb" data-look="${v}" aria-pressed="${(S.look||'auto')===v}">${l}</button>`).join('')}</div>`;}
function swRow(k,l,d){return `<div class="set-row"><div class="set-t"><b>${l}</b>${d?`<small>${d}</small>`:''}</div><button class="sw" role="switch" aria-checked="${!!S[k]}" aria-label="${l}" data-opt="${k}"><span></span></button></div>`;}
function audioHTML(){
 const ST={
  none:['dim','Indisponível','Este navegador não reconhece fala. No Chrome ou no Edge funciona.'],
  checking:['dim','Verificando','Conferindo se o aparelho reconhece inglês offline.'],
  available:['good','No aparelho','Sua voz é analisada no próprio aparelho, sem internet.'],
  downloadable:['warn','Pode baixar','Baixe o inglês uma vez para treinar a fala offline.'],
  downloading:['warn','Baixando','O modelo de inglês está sendo baixado.'],
  unavailable:['warn','Pela internet','A fala é analisada pelo serviço do navegador.'],
  cloud:['warn','Pela internet','A fala é analisada pelo serviço do navegador.']
 };
 let st=ST[A.status]||ST.cloud;
 if(A.blocked) st=['bad','Bloqueado','O microfone está bloqueado nesta janela. Abra no Chrome e permita o microfone.'];
 if(A.installFailed&&A.status!=='available') st=['bad','Falha no download','Não deu para baixar agora. A fala será analisada pela internet.'];
 const vopts=usableVoices().sort((a,b)=>voiceScore(b)-voiceScore(a)).map(v=>`<option value="${esc(v.name)}"${S.voice===v.name?' selected':''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
 return `<section class="set-sec" id="audio"><h4>Voz e microfone</h4>
 <div class="set-row col"><div class="set-t"><b>Voz dos personagens</b><small>${recOn()?'Vozes naturais gravadas, iguais em qualquer aparelho.':S.audioMode==='tts'?'Voz instalada no aparelho. A qualidade depende do sistema.':'A voz gravada não carregou. Usando a voz do aparelho.'}</small></div>
  <div class="seg" role="group" aria-label="Tipo de voz"><button class="segb" data-amode="rec" aria-pressed="${S.audioMode!=='tts'}">Natural gravada</button><button class="segb" data-amode="tts" aria-pressed="${S.audioMode==='tts'}">Do aparelho</button></div></div>
 ${S.audioMode==='tts'&&canSpeak?`<div class="set-row col"><div class="set-t"><b>Qual voz do aparelho</b></div><select id="voice" class="field" aria-label="Voz do aparelho"><option value="">Automática, uma por personagem</option>${vopts}</select>${castLine()}</div>`:''}
 ${WH.st!=='off'?`<div class="set-row col"><div class="set-t"><b>Quem analisa sua fala</b><small>${whText()}</small></div>
  <div class="seg" role="group" aria-label="Reconhecimento de fala"><button class="segb" data-asr="auto" aria-pressed="${(S.asr||'auto')==='auto'}">Automático</button><button class="segb" data-asr="whisper" aria-pressed="${S.asr==='whisper'}">Whisper</button>${SR?`<button class="segb" data-asr="browser" aria-pressed="${S.asr==='browser'}">Navegador</button>`:''}</div>
  ${WH.st!=='ready'&&WH.st!=='loading'&&!WH.cached?`<div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn" id="whget">Baixar Whisper (32 MB)</button></div>`:''}</div>`:''}
 ${FN.st!=='off'&&WH.st!=='off'?`<div class="set-row col"><div class="set-t"><b>Pronúncia som por som</b><small>${fnText()}</small></div>
  <div class="seg" role="group" aria-label="Pronúncia som por som"><button class="segb" data-fon="1" aria-pressed="${!!S.fon}">Ligada</button><button class="segb" data-fon="0" aria-pressed="${!S.fon}">Desligada</button></div></div>`:''}
 ${useWhisper()?'':`<div class="set-row"><div class="set-t"><b>Microfone (treino de fala)</b><small>${st[2]}</small></div><span class="chip ${st[0]}">${st[1]}</span></div>
 ${A.status==='downloadable'&&!A.blocked?`<div class="row" style="justify-content:flex-start"><button class="btn" id="srinstall">Baixar inglês para o aparelho</button></div>`:''}`}
 <div class="row" style="justify-content:flex-start"><button class="btn ghost" id="castdemo">Ouvir os personagens</button></div></section>`;
}
/* Instalar como app (quando aberto pelo site) */
let INSTALL=null; const OFF={busy:false,msg:''};
async function offlineAll(){
 if(OFF.busy) return; if(!('caches' in window)){toast('Este navegador não permite baixar o curso.');return;}
 if(!REC.man){try{const m=await (await fetch('audio/index.json')).json();if(m&&m.k) REC.man=m;}catch(e){}} if(!REC.man){toast('Não consegui ler a lista de áudios. Tente com internet.');return;}
 OFF.busy=true; const set=t=>{OFF.msg=t;const el=document.getElementById('offst');if(el) el.textContent=t;};
 const urls=[...new Set(Object.values(REC.man.files).flatMap(f=>[f.n,f.s,f.c]).filter(Boolean))];
 let done=0, fail=0; const c=await caches.open('torre-media-v1');
 for(const u of urls){try{if(!(await c.match(u))){const r=await fetch(u);if(r.ok) await c.put(u,r);else fail++;}}catch(e){fail++;} done++; set(`Baixando falas: ${Math.round(done/urls.length*100)}%`);}
 if(WH.st!=='off'&&WH.st!=='fail'){set('Baixando o reconhecimento de voz...');await whInit();}
 OFF.busy=false; set(fail?`Pronto, mas ${fail} arquivo(s) falharam. Tente de novo com internet.`:'Pronto! O curso funciona sem internet neste aparelho.');
 const b=document.querySelector('[data-offline]'); if(b) b.disabled=false;
}
try{window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();INSTALL=e;const el=document.getElementById('appsec');if(el) el.outerHTML=appSec();});window.addEventListener('appinstalled',()=>{INSTALL=null;toast('App instalado!');});}catch(e){}
function isStandalone(){try{return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}catch(e){return false;}}
function appSec(){
 if(claudeRt()||!('serviceWorker' in navigator)) return '<span id="appsec" hidden></span>';
 const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
 const off=`<div class="set-row col"><div class="set-t"><b>Usar sem internet</b><small id="offst">${OFF.msg||'Baixa todas as falas gravadas (cerca de 45 MB) e o reconhecimento de voz (32 MB). Bom para viagens e lugares sem sinal.'}</small></div><div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn ghost" data-offline${OFF.busy?' disabled':''}>Baixar o curso</button></div></div>`;
 if(isStandalone()) return `<section class="set-sec" id="appsec"><h4>App no celular</h4>${off}</section>`;
 return `<section class="set-sec" id="appsec"><h4>App no celular</h4>${off}
  <div class="set-row col"><div class="set-t"><b>Instalar a Torre do Inglês</b><small>${INSTALL?'Fica com ícone na tela inicial, abre em tela cheia e funciona sem internet depois do primeiro uso.':ios?'No iPhone ou iPad: toque em Compartilhar e depois em “Adicionar à Tela de Início”.':'No menu do navegador, escolha “Instalar app” ou “Adicionar à tela inicial”.'}</small></div>
  ${INSTALL?'<div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn" id="appinstall">Instalar app</button></div>':''}</div></section>`;
}
function whText(){
 const m={checking:'Verificando...',idle:'O Whisper analisa sua voz no próprio aparelho, sem enviar nada para a internet. Funciona em qualquer navegador.',cached:'Whisper pronto no aparelho. Funciona até sem internet.',ready:'Whisper pronto no aparelho. Funciona até sem internet.',loading:'Baixando o Whisper: '+WH.pct+'%.',fail:'Não deu para preparar o Whisper agora. Usando o navegador.'};
 const now=useWhisper()?' Agora: Whisper.':SR?' Agora: navegador.':'';
 return (m[WH.st]||'')+now;
}
function settingsHTML(){
 return `<div class="set-head"><h3>Ajustes</h3><button class="back" data-closeset aria-label="Fechar ajustes">${ICON.x}</button></div>
 <section class="set-sec"><h4>Perfil rápido</h4><div class="profs" data-profrow>${profilesHTML()}</div><p class="set-note">Pode marcar mais de um. Cada perfil liga vários ajustes de uma vez, e depois dá para mudar cada item abaixo.</p></section>
 ${appSec()}
 <section class="set-sec"><h4>Ver</h4>
  <div class="set-row col"><div class="set-t"><b>Tamanho do texto</b></div>${zoomSeg()}</div>
  <div class="set-row col"><div class="set-t"><b>Tema</b></div>${lookSeg()}</div>
  ${swRow('contrast','Alto contraste','Textos mais escuros e bordas mais fortes.')}
  ${swRow('calm','Modo calmo','Sem animações e com cenas mais suaves.')}
 </section>
 <section class="set-sec"><h4>Ouvir</h4>
  ${swRow('clear','Fala clara','Mais devagar, com pausas e sem eco. Ajuda no TPAC.')}
  ${swRow('karaoke','Destacar palavras','As palavras se acendem enquanto são faladas.')}
  ${swRow('repeat','Repetir cada fala','Cada fala toca duas vezes.')}
  ${swRow('slow','Fala lenta','Voz normal em velocidade menor.')}
  ${swRow('showAll','Tradução sempre visível','O português aparece embaixo de cada balão.')}
  <div class="row" style="justify-content:flex-start"><button class="btn ghost" data-cleardemo>Ouvir exemplo</button><button class="btn ghost" data-ear>Treino de sons</button></div>
 </section>
 ${audioHTML()}
 <section class="set-sec"><h4>Conta e perfil</h4><div class="row" style="justify-content:flex-start"><button class="btn ghost" data-prof>Perfil e avatar</button><button class="btn ghost" data-acct>Conta e progresso</button><button class="btn ghost" data-pron>Minha pronúncia</button></div></section>
 <p class="set-note">As adaptações de leitura e audição ajudam no estudo, mas não substituem o acompanhamento com profissionais de saúde.</p>`;
}
function openSettings(){
 closeSettings();
 const d=document.createElement('div'); d.id='sheet'; d.className='sheet'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-label','Ajustes');
 d.innerHTML=`<div class="sheet-bg" data-closeset></div><div class="sheet-card"><div class="sheet-in">${settingsHTML()}</div></div>`;
 app.appendChild(d); document.body.style.overflow='hidden';
 const c=d.querySelector('[data-closeset].back'); if(c) try{c.focus({preventScroll:true});}catch(e){}
}
function closeSettings(){const d=document.getElementById('sheet');if(d) d.remove();document.body.style.overflow='';}
function renderSettings(){const i=document.querySelector('#sheet .sheet-in');if(i){const c=i.parentElement,y=c.scrollTop;i.innerHTML=settingsHTML();c.scrollTop=y;}}
function refreshProfiles(){document.querySelectorAll('[data-profrow]').forEach(r=>r.innerHTML=profilesHTML());}
/* Sugestão: quem pede para ouvir a mesma fala de novo pode precisar da fala clara */
let REPL={t:'',n:0,at:0,who:''};
function trackReplay(t,who){
 if(S.clear||S.nudgeOff) return;
 const now=Date.now();
 if(REPL.t===t&&now-REPL.at<25000) REPL.n++; else REPL={t,n:1,at:now,who};
 REPL.at=now;
 if(REPL.n>=2&&!document.getElementById('nudge')) showNudge();
}
function showNudge(){
 const d=document.createElement('div'); d.id='nudge'; d.className='nudge'; d.setAttribute('role','status');
 d.innerHTML=`<p><b>Está difícil de entender?</b> A fala clara deixa a voz mais lenta, com pausas e palavras destacadas.</p><div class="row" style="justify-content:flex-start"><button class="btn" data-nudge="on">Ligar fala clara</button><button class="btn ghost" data-nudge="off">Agora não</button></div>`;
 document.body.appendChild(d); setTimeout(()=>{if(d.parentNode) d.remove();},16000);
}
document.addEventListener('click',e=>{
 const nb=e.target.closest('#nudge button[data-nudge]'); if(!nb) return;
 const n=document.getElementById('nudge'); if(n) n.remove();
 if(nb.dataset.nudge==='on'){S.clear=true;S.karaoke=true;save();toast('Fala clara ligada. Dá para mudar em Ajustes.');if(REPL.t) speak(REPL.t,null,REPL.who);}
 else{S.nudgeOff=true;save();}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('sheet')) closeSettings();});
function castLine(){
 if(!CAST.narr||!CAST.narr.v) return '';
 const n=r=>r&&r.v?esc(r.v.name.replace(/^Microsoft |^Google /,'').replace(/ \(.*$/,'')):'?';
 return `<p style="margin-top:8px;font-size:13px">Vozes em uso: Mina · ${n(CAST.mina)}, Você · ${n(CAST.rafa)}, Jin · ${n(CAST.jin)}</p>`;
}
function renderAudio(){const el=document.getElementById('audio'); if(el) el.outerHTML=audioHTML();}

const app=document.getElementById('app');
let cur=null;

/* ===================== HOME ===================== */
function zoomSeg(){return `<div class="seg" role="group" aria-label="Tamanho do texto">${ZOOMS.map(([z,l])=>`<button class="segb" data-zoom="${z}" aria-pressed="${(S.zoom||1)===z}">${l}</button>`).join('')}</div>`;}

/* ===================== INÍCIO ===================== */
function home(){
 stopListening(); cur=null; rollWeek();
 const xpIn=S.xp%80, n=nextIdx(), allDone=doneCount()===CH.length;
 let h=`<div class="wrap">
 <div class="topbar"><b>Torre do Inglês</b><button class="gear big" data-settings aria-label="Ajustes">${ICON.gear}<span>Ajustes</span></button></div>
 <div class="panel bg-gate has-chr hero">
  <div class="ttl">TORRE<br>DO INGLÊS</div>
  <div class="sub">Um manhwa para aprender inglês do zero ao avançado. ${CH.length} capítulos curtos, do A1 ao C1, com missões do mundo real.</div>
  <div class="chr l">${av('me','happy')}</div><div class="chr r">${av('mina','happy')}</div>
 </div>
 <div class="sysw" data-tour="status">
  <div class="tag">[ STATUS ]</div>
  <div class="who-row"><div class="me">${av('me','happy')}</div><div class="who-t"><small>${esc(titleLabel())}</small><b class="nm">${esc(S.name||'Visitante')}</b></div><button class="tog" data-prof>Perfil</button></div>
  <div class="cloudrow" id="cloudchip">${cloudChipHTML()}</div>
  <div class="stats">
   <div><small>NÍVEL</small><b>${level()}</b></div>
   <div><small>CATEGORIA</small><b>${rank()}</b></div>
   <div><small>ANDARES</small><b>${doneCount()}/${CH.length}</b></div>
  </div>
  <div class="xpbar"><i style="width:${(xpIn/80*100).toFixed(0)}%"></i></div>
  <div class="xpl"><span>XP ${S.xp}</span><span>${80-xpIn} XP para o nível ${level()+1}</span></div>
  <div class="row" style="margin-top:14px"><button class="btn" data-open="${n}">${allDone?'Reler o último capítulo':(doneCount()?'Continuar':'Começar')}: Cap. ${n+1}</button></div>
  <div class="row" style="margin-top:10px" data-tour="tools"><button class="btn ghost" data-gloss>Glossário</button><button class="btn ghost" data-pron>Minha pronúncia</button><button class="btn ghost" data-place>${S.placed?'Refazer nivelamento':'Nivelamento'}</button></div>
 </div>`;
 h+=officialSite();
 h+=practiceCard();
 h+=nameVoiceCard();
 h+=backupNudge();
 h+=weekCardHTML();
 ARCS.forEach(a=>{
  let dn=0; for(let i=a.from;i<=a.to;i++) if(S.done[i]!=null) dn++;
  const open=n>=a.from&&n<=a.to;
  h+=`<details class="arc"${open?' open':''}><summary><div class="arc-h"><h2>${a.n}</h2><p>${a.d}</p></div><span class="arc-c">${dn}/${a.to-a.from+1}</span></summary><div class="eps">`;
  for(let i=a.from;i<=a.to;i++){
   const c=CH[i], d=S.done[i]!=null;
   const st=d?`<span class="st done">${S.done[i]}/${qCount(c)}</span>`:(i===n?`<span class="st next">PRÓXIMO</span>`:(c.boss?`<span class="st boss">CHEFE</span>`:`<span class="st new">NOVO</span>`));
   h+=`<button class="ep${c.boss?' is-boss':''}" data-open="${i}"><div class="thumb bg-${c.bg}">${av(c.hero,c.hero==='monster'?'':'happy',MONC[c.mon])}</div><div class="t"><small>CAP. ${i+1} · <span class="lvl">${c.lv}</span></small><b>${c.t}</b><span>${c.topic}</span></div>${st}</button>`;
  }
  h+=`</div>${arcDone(ARCS.indexOf(a))?`<div class="row" style="justify-content:flex-start;margin:10px 0 4px"><button class="btn ghost" data-cert="${ARCS.indexOf(a)}">Ver certificado do arco</button></div>`:''}</details>`;
 });
 h+=`<details class="arc"><summary><div class="arc-h"><h2>Como funciona</h2><p>Dicas para aproveitar melhor</p></div></summary>
 <ul class="how">
  <li><span>01</span><div><b>Um capítulo por dia.</b> Cada um leva de 3 a 5 minutos. Parar no meio também vale.</div></li>
  <li><span>02</span><div><b>Leia em inglês primeiro.</b> Tente entender e depois toque no balão para ver a tradução.</div></li>
  <li><span>03</span><div><b>Ouça e repita em voz alta.</b> O alto-falante lê a frase. O microfone confere sua pronúncia.</div></li>
  <li><span>04</span><div><b>Teste do Portal no fim.</b> Três perguntas rápidas valem XP. Pode refazer quando quiser.</div></li>
  <li><span>05</span><div><b>Chefe no fim do arco.</b> O último capítulo de cada arco revisa tudo com 5 perguntas. Ao terminar um arco, você ganha um certificado.</div></li>
  <li><span>06</span><div><b>Esqueceu uma regra?</b> O Glossário reúne tudo o que o curso ensina, com busca.</div></li>
  <li><span>07</span><div><b>Baú do Portal.</b> Treine alguns dias por semana e abra baús com roupas, cartas e histórias extras.</div></li>
  <li><span>08</span><div><b>Revisão espaçada.</b> O curso traz de volta cada pergunta depois de 1, 3, 7, 14 e 30 dias. É assim que o inglês fica na memória.</div></li>
  <li><span>09</span><div><b>Treino extra.</b> No fim de cada capítulo: montar frases, completar, ouvir e falar. É opcional e leva uns 5 minutos.</div></li>
  <li><span>10</span><div><b>Prática.</b> Diálogos longos para ouvir, textos para ler, cartões de vocabulário e escrita guiada, no quadro Prática do início.</div></li>
  <li><span>11</span><div><b>Ajustes sempre à mão.</b> O botão Ajustes, no topo de cada tela, tem perfis prontos para TDAH, TPAC e leitura confortável.</div></li>
 </ul><div class="row" style="justify-content:flex-start;margin:4px 0 8px"><button class="btn ghost" data-tour-start>Ver o tutorial de novo</button></div></details>
 <div class="sysw" style="margin-top:22px"><div class="tag">[ AJUSTES ]</div><h3>Do seu jeito</h3><p>Perfil atual: <b>${profLabel()}</b>. Tamanho do texto, tema, fala clara, vozes e microfone.</p><div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn" data-settings>${ICON.gear} Abrir ajustes</button></div></div>
 <p class="foot" id="cloudfoot">${cloudFootText()}</p><p class="foot" style="font-size:12px">© 2026 RockDo1do · Torre do Inglês · gratuito para estudar e compartilhar, proibido vender ou cobrar. Licença <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br" target="_blank" rel="noopener license">CC BY-NC-SA 4.0</a> · <a href="privacy.html" target="_blank" rel="noopener">Privacidade</a></p></div>`;
 app.innerHTML=h;
 window.scrollTo(0,0);
}

/* ===================== BOAS-VINDAS E PERFIL ===================== */
/* ===================== PRIMEIRO ACESSO: passo a passo ===================== */
const WZ_STEPS=['intro','name','avatar','style','start','tour'];   /* o passo 6 é o tutorial com balões (tourStart) */
let WZ=0;
function wizard(n){
 stopListening(); cur=null; closeSettings();
 WZ=Math.max(0,Math.min(WZ_STEPS.length-1,n));
 if(WZ_STEPS[WZ]==='tour'){tourStart(true);return;}
 const step=WZ_STEPS[WZ], total=WZ_STEPS.length;
 const hi='Hi! Welcome to the English Tower.';
 let body='', next='Continuar';
 if(step==='intro'){
  next='Começar';
  body=`<div class="panel bg-gate has-chr hero wz-hero">
   <div class="ttl">TORRE<br>DO INGLÊS</div>
   <div class="bubble l" tabindex="0" role="button" aria-label="Mostrar tradução"><span class="who">MINA</span><span class="en" lang="en">${hi}</span><span class="hint">toque para traduzir</span><span class="pt">Oi! Boas-vindas à Torre do Inglês.</span>${canSpeak||REC.man?`<button class="say" data-say="${hi}" data-who="mina" aria-label="Ouvir em inglês">${ICON.speak}</button>`:''}</div>
   <div class="chr r">${av('mina','happy')}</div></div>
  <div class="wz-kick">[ BOAS-VINDAS ]</div>
  <h1 class="wz-h">Inglês do básico ao avançado, em formato de manhwa</h1>
  <p class="wz-intro">Um curso de inglês contado como um manhwa: você sobe a torre com a Mina, aprende com diálogos do dia a dia e ouve cada fala em voz natural. Feito para quem tem pouco tempo ou dificuldade de foco.</p>
  <div class="wz-chips"><span><b>${ARCS.length}</b> arcos</span><span><b>${CH.length}</b> capítulos</span><span>Áudio em inglês</span><span>Treino de fala</span></div>
  <p class="set-note" style="margin-top:12px">Tamanho do texto, tema e vozes: depois de entrar, use o botão Ajustes, no topo da tela.</p>`;
 } else if(step==='name'){
  next='Continuar';
  body=`<div class="wz-chr">${av('mina','happy')}</div>
  <h1 class="wz-h">Como podemos te chamar?</h1>
  <p class="wz-p">Você é o(a) protagonista: seu nome vai aparecer nos diálogos da história. Pode ser um apelido.</p>
  <label class="lab" for="nm">Seu nome ou apelido</label>
  <input class="field wz-in" id="nm" maxlength="20" value="${esc(S.name||'')}" placeholder="Ex.: Ana" autocomplete="nickname" enterkeyhint="next">`;
 } else if(step==='avatar'){
  body=`<h1 class="wz-h">${S.name?esc(S.name)+', escolha':'Escolha'} seu avatar</h1>
  <p class="wz-p">Ele vai ser o(a) protagonista da história, com voz ${heroSex()==='f'?'feminina':'masculina'}.</p>
  <div class="wz-prev" id="avprev">${av('me','happy')}</div>
  <div id="avsex">${avSexSeg()}</div><div class="avs" id="avgrid" role="group" aria-label="Avatar">${avGridHTML()}</div>`;
 } else if(step==='style'){
  body=`<h1 class="wz-h">Quer ajustar o curso para você?</h1>
  <p class="wz-p">Pode marcar mais de uma opção. Dá para mudar depois, no botão Ajustes.</p>
  <div class="profs wz-profs" data-profrow>${profilesHTML()}</div>`;
 } else {
  next='';
  body=`<h1 class="wz-h">Você já sabe um pouco de inglês?</h1>
  <p class="wz-p">Assim o curso começa no ponto certo para você.</p>
  <div class="opts wz-opts"><button class="opt big" data-start="zero"><b>Estou começando do zero</b><span>Começa no capítulo 1.</span></button><button class="opt big" data-start="place"><b>Já sei um pouco</b><span>Teste rápido de até 20 perguntas, cerca de 4 minutos.</span></button></div>
  <p class="wz-p" style="margin-top:18px">Já usou o curso em outro aparelho? <button class="linkb" data-acct>Carregar meu progresso</button></p>`;
 }
 app.innerHTML=`<div class="wrap wz">
  <div class="wz-top">${WZ>0?`<button class="back" data-wback aria-label="Voltar">${ICON.back}</button>`:'<span></span>'}
   <div class="wz-steps" aria-label="Passo ${WZ+1} de ${total}">${WZ_STEPS.map((_,i)=>`<i class="${i<=WZ?'on':''}"></i>`).join('')}</div>
   <span class="wz-n">${WZ+1}/${total}</span></div>
  <div class="wz-body">${body}</div>
  ${next?`<div class="wz-actions">${WZ>0?`<button class="btn ghost" data-wback>Voltar</button>`:''}<button class="btn wz-next" data-wnext>${next}</button></div>`:`<div class="wz-actions" style="justify-content:flex-start"><button class="btn ghost" data-wback>Voltar</button></div>`}
 </div>`;
 window.scrollTo(0,0);
 if(step==='name'){const el=document.getElementById('nm');if(el) try{el.focus({preventScroll:true});}catch(e){}}
}
function welcome(edit){
 stopListening(); cur=null;
 if(!edit&&doneCount()>0) edit=true;
 if(!edit){wizard(0);return;}
 const hi='Hi! Welcome to the English Tower.';
 app.innerHTML=`<div class="wrap">
 ${edit?`<div class="bar"><button class="back" data-home aria-label="Voltar">${ICON.back}</button><div class="ti"><b>Seu perfil</b><span>Nome e avatar</span></div></div>`:''}
 <div class="panel bg-gate has-chr hero">
  <div class="ttl">TORRE<br>DO INGLÊS</div>
  <div class="bubble l" tabindex="0" role="button" aria-label="Mostrar tradução"><span class="who">MINA</span><span class="en" lang="en">${hi}</span><span class="hint">toque para traduzir</span><span class="pt">Oi! Boas-vindas à Torre do Inglês.</span>${canSpeak?`<button class="say" data-say="${hi}" data-who="mina" aria-label="Ouvir em inglês">${ICON.speak}</button>`:''}</div>
  <div class="chr r">${av('mina','happy')}</div>
 </div>
 ${edit?'':`<div class="sysw"><div class="tag">[ BOAS-VINDAS ]</div>
  <h3>Inglês do básico ao avançado, em formato de manhwa</h3>
  <p class="wz-intro">Um curso de inglês contado como um manhwa: você sobe a torre com a Mina, aprende com diálogos do dia a dia e ouve cada fala em voz natural. Feito para quem tem pouco tempo ou dificuldade de foco.</p>
  <div class="wz-chips"><span><b>${ARCS.length}</b> arcos</span><span><b>${CH.length}</b> capítulos</span><span>Áudio em inglês</span><span>Treino de fala</span></div></div>`}
 <div class="sysw"><div class="tag">[ SEU PERFIL ]</div><h3>Como podemos te chamar?</h3>
  <label class="lab" for="nm">Nome ou apelido (aparece nos diálogos)</label>
  <input class="field" id="nm" maxlength="20" value="${esc(S.name||'')}" placeholder="Ex.: Ana" autocomplete="nickname">
  <small class="lbl">ESCOLHA SEU AVATAR</small>
  <div id="avsex">${avSexSeg()}</div><div class="avs" id="avgrid" role="group" aria-label="Avatar">${avGridHTML()}</div>
  <p style="font-size:13px;margin-top:8px">Você é o(a) protagonista da história. Seu avatar aparece nos quadrinhos, e a voz segue o avatar: masculina ou feminina.</p>

 </div>
 <div class="sysw"><div class="tag">[ DO SEU JEITO ]</div><h3>Quer ajustar o curso para você?</h3>
  <div class="profs" data-profrow>${profilesHTML()}</div><p class="set-note">Dá para mudar tudo depois, no botão Ajustes.</p></div>
 ${edit?`<div class="row"><button class="btn" data-saveprof>Salvar e voltar</button></div>`
 :`<div class="sysw"><div class="tag">[ PONTO DE PARTIDA ]</div><h3>Você já sabe um pouco de inglês?</h3>
  <div class="opts"><button class="opt big" data-start="zero"><b>Estou começando do zero</b><span>Começa no capítulo 1.</span></button><button class="opt big" data-start="place"><b>Já sei um pouco</b><span>Teste rápido de até 20 perguntas, cerca de 4 minutos.</span></button></div>
  <p style="margin-top:14px;font-size:14px">Já usou o curso em outro aparelho? <button class="linkb" data-acct>Carregar meu progresso</button></p></div>`}
 </div>`;
 window.scrollTo(0,0);
}
function saveName(){const el=document.getElementById('nm'); const v=el?el.value.replace(/[^\p{L}\p{M}\s'’-]/gu,'').trim():''; if(v) S.name=v.slice(0,20); S.welcomed=true; save(); applyHeroName();}

/* ===================== NIVELAMENTO ===================== */
/* PLACE vem de conteudo/pratica/nivelamento.json */
/* Nivelamento adaptativo: 20 perguntas que sobem ou descem de nível conforme as respostas */
const PLACE_N=20, PLACE_LV=['A1','A2','B1','B2','C1'];
let P=null;
function placement(){stopListening(); cur=null; P={i:0,lv:1,lock:false,used:new Set(),stat:PLACE_LV.map(()=>({n:0,ok:0})),cur:null,hist:[]}; renderPlace();}
function placePick(){
 for(let d=0;d<5;d++){for(const lv of [P.lv+d,P.lv-d]){if(lv<0||lv>4) continue;const pool=PLACE.map((q,k)=>({q,k})).filter(x=>x.q.lv===lv&&!P.used.has(x.k));if(pool.length) return pool[Math.floor(Math.random()*pool.length)];}}
 return null;
}
function renderPlace(){
 if(P.i>=PLACE_N){placeResult();return;}
 const pk=placePick(); if(!pk){placeResult();return;}
 P.cur=pk; P.used.add(pk.k); P.hist.push(pk.q.lv); const q=pk.q, opts=shuffle(q.o.map((t,k)=>({t,k})));
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
 /* a escada sobe e desce até se estabilizar perto do nível da pessoa: vale a média das últimas perguntas */
 const h=P.hist.slice(-10); if(!h.length) return 0;
 let l=Math.round(h.reduce((a,b)=>a+b,0)/h.length);
 const c=P.stat[4]; if(l>=4&&c.n>=3&&c.ok/c.n>=.8) l=5;
 const a1=P.stat[0]; if(l===0&&a1.n&&a1.ok/a1.n>=.8) l=1;
 return l;
}
function placeResult(){
 const l=placeLevel(), ARC_OF=[0,2,3,4,5,7], ai=ARC_OF[l], A0=ARCS[ai], score=P.stat.reduce((a,s)=>a+s.ok,0), n=P.stat.reduce((a,s)=>a+s.n,0);
 S.placed={score,arc:ai,lv:l,d:ymd(new Date())}; S.start=A0.from; medir('teste',l===0?'A1':l===5?'C1':PLACE_LV[l],n?score/n*100:0); save();
 const lvTxt=l===0?'começando no A1':l===5?'C1, com segurança':PLACE_LV[l];
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

/* ===================== PRÁTICA: ESCUTA, LEITURA, VOCABULÁRIO E ESCRITA ===================== */
function practiceCard(){
 const pr=S.prod||{}, pe=(PRODUCAO.escrever||[]).filter(x=>pr[x.id]===2).length, pm=(PRODUCAO.mediar||[]).filter(x=>pr[x.id]===2).length;
 const ln=Object.keys(S.lsn||{}).length, rd=Object.keys(S.rd||{}).length, wr=Object.keys(S.wr||{}).length, vc=Object.keys(S.voc||{}).length, due=vocDue().length;
 return `<div class="sysw" data-tour="pratica"><div class="tag">[ PRÁTICA ]</div><h3>Treine além dos capítulos</h3>
 <div class="prgrid">
  <button class="prb" data-lsn><b>Ouvir e responder</b><span>${ln}/${LISTEN.length} diálogos</span></button>
  <button class="prb" data-read><b>Leitura</b><span>${rd}/${READ.length} textos</span></button>
  <button class="prb" data-voc><b>Vocabulário</b><span>${vc} palavras${due?` · ${due} para revisar`:''}</span></button>
  <button class="prb" data-wrt><b>Escrita guiada</b><span>${wr}/${WRITE.length} textos</span></button>
  <button class="prb" data-plist="escrever"><b>Escrever do zero</b><span>${pe}/${(PRODUCAO.escrever||[]).length} textos</span></button>
  <button class="prb" data-plist="mediar"><b>Mediação</b><span>${pm}/${(PRODUCAO.mediar||[]).length} tarefas</span></button>
  <button class="prb" data-sims><b>Simulados</b><span>${Object.keys(S.sim||{}).length}/${(SIMULADOS||[]).length} feitos</span></button>
  <button class="prb" data-sbank><b>Banco de sons</b><span>${Object.keys(S.sb||{}).length}/${sbAll().length} sons</span></button>
  <button class="prb" data-imersao><b>Inglês fora do curso</b><span>${fmtH(horas().total)} de inglês</span></button>
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
 const name=w=>w==='rafa'?esc(heroName()):(L.nomes&&L.nomes[w])?esc(L.nomes[w]):w==='narr'?'Anúncio':esc(w.charAt(0).toUpperCase()+w.slice(1));
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
 ${vocGrupos().map(([lv,its])=>`<details class="vgrp"${lv===vocNivelAberto()?' open':''}><summary><b>${lv==='Dia a dia'?'Temas do dia a dia':'Nível '+lv}</b><span>${its.reduce((a,[,ws])=>a+ws.length,0)} palavras · ${its.length} temas</span></summary>
 <div class="eps">${its.map(([th,ws,i])=>{const n=ws.filter(w=>S.voc&&S.voc[w[0]]).length;return `<button class="ep" data-vocgo="${i}"><div class="thumb pr-ic" aria-hidden="true">${lv==='Dia a dia'?'Aa':lv}</div><div class="t"><small>${ws.length} palavras</small><b>${esc(th.replace(/^[ABC][12] · /,''))}</b><span>${ws.slice(0,4).map(w=>w[0]).join(', ')}...</span></div><span class="st ${n===ws.length?'done':'new'}">${n}/${ws.length}</span></button>`;}).join('')}</div></details>`).join('')}
 <p class="foot" style="font-size:13px">Cada palavra volta depois de 1, 3, 7, 14 e 30 dias. Quem acerta várias vezes seguidas para de ver a palavra por mais tempo.</p></div>`;
 window.scrollTo(0,0);
}
/* temas agrupados por nível: "B1 · Saúde" vai para o B1; os primeiros temas, sem nível, são do dia a dia */
function vocGrupos(){
 const g={}; VOCAB.forEach(([th,ws],i)=>{const m=th.match(/^([ABC][12]) · /);const lv=m?m[1]:'Dia a dia';(g[lv]=g[lv]||[]).push([th,ws,i]);});
 return ['Dia a dia','A1','A2','B1','B2','C1','C2'].filter(l=>g[l]).map(l=>[l,g[l]]);
}
/* abre o nível onde o aluno está estudando agora (pelo capítulo atual), ou o dia a dia */
function vocNivelAberto(){
 const lv=nivelAtual();
 return vocGrupos().some(([l])=>l===lv)?lv:'Dia a dia';
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
 <div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn" data-wcheck>Conferir</button><button class="btn ghost" data-wmodel>Ver o modelo</button></div><div id="wres"></div><div id="wmod"></div></div></div>`;
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
 document.getElementById('wmod').innerHTML=`<div class="wmodel"><small>MODELO</small><p lang="en">${esc(m)}</p><button class="btn ghost sm" data-wplay>Ouvir o modelo</button></div>`;
}
/* ---------- CERTIFICADO ---------- */
function arcDone(ai){const a=ARCS[ai];for(let i=a.from;i<=a.to;i++) if(S.done[i]==null) return false;return true;}
function certView(ai){
 const a=ARCS[ai]; if(!a) return home(); stopListening(); cur=null;
 const lv=(a.d.match(/[ABC][12](?:–[ABC][12])?/)||[''])[0], dt=new Date().toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
 app.innerHTML=`<div class="wrap">${barHTML('Certificado',esc(a.n))}
 <div class="cert" id="cert"><div class="cert-in"><small>TORRE DO INGLÊS</small><h1>Certificado de conclusão</h1>
 <p>Certificamos que</p><div class="cert-name">${esc(S.name||'Explorador(a)')}</div>
 <p>concluiu o <b>${esc(a.n)}</b>, com ${a.to-a.from+1} capítulos${lv?`, que trabalham assuntos do nível <b>${lv}</b> do Quadro Europeu Comum de Referência (CEFR)`:''}.</p>
 ${(()=>{const md=nivelMedido();return md?`<p>Nível medido no curso: <b>${md.lv}</b> (${esc(md.fonte)}).</p>`:'';})()}
 <div class="cert-can"><small>O QUE VOCÊ PRATICOU NESTE ARCO</small><ul>${(CANDO[ai]||[]).map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>
 <p class="cert-dt">${dt}</p><p class="cert-note">Certificado de progresso pessoal. Não substitui um exame oficial de proficiência.</p></div></div>
 <div class="row noprint" style="margin-top:14px"><button class="btn" data-print>Imprimir ou salvar em PDF</button><button class="btn ghost" data-home>Voltar</button></div>
 <div class="sysw noprint" id="auto">${autoHTML(ai)}</div>
 ${medirArcoHTML(lv)}</div>`;
 window.scrollTo(0,0);
}
/* no certificado: concluir os capítulos não prova o nível; o convite é para medir com o simulado do nível do arco */
function medirArcoHTML(lv){
 const lvs=(lv||'').split('–'), alvo=lvs[lvs.length-1], X=(typeof SIMULADOS!=='undefined'?SIMULADOS:[]).find(x=>x.nivel===alvo)||null;
 return `<div class="sysw noprint"><div class="tag">[ MEÇA O SEU NÍVEL ]</div><h3>Terminar os capítulos não é o mesmo que dominar o nível</h3>
 <p>Os capítulos apresentam os assuntos e fazem você praticar. Para saber se você já entende e usa esse inglês, faça ${X?`o <b>${esc(X.titulo)}</b> ou `:''}o teste de nível. O resultado fica guardado em Inglês fora do curso, para você ver a sua evolução.</p>
 <div class="row">${X?`<button class="btn" data-simid="${X.id}">${esc(X.titulo)}</button>`:''}<button class="btn ${X?'ghost':''}" data-place>Teste de nível</button></div></div>`;
}
/* autoavaliação "eu consigo" (descritores do CEFR): o que ficar como "ainda não" vira revisão do arco */
function autoHTML(ai){
 const L=CANDO[ai]||[], v=(S.auto&&S.auto[ai])||[], falta=L.filter((_,i)=>v[i]===0).length;
 return `<div class="tag">[ COMO VOCÊ SE AVALIA? ]</div><p style="font-size:15px">Seja sincero: marque o que você já consegue fazer sem ajuda. O que ficar como "ainda não" vira revisão.</p>
 <ul class="auto">${L.map((c,i)=>`<li><span>${esc(c)}</span><span class="seg" role="group" aria-label="${esc(c)}"><button class="segb" data-auto="1" data-arc="${ai}" data-i="${i}" aria-pressed="${v[i]===1}">Consigo</button><button class="segb" data-auto="0" data-arc="${ai}" data-i="${i}" aria-pressed="${v[i]===0}">Ainda não</button></span></li>`).join('')}</ul>
 ${falta?`<div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn" data-revarc="${ai}">Revisar este arco (${falta} ${falta===1?'ponto':'pontos'} para reforçar)</button></div>`:''}`;
}
function autoSet(ai,i,val){S.auto=S.auto||{};const v=S.auto[ai]=(S.auto[ai]||[]).slice();v[i]=val;save();const b=document.getElementById('auto');if(b) b.innerHTML=autoHTML(ai);}

/* ===================== GLOSSÁRIO ===================== */
function fold(x){return String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
function gloss(){
 stopListening(); cur=null;
 app.innerHTML=`<div class="wrap"><div class="bar"><button class="back" data-home aria-label="Voltar">${ICON.back}</button><div class="ti"><b>Glossário</b><span>Todas as regras e frases do curso</span></div></div>
 <label class="lab" for="gq">Buscar em inglês ou português</label>
 <input class="field" id="gq" type="search" placeholder="Ex.: passado, since, desistir" autocomplete="off" style="margin-bottom:18px">
 <div id="glist"></div></div>`;
 renderGloss(''); window.scrollTo(0,0);
}
function renderGloss(q){
 const f=fold(q.trim()); let h='';
 CH.forEach((c,i)=>{
  const rows=[];
  c.p.forEach(p=>(p.r||[]).forEach(r=>{if(!f||fold(r[0]+' '+r[1]+' '+c.topic).includes(f)) rows.push(r);}));
  if(!rows.length) return;
  h+=`<div class="sysw"><div class="tag">CAP. ${i+1} · ${c.lv}</div><h3>${esc(c.topic)}</h3>${rows.map(r=>`<div class="rule"><button class="en-say" lang="en" data-say="${esc(r[0])}">${canSpeak?ICON.speak:''}<span>${esc(r[0])}</span></button><div class="ptx">${esc(r[1])}</div></div>`).join('')}<div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn ghost" data-open="${i}">Ler o capítulo ${i+1}</button></div></div>`;
 });
 const el=document.getElementById('glist');
 if(el) el.innerHTML=h||`<p class="empty">Nada encontrado para “${esc(q)}”. Tente outra palavra.</p>`;
}

/* ===================== REVISÃO ESPAÇADA ===================== */
const SRS_INT=[1,1,3,7,14,30];
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return ymd(d);}
function qCount(c){return Math.min(c.boss?5:3,c.q.length);}
function srsUpdate(c,q,ok){S.srs=S.srs||{};const k=c+'-'+q,e=S.srs[k];const b=ok?Math.min(e?e.b+1:1,5):0;S.srs[k]={b,d:addDays(SRS_INT[b])};}
function dueCards(){
 const t=todayKey();
 return Object.keys(S.srs||{}).filter(k=>S.srs[k].d<=t).sort((a,b)=>S.srs[a].d<S.srs[b].d?-1:S.srs[a].d>S.srs[b].d?1:0)
  .map(k=>{const p=k.split('-').map(Number);return {c:p[0],q:p[1]};}).filter(x=>CH[x.c]&&CH[x.c].q[x.q]);
}
function pickQs(i,ch){
 const n=qCount(ch), idx=ch.q.map((_,k)=>k);
 const store=i>=100?(S.bdone||{}):S.done;
 if(store[i]==null) return idx.slice(0,n);
 return shuffle(idx).slice(0,n);
}

/* ===================== TREINO EXTRA ===================== */
let TR=null;
/* Marca texto em inglês para leitores de tela */
function enAttr(t){t=String(t||'');if(!/^[\x00-\x7F’‘“”…—–]+$/.test(t)||!/[a-z]{2}/i.test(t)) return '';if(/\b(não|de|um|uma|para|com|que|os|em|da|dos|das|na|é|ou|se|por|mais|eu|ele|ela|você|dizer|fazer)\b/i.test(t)) return '';return /\b(the|a|an|is|are|am|i|you|he|she|it|we|they|to|of|and|in|on|at|for|with|do|does|did|was|were|be|been|have|has|had|my|your|his|her|our|their|can|could|will|would|should|must|what|where|when|how|who|why|which|not|me|him|us|them|this|that|these|those|there|please|thanks|yes|no|some|any|much|many|than|as|so|such|if|by)\b|'(s|m|re|ll|ve|d|t)\b/i.test(t)||/^[a-z'-]+(ing|ed|ly)$/i.test(t.trim())?' lang="en"':'';}
/* As frases extras de cada capítulo (xs) vêm de conteudo/questoes/arco-NN.json */
function lineBank(ch){const L=[];if(!ch) return L;ch.p.forEach(p=>(p.l||[]).forEach(l=>{if(l[1]&&!/^\(/.test(l[2]||'')) L.push({en:l[1].replace(/["“”]/g,''),pt:gtxt(l[2]),who:l[0]});}));(ch.xs||[]).forEach(x=>L.push({en:x[0],pt:gtxt(x[1]),who:'narr'}));return L;}
function wordsOf(en){return en.split(/\s+/).filter(Boolean);}
function wn(w){return w.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]/g,'');}
function chipText(w){return w.replace(/[.,!?;:]+$/,'');}
function lev(a,b){const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];}
function pickBlank(en){
 const t=wordsOf(en), c=[];
 t.forEach((w,k)=>{const x=wn(w);if(x.length>=3&&!/[0-9]/.test(x)&&!(k>0&&/^[A-Z]/.test(w)))c.push(k);});
 if(!c.length) return -1;
 c.sort((a,b)=>wn(t[b]).length-wn(t[a]).length);
 return c[Math.floor(Math.random()*Math.min(3,c.length))];
}
function buildPractice(i){
 const ok=x=>{const n=wordsOf(x.en).length;return n>=3&&n<=11;};
 let L=shuffle(lineBank(getCh(i))).filter(ok);
 if(L.length<4){for(let d=1;d<4;d++){[i-d,i+d].forEach(j=>{if(j>=0) L=L.concat(shuffle(lineBank(getCh(j))).filter(ok));});if(L.length>=6) break;}}
 if(!L.length) return [];
 let k=0; const take=()=>L[k++%L.length];
 const types=['order','cloze'];
 if(canSpeak) types.push('listen');
 types.push('order');
 if(SR&&!A.blocked) types.push('speak');
 types.push('cloze');
 while(types.length<6) types.push(types.length%2?'order':'cloze');
 return types.slice(0,6).map(t=>{const x=take();if(t==='cloze'){const bi=pickBlank(x.en);return bi<0?{t:'order',x}:{t,x,bi};}return {t,x};});
}
function trainView(i){
 stopListening(); cur=null;
 const items=buildPractice(i);
 if(!items.length){home();return;}
 TR={i,items,n:0,score:0,lock:false};
 renderTrain();
}
function trTitle(){const ch=getCh(TR.i);return (TR.i>=100?'Extra '+(TR.i-99):'Cap. '+(TR.i+1))+' · '+ch.t;}
function renderTrain(){
 if(TR.n>=TR.items.length){trainResult();return;}
 const it=TR.items[TR.n], x=it.x; TR.lock=false;
 let body='';
 if(it.t==='order'){
  let toks=wordsOf(x.en).map(chipText), order=toks.map((_,k)=>k);
  for(let tries=0;tries<6;tries++){order=shuffle(order);if(order.some((v,k)=>toks[v]!==toks[k]))break;}
  body=`<div class="chap-open"><div class="no">MONTE A FRASE EM INGLÊS</div><h1 class="pq">${esc(x.pt)}</h1></div>
  <div class="sysw"><small class="lbl" style="margin-top:0">SUA FRASE</small><div class="build" id="build"></div>
  <small class="lbl">TOQUE NAS PALAVRAS NA ORDEM CERTA</small><div class="chips" id="chips">${order.map(v=>`<button class="chipw" data-w="${v}">${esc(toks[v])}</button>`).join('')}</div>
  <div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn" data-tcheck>Conferir</button><button class="btn ghost" data-tclear>Recomeçar</button></div><div id="tfb"></div></div>`;
 } else if(it.t==='cloze'){
  const t=wordsOf(x.en), w=t[it.bi], core=chipText(w), tail=w.slice(core.length);
  body=`<div class="chap-open"><div class="no">COMPLETE A FRASE</div><p>${esc(x.pt)}</p></div>
  <div class="sysw"><div class="tline">${t.slice(0,it.bi).map(esc).join(' ')} <input class="blank" id="clz" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Palavra que falta" style="width:${Math.max(4,core.length+2)}ch">${esc(tail)} ${t.slice(it.bi+1).map(esc).join(' ')}</div>
  <div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn" data-tcheck>Conferir</button><button class="btn ghost" data-thint>Dica</button></div><div id="tfb"></div></div>`;
 } else if(it.t==='listen'){
  const others=shuffle(lineBank(getCh(TR.i)).concat(lineBank(getCh(TR.i+1)),lineBank(getCh(TR.i-1))).filter(o=>o.en!==x.en)).filter((o,k,a)=>a.findIndex(z=>z.en===o.en)===k).slice(0,2);
  const opts=shuffle([{en:x.en,ok:1}].concat(others.map(o=>({en:o.en,ok:0}))));
  body=`<div class="chap-open"><div class="no">OUÇA E ESCOLHA</div><h1 class="pq">O que foi dito?</h1><p>Tente sem ler antes. Ouça quantas vezes quiser.</p></div>
  <div class="sysw"><div class="row" style="justify-content:flex-start;margin-bottom:14px"><button class="btn" data-tsay>Ouvir</button><button class="btn ghost" data-tsay="slow">Ouvir devagar</button></div>
  <div class="opts">${opts.map(o=>`<button class="opt" data-tk="${o.ok}">${esc(o.en)}</button>`).join('')}</div><div id="tfb"></div></div>`;
 } else {
  body=`<div class="chap-open"><div class="no">DIGA EM INGLÊS</div><h1 class="pq">${esc(x.pt)}</h1><p>Tente lembrar a frase do capítulo e fale no microfone.</p></div>
  <div class="sysw"><div class="bubble l" id="tbub" tabindex="0" data-who="${x.who}"><span class="who">VOCÊ</span><span class="en" lang="en" hidden>${esc(x.en)}</span><span class="hint">Toque no microfone e fale</span><button class="mic" aria-label="Falar a frase" aria-pressed="false">${ICON.mic}</button><div class="pron" hidden></div></div>
  <div class="row" style="justify-content:flex-start;margin-top:14px"><button class="btn ghost" data-tsay>Ouvir a frase</button><button class="btn ghost" data-treveal>Ver a frase</button><button class="btn" data-tnext>Próxima</button></div><div id="tfb"></div></div>`;
 }
 app.innerHTML=`<div class="wrap">${barHTML('Treino extra',`${TR.n+1} de ${TR.items.length} · ${esc(trTitle())}`,`data-open="${TR.i}"`)}<div class="prog" style="position:relative;height:4px;width:${(TR.n/TR.items.length*100).toFixed(0)}%;margin-bottom:6px"></div>${body}</div>`;
 window.scrollTo(0,0);
 if(it.t==='listen') speak(x.en,null,x.who);
 if(it.t==='cloze'){const el=document.getElementById('clz');if(el) try{el.focus({preventScroll:true});}catch(e){}}
}
function trFeedback(ok,extra){
 const it=TR.items[TR.n], x=it.x; TR.lock=true;
 if(ok) TR.score++;
 const fb=document.getElementById('tfb');
 if(fb) fb.innerHTML=`<div class="why" style="margin-top:14px"><b class="${ok?'':'no'}">${ok?'Certo!':'Quase.'}</b> ${extra||''}<div class="tline" style="margin-top:6px">${esc(x.en)}</div><div style="font-size:14px">${esc(x.pt)}</div></div><div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn" data-tnext>${TR.n+1<TR.items.length?'Próxima':'Ver resultado'}</button></div>`;
 document.querySelectorAll('[data-tcheck],[data-thint],.chipw,[data-tclear]').forEach(b=>b.disabled=true);
 speak(x.en,null,x.who);
}
function trainCheck(){
 if(TR.lock) return;
 const it=TR.items[TR.n], x=it.x;
 if(it.t==='order'){
  const got=[...document.querySelectorAll('#build .chipw')].map(b=>wn(b.textContent)).join(' ');
  const want=wordsOf(x.en).map(wn).join(' ');
  if(!got){const fb=document.getElementById('tfb');if(fb) fb.innerHTML='<p style="margin-top:10px">Toque nas palavras para montar a frase.</p>';return;}
  trFeedback(got===want,got===want?'':'A ordem certa é:');
 } else if(it.t==='cloze'){
  const el=document.getElementById('clz'), v=wn(el?el.value:''), want=wn(wordsOf(x.en)[it.bi]);
  if(!v){if(el) el.focus();return;}
  if(el) el.disabled=true;
  if(v===want) trFeedback(true,'');
  else if(want.length>=5&&lev(v,want)<=1) trFeedback(true,`Só um detalhe na grafia: <b>${esc(chipText(wordsOf(x.en)[it.bi]))}</b>.`);
  else trFeedback(false,`A palavra era <b>${esc(chipText(wordsOf(x.en)[it.bi]))}</b>.`);
 }
}
function trainResult(){
 const sc=TR.score, n=TR.items.length, i=TR.i;
 S.xp+=sc*2; markDay(); prog('train'); save();
 const next=i<100&&i+1<CH.length?`<button class="btn ghost" data-open="${i+1}">Próximo capítulo</button>`:'';
 app.innerHTML=`<div class="wrap">${barHTML('Treino extra','Resultado',`data-open="${i}"`)}
 <div class="sysw"><div class="tag">[ TREINO CONCLUÍDO ]</div><div class="place-r"><div class="big">${sc} de ${n}</div><div class="result"><div class="xp">+${sc*2} XP</div></div>
 <p>${sc===n?'Perfeito! Essas frases estão ficando suas.':sc>=n/2?'Bom treino. Repetir amanhã fixa ainda mais.':'Tudo bem errar no treino. É aqui que o cérebro aprende.'}</p>
 <div class="row"><button class="btn" data-train="${i}">Treinar de novo</button>${next}<button class="btn ghost" data-open="${i}">Voltar ao capítulo</button></div>
 <div class="row" style="margin-top:8px"><button class="btn ghost" data-week>Baú do Portal</button></div></div></div></div>`;
 window.scrollTo(0,0);
}

/* ===================== BAÚ DO PORTAL: telas ===================== */
function barHTML(title,sub,back){return `<div class="bar"><button class="back" ${back||'data-home'} aria-label="Voltar">${ICON.back}</button><div class="ti"><b>${title}</b><span>${sub}</span></div><button class="gear" data-settings aria-label="Ajustes">${ICON.gear}<span>Ajustes</span></button></div>`;}
function dotsHTML(w){
 const mon=mondayOf(new Date()), tk=todayKey();
 return `<div class="dots" aria-label="Dias de treino nesta semana">${DOW.map((lab,k)=>{const d=new Date(mon);d.setDate(mon.getDate()+k);const key=ymd(d);return `<div class="dot${w.days[key]?' on':''}${key===tk?' today':''}"><i></i><span>${lab}</span></div>`;}).join('')}</div>`;
}
function chestSVG(c,open){
 return `<svg viewBox="0 0 64 56" aria-hidden="true">${open?`<path d="M20 26 L32 2 L44 26Z" fill="#fff6c9" opacity=".7"/>`:''}<rect x="8" y="26" width="48" height="26" rx="4" fill="${c}" stroke="#1a1626" stroke-width="2"/><path d="M8 39 H56" stroke="#1a1626" stroke-width="1.5" opacity=".35"/>${open?`<path d="M10 24 L13 8 L55 3 L55 20Z" fill="${shade(c,.25)}" stroke="#1a1626" stroke-width="2" stroke-linejoin="round"/>`:`<path d="M8 28 Q8 12 32 12 Q56 12 56 28Z" fill="${shade(c,.25)}" stroke="#1a1626" stroke-width="2"/>`}<rect x="28" y="27" width="8" height="11" rx="2" fill="#1a1626"/><circle cx="32" cy="32" r="1.6" fill="${c}"/></svg>`;
}
function claimable(w){return TIERS.some(t=>!w.claimed[t.k]&&tierReached(t.k,w));}
function officialSite(){
 if(!claudeRt()) return '';
 return `<div class="sysw"><div class="tag">[ VERSÃO OFICIAL ]</div><p style="margin:6px 0 10px">A versão oficial do curso agora é o site, com reconhecimento de voz no aparelho, modo sem internet e todas as novidades. Para levar seu progresso, gere o código em Conta e progresso e carregue no site.</p><div class="row" style="justify-content:flex-start"><a class="btn" href="https://rockdo1do.github.io/CursoIngles/" target="_blank" rel="noopener">Abrir o site</a><button class="btn ghost" data-acct>Levar meu progresso</button></div></div>`;
}
/* ===================== TUTORIAL (passo 6 das boas-vindas) =====================
   Balões flutuantes que apontam cada ferramenta: primeiro na tela inicial, depois no capítulo 1.
   No fim, o curso começa do jeito escolhido no passo 5 (capítulo 1 ou nivelamento). */
const TOUR_STOPS=[
 {scr:'home',sel:'.topbar [data-settings]',t:'Ajustes',d:'Tamanho do texto, tema, perfis para TDAH e TPAC, vozes e microfone. Este botão fica no topo de toda tela.'},
 {scr:'home',sel:'[data-tour=status] .stats',t:'Seu painel',d:'Nível, categoria e andares subidos. Cada capítulo e cada revisão dão XP.'},
 {scr:'home',sel:'[data-tour=status] [data-open]',t:'Começar',d:'Este botão abre o próximo capítulo. Cada um leva de 3 a 5 minutos, e parar no meio também vale.'},
 {scr:'home',sel:'[data-tour=tools]',t:'Glossário, pronúncia e nível',d:'O Glossário reúne todas as regras, com busca. Minha pronúncia mostra seu relatório de fala. O Nivelamento pode ser refeito quando quiser.'},
 {scr:'home',sel:'[data-tour=pratica]',t:'Prática',d:'Além dos capítulos: diálogos para ouvir, textos para ler, cartões de vocabulário e escrita guiada.'},
 {scr:'home',sel:'[data-tour=semana]',t:'Baú da semana',d:'Estude alguns dias por semana e abra baús com roupas, cartas e histórias extras.'},
 {scr:'home',sel:'details.arc summary',t:'Capítulos',d:`São ${ARCS.length} arcos, do A1 ao C1. O último capítulo de cada arco é um chefe; vencendo, você ganha um certificado.`},
 {scr:'rd',sel:'#rd .panel .bubble',t:'Balões da história',d:'Leia em inglês e toque no balão para ver a tradução. O botão “PT sempre” mostra todas de uma vez.'},
 {scr:'rd',sel:'#rd .panel .bubble .say',t:'Ouvir',d:'O alto-falante lê a fala com voz natural. Ouça e repita em voz alta.'},
 {scr:'rd',sel:'#rd .panel .bubble .mic',t:'Falar',d:'Toque no microfone e leia a frase. O curso confere sua pronúncia, palavra por palavra.'},
 {scr:'rd',sel:'#quiz',t:'Teste do Portal',d:'No fim do capítulo, responda às perguntas para liberar o próximo andar e ganhar XP.'},
 {scr:'rd',sel:null,t:'Pronto!',d:'Agora é com você. Boa subida na torre!'}
];
let TOUR=null;
function tourStart(fromWizard){
 stopListening(); closeSettings();
 TOUR={i:0,fromWizard,raf:0};
 document.getElementById('tour')?.remove();
 const el=document.createElement('div'); el.id='tour'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-labelledby','tour-t'); el.setAttribute('aria-describedby','tour-d');
 el.innerHTML='<div class="tour-block"></div><div class="tour-hole" hidden></div><div class="tour-tip" tabindex="-1"><div class="tour-n" id="tour-n"></div><b id="tour-t"></b><p id="tour-d"></p><div class="tour-act"><button class="btn ghost" data-tback>Voltar</button><button class="btn" data-tnext>Seguir</button></div><button class="linkb tour-skip" data-tskip>Pular tutorial</button><i class="tour-arr"></i></div>';
 el.addEventListener('click',ev=>{
  ev.stopPropagation();
  if(ev.target.closest('[data-tnext]')) tourGo(TOUR.i+1,1);
  else if(ev.target.closest('[data-tback]')) tourGo(TOUR.i-1,-1);
  else if(ev.target.closest('[data-tskip]')) tourEnd();
 });
 document.body.appendChild(el);
 window.addEventListener('resize',tourPlaceSoon); window.addEventListener('scroll',tourPlaceSoon,{passive:true}); document.addEventListener('keydown',tourKey,true);
 home(); tourGo(0,1);
}
function tourKey(e){
 if(!TOUR) return;
 if(e.key==='Escape'){e.preventDefault();tourEnd();}
 else if(e.key==='ArrowRight'){e.preventDefault();tourGo(TOUR.i+1,1);}
 else if(e.key==='ArrowLeft'){e.preventDefault();tourGo(TOUR.i-1,-1);}
 else if(e.key==='Tab'){const f=[...document.querySelectorAll('#tour button')].filter(b=>!b.hidden);const k=f.indexOf(document.activeElement);e.preventDefault();f[(k+(e.shiftKey?-1:1)+f.length)%f.length].focus();}
}
function tourGo(i,dir){
 if(!TOUR) return;
 if(i<0){ if(TOUR.fromWizard){tourClose();wizard(WZ_STEPS.indexOf('start'));} return; }
 if(i>=TOUR_STOPS.length){tourEnd();return;}
 const st=TOUR_STOPS[i];
 if(st.scr==='home'&&!document.querySelector('.topbar [data-settings]')) home();
 if(st.scr==='rd'&&(cur!==0||!document.getElementById('rd'))) reader(0);
 if(st.sel&&!document.querySelector(st.sel)){tourGo(i+dir,dir);return;}   /* ferramenta indisponível neste aparelho: pula */
 TOUR.i=i;
 document.getElementById('tour-n').textContent=(TOUR.fromWizard?'PASSO 6 DE 6 · ':'')+'TUTORIAL '+(i+1)+'/'+TOUR_STOPS.length;
 document.getElementById('tour-t').textContent=st.t;
 document.getElementById('tour-d').textContent=st.d;
 const last=i===TOUR_STOPS.length-1;
 document.querySelector('#tour [data-tnext]').textContent=last?(TOUR.fromWizard?(S.startPlan==='place'?'Fazer o nivelamento':'Começar o curso'):'Concluir'):'Seguir';
 document.querySelector('#tour [data-tback]').hidden=i===0&&!TOUR.fromWizard;
 document.querySelector('#tour [data-tskip]').hidden=last;
 const el=st.sel&&document.querySelector(st.sel);
 if(el){
  const r=el.getBoundingClientRect(), vh=innerHeight;
  window.scrollBy(0,r.height>vh*.42?r.top-90:(r.top+r.height/2)-vh*.36);
 } else window.scrollTo(0,0);
 tourPlace();
 try{document.querySelector('#tour [data-tnext]').focus({preventScroll:true});}catch(e){}
}
function tourPlaceSoon(){if(TOUR&&!TOUR.raf) TOUR.raf=requestAnimationFrame(()=>{if(TOUR){TOUR.raf=0;tourPlace();}});}
function tourPlace(){
 if(!TOUR) return;
 const st=TOUR_STOPS[TOUR.i], el=st.sel&&document.querySelector(st.sel), box=document.getElementById('tour');
 const hole=box.querySelector('.tour-hole'), tip=box.querySelector('.tour-tip'), arr=tip.querySelector('.tour-arr');
 const vw=document.documentElement.clientWidth, vh=innerHeight, tw=Math.min(340,vw-24);
 tip.style.width=tw+'px';
 const th=tip.offsetHeight;
 if(!el){hole.hidden=true;box.classList.add('dim');tip.style.left=(vw-tw)/2+'px';tip.style.top=Math.max(12,(vh-th)/2)+'px';arr.hidden=true;return;}
 box.classList.remove('dim');
 const r=el.getBoundingClientRect(), pad=6;
 const top=Math.max(6,r.top-pad), left=Math.max(4,r.left-pad), right=Math.min(vw-4,r.right+pad);
 const bottom=Math.min(r.bottom+pad,top+Math.max(48,vh*.42),vh-6);
 hole.hidden=false; Object.assign(hole.style,{top:top+'px',left:left+'px',width:(right-left)+'px',height:Math.max(0,bottom-top)+'px'});
 const cx=(left+right)/2; let ty, up;
 if(vh-bottom>=th+18){ty=bottom+12;up=true;} else if(top>=th+18){ty=top-th-12;up=false;} else {ty=vh-th-12;up=null;}
 const tx=Math.max(12,Math.min(vw-tw-12,cx-tw/2));
 tip.style.left=tx+'px'; tip.style.top=ty+'px';
 arr.hidden=up===null; arr.className='tour-arr '+(up?'up':'down'); arr.style.left=Math.max(18,Math.min(tw-18,cx-tx))+'px';
}
function tourClose(){
 document.getElementById('tour')?.remove();
 window.removeEventListener('resize',tourPlaceSoon); window.removeEventListener('scroll',tourPlaceSoon); document.removeEventListener('keydown',tourKey,true);
 TOUR=null;
}
function tourEnd(){
 const fw=TOUR&&TOUR.fromWizard; tourClose(); S.tourDone=true; save();
 if(!fw){home();return;}
 if(S.startPlan==='place') placement(); else {if(cur!==0||!document.getElementById('rd')) reader(0); window.scrollTo(0,0);}
}

/* Voz do nome: se o nome do aluno ainda não tem voz gravada, oferece pedir a gravação (fila automática:
   o primeiro nome vai para uma planilha, o GitHub grava a voz e publica no site; ver tools/vozes/nomes.py) */
function nmTemVoz(){const nm=REC.man&&REC.man.nm;return !nm||heroName()==='Rafa'||!!(nm.names.mina||{})[nmNorm(heroName())];}
function nmFila(){const f=(typeof FILA_NOMES!=='undefined'&&FILA_NOMES)||{};return f.form&&f.campo?f:null;}
function nameVoiceCard(){
 if(!REC.man||!REC.man.nm||!S.name) return '';
 const k=nmNorm(heroName()), st=S.nmVoz&&S.nmVoz.k===k?S.nmVoz.st:'';
 if(nmTemVoz()){
  if(st==='pedido'){S.nmVoz.st='pronto';save();
   return `<div class="sysw"><div class="tag">[ SEU NOME GANHOU VOZ ]</div><p style="margin:6px 0 10px">Pronto! Agora a Mina e os outros personagens falam <b>${esc(heroName())}</b> com a própria voz.</p><div class="row" style="justify-content:flex-start"><button class="btn" data-say="Nice to meet you, ${esc(heroName())}!" data-who="mina">Ouvir a Mina</button></div></div>`;}
  return '';
 }
 if(!nmFila()||st==='nao') return '';
 if(st==='pedido'&&Date.now()-(S.nmVoz.t||0)>3*864e5) return '';
 if(st==='pedido') return `<div class="sysw"><div class="tag">[ VOZ DO SEU NOME ]</div><p style="margin:6px 0 0">Pedido enviado. Quando a voz de <b>${esc(heroName())}</b> ficar pronta (em geral, em algumas horas), ela entra sozinha. Até lá, seu nome é dito pela voz do aparelho.</p></div>`;
 return `<div class="sysw"><div class="tag">[ VOZ DO SEU NOME ]</div><p style="margin:6px 0 10px">Os personagens ainda não sabem falar <b>${esc(heroName())}</b> com a própria voz, então seu nome é dito pela voz do aparelho. Quer pedir a gravação? Enviamos só o primeiro nome, sem nada que identifique você.</p><div class="row" style="justify-content:flex-start"><button class="btn" data-nmpedir>Pedir a voz do meu nome</button><button class="btn ghost" data-nmnao>Agora não</button></div><p class="nmmsg" style="margin:8px 0 0;font-size:14px" aria-live="polite"></p></div>`;
}
async function nmPedir(btn){
 const f=nmFila(); if(!f) return; btn.disabled=true;
 const msg=btn.closest('.sysw').querySelector('.nmmsg');
 try{
  await fetch(f.form,{method:'POST',mode:'no-cors',body:new URLSearchParams({[f.campo]:heroName()})});
  S.nmVoz={k:nmNorm(heroName()),st:'pedido',t:Date.now()};save();home();
 }catch(e){btn.disabled=false;if(msg) msg.textContent='Sem internet agora. Tente de novo mais tarde.';}
}
function backupNudge(){
 if(claudeRt()||!(S.xp>0)) return '';
 if(Date.now()-(S.lastBackup||0)<14*864e5) return '';
 return `<div class="sysw nudge-b"><div class="tag">[ GUARDE SEU PROGRESSO ]</div><p style="margin:6px 0 10px">Seu progresso fica só neste aparelho. Alguns navegadores, como o Safari do iPhone, apagam dados de sites pouco usados. Gere seu código de progresso de vez em quando e guarde.</p><div class="row" style="justify-content:flex-start"><button class="btn" data-acct>Gerar código</button><button class="btn ghost" data-backuplater>Lembrar depois</button></div></div>`;
}
function weekCardHTML(){
 const w=S.week, d=daysDone(w), g=S.goal||4, cl=claimable(w), dn=dueCards().length;
 return `<div class="sysw" data-tour="semana"><div class="tag">[ BAÚ DO PORTAL ]</div><h3>${cl?'Você tem um baú para abrir!':`${Math.min(d,7)} de ${g} dias nesta semana`}</h3>${dotsHTML(w)}
 <p style="margin-top:10px;font-size:14px">Missões: ${missionsDone(w)} de 3 · Sequência: ${S.streak||0} semana(s)${dn?` · <b>Revisão de hoje: ${dn}</b>`:''}</p>
 <div class="row" style="margin-top:12px;justify-content:flex-start">${dn&&!cl?`<button class="btn" data-review>Revisar agora (${dn})</button>`:''}<button class="btn${cl?'':' ghost'}" data-week>${cl?'Abrir o baú':'Ver baús e missões'}</button><button class="btn ghost" data-coll>Coleção</button></div></div>`;
}
function missionRow(k,w){const m=MISSIONS[k],p=Math.min(w.mp[k]||0,m.n);return `<div class="mis${p>=m.n?' done':''}"><div class="mis-t"><b>${m.t}</b><span>${p}/${m.n}</span></div><div class="xpbar"><i style="width:${(p/m.n*100).toFixed(0)}%"></i></div></div>`;}
function chestRow(t,w){
 const got=w.claimed[t.k], ready=!got&&tierReached(t.k,w);
 return `<div class="chest ${got?'got':ready?'ready':'lock'}"><div class="chest-i">${chestSVG(t.c,!!got)}</div><div class="chest-t"><b>Baú ${t.n}</b><span>${t.d}${t.k==='silver'?` (${S.goal||4} dias)`:''}</span><span class="chest-p">${got?'Você ganhou: '+esc(rewardName(got)):t.p}</span></div>${got?`<span class="st done">Aberto</span>`:ready?`<button class="btn" data-claim="${t.k}">Abrir</button>`:`<span class="st new">${tierProgress(t.k,w)}</span>`}</div>`;
}
function weekView(){
 stopListening(); cur=null; rollWeek();
 const w=S.week, g=S.goal||4, d=daysDone(w), sun=isSunday(), ms=(S.mistakes||[]).length, dueN=dueCards().length;
 const anyNew=w.missions.some(k=>!(w.mp[k]>0));
 app.innerHTML=`<div class="wrap">${barHTML('Baú do Portal','Recomeça toda segunda-feira')}
 <div class="sysw"><div class="tag">[ META DA SEMANA ]</div><h3>${Math.min(d,7)} de ${g} dias</h3>${dotsHTML(w)}
  <p style="margin-top:10px">Um dia conta quando você termina um capítulo, acerta 3 frases no microfone ou faz uma revisão rápida.</p>
  <small class="lbl">MINHA META</small><div class="seg" role="group" aria-label="Meta semanal">${[3,4,5].map(n=>`<button class="segb" data-goal="${n}" aria-pressed="${g===n}">${n} dias</button>`).join('')}</div></div>
 <div class="sysw"><div class="tag">[ BAÚS ]</div><h3>Prêmios desta semana</h3><div class="chests">${TIERS.map(t=>chestRow(t,w)).join('')}</div></div>
 <div class="sysw"><div class="tag">[ MISSÕES DA SEMANA ]</div><h3>Complete as 3 para o Baú de Ouro</h3>${w.missions.map(k=>missionRow(k,w)).join('')}
  ${!w.reroll&&anyNew?`<div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn ghost" data-reroll>Trocar missões ainda não começadas</button></div><p style="font-size:13px;margin-top:6px">Pode trocar uma vez por semana.</p>`:''}</div>
 <div class="sysw"><div class="tag">[ ${sun?'DOMINGO DE REVISÃO':'REVISÃO RÁPIDA'} ]</div><h3>${sun?'Hoje a revisão vale bônus':'Até 5 perguntas, cerca de 1 minuto'}</h3>
  <p>${dueN?`Hoje há ${dueN} pergunta(s) na sua revisão espaçada. Cada acerto empurra a pergunta para daqui a mais dias.`:ms?`Você tem ${ms} pergunta(s) que errou para rever.`:'Perguntas dos capítulos que você já leu.'} ${sun?(w.sunday?'O bônus de domingo já foi recebido.':'Acerte 80% ou mais para ganhar um item extra.'):'No domingo, a revisão vale um item extra.'}</p>
  <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn" data-review>Começar revisão</button></div></div>
 <div class="sysw"><div class="tag">[ SEQUÊNCIA ]</div><div class="aud-row"><div><small>SEMANAS SEGUIDAS COM A META</small><p>Uma semana perdida por mês é perdoada pelo escudo.</p></div><b class="streak">${S.streak||0}</b></div>
  <p style="margin-top:8px">Escudo deste mês: <b>${S.shieldMonth===monthKey()?'já usado':'disponível'}</b></p></div>
 <div class="row"><button class="btn ghost" data-coll>Ver minha coleção</button></div></div>`;
 window.scrollTo(0,0);
}
function rewardArt(r){
 if(r.type==='cos'){const c=COSM[r.id];return `<div class="art-r me">${avatarSVG(cfgWith(c.kind==='acc'?{acc:r.id}:{outfit:r.id}),'happy')}</div>`;}
 if(r.type==='story'){const b=BONUS[r.id-100];return `<div class="art-r">${av(b.hero,'happy')}</div>`;}
 if(r.type==='gold'&&r.card){const c=cardById(r.card);return `<div class="art-r card-art" style="--tint:${c.tint}">${cardArt(c)}</div>`;}
 return `<div class="art-r">${chestSVG('#f2c94c',true)}</div>`;
}
function rewardView(k,r){
 const t=TIERS.find(x=>x.k===k)||{n:'Bônus'};
 let act='';
 if(r.type==='cos') act=`<button class="btn" data-equip="${r.id}" data-go="coll">Usar agora</button>`;
 if(r.type==='story') act=`<button class="btn" data-open="${r.id}">Ler agora</button>`;
 if(r.type==='gold') act=`<button class="btn" data-coll>Ver na coleção</button>`;
 app.innerHTML=`<div class="wrap">${barHTML('Baú '+t.n,'Prêmio desbloqueado','data-week')}
 <div class="panel bg-gate" style="min-height:260px;align-items:center;justify-content:center">${rewardArt(r)}</div>
 <div class="sysw"><div class="tag">[ BAÚ ${t.n.toUpperCase()} ABERTO ]</div><div class="reward"><h3 style="margin:0">${esc(rewardName(r))}</h3>
 <p>${r.type==='cos'?'Novo item para o seu avatar.':r.type==='story'?'Uma história curta com novas frases para aprender.':r.type==='gold'?'Uma carta rara para o álbum. O título aparece no seu Status quando você escolher usar.':'Você já tem todos os itens deste baú, então ganhou XP.'}</p>
 <div class="row">${act}<button class="btn ghost" data-week>Voltar ao baú</button></div></div></div></div>`;
 window.scrollTo(0,0);
}
function cardArt(c){return c.kind==='boss'?monsterSVG(c.tint):c.sys?SYS_SVG:av(c.who,'det');}
function cardHTML(c){
 const own=!!(S.cards||{})[c.id], rare=c.kind==='rare';
 return `<div class="card${rare?' rare':''}${own?'':' lock'}"><div class="card-art" style="--tint:${c.tint}">${own?cardArt(c):'<span class="qm">?</span>'}</div><div class="card-n">${own?esc(c.n):'???'}</div><div class="card-r">${own?(rare?'RARA':'CHEFE'):esc(c.how)}</div></div>`;
}
function collectionView(keep){
 const y=keep?window.scrollY:0;
 stopListening(); cur=null;
 const owned=CARDS.filter(c=>(S.cards||{})[c.id]).length, eq=S.equip||{};
 app.innerHTML=`<div class="wrap">${barHTML('Coleção','Cartas, roupas, títulos e histórias')}
 <div class="sysw"><div class="tag">[ ÁLBUM ]</div><h3>${owned} de ${CARDS.length} cartas</h3><p style="margin-bottom:12px">Vença os chefes de cada arco e abra Baús de Ouro para completar.</p><div class="cards">${CARDS.map(cardHTML).join('')}</div></div>
 <div class="sysw"><div class="tag">[ GUARDA-ROUPA ]</div><h3>Seu visual</h3><div class="me big">${av('me','happy')}</div>
  <div class="cos">${COS_ORDER.map(k=>{const c=COSM[k],own=(S.cos||[]).includes(k),on=c.kind==='acc'?eq.acc===k:eq.outfit===k,art=avatarSVG(cfgWith(c.kind==='acc'?{acc:k}:{outfit:k}),'happy');
   return own?`<button class="cosb" data-equip="${k}" aria-pressed="${on}"><div class="ca">${art}</div><small>${esc(c.n)}</small></button>`:`<div class="cosb lock"><div class="ca">${art}</div><small>${esc(c.n)}<br>Baú Bronze</small></div>`;}).join('')}</div>
  <p style="font-size:13px;margin-top:10px">Toque num item para vestir ou tirar. Você pode usar um acessório e uma roupa ao mesmo tempo.</p></div>
 <div class="sysw"><div class="tag">[ TÍTULOS ]</div><h3>Aparecem acima do seu nome</h3><div class="tlist">${TITLES.map((t,i)=>(S.titles||[]).includes(i)?`<button class="opt" data-title="${i}" aria-pressed="${S.title===i}">${esc(t)}</button>`:`<div class="lockt">??? · Baú de Ouro</div>`).join('')}</div></div>
 <div class="sysw"><div class="tag">[ HISTÓRIAS EXTRAS ]</div><h3>Contos do Clube</h3><div class="eps">${BONUS.map((b,i)=>{const id=100+i,own=(S.bonus||[]).includes(id),dn=(S.bdone||{})[id];
   return own?`<button class="ep" data-open="${id}"><div class="thumb bg-${b.bg}">${av(b.hero,'happy')}</div><div class="t"><small>EXTRA ${i+1} · <span class="lvl">${b.lv}</span></small><b>${esc(b.t)}</b><span>${esc(b.topic)}</span></div>${dn!=null?`<span class="st done">${dn}/${b.q.length}</span>`:`<span class="st next">LER</span>`}</button>`
   :`<div class="ep locked"><div class="thumb bg-${b.bg}"></div><div class="t"><small>EXTRA ${i+1}</small><b>???</b><span>Abra um Baú de Prata</span></div><span class="st lockd">BLOQUEADO</span></div>`;}).join('')}</div></div>
 <div class="row"><button class="btn ghost" data-week>Ir para o Baú do Portal</button></div></div>`;
 window.scrollTo(0,y);
}

/* ===================== APRENDER MELHOR: lembrar sem olhar e misturar o que confunde =====================
   Aquecimento: ao abrir um capítulo novo, 2 perguntas de capítulos já feitos, de memória (prática de recuperação).
   Mistura: na revisão, uma pergunta do assunto "rival" vem logo depois (prática intercalada); os pares ficam em
   conteudo/pratica/confusoes.json. */
let CONF=null;
/* cada grupo tem dois lados (ex.: passado simples × present perfect); cada lado lista, por capítulo (título),
   as perguntas que são mesmo sobre ele. Um par sempre junta uma pergunta de cada lado. */
function confGroups(){
 if(!CONF) CONF=(typeof CONFUSOES!=='undefined'&&CONFUSOES||[]).map(g=>{
  const lados=(g.lados||[]).map(l=>{const qs={};Object.entries(l.perguntas||{}).forEach(([t,ls])=>{const i=CH.findIndex(c=>c.t===t);if(i>=0) qs[i]=ls.filter(q=>CH[i].q[q]);});return {nome:l.nome,qs};});
  const idx=[...new Set(lados.flatMap(l=>Object.keys(l.qs).map(Number)))];
  return {nome:g.nome,dica:g.dica,lados,idx};
 }).filter(g=>g.lados.length===2&&g.lados.every(l=>Object.keys(l.qs).length));
 return CONF;
}
function confOf(c){return confGroups().filter(g=>g.idx.includes(c));}
/* em que lado do grupo está a pergunta q do capítulo c (sem q: o lado do capítulo); -1 se em nenhum */
function ladoDe(g,c,q){return g.lados.findIndex(l=>l.qs[c]&&(q==null||l.qs[c].includes(q)));}
function doneOther(c){return Object.keys(S.done).map(Number).filter(i=>i<CH.length&&i!==c);}
/* pergunta do OUTRO lado do assunto, de um capítulo já feito; evita as chaves em "usadas" */
function ladoPergs(l,usadas,fora){return shuffle(Object.entries(l.qs).flatMap(([c,qs])=>(+c===fora||S.done[c]==null)?[]:qs.filter(q=>!usadas.has(c+'-'+q)).map(q=>({c:+c,q}))));}
function rivalQ(c,usadas,q){
 for(const g of shuffle(confOf(c))){
  const s=ladoDe(g,c,q); if(s<0) continue;
  const r=ladoPergs(g.lados[1-s],usadas,c)[0];
  if(r) return {c:r.c,q:r.q,conf:g};
 }
 return null;
}
function pickWarm(i){
 const done=doneOther(i); if(done.length<2) return [];
 const out=[], usadas=new Set(), add=x=>{if(x&&out.length<2&&!usadas.has(x.c+'-'+x.q)&&CH[x.c]&&CH[x.c].q[x.q]){usadas.add(x.c+'-'+x.q);out.push(x);}};
 add(rivalQ(i,usadas));                                                     /* o assunto que se confunde com este capítulo */
 dueCards().filter(x=>x.c!==i).forEach(x=>add({c:x.c,q:x.q}));              /* depois, o que já está na hora de revisar */
 (S.mistakes||[]).slice().reverse().filter(m=>m.c!==i).forEach(m=>add({c:m.c,q:m.q}));
 shuffle(done).forEach(c=>add({c,q:Math.floor(Math.random()*CH[c].q.length)}));
 return out;
}
function warmHTML(){
 if(!R.warm||!R.warm.length) return '';
 return `<div class="sysw" id="warm"><div class="tag">[ AQUECIMENTO ]</div><h3>Antes de começar, lembre sem olhar</h3>
 <p style="font-size:15px">${R.warm.length===1?'Uma pergunta':'Duas perguntas'} de capítulos que você já fez. Puxar da memória é o que fixa o inglês.</p>
 ${R.warm.map((it,k)=>{const q=CH[it.c].q[it.q], opts=shuffle(q.o.map((t,j)=>({t,j})));
  return `<div class="q" data-wi="${k}"><div class="qt"><small class="wcap">CAP. ${it.c+1}</small> ${esc(q.q)}</div><div class="opts">${opts.map(o=>`<button class="opt" data-wk="${o.j}"${enAttr(o.t)}>${esc(o.t)}</button>`).join('')}</div><div class="why" hidden></div></div>`;}).join('')}
 <p class="set-note">Dica: leia cada balão em inglês e tente entender antes de tocar para ver a tradução.</p>
 <button class="linkb" data-warmskip>Pular aquecimento</button></div>`;
}
function warmAnswer(btn){
 const qEl=btn.closest('.q'), it=R.warm[+qEl.dataset.wi], q=CH[it.c].q[it.q], k=+btn.dataset.wk, ok=k===q.a;
 if(it.feito) return; it.feito=true;
 qEl.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const bk=+b.dataset.wk;if(bk===q.a)b.classList.add('ok');else if(bk===k)b.classList.add('no');});
 srsUpdate(it.c,it.q,ok);
 S.mistakes=(S.mistakes||[]).filter(m=>!(m.c===it.c&&m.q===it.q)); if(!ok){S.mistakes.push({c:it.c,q:it.q});if(S.mistakes.length>40)S.mistakes.shift();}
 if(ok) S.xp+=3; save();
 const w=qEl.querySelector('.why'); w.hidden=false;
 w.innerHTML=`<b class="${ok?'':'no'}">${ok?'Certo! +3 XP':'Quase.'}</b> ${esc(q.why)}${it.conf?`<span class="confd"><b>${esc(it.conf.nome)}.</b> ${esc(it.conf.dica)}</span>`:''}`;
 if(R.warm.every(x=>x.feito)){const sk=document.querySelector('[data-warmskip]'); if(sk) sk.textContent='Fechar o aquecimento';}
}
/* revisão: cada pergunta de um assunto que se confunde ganha, logo depois, uma do assunto rival (até 2 por sessão) */
function mixRivals(items){
 const out=[], usadas=new Set(items.filter(x=>!x.w).map(x=>x.c+'-'+x.q)); let n=0;
 shuffle(items).forEach(it=>{
  out.push(it);
  if(it.w||n>=2) return;
  const r=rivalQ(it.c,usadas,it.q); if(!r) return;
  usadas.add(r.c+'-'+r.q); n++;
  /* a ordem do par é sorteada: às vezes o lado rival vem antes. A dica da diferença aparece na segunda */
  const rv={c:r.c,q:r.q,conf:r.conf}; out.pop();
  const [x,y]=Math.random()<.5?[it,rv]:[rv,it]; x.mix=true; x.conf=r.conf; y.rival=true; y.conf=r.conf; out.push(x,y);
 });
 if(!n){
  /* nenhuma pergunta puxou um par: escolhe um assunto que a pessoa já estudou dos dois lados e põe o par inteiro */
  for(const g of shuffle(confGroups())){
   const [a,b]=shuffle([0,1]).map(k=>ladoPergs(g.lados[k],usadas)[0]);   /* um de cada lado, em ordem sorteada */
   if(!a||!b||(a.c===b.c&&a.q===b.q)) continue;
   const at=Math.floor(Math.random()*(out.length+1));
   out.splice(at,0,{c:a.c,q:a.q,mix:true,conf:g},{c:b.c,q:b.q,rival:true,conf:g});
   break;
  }
 }
 return out;
}

/* ===================== PRODUÇÃO LIVRE: falar, escrever e mediar =====================
   Tarefas abertas (conteudo/pratica/producao.json): o aluno responde com as próprias palavras, falando ou escrevendo.
   O curso confere o que precisa aparecer (estruturas do capítulo), o que evitar e o tamanho, e mostra uma resposta-modelo
   com áudio. Inspirado nas partes de fala e escrita dos exames de Cambridge e nas tarefas de mediação do CEFR. */
function prodAll(){const P=(typeof PRODUCAO!=='undefined'&&PRODUCAO)||{};return P;}
function prodTask(id){
 const P=prodAll(); if(!id) return null;
 if(id.startsWith('f:')){const t=id.slice(2), f=(P.falar||[]).find(x=>x.capitulo===t);return f?{...f,id,tipo:'falar'}:null;}
 const e=(P.escrever||[]).find(x=>x.id===id); if(e) return {...e,tipo:'escrever'};
 const m=(P.mediar||[]).find(x=>x.id===id); if(m) return {...m,tipo:'mediar',min:4,evitar:[]};
 return simTarefa(id);
}
function prodWords(t){return (String(t).match(/[A-Za-z0-9'’-]+/g)||[]).length;}
function prodCheck(T,text){
 const n=String(text).toLowerCase().replace(/[’‘]/g,"'"), wc=prodWords(text);
 const itens=(T.precisa||[]).map(([rx,txt])=>{let ok=false;try{ok=new RegExp(rx,'i').test(n);}catch(e){}return {txt,ok};});
 const avisos=(T.evitar||[]).filter(([rx])=>{try{return new RegExp(rx,'i').test(n);}catch(e){return false;}}).map(x=>x[1]);
 const minOk=wc>=(T.min||1);
 return {wc,itens,avisos,minOk,ok:minOk&&itens.every(i=>i.ok)&&!avisos.length};
}
function prodBoxHTML(T,opt){
 const fala=opt.fala&&canTalk();
 return `<div class="prod" data-pid="${esc(T.id)}">
 ${T.texto?`<div class="ptexto" lang="pt-BR"><small>EM PORTUGUÊS</small><p>${esc(T.texto)}</p></div>`:''}
 <p class="ppedido">${esc(T.pedido)}${T.min>4&&!/palavras/i.test(T.pedido)?` <span class="pmin">Pelo menos ${T.min} palavras.</span>`:''}</p>
 <details class="pprec"><summary>O que precisa aparecer</summary><ul>${(T.precisa||[]).map(([,t])=>`<li>${esc(t)}</li>`).join('')}</ul></details>
 <div class="row" style="justify-content:flex-start">${fala?`<button class="btn" data-pfalar>${ICON.mic||''} Falar</button>`:''}${opt.escrita||!fala?`<button class="btn${fala?' ghost':''}" data-pescrever${opt.escritaAberta?' hidden':''}>${fala?'Prefiro escrever':'Escrever a resposta'}</button>`:''}</div>
 <div class="pesc"${opt.escritaAberta?'':' hidden'}><label class="lab" for="pt-${esc(T.id)}">Sua resposta em inglês</label>
  <textarea class="field ptxt" id="pt-${esc(T.id)}" lang="en" rows="${opt.linhas||4}" spellcheck="false" autocapitalize="sentences"></textarea>
  <div class="row" style="justify-content:space-between;align-items:center"><small class="pcont" aria-live="polite">0 palavras</small><button class="btn" data-pconf>Conferir</button></div></div>
 <div class="pron" data-pres hidden></div>
 <div class="row" style="justify-content:flex-start;margin-top:6px"><button class="linkb" data-pmodelo>Ver a resposta-modelo</button></div>
 <div class="pmod" hidden></div></div>`;
}
function prodShowModel(box,T){
 const m=box.querySelector('.pmod'); m.hidden=false;
 m.innerHTML=`<div class="tag">[ RESPOSTA-MODELO ]</div><p lang="en" class="pmtxt">${esc(T.modelo).replace(/\n/g,'<br>')}</p>
 <div class="row" style="justify-content:flex-start"><button class="btn ghost sm" data-say="${esc(T.modelo.replace(/\n/g,' '))}" data-who="narr">Ouvir o modelo</button></div>
 <p class="set-note">Compare com a sua: não precisa ser igual. O que importa é usar as estruturas e se fazer entender.</p>`;
 const b=box.querySelector('[data-pmodelo]'); if(b) b.hidden=true;
}
function prodResult(box,T,text,falado){
 const r=prodCheck(T,text), out=box.querySelector('[data-pres]');
 const S0=(S.prod=S.prod||{}), antes=S0[T.id];
 S0[T.id]=Math.max(antes||0,r.ok?2:1); let xp=0;
 if(r.ok&&antes!==2){xp=T.tipo==='escrever'?15:10;S.xp+=xp;}
 save();
 showPron(out,r.ok?'ok':r.itens.some(i=>i.ok)?'mid':'no',
  `<div class="ph"><b>${r.ok?'Muito bem!':'Quase lá.'}</b>${xp?` <span class="xp">+${xp} XP</span>`:''}</div>
  ${falado?`<p class="pouvi"><small>Ouvi:</small> <span lang="en">${esc(text)}</span></p>`:''}
  <ul class="pcheck">${r.itens.map(i=>`<li class="${i.ok?'ok':'no'}">${i.ok?'✓':'✗'} ${esc(i.txt)}</li>`).join('')}
  <li class="${r.minOk?'ok':'no'}">${r.minOk?'✓':'✗'} ${r.wc} palavras${T.min>4?` (mínimo ${T.min})`:''}</li></ul>
  ${r.avisos.map(a=>`<p class="paviso">${esc(a)}</p>`).join('')}
  ${r.ok?'':'<p class="set-note">Tente de novo usando o que ficou com ✗. Você pode olhar a resposta-modelo.</p>'}`);
 prodShowModel(box,T);
 if(SIM&&SIM.task===T.id) simTaskScore(r);
 if(typeof markDay==='function') try{markDay();}catch(e){}
}
async function prodListen(box,T){
 const out=box.querySelector('[data-pres]'), btn=box.querySelector('[data-pfalar]'); stopListening();
 const useWh=WH.st!=='off'&&WH.st!=='fail'&&whCan();
 if(useWh){
  if(WH.st!=='ready'){showPron(out,'info whload','Preparando o reconhecimento de voz no aparelho...');const ok=await whInit();if(!ok){showPron(out,'warn','Não deu para ligar o reconhecimento de voz agora. Escreva a resposta.');box.querySelector('.pesc').hidden=false;return;}}
  const ctl={}; A.active=box; A.rec={abort:()=>ctl.cancel&&ctl.cancel(),stop:()=>ctl.stop&&ctl.stop()}; if(btn) btn.setAttribute('aria-pressed','true');
  showPron(out,'info','Ouvindo... responda em inglês. <span class="lvl-m"><i></i></span><br><small>Termina sozinho quando você parar de falar (até 12 segundos).</small>');
  let cap; try{cap=await whCapture(v=>{const i=out.querySelector('.lvl-m i');if(i) i.style.width=Math.round(v*100)+'%';},ctl);}
  catch(e){A.active=null;A.rec=null;if(btn) btn.setAttribute('aria-pressed','false');showPron(out,'warn',e&&(e.name==='NotAllowedError'||e.name==='SecurityError')?BLOCKED_MSG:'Nenhum microfone encontrado neste aparelho.');return;}
  A.active=null; A.rec=null; if(btn) btn.setAttribute('aria-pressed','false');
  if(!cap) return;
  if(cap.nospeech){showPron(out,'warn','Não ouvi nada. Toque em Falar e responda logo em seguida.');return;}
  showPron(out,'info','Entendendo o que você disse...');
  const sec=cap.pcm.length/16000, r=await whRun(cap.pcm,Math.min(1500,Math.max(384,Math.ceil(sec*50)+96)));
  const txt=(r.text||'').replace(/\[[^\]]*\]|\([^)]*\)/g,'').trim();
  if(r.error||!txt){showPron(out,'warn','Não entendi. Fale um pouco mais alto e perto do microfone, ou escreva a resposta.');return;}
  prodResult(box,T,txt,true); return;
 }
 if(SR){
  let rec; try{rec=new SR();}catch(e){showPron(out,'warn','Não consegui ligar o reconhecimento de voz. Escreva a resposta.');return;}
  rec.lang='en-US'; rec.interimResults=false; rec.continuous=false; rec.maxAlternatives=1; let txt='';
  A.active=box; A.rec=rec; showPron(out,'info','Ouvindo... responda em inglês.');
  rec.onresult=ev=>{txt=[...ev.results].map(x=>x[0].transcript).join(' ');};
  rec.onerror=ev=>{if(ev.error==='not-allowed'){A.blocked=true;showPron(out,'warn',BLOCKED_MSG);}};
  rec.onend=()=>{A.active=null;A.rec=null;if(txt.trim()) prodResult(box,T,txt.trim(),true);else if(!out.className.includes('warn')) showPron(out,'warn','Não ouvi nada. Tente de novo ou escreva a resposta.');};
  try{rec.start();}catch(e){showPron(out,'warn','Não consegui ligar o microfone.');}
  return;
 }
 box.querySelector('.pesc').hidden=false;
}
/* cartão no fim do capítulo */
function falarCardHTML(i){
 const T=prodTask('f:'+CH[i].t); if(!T) return '';
 return `<div class="sysw" id="falar"><div class="tag">[ SUA VEZ DE FALAR ]</div><h3 lang="en">${esc(T.pergunta)}</h3>${prodBoxHTML(T,{fala:true,escrita:true})}</div>`;
}
/* listas e telas de escrita e mediação */
function prodList(tipo){
 stopListening(); cur=null;
 const P=prodAll(), L=tipo==='mediar'?(P.mediar||[]):(P.escrever||[]);
 app.innerHTML=prList(tipo==='mediar'?'Mediação':'Escrever do zero',tipo==='mediar'?'Repasse em inglês o que diz um texto em português':'Mensagens, e-mails e ensaios com as suas palavras',
  L.map(x=>({id:x.id,t:x.titulo,lv:x.nivel,kind:tipo==='mediar'?'Arco '+x.arco:x.tipo,sub:tipo==='mediar'?'Explique em inglês':`Pelo menos ${x.min} palavras`,ic:tipo==='mediar'?'⇄':'✍'})),'data-prodid',Object.fromEntries(Object.entries(S.prod||{}).filter(([k,v])=>v===2)));
 window.scrollTo(0,0);
}
function prodView(id){
 const T=prodTask(id); if(!T) return home(); stopListening(); cur=null;
 const med=T.tipo==='mediar';
 app.innerHTML=`<div class="wrap">${barHTML(med?'Mediação':'Escrever do zero',esc(T.titulo),med?'data-plist="mediar"':'data-plist="escrever"')}
 <div class="chap-open"><div class="no">${esc((med?'MEDIAÇÃO':T.tipo).toUpperCase())} · ${T.nivel}</div><h1 class="pq">${esc(T.titulo)}</h1></div>
 <div class="sysw">${prodBoxHTML(T,med?{fala:true,escrita:true}:{escrita:true,escritaAberta:true,linhas:T.min>=100?10:6})}</div></div>`;
 window.scrollTo(0,0);
}
function prodClick(e){
 const box=e.target.closest('.prod'); if(!box) return false;
 const T=prodTask(box.dataset.pid); if(!T) return false;
 if(e.target.closest('[data-pfalar]')){prodListen(box,T);return true;}
 if(e.target.closest('[data-pescrever]')){box.querySelector('.pesc').hidden=false;e.target.closest('[data-pescrever]').hidden=true;box.querySelector('.ptxt').focus();return true;}
 if(e.target.closest('[data-pconf]')){const t=box.querySelector('.ptxt').value.trim();if(!t){box.querySelector('.ptxt').focus();return true;}prodResult(box,T,t,false);return true;}
 if(e.target.closest('[data-pmodelo]')){prodShowModel(box,T);return true;}
 return false;
}

/* ===================== BANCO DE SONS ===================== */
/* SOM_BANCO vem de conteudo/pratica/sons.json (chave "banco"): grupos de sons com como fazer, erro comum e exemplos */
function sbAll(){return (typeof SOM_BANCO!=='undefined'&&SOM_BANCO||[]).flatMap((g,gi)=>g.sons.map((s,si)=>({...s,g:g.grupo,id:gi+'.'+si})));}
function sbList(){
 stopListening(); cur=null; const vis=S.sb||{};
 app.innerHTML=`<div class="wrap">${barHTML('Banco de sons','Os sons do inglês, um por um')}
 <div class="chap-open"><p>Cada som tem o símbolo usado nos dicionários, como fazer, o erro mais comum de quem fala português e palavras para ouvir e repetir.</p></div>
 ${(SOM_BANCO||[]).map((g,gi)=>`<div class="sysw"><div class="tag">[ ${esc(g.grupo.toUpperCase())} ]</div><div class="sbgrid">${g.sons.map((s,si)=>`<button class="sbb${vis[gi+'.'+si]?' vis':''}" data-sb="${gi}.${si}"><b lang="en">${esc(s.ipa)}</b><span>${esc(s.nome)}</span><small lang="en">${esc(s.ex.map(x=>x[0]).join(', '))}</small></button>`).join('')}</div></div>`).join('')}
 <div class="row"><button class="btn ghost" data-home>Voltar ao início</button></div></div>`;
 window.scrollTo(0,0);
}
function sbView(id){
 const L=sbAll(), i=L.findIndex(x=>x.id===id); if(i<0) return sbList(); stopListening(); cur=null;
 const s=L[i]; S.sb=S.sb||{}; if(!S.sb[id]){S.sb[id]=1;save();}
 const mic=canTalk()?`<button class="mic" aria-label="Falar e treinar a pronúncia" aria-pressed="false">${ICON.mic}</button>`:'';
 const bub=(en,pt,who)=>`<div class="bubble l pword" data-who="narr"><span class="who">${who}</span><span class="en" lang="en">${esc(en)}</span>${pt?`<span class="hint">${esc(pt)}</span>`:''}${mic}<button class="say" data-say="${esc(en)}" data-who="narr" aria-label="Ouvir">${ICON.speak}</button><div class="pron" hidden></div></div>`;
 const prev=L[i-1], next=L[i+1];
 app.innerHTML=`<div class="wrap">${barHTML('Banco de sons',esc(s.g),'data-sbank')}
 <div class="chap-open"><div class="no">${esc(s.g.toUpperCase())}</div><h1 class="pq sbipa" lang="en">${esc(s.ipa)}</h1><p><b>${esc(s.nome)}</b></p></div>
 <div class="sysw"><div class="tag">[ COMO FAZER ]</div><p>${esc(s.como)}</p>
  <div class="tag" style="margin-top:12px">[ ERRO COMUM ]</div><p>${esc(s.erro)}</p></div>
 <div class="sysw"><div class="tag">[ OUÇA E REPITA ]</div>${canTalk()?'<p style="margin-bottom:10px">Toque no alto-falante para ouvir e no microfone para falar.</p>':''}
  <div class="pwlist">${s.ex.map(([w,pt])=>bub(w,pt,'PALAVRA')).join('')}${bub(s.frase[0],s.frase[1],'FRASE')}</div>
  <div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn ghost sm" data-sbslow>Ouvir as palavras devagar</button>${s.par&&EAR_PAIRS.some(p=>p[2]===s.par)?`<button class="btn sm" data-ear="${esc(s.par)}" data-earback="${esc(id)}">Treinar a diferença</button>`:''}</div></div>
 <div class="row" style="justify-content:space-between">${prev?`<button class="btn ghost" data-sb="${prev.id}">‹ ${esc(prev.ipa)}</button>`:'<span></span>'}${next?`<button class="btn ghost" data-sb="${next.id}">${esc(next.ipa)} ›</button>`:`<button class="btn ghost" data-sbank>Todos os sons</button>`}</div></div>`;
 window.scrollTo(0,0);
}
function sbSlow(){
 const ws=[...document.querySelectorAll('.pword .en')].slice(0,3).map(e=>e.textContent); const o=S.slow; S.slow=true; speakSeq(ws.map(t=>({t,who:'narr'})),null); S.slow=o;}

/* ===================== SIMULADOS ===================== */
/* SIMULADOS vem de conteudo/pratica/simulados.json. Em cada pergunta, a certa é "a" (o curso embaralha) */
let SIM=null;
const SIM_IC={leitura:'¶',escuta:'♪',lingua:'Aa',escrita:'✍',fala:'🎙'}, SIM_PTS=4;
function simById(id){return (typeof SIMULADOS!=='undefined'&&SIMULADOS||[]).find(x=>x.id===id);}
function simTarefa(id){for(const X of SIMULADOS||[]) for(const P of X.partes) if(P.tarefa&&P.tarefa.id===id) return {...P.tarefa,titulo:P.tarefa.titulo};return null;}
function simList(){
 stopListening(); cur=null; SIM=null; const b=S.sim||{};
 app.innerHTML=`<div class="wrap">${barHTML('Simulados','Teste o seu nível como numa prova')}
 <div class="chap-open"><p>Cada simulado tem cinco partes: leitura, escuta, gramática, escrita e fala. O formato é curto e inspirado nas provas de Cambridge, mas não é uma prova oficial.</p></div>
 <div class="eps">${(SIMULADOS||[]).map(x=>`<button class="ep" data-simid="${x.id}"><div class="thumb pr-ic" aria-hidden="true">${x.nivel}</div><div class="t"><small>Cerca de ${x.tempo} minutos · ${lvBadge(x.nivel)}</small><b>${esc(x.titulo)}</b><span>${esc(x.desc)}</span></div>${b[x.id]?`<span class="st done">${b[x.id].b}%</span>`:'<span class="st new">NOVO</span>'}</button>`).join('')}</div></div>`;
 window.scrollTo(0,0);
}
function simView(id){
 const X=simById(id); if(!X) return simList(); stopListening(); cur=null; SIM=null; const r=(S.sim||{})[id];
 app.innerHTML=`<div class="wrap">${barHTML('Simulados',esc(X.titulo),'data-sims')}
 <div class="chap-open"><div class="no">SIMULADO · ${X.nivel}</div><h1 class="pq">${esc(X.titulo)}</h1><p>${esc(X.desc)}</p></div>
 <div class="sysw"><div class="tag">[ AS PARTES ]</div><ol class="simpartes">${X.partes.map(P=>`<li><span aria-hidden="true">${SIM_IC[P.tipo]||''}</span> ${esc(P.titulo)}${P.tipo==='escuta'?' <small>(ouve duas vezes)</small>':''}</li>`).join('')}</ol>
 <p class="set-note">Leva cerca de ${X.tempo} minutos. Não tem cronômetro: faça no seu ritmo. Você vê o resultado de cada parte ao terminar.</p>
 ${r?`<p style="margin-top:8px">Seu melhor resultado: <b>${r.b}%</b>.</p>`:''}
 <div class="row" style="margin-top:12px"><button class="btn" data-simgo="${id}">${r?'Fazer de novo':'Começar'}</button></div></div></div>`;
 window.scrollTo(0,0);
}
function simStart(id){SIM={id,k:0,pts:[],max:[],ans:{},plays:0,done:false,task:null};simPart();}
function simQHTML(qs){
 return qs.map((q,qi)=>{const o=shuffle(q.o.map((t,k)=>({t,k})));return `<div class="q" data-sqi="${qi}"><div class="qt">${qi+1}. <span lang="en">${esc(q.q)}</span></div><div class="opts">${o.map(x=>`<button class="sopt" data-sqk="${x.k}" aria-pressed="false" lang="en">${esc(x.t)}</button>`).join('')}</div></div>`;}).join('');
}
function simPart(){
 const X=simById(SIM.id), P=X.partes[SIM.k]; if(!P) return simResult(); stopListening();
 SIM.ans={}; SIM.plays=0; SIM.done=false; SIM.task=P.tarefa?P.tarefa.id:null;
 const top=`${barHTML(esc(X.titulo),`Parte ${SIM.k+1} de ${X.partes.length}: ${esc(P.titulo)}`,`data-simid="${X.id}"`)}
 <div class="simprog" aria-hidden="true">${X.partes.map((_,k)=>`<i class="${k<SIM.k?'ok':k===SIM.k?'on':''}"></i>`).join('')}</div>
 <div class="chap-open"><div class="no">PARTE ${SIM.k+1} · ${esc(P.titulo.toUpperCase())}</div><p>${esc(P.instr||(P.tipo==='escrita'?'Escreva a sua resposta em inglês e toque em Conferir.':'Responda em inglês, falando ou escrevendo.'))}</p></div>`;
 let corpo='';
 if(P.tipo==='leitura') corpo=`<div class="sysw"><h3 lang="en">${esc(P.texto.t)}</h3><div class="rtext" lang="en">${P.texto.p.map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('')}</div></div>`;
 if(P.tipo==='escuta') corpo=`<div class="sysw"><div class="row" style="justify-content:flex-start"><button class="btn" data-simplay>Ouvir</button><small id="simplays" class="set-note" aria-live="polite">Você pode ouvir 2 vezes.</small></div><div id="simtx" hidden style="margin-top:14px"></div></div>`;
 if(P.q) corpo+=`<div class="sysw"><div class="tag">[ PERGUNTAS ]</div>${simQHTML(P.q)}<div class="row" style="margin-top:12px"><button class="btn" data-simconf disabled>Confirmar respostas</button></div><div id="simfb"></div></div>`;
 if(P.tarefa){const T=simTarefa(P.tarefa.id); corpo+=`<div class="sysw">${T.pergunta?`<h3 lang="en">${esc(T.pergunta)}</h3>`:''}${prodBoxHTML(T,P.tipo==='fala'?{fala:true,escrita:true}:{escrita:true,escritaAberta:true,linhas:T.min>=100?10:6})}
  <div class="row" style="margin-top:12px"><button class="btn" data-simnext>${SIM.k+1<X.partes.length?'Próxima parte':'Ver o resultado'}</button></div><p class="set-note" id="simskip">Se pular sem conferir, esta parte vale zero.</p></div>`;}
 app.innerHTML=`<div class="wrap">${top}${corpo}</div>`;
 SIM.max[SIM.k]=P.q?P.q.length:SIM_PTS; SIM.pts[SIM.k]=0;
 window.scrollTo(0,0);
}
function simPick(btn){
 if(SIM.done) return; const qd=btn.closest('[data-sqi]'); SIM.ans[+qd.dataset.sqi]=+btn.dataset.sqk;
 qd.querySelectorAll('.sopt').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
 const P=simById(SIM.id).partes[SIM.k], c=document.querySelector('[data-simconf]'); if(c) c.disabled=Object.keys(SIM.ans).length<P.q.length;
}
function simConfirm(){
 const X=simById(SIM.id), P=X.partes[SIM.k]; if(SIM.done) return; SIM.done=true;
 let sc=0;
 document.querySelectorAll('[data-sqi]').forEach(qd=>{const qi=+qd.dataset.sqi, q=P.q[qi], k=SIM.ans[qi]; if(k===q.a) sc++;
  qd.querySelectorAll('.sopt').forEach(b=>{b.disabled=true;const bk=+b.dataset.sqk;if(bk===q.a) b.classList.add('ok');else if(bk===k) b.classList.add('no');});});
 SIM.pts[SIM.k]=sc;
 const tx=P.tipo==='escuta'?`<button class="btn ghost" data-simtx>Ver o texto do áudio</button>`:'';
 document.getElementById('simfb').innerHTML=`<div class="result"><div class="xp">${sc} de ${P.q.length}</div></div><div class="row" style="margin-top:12px">${tx}<button class="btn" data-simnext>${SIM.k+1<X.partes.length?'Próxima parte':'Ver o resultado'}</button></div>`;
 document.querySelector('[data-simconf]').hidden=true;
}
function simTaskScore(r){
 if(!SIM||!SIM.task) return; const n=r.itens.length+1, ok=r.itens.filter(i=>i.ok).length+(r.minOk?1:0)-r.avisos.length;
 SIM.pts[SIM.k]=Math.max(SIM.pts[SIM.k]||0,Math.max(0,Math.round(SIM_PTS*ok/n)));
 const sk=document.getElementById('simskip'); if(sk) sk.textContent=`Nota desta parte: ${SIM.pts[SIM.k]} de ${SIM_PTS}. Pode tentar de novo para melhorar.`;
}
function simPlay(){
 const P=simById(SIM.id).partes[SIM.k]; if(SIM.plays>=2) return; SIM.plays++;
 const left=2-SIM.plays, el=document.getElementById('simplays'), b=document.querySelector('[data-simplay]');
 if(el) el.textContent=left?'Você pode ouvir mais 1 vez.':'Você já ouviu as 2 vezes.'; if(b){b.textContent='Ouvir de novo';if(!left) b.disabled=true;}
 speakSeq(P.lines.map(l=>({t:l[1],who:l[0]})),null);
}
function simTranscript(){
 const P=simById(SIM.id).partes[SIM.k], el=document.getElementById('simtx'); if(!el) return;
 const nm=w=>w==='narr'?'Apresentadora':esc(w.charAt(0).toUpperCase()+w.slice(1));
 el.innerHTML=P.lines.map(l=>`<div class="lline"><b>${nm(l[0])}:</b> <span lang="en">${esc(l[1])}</span></div>`).join(''); el.hidden=false;
 const b=document.querySelector('[data-simtx]'); if(b) b.hidden=true;
}
function simNext(){stopListening(); SIM.k++; simPart();}
function simResult(){
 const X=simById(SIM.id), tot=SIM.pts.reduce((a,b)=>a+(b||0),0), max=SIM.max.reduce((a,b)=>a+b,0), pct=Math.round(tot/max*100);
 S.sim=S.sim||{}; const prev=S.sim[X.id], gain=Math.round(Math.max(0,pct-(prev?prev.b:0))/5);
 S.sim[X.id]={b:Math.max(pct,prev?prev.b:0),u:pct,d:ymd(new Date())}; medir(X.id,X.nivel,pct); S.xp+=gain; markDay(); save();
 const pc=k=>Math.round((SIM.pts[k]||0)/SIM.max[k]*100);
 const fraca=X.partes.map((P,k)=>({P,k,p:pc(k)})).sort((a,b)=>a.p-b.p)[0];
 const ir={leitura:['data-read','Praticar leitura'],escuta:['data-lsn','Praticar escuta'],lingua:['data-review','Fazer uma revisão'],escrita:['data-plist="escrever"','Escrever do zero'],fala:['data-pron','Minha pronúncia']}[fraca.P.tipo];
 const msg=pct>=75?`Ótimo resultado! Você domina o que se espera do ${X.nivel}.`:pct>=50?`Você está perto do ${X.nivel}. Reforce as partes com menos acertos e tente de novo.`:`O ${X.nivel} ainda está um pouco à frente. Siga os capítulos desse nível e volte ao simulado depois.`;
 app.innerHTML=`<div class="wrap">${barHTML(esc(X.titulo),'Resultado','data-sims')}
 <div class="sysw"><div class="tag">[ RESULTADO ]</div><div class="place-r"><div class="big">${pct}%</div>${gain?`<div class="result"><div class="xp">+${gain} XP</div></div>`:''}<p>${msg}</p></div>
 <ul class="simres">${X.partes.map((P,k)=>`<li><span>${SIM_IC[P.tipo]||''} ${esc(P.titulo)}</span><span class="simbar" aria-hidden="true"><i style="width:${pc(k)}%"></i></span><b>${SIM.pts[k]||0}/${SIM.max[k]}</b></li>`).join('')}</ul>
 ${fraca.p<100?`<p style="margin-top:10px">O que mais vale treinar agora: <b>${esc(fraca.P.titulo.toLowerCase())}</b>.</p>`:''}
 <div class="row" style="margin-top:12px">${fraca.p<100&&ir?`<button class="btn" ${ir[0]}>${ir[1]}</button>`:''}<button class="btn ghost" data-simgo="${X.id}">Fazer de novo</button><button class="btn ghost" data-sims>Outros simulados</button></div></div></div>`;
 SIM=null; window.scrollTo(0,0);
}

/* ===================== INGLÊS FORA DO CURSO ===================== */
/* IMERSAO vem de conteudo/pratica/imersao.json: fontes gratuitas por nível e a referência de horas (Cambridge).
   S.tempo = {dia: segundos de estudo ativo no curso}; S.fora = {dia: minutos de inglês fora do curso}; S.antes = horas antes do curso */
const LV_ORD=['A1','A2','B1','B2','C1','C2'];
/* nível medido: o maior simulado com 70% ou mais, ou o teste de nível; S.medidas guarda o histórico */
function nivelMedido(){
 let best=null;
 for(const X of (typeof SIMULADOS!=='undefined'?SIMULADOS:[])){const r=(S.sim||{})[X.id];if(r&&r.b>=70&&(!best||LV_ORD.indexOf(X.nivel)>LV_ORD.indexOf(best.lv))) best={lv:X.nivel,fonte:`simulado ${X.nivel}, ${r.b}%`,d:r.d};}
 if(S.placed&&typeof S.placed.lv==='number'){const l=S.placed.lv,lv=l===0?'A1':l===5?'C1':PLACE_LV[l];if(!best||LV_ORD.indexOf(lv)>LV_ORD.indexOf(best.lv)) best={lv,fonte:'teste de nível',d:S.placed.d||''};}
 return best;
}
function medir(tipo,lv,pct){S.medidas=(S.medidas||[]).concat([{d:ymd(new Date()),t:tipo,lv,p:Math.round(pct)}]).slice(-30);}
function nivelCapitulos(){
 try{const n=Object.keys(S.done||{}).map(Number).filter(i=>i<CH.length).reduce((a,b)=>Math.max(a,b+1),0);const c=CH[Math.min(CH.length-1,n)];if(c&&c.lv) return c.lv;}catch(e){}
 return 'A1';
}
function horas(){
 const curso=Object.values(S.tempo||{}).reduce((a,b)=>a+b,0)/3600, fora=Object.values(S.fora||{}).reduce((a,b)=>a+b,0)/60, antes=+S.antes||0;
 return {curso,fora,antes,total:curso+fora+antes};
}
function nivelAtual(){const m=nivelMedido();return m?m.lv:nivelCapitulos();}
function metaHoras(){
 const lv=nivelAtual(), M=(IMERSAO&&IMERSAO.metas)||{};
 const prox=LV_ORD.slice(LV_ORD.indexOf(lv)+1).find(l=>M[l])||'C2';
 return {lv,prox,faixa:M[prox]||[1000,1200]};
}
function fmtH(h){return h<1?`${Math.round(h*60)} min`:`${h.toFixed(h<10?1:0).replace('.',',')} h`;}
function fontesDoNivel(lv){return (IMERSAO.fontes||[]).filter(f=>f.niveis.includes(lv));}
function fonteUrl(f,lv){return typeof f.url==='string'?f.url:(f.url[lv]||Object.values(f.url)[0]);}
const IM_IC={ouvir:'♪',ler:'¶',ver:'▶'};
function fonteHTML(f,lv){
 return `<div class="fonte"><div class="fonte-t"><span class="fonte-ic" aria-hidden="true">${IM_IC[f.tipo]||'•'}</span><div><b>${esc(f.nome)}</b><small>${f.niveis.join(' · ')}</small></div></div>
 <p>${esc(f.desc)}</p><p class="fonte-como"><b>Como usar:</b> ${esc(f.como)}</p>
 <div class="row" style="justify-content:flex-start"><a class="btn sm" href="${esc(fonteUrl(f,lv))}" target="_blank" rel="noopener noreferrer">Abrir ${esc(f.nome.split(':')[0])}</a></div></div>`;
}
function registroHTML(){
 const hoje=(S.fora||{})[ymd(new Date())]||0;
 return `<div class="imreg"><p>Ouviu, leu ou assistiu algo em inglês fora do curso? Registre aqui:</p>
 <div class="seg" role="group" aria-label="Registrar minutos">${[10,20,30,60].map(m=>`<button class="segb" data-fora="${m}">+${m} min</button>`).join('')}</div>
 <p class="set-note" aria-live="polite" id="imhoje">Hoje: ${hoje} min fora do curso.${hoje?' <button class="lnk" data-fora="-10">Desfazer 10 min</button>':''}</p></div>`;
}
function metaHTML(){
 const h=horas(), m=metaHoras(), pct=Math.min(100,Math.round(h.total/m.faixa[0]*100));
 const md=nivelMedido();
 return `<div class="immeta"><p class="imnivel">${md?`Seu nível medido: <b>${md.lv}</b> (${esc(md.fonte)}${md.d?', em '+esc(md.d.split('-').reverse().join('/')):''}).`:`Você ainda não mediu o seu nível. Os capítulos que você estuda agora são do <b>${nivelCapitulos()}</b>, mas isso não é o mesmo que saber esse nível.`} <button class="lnk" data-place>${md?'Medir de novo':'Fazer o teste de nível'}</button></p>
 <div class="imnum"><b>${fmtH(h.total)}</b><span>de inglês até agora</span></div>
 <div class="simbar" aria-hidden="true"><i style="width:${pct}%"></i></div>
 <p>Para o <b>${m.prox}</b>, a Cambridge estima cerca de <b>${m.faixa[0]} a ${m.faixa[1]} horas</b> de estudo, contando do zero. É uma referência, não uma regra: cada pessoa tem o seu ritmo.</p>
 <ul class="imdiv"><li>No curso: ${fmtH(h.curso)}</li><li>Fora do curso: ${fmtH(h.fora)}</li>${h.antes?`<li>Antes do curso: ${fmtH(h.antes)}</li>`:''}</ul></div>`;
}
function imView(){
 stopListening(); cur=null; const lv=nivelAtual(), fs=fontesDoNivel(lv), out=(IMERSAO.fontes||[]).filter(f=>!fs.includes(f));
 app.innerHTML=`<div class="wrap">${barHTML('Inglês fora do curso','Ouvir, ler e assistir de verdade')}
 <div class="chap-open"><p>O curso ensina e faz praticar. Mas para entender inglês de verdade é preciso muito inglês entrando pelos ouvidos e pelos olhos, muito mais do que cabe num aplicativo. Junte 15 a 30 minutos por dia de uma destas fontes ao seu estudo.</p></div>
 <div class="sysw"><div class="tag">[ SUAS HORAS ]</div>${metaHTML()}${registroHTML()}
  <details class="imantes"><summary>Já estudou inglês antes do curso?</summary><p>Conte as horas aproximadas (aulas, cursos, intercâmbio). Assim a conta fica mais justa.</p>
  <div class="row" style="justify-content:flex-start"><input class="field" id="imantes" type="number" min="0" max="5000" step="10" inputmode="numeric" value="${+S.antes||''}" placeholder="Ex.: 120" style="max-width:140px"><button class="btn sm" data-imantes>Salvar</button></div></details></div>
 ${(S.medidas||[]).length?`<div class="sysw"><div class="tag">[ SUAS MEDIÇÕES ]</div><ul class="simres">${S.medidas.slice().reverse().map(m=>`<li><span>${esc(m.d.split('-').reverse().join('/'))} · ${m.t==='teste'?'Teste de nível':'Simulado '+esc(m.lv)}</span><span class="simbar" aria-hidden="true"><i style="width:${m.p}%"></i></span><b>${m.t==='teste'?esc(m.lv):m.p+'%'}</b></li>`).join('')}</ul></div>`:''}
 <div class="sysw"><div class="tag">[ PARA O SEU NÍVEL: ${lv} ]</div>${fs.map(f=>fonteHTML(f,lv)).join('')}</div>
 <div class="sysw"><div class="tag">[ DICAS ]</div><ul class="imdicas">${(IMERSAO.dicas||[]).map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>
 ${out.length?`<details class="vgrp"><summary><b>Fontes de outros níveis</b><span>${out.length} fontes</span></summary>${out.map(f=>fonteHTML(f,f.niveis[0])).join('')}</details>`:''}
 <div class="row"><button class="btn ghost" data-home>Voltar ao início</button></div></div>`;
 window.scrollTo(0,0);
}
/* cartão no fim do capítulo: uma fonte do nível do capítulo, trocando a cada capítulo */
function ouvirHojeHTML(i){
 const c=CH[i]; if(!c||typeof IMERSAO==='undefined') return ''; const fs=fontesDoNivel(c.lv); if(!fs.length) return '';
 const f=fs[i%fs.length];
 return `<div class="sysw" id="ouvirhoje"><div class="tag">[ PARA OUVIR HOJE ]</div><h3>${esc(f.nome)}</h3><p>${esc(f.desc)}</p><p class="fonte-como"><b>Como usar:</b> ${esc(f.como)}</p>
 <div class="row" style="justify-content:flex-start"><a class="btn sm" href="${esc(fonteUrl(f,c.lv))}" target="_blank" rel="noopener noreferrer">Abrir</a><button class="btn ghost sm" data-fora="15">Já fiz: +15 min</button><button class="btn ghost sm" data-imersao>Todas as fontes</button></div>
 <p class="set-note" id="imhoje" aria-live="polite"></p></div>`;
}
function foraAdd(m){
 S.fora=S.fora||{}; const k=ymd(new Date()); S.fora[k]=Math.max(0,Math.min(600,(S.fora[k]||0)+m)); if(!S.fora[k]) delete S.fora[k];
 if(m>0) markDay(); save();
 const el=document.getElementById('imhoje'), hoje=S.fora[k]||0;
 if(document.querySelector('.immeta')){const mt=document.querySelector('.immeta');mt.outerHTML=metaHTML();}
 if(el) el.innerHTML=`Hoje: ${hoje} min fora do curso.${hoje&&document.querySelector('.imreg')?' <button class="lnk" data-fora="-10">Desfazer 10 min</button>':''}`;
 if(m>0) toast(`+${m} min de inglês registrados`);
}
/* tempo de estudo no curso: conta só enquanto a tela está visível e houve toque, tecla ou rolagem no último minuto */
let imAtivo=Date.now(), imAcum=0;
['pointerdown','keydown','scroll','touchstart'].forEach(ev=>addEventListener(ev,()=>{imAtivo=Date.now();},{passive:true,capture:true}));
setInterval(()=>{
 if(document.visibilityState!=='visible'||Date.now()-imAtivo>60000||!S.welcomed) return;
 imAcum+=15; if(imAcum<60) return;
 S.tempo=S.tempo||{}; const k=ymd(new Date()); S.tempo[k]=Math.min(86400,(S.tempo[k]||0)+imAcum); imAcum=0; save();
},15000);

/* Revisão rápida e domingo de revisão */
let RV=null;
function reviewView(arc){
 stopListening(); cur=null;
 const A0=ARCS[arc], noArco=c=>A0==null||(c>=A0.from&&c<=A0.to);
 const seen=new Set(), pool=[];
 (S.mistakes||[]).slice().reverse().forEach(m=>{const k=m.c+'-'+m.q;if(noArco(m.c)&&!seen.has(k)&&CH[m.c]&&CH[m.c].q[m.q]){seen.add(k);pool.push({c:m.c,q:m.q,mist:true});}});
 const due=dueCards().filter(x=>noArco(x.c)).slice(0,8).map(x=>({c:x.c,q:x.q,srs:true}));
 due.forEach(x=>seen.add(x.c+'-'+x.q));
 const mis=pool.filter(x=>!due.some(d=>d.c===x.c&&d.q===x.q));
 const doneIdx=Object.keys(S.done).map(Number).filter(i=>i<CH.length&&noArco(i)), src=doneIdx.length?doneIdx:A0?[...Array(A0.to-A0.from+1).keys()].map(k=>A0.from+k):[0,1,2,3,4,5];
 const extra=shuffle(src.flatMap(c=>CH[c].q.map((_,q)=>({c,q})))).filter(x=>!seen.has(x.c+'-'+x.q));
 let items=due.length>=5?due:due.concat(mis,extra).slice(0,5);
 const xw=(S.xmis||[]).slice(-2).map(x=>({w:x})); if(xw.length) items=items.slice(0,5-xw.length).concat(xw);
 RV={items:mixRivals(items),i:0,score:0,lock:false,sunday:isSunday()};
 renderReview();
}
function renderReview(){
 if(RV.i>=RV.items.length){reviewResult();return;}
 const it=RV.items[RV.i];
 if(it.w){
  app.innerHTML=`<div class="wrap">${barHTML(RV.sunday?'Domingo de revisão':'Revisão rápida',`Pergunta ${RV.i+1} de ${RV.items.length}`,'data-week')}
  <div class="chap-open"><div class="no">ESCRITA · VOCÊ ERROU ESTA ANTES</div><h1 class="pq">Escreva em inglês: “${esc(it.w.pt)}”</h1></div>
  <div class="sysw"><div class="row" style="justify-content:flex-start;margin-bottom:8px"><button class="btn ghost sm" data-qsay="${esc(it.w.en)}" data-who="${esc(it.w.who)}">Ouvir a frase</button></div>
  <div class="qwrite"><input class="field" id="rwin" type="text" lang="en" autocomplete="off" spellcheck="false" aria-label="Sua resposta em inglês" placeholder="Digite em inglês"><button class="btn" data-rwcheck>Conferir</button></div>
  <div class="why" id="rwhy" hidden></div>
  <div class="row" id="rnext" hidden style="margin-top:14px"><button class="btn" data-rnext>${RV.i+1<RV.items.length?'Próxima':'Ver resultado'}</button></div></div></div>`;
  RV.lock=false; window.scrollTo(0,0); return;
 }
 const q=CH[it.c].q[it.q], opts=shuffle(q.o.map((t,k)=>({t,k})));
 app.innerHTML=`<div class="wrap">${barHTML(RV.sunday?'Domingo de revisão':'Revisão rápida',`Pergunta ${RV.i+1} de ${RV.items.length}`,'data-week')}
 <div class="chap-open"><div class="no">CAP. ${it.c+1} · ${CH[it.c].lv}${it.rival?' · ASSUNTO PARECIDO, NÃO CONFUNDA':it.srs?' · REVISÃO ESPAÇADA':it.mist?' · VOCÊ ERROU ESTA ANTES':''}</div><h1 class="pq">${esc(q.q)}</h1></div>
 <div class="sysw"><div class="opts">${opts.map(o=>`<button class="opt" data-rk="${o.k}"${enAttr(o.t)}>${esc(o.t)}</button>`).join('')}</div><div class="why" id="rwhy" hidden></div>
 <div class="row" id="rnext" hidden style="margin-top:14px"><button class="btn" data-rnext>${RV.i+1<RV.items.length?'Próxima':'Ver resultado'}</button></div></div></div>`;
 RV.lock=false; window.scrollTo(0,0);
}
function reviewWrite(){
 if(RV.lock) return; const it=RV.items[RV.i], inp=document.getElementById('rwin'); if(!it||!it.w||!inp) return;
 const v=inp.value.trim(); if(!v){inp.focus();return;} RV.lock=true;
 const r=checkWritten(it.w.en,v); inp.disabled=true;
 if(r.pass){RV.score++; S.xmis=(S.xmis||[]).filter(m=>m.en!==it.w.en); save();}
 const w=document.getElementById('rwhy'); w.hidden=false; w.innerHTML=`<b class="${r.pass?'':'no'}">${r.pass?'Certo!':'Quase.'}</b> Resposta: <span lang="en">${r.toks.map((t,k)=>`<span class="${r.ok[k]?'w-ok':'w-no'}">${esc(t)}</span>`).join(' ')}</span>`;
 document.getElementById('rnext').hidden=false;
}
function reviewAnswer(btn){
 if(RV.lock) return; RV.lock=true;
 const it=RV.items[RV.i], q=CH[it.c].q[it.q], k=+btn.dataset.rk, ok=k===q.a;
 srsUpdate(it.c,it.q,ok);
 if(ok){RV.score++; if(it.mist||it.srs) S.mistakes=(S.mistakes||[]).filter(m=>!(m.c===it.c&&m.q===it.q));}
 btn.closest('.opts').querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.rk===q.a)b.classList.add('ok');else if(b===btn)b.classList.add('no');});
 const w=document.getElementById('rwhy'); w.hidden=false; w.innerHTML=`<b class="${ok?'':'no'}">${ok?'Certo!':'Quase.'}</b> ${esc(q.why)}${it.rival&&it.conf?`<span class="confd"><b>${esc(it.conf.nome)}.</b> ${esc(it.conf.dica)}</span>`:''}`;
 document.getElementById('rnext').hidden=false;
}
function reviewResult(){
 const w=S.week, sc=RV.score, n=RV.items.length;
 S.xp+=sc*5; w.stats.rev++; markDay(); prog('review');
 let bonus=null;
 if(RV.sunday&&!w.sunday&&sc>=Math.ceil(n*.8)){w.sunday=true;const c=nextCosmetic();bonus=c?{type:'cos',id:c}:{type:'xp',n:40};applyReward(bonus);}
 save();
 app.innerHTML=`<div class="wrap">${barHTML(RV.sunday?'Domingo de revisão':'Revisão rápida','Resultado','data-week')}
 <div class="sysw"><div class="tag">[ RESULTADO ]</div><div class="place-r"><div class="big">${sc} de ${n}</div><div class="result"><div class="xp">+${sc*5} XP</div></div>
 <p>Revisão registrada no Baú do Portal.${(S.mistakes||[]).length?` Ainda há ${(S.mistakes||[]).length} pergunta(s) para rever.`:''}</p>
 ${bonus?`<p><b>Bônus de domingo:</b> ${esc(rewardName(bonus))}</p>${bonus.type==='cos'?`<button class="btn" data-equip="${bonus.id}" data-go="coll">Usar agora</button>`:''}`:''}
 <div class="row"><button class="btn${bonus?' ghost':''}" data-week>Voltar ao baú</button><button class="btn ghost" data-review>Revisar de novo</button></div></div></div></div>`;
 window.scrollTo(0,0);
}

/* Resumo da semana (aparece na segunda-feira) */
function recapView(){
 stopListening(); cur=null;
 const L=S.lastWeek, w=S.week; S.recapSeen=w.id; save();
 const msg=L.goalMet?["Great week! You reached your goal.","Ótima semana! Você bateu sua meta."]:["New week, new chance. Let's go!","Semana nova, chance nova. Vamos lá!"];
 app.innerHTML=`<div class="wrap">${barHTML('Resumo da semana','Semana de '+L.id.split('-').reverse().slice(0,2).join('/'))}
 <div class="panel bg-sky has-chr" style="min-height:240px"><div class="chr l">${av('me','happy')}</div><div class="chr r">${av('mina',L.goalMet?'happy':'det')}</div>
  <div class="bubble r" tabindex="0" role="button"><span class="who">MINA</span><span class="en" lang="en">${msg[0]}</span><span class="hint">toque para traduzir</span><span class="pt">${msg[1]}</span>${canSpeak?`<button class="say" data-say="${esc(msg[0])}" data-who="mina" aria-label="Ouvir em inglês">${ICON.speak}</button>`:''}</div></div>
 <div class="sysw"><div class="tag">[ SEMANA PASSADA ]</div><h3>${L.days} de ${L.goal} dias ${L.goalMet?'· meta cumprida':''}</h3>
  <div class="statg"><div><small>CAPÍTULOS</small><b>${L.stats.ch}</b></div><div><small>FRASES FALADAS</small><b>${L.stats.phr}</b></div><div><small>REVISÕES</small><b>${L.stats.rev}</b></div><div><small>MISSÕES</small><b>${L.missionsDone}/3</b></div></div>
  <p>Sequência: <b>${L.streak} semana(s)</b>${L.shieldUsed?'. O escudo do mês protegeu sua sequência.':''}</p>
  ${L.auto.length?`<p style="margin-top:8px">Prêmios guardados para você: <b>${L.auto.map(r=>esc(rewardName(r))).join(', ')}</b></p>`:''}</div>
 <div class="sysw"><div class="tag">[ NESTA SEMANA ]</div><h3>Suas novas missões</h3>${w.missions.map(k=>missionRow(k,w)).join('')}
  <p style="margin-top:10px">Meta: ${S.goal||4} dias. Prêmios: item de avatar, história extra, carta rara e título.</p></div>
 <div class="row"><button class="btn" data-open="${nextIdx()}">Continuar lendo</button><button class="btn ghost" data-week>Ver o Baú do Portal</button></div></div>`;
 window.scrollTo(0,0);
}

/* ===================== CONTA E PROGRESSO ===================== */
/* Validação: tudo que vem de código colado ou da nuvem passa por aqui */
function clampN(v,min,max,def){return typeof v==='number'&&isFinite(v)?Math.min(max,Math.max(min,v)):def;}
const RX_DAY=/^\d{4}-\d{2}-\d{2}$/;
function sanReward(x){
 if(!x||typeof x!=='object') return null;
 if(x.type==='cos'&&COSM[x.id]) return {type:'cos',id:x.id};
 if(x.type==='story'&&Number.isInteger(x.id)&&x.id>=100&&x.id<100+BONUS.length) return {type:'story',id:x.id};
 if(x.type==='gold') return {type:'gold',card:cardById(x.card)?x.card:null,title:Number.isInteger(x.title)&&x.title>=0&&x.title<TITLES.length?x.title:null};
 if(x.type==='xp') return {type:'xp',n:clampN(x.n,0,1000,0)};
 return null;
}
function sanStats(t){t=t||{};return {ch:clampN(t.ch,0,1e5,0),phr:clampN(t.phr,0,1e5,0),boss:clampN(t.boss,0,1e5,0),rev:clampN(t.rev,0,1e5,0)};}
function sanWeek(w){
 if(!w||typeof w!=='object'||!RX_DAY.test(w.id)) return null;
 const r=newWeek(w.id);
 const ms=(Array.isArray(w.missions)?w.missions:[]).filter((k,i,a)=>MISSIONS[k]&&a.indexOf(k)===i).slice(0,3);
 if(ms.length===3) r.missions=ms;
 for(const k in (w.days||{})) if(RX_DAY.test(k)) r.days[k]=1;
 for(const k in (w.dayPhr||{})) if(RX_DAY.test(k)) r.dayPhr[k]=clampN(w.dayPhr[k],0,1e4,0);
 for(const k in (w.mp||{})) if(MISSIONS[k]) r.mp[k]=clampN(w.mp[k],0,1e4,0);
 TIERS.forEach(t=>{const x=sanReward((w.claimed||{})[t.k]);if(x) r.claimed[t.k]=x;if((w.nt||{})[t.k]) r.nt[t.k]=1;});
 r.reroll=!!w.reroll; r.sunday=!!w.sunday;
 r.gq=(Array.isArray(w.gq)?w.gq:[]).filter(x=>typeof x==='string').map(x=>x.slice(0,40)).slice(0,60);
 r.stats=sanStats(w.stats);
 return r;
}
function sanLast(L){
 if(!L||typeof L!=='object'||!RX_DAY.test(L.id)) return null;
 return {id:L.id,days:clampN(L.days,0,7,0),goal:[3,4,5].includes(L.goal)?L.goal:4,goalMet:!!L.goalMet,stats:sanStats(L.stats),missionsDone:clampN(L.missionsDone,0,3,0),auto:(Array.isArray(L.auto)?L.auto:[]).map(sanReward).filter(Boolean),shieldUsed:!!L.shieldUsed,streak:clampN(L.streak,0,9999,0)};
}
function sanitizeState(o){
 const r=defaultS();
 if(!o||typeof o!=='object') return r;
 r.xp=clampN(o.xp,0,1e7,0);
 for(const k in (o.done||{})){const i=+k;if(Number.isInteger(i)&&i>=0&&i<CH.length&&typeof o.done[k]==='number') r.done[i]=clampN(o.done[k],0,5,0);}
 for(const k in (o.bdone||{})){const i=+k;if(Number.isInteger(i)&&i>=100&&i<100+BONUS.length&&typeof o.bdone[k]==='number') r.bdone[i]=clampN(o.bdone[k],0,5,0);}
 r.audioMode=o.audioMode==='tts'?'tts':'rec';
 r.asr=['auto','whisper','browser'].includes(o.asr)?o.asr:'auto'; r.fon=!!o.fon;
 r.lastBackup=clampN(o.lastBackup,0,1e14,0);
 r.tourDone=!!o.tourDone; r.startPlan=o.startPlan==='place'?'place':'zero';
 r.nmVoz=o.nmVoz&&typeof o.nmVoz.k==='string'&&['pedido','nao','pronto'].includes(o.nmVoz.st)?{k:o.nmVoz.k.slice(0,20),st:o.nmVoz.st,t:clampN(o.nmVoz.t,0,1e14,0)}:null;
 r.xmis=(Array.isArray(o.xmis)?o.xmis:[]).filter(x=>x&&typeof x.en==='string'&&typeof x.pt==='string').slice(-20).map(x=>({c:clampN(x.c,0,999,0),en:x.en.slice(0,200),pt:x.pt.slice(0,200),who:/^[a-z_]{2,8}$/.test(x.who)?x.who:'narr'}));
 r.avSex=o.avSex==='m'||o.avSex==='f'?o.avSex:'';
 r.clear=!!o.clear; r.karaoke=o.karaoke!==false; r.repeat=!!o.repeat; r.contrast=!!o.contrast; r.nudgeOff=!!o.nudgeOff;
 const oe=o.ear||{}; r.ear={n:Math.round(clampN(oe.n,0,1e6,0)),ok:Math.round(clampN(oe.ok,0,1e6,0)),c:{}};
 for(const k in (oe.c||{})) if(PTIPS[k]&&Array.isArray(oe.c[k])) r.ear.c[k]=[Math.round(clampN(oe.c[k][0],0,1e5,0)),Math.round(clampN(oe.c[k][1],0,1e5,0))];
 const op=o.pron||{}; r.pron={n:Math.round(clampN(op.n,0,1e6,0)),sum:clampN(op.sum,0,1e8,0),w:{},t:{},tw:{}};
 for(const k in (op.w||{})){const e=op.w[k];if(/^[a-z0-9]{1,30}$/.test(k)&&Array.isArray(e)) r.pron.w[k]=[Math.round(clampN(e[0],0,1e5,0)),Math.round(clampN(e[1],0,1e5,0))];}
 for(const k in (op.t||{})) if(PTIPS[k]) r.pron.t[k]=Math.round(clampN(op.t[k],0,1e6,0));
 for(const k in (op.tw||{})) if(PTIPS[k]&&Array.isArray(op.tw[k])) r.pron.tw[k]=op.tw[k].filter(x=>typeof x==='string'&&/^[a-z0-9]{1,30}$/.test(x)).slice(0,6);
 r.showAll=!!o.showAll; r.slow=!!o.slow; r.calm=!!o.calm; r.welcomed=!!o.welcomed;
 r.voice=typeof o.voice==='string'?o.voice.slice(0,200):'';
 for(const k in (o.spoken||{})) if(/^\d+-\d+-\d+$/.test(k)) r.spoken[k]=1;
 r.name=typeof o.name==='string'?o.name.slice(0,20):'';
 r.avatar=Math.round(clampN(o.avatar,0,AV_PRESETS.length-1,0));
 r.zoom=ZOOMS.some(z=>z[0]===o.zoom)?o.zoom:1;
 r.look=['auto','light','dark'].includes(o.look)?o.look:'auto';
 r.start=Math.round(clampN(o.start,0,CH.length-1,0));
 r.placed=o.placed&&typeof o.placed==='object'?{score:clampN(o.placed.score,0,30,0),arc:Math.round(clampN(o.placed.arc,0,8,0)),lv:Math.round(clampN(o.placed.lv,0,5,0)),d:typeof o.placed.d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(o.placed.d)?o.placed.d:''}:null;
 r.lsn={};r.rd={};r.wr={};for(const [src,dst] of [['lsn','lsn'],['rd','rd'],['wr','wr']]) for(const k in (o[src]||{})) if(/^[lrw]\d{1,2}$/.test(k)) r[dst][k]=clampN(o[src][k],0,20,0);
 r.prod={};for(const k in (o.prod||{})){if(typeof k==='string'&&k.length<60&&[1,2].includes(o.prod[k])) r.prod[k]=o.prod[k];}
 r.sb={};for(const k in (o.sb||{})){if(/^\d{1,2}\.\d{1,2}$/.test(k)&&o.sb[k]===1) r.sb[k]=1;}
 r.sim={};for(const k in (o.sim||{})){const v=o.sim[k];if(/^s-[a-z0-9]{1,4}$/.test(k)&&v&&typeof v==='object'){const n=x=>Math.max(0,Math.min(100,Math.round(+x||0)));r.sim[k]={b:n(v.b),u:n(v.u),d:typeof v.d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v.d)?v.d:''};}}
 const num=(o,max)=>{const r={};for(const k in (o||{})){const v=Math.round(+o[k]);if(/^\d{4}-\d{2}-\d{2}$/.test(k)&&v>0) r[k]=Math.min(max,v);}return r;};
 r.tempo=num(o.tempo,86400); r.fora=num(o.fora,600); r.antes=Math.max(0,Math.min(5000,Math.round(+o.antes||0)));
 r.medidas=(Array.isArray(o.medidas)?o.medidas:[]).filter(m=>m&&/^\d{4}-\d{2}-\d{2}$/.test(m.d)&&/^(teste|s-[a-z0-9]{1,4})$/.test(m.t)&&/^[ABC][12]$/.test(m.lv)).map(m=>({d:m.d,t:m.t,lv:m.lv,p:Math.max(0,Math.min(100,Math.round(+m.p||0)))})).slice(-30);
 r.auto={};for(const k in (o.auto||{})){if(/^\d{1,2}$/.test(k)&&Array.isArray(o.auto[k])) r.auto[k]=o.auto[k].slice(0,20).map(x=>x===1||x===0?x:null);}
 r.voc={};for(const k in (o.voc||{})){const e=o.voc[k];if(typeof k==='string'&&k.length<40&&e&&typeof e==='object'&&/^\d{4}-\d{2}-\d{2}$/.test(e.d||'')) r.voc[k]={b:Math.round(clampN(e.b,0,5,0)),d:e.d};}
 r.goal=[3,4,5].includes(o.goal)?o.goal:4;
 r.streak=Math.round(clampN(o.streak,0,9999,0));
 r.shieldMonth=typeof o.shieldMonth==='string'&&/^\d{4}-\d{2}$/.test(o.shieldMonth)?o.shieldMonth:'';
 r.recapSeen=typeof o.recapSeen==='string'&&RX_DAY.test(o.recapSeen)?o.recapSeen:'';
 r.cos=(Array.isArray(o.cos)?o.cos:[]).filter((k,i,a)=>typeof k==='string'&&COSM[k]&&a.indexOf(k)===i);
 const eq=o.equip||{};
 if(COSM[eq.acc]&&COSM[eq.acc].kind==='acc'&&r.cos.includes(eq.acc)) r.equip.acc=eq.acc;
 if(COSM[eq.outfit]&&COSM[eq.outfit].kind==='outfit'&&r.cos.includes(eq.outfit)) r.equip.outfit=eq.outfit;
 for(const k in (o.cards||{})) if(cardById(k)) r.cards[k]=1;
 r.titles=(Array.isArray(o.titles)?o.titles:[]).filter((t,i,a)=>Number.isInteger(t)&&t>=0&&t<TITLES.length&&a.indexOf(t)===i);
 r.title=r.titles.includes(o.title)?o.title:null;
 r.bonus=(Array.isArray(o.bonus)?o.bonus:[]).filter((t,i,a)=>Number.isInteger(t)&&t>=100&&t<100+BONUS.length&&a.indexOf(t)===i);
 r.mistakes=(Array.isArray(o.mistakes)?o.mistakes:[]).filter(m=>m&&Number.isInteger(m.c)&&CH[m.c]&&Number.isInteger(m.q)&&CH[m.c].q[m.q]).slice(-40).map(m=>({c:m.c,q:m.q}));
 for(const k in (o.srs||{})){const m=/^(\d+)-(\d+)$/.exec(k),e=o.srs[k];if(m&&CH[+m[1]]&&CH[+m[1]].q[+m[2]]&&e&&RX_DAY.test(e.d)) r.srs[k]={b:Math.round(clampN(e.b,0,5,0)),d:e.d};}
 r.week=sanWeek(o.week); r.lastWeek=sanLast(o.lastWeek);
 r._ts=clampN(o._ts,0,1e15,0);
 return r;
}
/* Junta dois progressos sem perder nada */
function maxMap(a,b){const r=Object.assign({},a);for(const k in b) r[k]=Math.max(r[k]==null?-1:r[k],b[k]);return r;}
function union(a,b){return Array.from(new Set([].concat(a||[],b||[])));}
function mergeWeek(x,y){
 if(!x) return y; if(!y) return x;
 if(x.id!==y.id) return x.id>y.id?x:y;
 const w=JSON.parse(JSON.stringify(x));
 Object.assign(w.days,y.days);
 w.dayPhr=maxMap(x.dayPhr,y.dayPhr); w.mp=maxMap(x.mp,y.mp);
 w.claimed=Object.assign({},y.claimed,x.claimed); w.nt=Object.assign({},y.nt,x.nt);
 w.reroll=x.reroll||y.reroll; w.sunday=x.sunday||y.sunday; w.gq=union(x.gq,y.gq).slice(0,60);
 if(y.reroll&&!x.reroll) w.missions=y.missions.slice();
 for(const k in w.stats) w.stats[k]=Math.max(x.stats[k]||0,y.stats[k]||0);
 return w;
}
function mergeState(a,b){
 const fresh=x=>!x.welcomed&&!Object.keys(x.done).length&&!x.xp;
 const newer=fresh(a)&&!fresh(b)?b:fresh(b)&&!fresh(a)?a:((b._ts||0)>(a._ts||0)?b:a), older=newer===a?b:a;
 const r=Object.assign({},older,newer);
 r.title=newer.title!=null?newer.title:older.title;
 r.equip=Object.assign({},older.equip,newer.equip);
 r.done=maxMap(a.done,b.done); r.bdone=maxMap(a.bdone,b.bdone);
 r.xp=Math.max(a.xp,b.xp); r.streak=Math.max(a.streak||0,b.streak||0);
 r.spoken=Object.assign({},a.spoken,b.spoken);
 r.cos=union(a.cos,b.cos); r.bonus=union(a.bonus,b.bonus); r.titles=union(a.titles,b.titles);
 r.cards=Object.assign({},a.cards,b.cards);
 r.welcomed=a.welcomed||b.welcomed;
 r.name=newer.name||older.name;
 r.placed=newer.placed||older.placed;
 r.week=mergeWeek(a.week,b.week);
 r.pron=(b.pron&&b.pron.n>((a.pron||{}).n||0))?b.pron:a.pron;
 r.ear=(b.ear&&b.ear.n>((a.ear||{}).n||0))?b.ear:a.ear;
 r.srs=Object.assign({},a.srs);for(const k in (b.srs||{})){const x=r.srs[k],y=b.srs[k];if(!x||y.b>x.b||(y.b===x.b&&y.d>x.d)) r.srs[k]=y;}
 r.lastWeek=newer.lastWeek||older.lastWeek;
 r._ts=Math.max(a._ts||0,b._ts||0);
 return sanitizeState(r);
}

/* Código de progresso */
function b64u(bytes){let t='';for(let i=0;i<bytes.length;i+=0x8000)t+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));return btoa(t).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function unb64u(t){t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const x=atob(t),b=new Uint8Array(x.length);for(let i=0;i<x.length;i++)b[i]=x.charCodeAt(i);return b;}
async function packState(){
 const json=JSON.stringify(S);
 try{if(window.CompressionStream){const st=new Blob([json]).stream().pipeThrough(new CompressionStream('deflate-raw'));return 'TDI1.'+b64u(new Uint8Array(await new Response(st).arrayBuffer()));}}catch(e){}
 return 'TDI0.'+b64u(new TextEncoder().encode(json));
}
async function unpackState(code){
 const m=String(code).replace(/\s+/g,'').match(/^TDI([01])\.([A-Za-z0-9_-]+)$/);
 if(!m) throw new Error('format');
 const bytes=unb64u(m[2]); let json;
 if(m[1]==='1'){const st=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));json=await new Response(st).text();}
 else json=new TextDecoder().decode(bytes);
 const o=JSON.parse(json);
 if(!o||typeof o!=='object'||typeof o.done!=='object') throw new Error('data');
 return sanitizeState(o);
}

/* Sincronização pela conta do Claude (capabilities db + user) */
const CLOUD={st:'checking',ref:null,name:'',avatar:'',last:0,busy:false,dirty:false,t:null,dl:null};
function claudeRt(){return window.claude&&typeof window.claude.use==='function'?window.claude:null;}
function withTimeout(p,ms){return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej({code:'timeout'}),ms))]);}
async function initCloud(){
 const c=claudeRt();
 if(!c){
  CLOUD.st='site';
  CLOUD.dl={save:({filename,data})=>{try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'text/plain'}));a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},800);return Promise.resolve({status:'saved'});}catch(e){return Promise.reject({code:'unavailable'});}}};
  renderCloud();return;
 }
 c.use('downloads').then(d=>{CLOUD.dl=d;renderCloud();},()=>{});
 let db=null,user=null;
 try{[db,user]=await Promise.all([c.use('db'),c.use('user')]);}catch(e){}
 if(!db||!user){CLOUD.st='off';renderCloud();return;}
 let me=null; try{me=await user.me();}catch(e){}
 if(!me||!me.id){CLOUD.st='off';renderCloud();return;}
 CLOUD.name=me.name||''; CLOUD.avatar=me.avatarUrl||'';
 try{CLOUD.ref=db.doc('data/users/'+me.id+'/progress');}catch(e){CLOUD.st='off';renderCloud();return;}
 await cloudPull();
}
function progKey(x){return JSON.stringify([x.done,x.bdone,x.xp,x.cos,x.cards,x.titles,x.bonus,x.week&&[x.week.days,x.week.mp,x.week.claimed],x.name,x.avatar,x.equip,x.welcomed]);}
async function cloudPull(){
 if(!CLOUD.ref) return;
 const ro=CLOUD.st==='readonly';
 if(!ro){CLOUD.st='checking';renderCloud();}
 let snap=null;
 for(let k=0;k<2&&!snap;k++){
  try{snap=await withTimeout(CLOUD.ref.get(),10000);}
  catch(e){if(!(e&&e.code==='unavailable')||k) break; await new Promise(r=>setTimeout(r,700+Math.random()*900));}
 }
 if(!snap){CLOUD.st=ro?'readonly':'slow';renderCloud();return;}
 const before=progKey(S);
 if(snap.exists){const d=snap.data();if(d&&d.s){S=mergeState(S,sanitizeState(d.s));try{applyHeroName();}catch(e){}try{localStorage.setItem('torre-ingles-v2',JSON.stringify(S));}catch(e){}}}
 const changed=progKey(S)!==before;
 CLOUD.st=ro?'readonly':'on';
 await cloudWrite();
 renderCloud();
 if(changed){applyLook();rollWeek();toast('Progresso sincronizado com sua conta');refreshView();}
}
function cloudPush(){if(CLOUD.st!=='on'||!CLOUD.ref) return;clearTimeout(CLOUD.t);CLOUD.t=setTimeout(cloudWrite,2500);}
async function cloudWrite(){
 clearTimeout(CLOUD.t); CLOUD.t=null;
 if(!CLOUD.ref||CLOUD.st==='readonly'||CLOUD.st==='off') return;
 if(CLOUD.busy){CLOUD.dirty=true;return;}
 CLOUD.busy=true;
 try{await CLOUD.ref.set({v:1,ts:S._ts||Date.now(),s:JSON.parse(JSON.stringify(S))});CLOUD.last=Date.now();CLOUD.st='on';}
 catch(e){const c=e&&e.code;CLOUD.st=c==='invalid_argument'?'readonly':(c==='revoked'||c==='not_granted'||c==='capability_disabled'||c==='capability_removed')?'off':'slow';}
 CLOUD.busy=false; renderCloud();
 if(CLOUD.dirty&&CLOUD.st==='on'){CLOUD.dirty=false;cloudWrite();}
}
document.addEventListener('visibilitychange',()=>{
 if(!CLOUD.ref) return;
 if(document.visibilityState==='hidden'&&CLOUD.t) cloudWrite();
 else if(document.visibilityState==='visible'&&CLOUD.st!=='checking'&&Date.now()-CLOUD.last>60000) cloudPull();
});
function refreshView(){
 if(cur!==null) return;
 if(document.getElementById('comfort')) home();
 else if(document.getElementById('nm')&&!document.querySelector('.bar')&&S.welcomed) home();
 else if(document.getElementById('cloudbox')) acctView(true);
}
function cloudChipHTML(){
 const m={on:['good','Salvo na sua conta'],checking:['dim','Verificando conta...'],slow:['warn','Salvo neste aparelho'],readonly:['warn','Salvo só neste aparelho'],off:['dim','Salvo só neste aparelho']}[CLOUD.st]||['dim','Salvo só neste aparelho'];
 return `<span class="chip ${m[0]}">${m[1]}</span><button class="tog" data-acct>Conta e progresso</button>`;
}
function cloudFootText(){return CLOUD.st==='on'?'Seu progresso é salvo na sua conta do Claude e neste navegador.':'Seu progresso fica salvo neste navegador. Para levar a outro aparelho, use “Conta e progresso”.';}
function cloudBoxInner(){
 const st=CLOUD.st;
 if(st==='site') return `<div class="tag">[ SEU PROGRESSO ]</div><h3>Salvo neste aparelho</h3><p>Seu progresso fica guardado neste navegador, mesmo sem internet. Para continuar em outro celular ou computador, gere o código de progresso abaixo e carregue no outro aparelho.</p>`;
 let h=`<div class="tag">[ CONTA DO CLAUDE ]</div>`;
 if(st==='on') h+=`<h3>Progresso salvo na nuvem</h3><div class="who-row"><div class="me">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" style="width:100%;height:100%;object-fit:cover">`:av('me','happy')}</div><div class="who-t"><small>CONECTADO</small><b class="nm">${esc(CLOUD.name||'Sua conta do Claude')}</b></div><span class="chip good">Sincronizado</span></div>
  <p>Seu progresso é salvo sozinho na sua conta e volta quando você abrir o curso conectado em outro aparelho.${CLOUD.last?' Última sincronização: '+new Date(CLOUD.last).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'.':''}</p>
  <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn ghost" data-sync>Sincronizar agora</button></div>`;
 else if(st==='checking') h+=`<h3>Verificando sua conta...</h3><p>Conferindo se dá para salvar seu progresso na nuvem.</p>`;
 else if(st==='slow') h+=`<h3>Nuvem fora do alcance agora</h3><p>Não foi possível falar com a sua conta. Seu progresso continua salvo neste aparelho e será enviado quando a conexão voltar.</p><div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn ghost" data-sync>Tentar de novo</button></div>`;
 else if(st==='readonly') h+=`<h3>Sua conta só pode ver o curso</h3><p>Você entrou com sua conta do Claude, mas o acesso que recebeu não permite salvar. Peça a quem compartilhou o curso um acesso de participante. Enquanto isso, use o código de progresso abaixo.</p>`;
 else h+=`<h3>Salvar na sua conta</h3><p>A sincronização automática funciona quando você abre o curso conectado à sua conta do Claude com acesso de participante. Nesta visualização ela não está disponível. O código de progresso abaixo funciona para qualquer pessoa.</p>`;
 return h;
}
function renderCloud(){
 const a=document.getElementById('cloudchip'); if(a) a.innerHTML=cloudChipHTML();
 const b=document.getElementById('cloudbox'); if(b) b.innerHTML=cloudBoxInner();
 const f=document.getElementById('cloudfoot'); if(f) f.textContent=cloudFootText();
 const d=document.getElementById('dlwrap'); if(d) d.hidden=!CLOUD.dl;
}
function acctView(keep){
 const y=keep?window.scrollY:0;
 stopListening(); cur=null;
 app.innerHTML=`<div class="wrap">${barHTML('Conta e progresso','Leve seu progresso para qualquer aparelho')}
 <div class="sysw" id="cloudbox">${cloudBoxInner()}</div>
 <div class="sysw"><div class="tag">[ CÓDIGO DE PROGRESSO ]</div><h3>Funciona para todo mundo, sem conta</h3>
  <p>Gere um código aqui e cole no outro aparelho ou navegador, em “Carregar progresso”. O progresso do código é somado ao que já existe lá, então nada se perde.</p>
  <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn" data-mkcode>Gerar meu código</button></div>
  <div id="codebox" hidden><label class="lab" for="codeout" style="margin-top:14px">Seu código. Guarde nas suas anotações ou mande para você mesmo.</label><textarea class="field code" id="codeout" readonly rows="4"></textarea>
   <div class="row" style="justify-content:flex-start;margin-top:10px"><button class="btn ghost" data-copycode>Copiar código</button><span id="dlwrap"${CLOUD.dl?'':' hidden'}><button class="btn ghost" data-dlcode>Baixar como arquivo</button></span></div>
   <p style="font-size:13px;margin-top:8px">O código muda conforme você avança. Gere um novo sempre que for trocar de aparelho.</p></div></div>
 <div class="sysw"><div class="tag">[ CARREGAR PROGRESSO ]</div><h3>Trouxe um código de outro aparelho?</h3>
  <label class="lab" for="codein">Cole o código aqui</label><textarea class="field code" id="codein" rows="4" placeholder="TDI1...." autocomplete="off" spellcheck="false"></textarea>
  <label class="lab" for="codefile" style="margin-top:12px">ou escolha o arquivo de progresso</label><input type="file" id="codefile" class="field" accept=".txt,.json,text/plain">
  <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn" data-loadcode>Carregar progresso</button></div>
  <div id="codemsg" role="status" style="margin-top:10px"></div></div>
 <div class="row"><button class="btn ghost" data-home>Voltar ao início</button></div></div>`;
 window.scrollTo(0,y);
}
function codeMsg(ok,html){const el=document.getElementById('codemsg');if(el) el.innerHTML=`<p style="color:var(${ok?'--ok-text':'--no-text'})">${html}</p>`;}
async function loadCode(text){
 if(!String(text||'').trim()){codeMsg(false,'Cole o código ou escolha o arquivo primeiro.');return;}
 let o;
 try{o=await unpackState(text);}
 catch(e){codeMsg(false,'Esse código não parece válido. Confira se copiou o código inteiro, do “TDI” até o fim.');return;}
 const before=doneCount(), xpb=S.xp;
 S=mergeState(S,o); S.welcomed=true; save(); applyHeroName(); applyLook(); rollWeek();
 codeMsg(true,`<b>Progresso carregado.</b> Capítulos concluídos: ${doneCount()} (antes: ${before}). XP: ${S.xp} (antes: ${xpb}).</p><div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn" data-home>Ir para o início</button></div><p>`);
}

/* ===================== MINHA PRONÚNCIA ===================== */
function pronView(){
 stopListening(); cur=null;
 const P=S.pron||{n:0,sum:0,w:{},t:{},tw:{}}, avg=P.n?Math.round(P.sum/P.n):0;
 const tops=Object.keys(P.t).filter(k=>PTIPS[k]&&k!=='gen').sort((a,b)=>P.t[b]-P.t[a]).slice(0,4);
 const hard=Object.keys(P.w).filter(w=>P.w[w][0]>0).sort((a,b)=>{const ra=P.w[a][0]/(P.w[a][0]+P.w[a][1]),rb=P.w[b][0]/(P.w[b][0]+P.w[b][1]);return rb-ra||P.w[b][0]-P.w[a][0];}).slice(0,12);
 const mic=canTalk()?`<button class="mic" aria-label="Falar a palavra" aria-pressed="false">${ICON.mic}</button>`:'';
 app.innerHTML=`<div class="wrap">${barHTML('Minha pronúncia','Seus sons e palavras para treinar')}
 ${!P.n?`<div class="row" style="justify-content:flex-start;margin-bottom:14px"><button class="btn" data-ear>Treino de sons</button><button class="btn ghost" data-sbank>Banco de sons</button></div><div class="sysw"><div class="tag">[ COMO FUNCIONA ]</div><h3>Ainda não há gravações</h3><p>Toque no microfone de qualquer balão e repita a frase. O curso avalia as palavras, a clareza e o ritmo, e mostra aqui os sons que você mais precisa treinar.</p>${canTalk()?'':'<p style="margin-top:8px">Neste navegador o microfone não está disponível. Abra o curso pelo site, no Chrome, Edge, Firefox ou Safari atualizados.</p>'}</div>`:`
 <div class="row" style="justify-content:flex-start;margin-bottom:14px"><button class="btn" data-ear>Treino de sons</button><button class="btn ghost" data-sbank>Banco de sons</button></div>
 <div class="sysw"><div class="tag">[ RESUMO ]</div><div class="statg"><div><small>FRASES FALADAS</small><b>${P.n}</b></div><div><small>MÉDIA DE ACERTO</small><b>${avg}%</b></div></div>
 <p>${avg>=85?'Sua pronúncia está ótima. Continue treinando frases novas.':avg>=65?'Você está indo bem. Foque nos sons abaixo para subir de nível.':'Comece pelos sons abaixo, ouvindo devagar antes de falar.'}</p></div>
 <div class="sysw"><div class="tag">[ SONS PARA TREINAR ]</div><h3>${tops.length?'Onde você mais tropeça':'Nenhum erro frequente ainda'}</h3>
 ${tops.map(k=>tipHTML({k,words:P.tw[k]||[]}).replace('class="ptip"','class="ptip big"').replace('</b>',` <span class="pcount">${P.t[k]}x</span></b>`)).join('')||'<p>Continue falando as frases dos capítulos para o curso descobrir seus pontos de atenção.</p>'}</div>
 <div class="sysw"><div class="tag">[ PALAVRAS DIFÍCEIS ]</div><h3>Treine uma por uma</h3><p style="margin-bottom:10px">Ouça e depois fale a palavra no microfone.</p>
 <div class="pwlist">${hard.map(w=>`<div class="bubble l pword" data-who="narr"><span class="who">${P.w[w][0]} erro(s) · ${P.w[w][1]} acerto(s)</span><span class="en" lang="en">${esc(w)}</span>${mic}<button class="say" data-say="${esc(w)}" aria-label="Ouvir">${ICON.speak}</button><div class="pron" hidden></div></div>`).join('')||'<p>Nenhuma palavra difícil ainda.</p>'}</div></div>`}
 <div class="row"><button class="btn ghost" data-home>Voltar ao início</button></div></div>`;
 window.scrollTo(0,0);
}

/* ===================== TREINO DE SONS (discriminação auditiva) ===================== */
/* EAR_PAIRS e EAR_GLOSS vêm de conteudo/pratica/sons.json */
let EAR=null;
function earView(cat,back){
 stopListening(); cur=null;
 let ps=cat?EAR_PAIRS.filter(p=>p[2]===cat):EAR_PAIRS; if(!ps.length) ps=EAR_PAIRS;
 /* poucos pares de um som: cada par entra duas vezes, uma com cada palavra */
 const items=ps.length>=6?shuffle(ps).slice(0,10).map(p=>({p,t:Math.random()<.5?0:1})):shuffle(ps.flatMap(p=>[{p,t:0},{p,t:1}])).slice(0,10);
 EAR={i:0,ok:0,lock:false,items,back:back?`data-sb="${back}"`:'data-pron'};
 renderEar();
}
function renderEar(){
 if(EAR.i>=EAR.items.length){earResult();return;}
 const it=EAR.items[EAR.i], w=it.p[it.t];
 app.innerHTML=`<div class="wrap">${barHTML('Treino de sons',`Rodada ${EAR.i+1} de ${EAR.items.length}`,EAR.back||'data-pron')}
 <div class="chap-open"><div class="no">QUAL PALAVRA VOCÊ OUVIU?</div><h1 class="pq">Ouça com atenção</h1><p>As duas palavras são parecidas. Ouça quantas vezes quiser.</p></div>
 <div class="sysw"><div class="row" style="justify-content:flex-start;margin-bottom:14px"><button class="btn" data-esay>Ouvir de novo</button><button class="btn ghost" data-eboth>Ouvir as duas</button></div>
 <div class="opts">${[0,1].map(k=>`<button class="opt big" data-ek="${k}"><b>${it.p[k]}</b><span>${EAR_GLOSS[it.p[k]]||''}</span></button>`).join('')}</div><div id="efb"></div></div></div>`;
 window.scrollTo(0,0);
 sayWords([w]);
}
function earAnswer(btn){
 if(EAR.lock) return; EAR.lock=true;
 const it=EAR.items[EAR.i], k=+btn.dataset.ek, ok=k===it.t;
 if(ok) EAR.ok++;
 const E=S.ear=S.ear||{n:0,ok:0,c:{}}; E.n++; if(ok) E.ok++;
 const c=E.c[it.p[2]]||[0,0]; if(ok) c[0]++; else c[1]++; E.c[it.p[2]]=c;
 btn.closest('.opts').querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.ek===it.t)b.classList.add('ok');else if(b===btn)b.classList.add('no');});
 const T=PTIPS[it.p[2]]||PTIPS.gen;
 document.getElementById('efb').innerHTML=`<div class="why" style="margin-top:14px"><b class="${ok?'':'no'}">${ok?'Certo!':'Era '+esc(it.p[it.t])+'.'}</b> <b>${T.t}:</b> ${T.d}</div>
 <div class="row" style="justify-content:flex-start;margin-top:12px"><button class="btn ghost" data-eboth>Comparar as duas</button><button class="btn" data-enext>${EAR.i+1<EAR.items.length?'Próxima':'Ver resultado'}</button></div>`;
 save();
}
function earResult(){
 const sc=EAR.ok, n=EAR.items.length; S.xp+=sc; markDay(); save();
 const E=S.ear||{c:{}}, weak=Object.keys(E.c).filter(k=>E.c[k][1]>0).sort((a,b)=>E.c[b][1]-E.c[a][1]).slice(0,3);
 app.innerHTML=`<div class="wrap">${barHTML('Treino de sons','Resultado',EAR.back||'data-pron')}
 <div class="sysw"><div class="tag">[ RESULTADO ]</div><div class="place-r"><div class="big">${sc} de ${n}</div><div class="result"><div class="xp">+${sc} XP</div></div>
 <p>${sc>=9?'Seu ouvido está afiado para esses sons.':sc>=6?'Bom treino. Repetir em dias diferentes ajuda o ouvido a separar os sons.':'Esses sons são difíceis no começo. Treine um pouco todo dia, com calma.'}</p></div>
 ${weak.length?`<small class="lbl">SONS PARA OUVIR COM MAIS ATENÇÃO</small>${weak.map(k=>tipHTML({k,words:[]}).replace('class="ptip"','class="ptip big"')).join('')}`:''}
 <div class="row" style="margin-top:14px"><button class="btn" data-ear>Treinar de novo</button><button class="btn ghost" data-sbank>Banco de sons</button><button class="btn ghost" data-pron>Minha pronúncia</button></div></div></div>`;
 window.scrollTo(0,0);
}
function accHTML(){
 const t=(k,l,d)=>`<div class="aud-row"><div><small>${l}</small><p>${d}</p></div><button class="tog" data-opt="${k}" aria-pressed="${!!S[k]}">${S[k]?'Ligado':'Desligado'}</button></div>`;
 return `<div class="sysw" id="acc"><div class="tag">[ ACESSIBILIDADE AUDITIVA ]</div><h3>Fala clara</h3>
 <p style="margin-bottom:12px">Para quem tem dificuldade em entender sons, como no transtorno do processamento auditivo central (TPAC).</p><div class="aud">
 ${t('clear','FALA CLARA','Falas mais lentas, com pausas entre blocos de palavras, consoantes realçadas, volume uniforme e sem eco.')}
 ${t('karaoke','DESTACAR PALAVRAS','As palavras se acendem no balão enquanto são faladas.')}
 ${t('repeat','REPETIR CADA FALA','Cada fala toca duas vezes, com uma pausa entre elas.')}
 <div class="row" style="justify-content:flex-start"><button class="btn ghost" data-cleardemo>Ouvir exemplo</button><button class="btn ghost" data-ear>Treino de sons</button></div>
 <p style="font-size:13px">Estas adaptações ajudam no estudo, mas não substituem o acompanhamento com fonoaudiólogo.</p></div></div>`;
}

/* ===================== LEITOR ===================== */
function panelHTML(p,ch,pi,ci){
 if(p.sys){
  let h=`<div class="sysw"><div class="tag">[ TORRE ]</div><h3>${p.sys}</h3>`;
  if(p.text) h+=`<p>${gtxt(p.text)}</p>`;
  if(p.r) h+=p.r.map(r=>`<div class="rule"><button class="en-say" lang="en" data-say="${esc(r[0])}">${canSpeak?ICON.speak:''}<span>${esc(r[0])}</span></button><div class="ptx">${esc(r[1])}</div></div>`).join('');
  if(p.tip) h+=`<div class="tip">${esc(p.tip)}</div>`;
  return h+`</div>`;
 }
 const sp=[...new Set(p.l.map(x=>x[0]))].sort((a,b)=>(a==='monster')-(b==='monster')).slice(0,2);
 const side={}; sp.forEach((w,i)=>side[w]=i?'r':'l');
 let h=`<div class="panel bg-${p.bg}${sp.length?' has-chr':''}">`;
 if(p.c) h+=`<div class="cap">${esc(gtxt(p.c))}</div>`;
 p.l.forEach(([w,en,pt],li)=>{
  const name=w==='monster'?(ch.mon||'???'):w==='rafa'?esc(heroName().toUpperCase()):w.toUpperCase();
  if(en===null){h+=`<div class="bubble thought ${side[w]}"><span class="who">${name} · pensando</span>${esc(gtxt(pt))}</div>`;return;}
  h+=`<div class="bubble ${side[w]}${w==='monster'?' mon':''}" tabindex="0" role="button" aria-label="Mostrar tradução" data-key="${ci}-${pi}-${li}"><span class="who">${name}</span><span class="en" lang="en">${esc(en)}</span><span class="hint">toque para traduzir</span><span class="pt">${esc(gtxt(pt))}</span>${canTalk()?`<button class="mic" aria-label="Falar a frase e treinar a pronúncia" aria-pressed="false">${ICON.mic}</button>`:''}${canSpeak?`<button class="say" data-say="${esc(en)}" data-who="${w}" aria-label="Ouvir em inglês">${ICON.speak}</button>`:''}<div class="pron" hidden></div></div>`;
 });
 sp.forEach(w=>{h+=`<div class="chr ${side[w]}${w==='monster'?' mon':''}">${av(w,(p.m&&p.m[w])||'normal',MONC[ch.mon])}</div>`;});
 return h+`</div>`;
}

function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function getCh(i){return i>=100?BONUS[i-100]:CH[i];}
let R={usedPT:false};
function reader(i){
 stopListening();
 const ch=getCh(i), bonus=i>=100;
 if(!ch){home();return;}
 if(bonus&&!(S.bonus||[]).includes(i)){collectionView();return;}
 cur=i; R={usedPT:!!S.showAll,qs:pickQs(i,ch),ex:pickExtras(i,ch),warm:!bonus&&S.done[i]==null?pickWarm(i):[]}; recPrefetch(i);
 const back=bonus?'data-coll':'data-home';
 let h=`<div class="wrap ${S.showAll?'showall':''}" id="rd">
 <div class="bar"><button class="back" ${back} aria-label="Voltar">${ICON.back}</button>
  <div class="ti"><b>${bonus?'Extra '+(i-99):(i+1)}. ${ch.t}</b><span>${ch.topic}</span></div>
  <button class="tog" id="tog" aria-pressed="${S.showAll}">PT sempre</button>
  <button class="gear" data-settings aria-label="Ajustes">${ICON.gear}<span>Ajustes</span></button>
  <div class="prog" id="prog"></div></div>
 <div class="chap-open"><div class="no">${bonus?'HISTÓRIA EXTRA '+(i-99):`CAPÍTULO ${String(i+1).padStart(2,'0')} DE ${CH.length}`} · <span class="lvl">${ch.lv}</span>${ch.boss?' · <span class="lvl boss">CHEFE DO ARCO</span>':''}</div><h1>${ch.t}</h1><p>${ch.topic}</p></div>`+warmHTML();
 ch.p.forEach((p,pi)=>h+=panelHTML(p,ch,pi,i));
 h+=`<div class="sysw" id="quiz"><div class="tag">[ TESTE DO PORTAL ]</div><h3>${ch.boss?'Batalha final: '+R.qs.length+' perguntas de revisão':'Responda para liberar o próximo andar'}</h3><p style="font-size:13px;margin-bottom:4px">As perguntas mudam a cada vez que você refaz o capítulo.</p>`;
 const items=R.qs.map(qi=>({mc:qi}));
 shuffle(R.ex||[]).forEach(x=>items.splice(1+Math.floor(Math.random()*items.length),0,{ex:x}));
 items.forEach((it,nq)=>{
  if(it.ex){h+=qxHTML(it.ex,nq+1);return;}
  const qi=it.mc, q=ch.q[qi], opts=shuffle(q.o.map((t,k)=>({t,k})));
  h+=`<div class="q" data-q="${qi}"><div class="qt">${nq+1}. ${esc(q.q)}</div><div class="opts">${opts.map(o=>`<button class="opt" data-k="${o.k}"${enAttr(o.t)}>${esc(o.t)}</button>`).join('')}</div><div class="why" hidden></div></div>`;
 });
 h+=`<div class="result" id="res" hidden></div></div>${bonus?'':falarCardHTML(i)+ouvirHojeHTML(i)}
 <div class="row" style="margin-top:8px"><button class="btn ghost" data-train="${i}">Treino extra</button><button class="btn ghost" ${back}>${bonus?'Voltar para a coleção':'Voltar para a lista'}</button></div>
 <p class="foot" style="font-size:13px;margin-top:14px"><a href="https://github.com/RockDo1do/CursoIngles/issues/new?title=${encodeURIComponent((bonus?'Erro na história extra ':'Erro no capítulo ')+(bonus?i-99:i+1))}&body=${encodeURIComponent('Descreva o erro (frase, tradução, áudio ou questão):\n\n')}" target="_blank" rel="noopener">Achou um erro neste capítulo? Avise aqui</a> (precisa de conta no GitHub)</p></div>`;
 app.innerHTML=h;
 window.scrollTo(0,0);
 answers={};
 onScroll();
}


/* ===================== QUESTÕES DE ESCRITA E PRONÚNCIA (a partir do A2) ===================== */
function canTalk(){return !!SR||(WH.st!=='off'&&WH.st!=='fail'&&whCan());}
function canHear(){return recOn()||canSpeak;}
function pickExtras(i,ch){
 if(!ch||ch.lv==='A1') return [];
 const bank=lineBank(ch).filter(x=>{const n=wordsOf(x.en).length;return n>=3&&n<=10&&!/_{2,}|\.\.\.|…/.test(x.en);});
 if(!bank.length) return [];
 const hi=/^(B1|B2|C1|C2)$/.test(ch.lv), nW=(hi?3:2)+(ch.boss?1:0), nS=canTalk()?(hi?3:2)+(ch.boss?1:0):0;
 const used=new Set(), out=[], take=f=>{const x=shuffle(bank).find(y=>!used.has(y.en)&&f(y));if(x) used.add(x.en);return x;};
 let dict=Math.random()<.5;
 for(let k=0;k<nW;k++){const x=take(()=>true);if(!x) break;out.push({id:'w'+k,t:'write',mode:canHear()&&dict?'dict':'tr',x});dict=!dict;}
 for(let k=0;k<nS;k++){const x=take(y=>wordsOf(y.en).length<=9);if(!x) break;out.push({id:'s'+k,t:'speak',x});}
 return out;
}
function fuzzyEq(a,b){
 a=canonW(a);b=canonW(b); if(a===b) return true;
 if(Math.min(a.length,b.length)<4) return false;
 if(Math.abs(a.length-b.length)>1) return false;
 let d=0,i=0,j=0; while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++d>1) return false;if(a.length>b.length) i++;else if(b.length>a.length) j++;else{i++;j++;}}
 return d+(a.length-i)+(b.length-j)<=1;
}
function checkWritten(target,typed){
 const toks=target.split(/\s+/).filter(Boolean), tw=[], owner=[];
 toks.forEach((t,i)=>norm(t).forEach(w=>{tw.push(w);owner.push(i);}));
 const hw=norm(typed), n=tw.length, m=hw.length;
 const dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
 for(let i=n-1;i>=0;i--) for(let j=m-1;j>=0;j--) dp[i][j]=fuzzyEq(tw[i],hw[j])?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 const hit=new Array(n).fill(false); let i=0,j=0;
 while(i<n&&j<m){if(fuzzyEq(tw[i],hw[j])){hit[i]=true;i++;j++;}else if(dp[i+1][j]>=dp[i][j+1]) i++;else j++;}
 const ok=toks.map(()=>true); tw.forEach((w,k)=>{if(!hit[k]) ok[owner[k]]=false;});
 const got=hit.filter(Boolean).length, acc=n?got/Math.max(n,m):0;
 return {ok,toks,acc,pass:acc>=.85};
}
function qxHTML(x,nq){
 const L=x.x;
 if(x.t==='write'){
  const dict=x.mode==='dict';
  return `<div class="q qx" data-qx="w" data-id="${x.id}"><div class="qt">${nq}. <span class="qtag">ESCRITA</span> ${dict?'Ouça e escreva em inglês o que foi dito.':'Escreva em inglês: “'+esc(L.pt)+'”'}</div>
  ${dict?`<div class="row" style="justify-content:flex-start;margin-bottom:8px"><button class="btn ghost sm" data-qsay="${esc(L.en)}" data-who="${L.who}">Ouvir</button><button class="btn ghost sm" data-qsay="${esc(L.en)}" data-who="${L.who}" data-slow="1">Ouvir devagar</button></div>`:`<p class="qhint">Dica: ${wordsOf(L.en).length} palavras. Pode usar a frase do capítulo.</p>`}
  <div class="qwrite"><input class="field" type="text" lang="en" autocomplete="off" autocapitalize="sentences" spellcheck="false" enterkeyhint="done" aria-label="Sua resposta em inglês" placeholder="Digite em inglês"><button class="btn" data-qcheck>Conferir</button></div>
  <div class="why" hidden></div></div>`;
 }
 return `<div class="q qx" data-qx="s" data-id="${x.id}"><div class="qt">${nq}. <span class="qtag">PRONÚNCIA</span> Leia a frase em voz alta.</div>
  <div class="bubble l qbub" tabindex="0" data-who="${voiceWho(L.who)==='rafa_f'?'rafa':L.who}" data-qx="s"><span class="who">VOCÊ</span><span class="en" lang="en">${esc(L.en)}</span><span class="hint">${esc(L.pt)}</span><button class="say" data-say="${esc(L.en)}" data-who="${L.who}" aria-label="Ouvir em inglês">${ICON.speak}</button><button class="mic" aria-label="Falar a frase" aria-pressed="false">${ICON.mic}</button><div class="pron" hidden></div></div>
  <p class="qhint">Toque no microfone e fale. Acertando 70% ou mais, conta como certo. Você tem 3 tentativas. Sem poder falar agora? O botão abaixo pula todas as questões de fala deste teste.</p>
  <div class="row" style="justify-content:flex-start"><button class="btn ghost sm" data-qskip>Agora não posso falar</button></div>
  <div class="why" hidden></div></div>`;
}
function qxSet(id,val,el,html){
 if(answers[id]!=null) return;
 answers[id]=val;
 const w=el.querySelector(':scope > .why'); if(w&&html){w.hidden=false;w.innerHTML=html;}
 el.classList.add('qdone');
 if(Object.keys(answers).length===R.qs.length+(R.ex||[]).length) finish();
}
function xmisAdd(x){if(!x) return;S.xmis=(S.xmis||[]).filter(m=>m.en!==x.en);S.xmis.push({c:cur,en:x.en,pt:x.pt,who:x.who});S.xmis=S.xmis.slice(-20);save();}
function qxCheck(el){
 const x=(R.ex||[]).find(e=>e.id===el.dataset.id); const inp=el.querySelector('input'); if(!x||!inp||answers[x.id]!=null) return;
 const v=inp.value.trim(); if(!v){inp.focus();inp.classList.add('need');return;}
 const r=checkWritten(x.x.en,v); if(!r.pass) xmisAdd(x.x);
 inp.disabled=true; const b=el.querySelector('[data-qcheck]'); if(b) b.disabled=true;
 const marked=r.toks.map((t,k)=>`<span class="${r.ok[k]?'w-ok':'w-no'}">${esc(t)}</span>`).join(' ');
 qxSet(x.id,r.pass,el,`<b class="${r.pass?'':'no'}">${r.pass?(r.acc>=.999?'Certo!':'Certo! Só um detalhe:'):'Quase.'}</b> Resposta: <span class="pw">${marked}</span>${x.mode==='tr'&&!r.pass?'<br><small>Outras traduções também podem estar certas. Aqui vale a frase usada no capítulo.</small>':''}`);
}
function qxSpoke(bub,acc){
 const el=bub.closest('.qx'); if(!el) return; const id=el.dataset.id; if(answers[id]!=null) return;
 const n=(+el.dataset.tries||0)+1; el.dataset.tries=n;
 if(acc>=70) qxSet(id,true,el,`<b>Certo!</b> Boa pronúncia: ${acc}%.`);
 else if(n>=3){xmisAdd(((R.ex||[]).find(e=>e.id===id)||{}).x);} if(n>=3&&acc<70) qxSet(id,false,el,`<b class="no">Quase.</b> Continue treinando esta frase no Treino extra.`);
 else{const h=el.querySelector('.qhint');if(h) h.textContent=`Tentativa ${n} de 3: ${acc}%. Ouça a frase e tente de novo.`;}
}

let answers={};
function answer(qEl,k){
 const ch=getCh(cur), qi=+qEl.dataset.q, q=ch.q[qi];
 if(answers[qi]!=null) return;
 const ok=k===q.a; answers[qi]=ok;
 if(!ok&&cur<100){S.mistakes=(S.mistakes||[]).filter(m=>!(m.c===cur&&m.q===qi));S.mistakes.push({c:cur,q:qi});if(S.mistakes.length>40)S.mistakes.shift();}
 qEl.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const bk=+b.dataset.k;if(bk===q.a)b.classList.add('ok');else if(bk===k)b.classList.add('no');});
 const w=qEl.querySelector('.why'); w.hidden=false;
 w.innerHTML=`<b class="${ok?'':'no'}">${ok?'Certo!':'Quase.'}</b> ${esc(q.why)}`;
 if(cur<100) srsUpdate(cur,qi,ok);
 if(Object.keys(answers).length===R.qs.length+(R.ex||[]).length) finish();
}
function finish(){
 const ch=getCh(cur), bonus=cur>=100;
 const vals=Object.entries(answers).filter(([k,v])=>v!=='skip'), tot=vals.length;
 const score=vals.filter(([k,v])=>v===true).length, ratio=tot?score/tot:0;
 const mcScore=R.qs.filter(qi=>answers[qi]===true).length;
 let exGain=0; (R.ex||[]).forEach((x,xi)=>{const k=cur+'-99-'+(xi+1);if(answers[x.id]===true&&!S.spoken[k]){S.spoken[k]=1;exGain+=5;}});
 S.bdone=S.bdone||{};
 const store=bonus?S.bdone:S.done, prev=store[cur], first=prev==null;
 const gain=(first?20:0)+Math.max(0,mcScore-(prev||0))*10+exGain;
 const lvBefore=level();
 S.xp+=gain; store[cur]=Math.max(mcScore,prev||0);
 S.week.stats.ch++; markDay(); prog('ch2');
 if(ratio===1) prog('perfect');
 if(ch.boss&&ratio===1) prog('boss');
 if(!R.usedPT) prog('nopt');
 let card=false;
 if(!bonus&&ch.boss&&ratio>=.6){S.cards=S.cards||{};if(!S.cards['b'+cur]){S.cards['b'+cur]=1;card=true;S.week.stats.boss++;}}
 save();
 const up=level()>lvBefore, last=!bonus&&cur===CH.length-1;
 const r=document.getElementById('res'); r.hidden=false;
 const next=bonus?`<button class="btn" data-coll>Ver histórias extras</button>`:last?`<button class="btn" data-home>Ver meu status final</button>`:`<button class="btn" data-open="${cur+1}">Próximo: ${CH[cur+1].t}</button>`;
 r.innerHTML=`<div class="big">${score}/${tot} · ${ratio===1?'ANDAR LIMPO':ratio>=.6?'BOM TRABALHO':'REVEJA AS REGRAS E TENTE DE NOVO'}</div>
 <div class="xp">+${gain} XP${up?` · NÍVEL ${level()}!`:''}</div>
 ${card?`<div class="newcard">Nova carta no álbum: <b>${esc(ch.mon)}</b><button class="btn ghost" data-coll>Ver álbum</button></div>`:''}
 <div class="row" style="margin-top:12px">${next}<button class="btn ghost" data-open="${cur}">Refazer capítulo</button></div>
 <div class="row" style="margin-top:10px"><button class="btn ghost" data-train="${cur}">Treino extra (5 min)</button><button class="btn ghost" data-week>Baú do Portal</button></div>`;
}

function onScroll(){
 const p=document.getElementById('prog'); if(!p) return;
 const max=document.documentElement.scrollHeight-innerHeight;
 p.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';
}
addEventListener('scroll',onScroll,{passive:true});

app.addEventListener('click',e=>{
 if(e.target.closest('button[data-wnext]')){if(WZ_STEPS[WZ]==='name'){const el=document.getElementById('nm');if(el) S.name=el.value.replace(/[^\p{L}\p{M}\s'’-]/gu,'').trim().slice(0,20);if(!S.name){if(el){el.focus();el.classList.add('need');}return;}applyHeroName();if(!S.avSex) refreshAvatars();save();}wizard(WZ+1);return;}
 if(e.target.closest('button[data-wback]')){wizard(WZ-1);return;}
 if(e.target.closest('[data-settings]')){openSettings();return;}
 if(e.target.closest('[data-closeset]')){closeSettings();return;}
 const pfb=e.target.closest('button[data-profile]'); if(pfb){toggleProfile(pfb.dataset.profile);save();applyLook();syncComfort();refreshProfiles();renderSettings();if(document.getElementById('rd')) document.getElementById('rd').classList.toggle('showall',!!S.showAll);if(document.getElementById('sheet')) toast('Perfil atual: '+profLabel());return;}
 const opb=e.target.closest('button[data-opt]'); if(opb){const k=opb.dataset.opt;S[k]=!S[k];save();
  if(opb.classList.contains('sw')) opb.setAttribute('aria-checked',String(!!S[k])); else {opb.setAttribute('aria-pressed',String(!!S[k]));opb.textContent=S[k]?'Ligado':'Desligado';}
  if(k==='calm'||k==='contrast') applyLook();
  if(k==='showAll'){const rd=document.getElementById('rd');if(rd) rd.classList.toggle('showall',!!S.showAll);const tg=document.getElementById('tog');if(tg) tg.setAttribute('aria-pressed',String(!!S.showAll));if(S.showAll) R.usedPT=true;}
  refreshProfiles();
  if(k==='clear'&&S.clear) speak("Hi! I'm Mina, your guide.",null,'mina');
  if(k==='slow') speak(S.slow?'This is the slow voice.':'This is the normal voice.',null,'mina');
  return;}
 if(e.target.closest('button[data-cleardemo]')){speak("Hi! I'm Mina, your guide.",null,'mina');return;}
 {const eb=e.target.closest('button[data-ear]');if(eb){earView(eb.dataset.ear||null,eb.dataset.earback||null);return;}}
 if(e.target.closest('button[data-esay]')){const it=EAR.items[EAR.i];sayWords([it.p[it.t]]);return;}
 if(e.target.closest('button[data-eboth]')){const it=EAR.items[EAR.i];sayWords([it.p[0],it.p[1]]);return;}
 const ekb=e.target.closest('button[data-ek]'); if(ekb){if(!ekb.disabled) earAnswer(ekb);return;}
 if(e.target.closest('button[data-enext]')){EAR.i++;EAR.lock=false;renderEar();return;}
 if(e.target.closest('button[data-pron]')){pronView();return;}
 const psl=e.target.closest('button[data-pslow]'); if(psl){const b=psl.closest('.bubble');if(b){const t=b.querySelector('.en').textContent,w=b.dataset.who||((b.querySelector('.say')||{}).dataset||{}).who;const o=S.slow;S.slow=true;speak(t,null,w);S.slow=o;trackReplay(t,w);}return;}
 const pag=e.target.closest('button[data-pagain]'); if(pag){const b=pag.closest('.bubble');if(b) listen(b);return;}
 const axb=e.target.closest('button[data-avsex]'); if(axb){S.avSex=axb.dataset.avsex;refreshAvatars();save();const pv=document.getElementById('avprev');if(pv){pv.innerHTML=av('me','happy');const p=pv.previousElementSibling;if(p&&p.classList.contains('wz-p')) p.textContent='Ele vai ser o(a) protagonista da história, com voz '+(heroSex()==='f'?'feminina':'masculina')+'.';}return;}
 const am=e.target.closest('button[data-amode]'); if(am){S.audioMode=am.dataset.amode;if(S.audioMode==='rec') REC.failed=false;save();renderAudio();speak("Hi! I'm Mina, your guide.",null,'mina');return;}
 const trb=e.target.closest('button[data-train]'); if(trb){trainView(+trb.dataset.train);return;}
 const cw=e.target.closest('.chipw'); if(cw){if(!cw.disabled&&TR&&!TR.lock){const to=cw.parentElement.id==='chips'?'build':'chips';document.getElementById(to).appendChild(cw);}return;}
 if(e.target.closest('button[data-tclear]')){const ch=document.getElementById('chips');[...document.querySelectorAll('#build .chipw')].forEach(b=>ch.appendChild(b));return;}
 if(e.target.closest('button[data-tcheck]')){trainCheck();return;}
 if(e.target.closest('button[data-thint]')){const it=TR.items[TR.n],w=chipText(wordsOf(it.x.en)[it.bi]),el=document.getElementById('clz');if(el){el.placeholder=w.slice(0,Math.ceil(w.length/3))+'...';el.focus();}return;}
 const tk=e.target.closest('button[data-tk]'); if(tk){if(TR&&!TR.lock){const ok=tk.dataset.tk==='1';tk.closest('.opts').querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(b.dataset.tk==='1')b.classList.add('ok');else if(b===tk)b.classList.add('no');});trFeedback(ok,'');}return;}
 const ts=e.target.closest('button[data-tsay]'); if(ts){const x=TR.items[TR.n].x;if(ts.dataset.tsay==='slow'){const o=S.slow;S.slow=true;speak(x.en,ts,x.who);S.slow=o;}else speak(x.en,ts,x.who);return;}
 if(e.target.closest('button[data-treveal]')){const en=document.querySelector('#tbub .en');if(en) en.hidden=false;return;}
 if(e.target.closest('button[data-tnext]')){if(TR){const it=TR.items[TR.n];if(it.t==='speak'&&!TR.lock){const sc=+(document.getElementById('tbub')||{}).dataset?.score||0;if(sc>=70)TR.score++;}TR.n++;renderTrain();}return;}
 if(e.target.closest('button[data-acct]')){acctView();return;}
 {const b=e.target.closest('button[data-nmpedir]');if(b){nmPedir(b);return;}}
 if(e.target.closest('button[data-nmnao]')){S.nmVoz={k:nmNorm(heroName()),st:'nao',t:Date.now()};save();home();return;}
 if(e.target.closest('button[data-backuplater]')){S.lastBackup=Date.now()-7*864e5;save();home();return;}
 if(e.target.closest('button[data-sync]')){cloudPull();return;}
 if(e.target.closest('button[data-mkcode]')){packState().then(c=>{S.lastBackup=Date.now();save();const ta=document.getElementById('codeout'),bx=document.getElementById('codebox');if(ta&&bx){ta.value=c;bx.hidden=false;}});return;}
 if(e.target.closest('button[data-copycode]')){const ta=document.getElementById('codeout');if(!ta) return;const sel=()=>{ta.focus();ta.select();toast('Código selecionado. Use copiar do seu aparelho.');};try{navigator.clipboard.writeText(ta.value).then(()=>toast('Código copiado'),sel);}catch(err){sel();}return;}
 if(e.target.closest('button[data-dlcode]')){const ta=document.getElementById('codeout');if(ta&&CLOUD.dl) CLOUD.dl.save({filename:'torre-do-ingles-progresso.txt',data:ta.value}).then(()=>toast('Arquivo de progresso salvo'),er=>{if(!(er&&er.code==='declined')) toast('Não deu para baixar o arquivo agora. Copie o código.');});return;}
 if(e.target.closest('button[data-loadcode]')){const ta=document.getElementById('codein');loadCode(ta?ta.value:'');return;}
 if(e.target.closest('button[data-week]')){weekView();return;}
 const eqb=e.target.closest('button[data-equip]');
 if(eqb){const k=eqb.dataset.equip,c=COSM[k];if(c&&(S.cos||[]).includes(k)){S.equip=S.equip||{};const sl=c.kind==='acc'?'acc':'outfit';S.equip[sl]=(S.equip[sl]===k&&!eqb.dataset.go)?null:k;save();}collectionView(!eqb.dataset.go);return;}
 if(e.target.closest('button[data-coll]')){collectionView();return;}
 const clb=e.target.closest('button[data-claim]');
 if(clb){const k=clb.dataset.claim,w=S.week;if(!w.claimed[k]&&tierReached(k,w)){const r=grantTier(k,w);save();rewardView(k,r);}return;}
 const gb=e.target.closest('button[data-goal]'); if(gb){S.goal=+gb.dataset.goal;save();checkTiers();save();weekView();return;}
 if(e.target.closest('button[data-reroll]')){const w=S.week;if(!w.reroll){const keep=w.missions.filter(k=>(w.mp[k]||0)>0);const fresh=pickMissions(w.id+'r',w.missions);w.missions=keep.concat(fresh).slice(0,3);w.reroll=true;save();}weekView();return;}
 if(e.target.closest('button[data-review]')){reviewView();return;}
 const rk=e.target.closest('button[data-rk]'); if(rk){if(!rk.disabled) reviewAnswer(rk);return;}
 if(e.target.closest('button[data-rnext]')){RV.i++;renderReview();return;}
 const tb=e.target.closest('button[data-title]'); if(tb){const i=+tb.dataset.title;S.title=S.title===i?null:i;save();collectionView(true);return;}
 const zb=e.target.closest('button[data-zoom]'); if(zb){S.zoom=+zb.dataset.zoom;save();applyLook();syncComfort();refreshProfiles();return;}
 const lb=e.target.closest('button[data-look]'); if(lb){S.look=lb.dataset.look;save();applyLook();syncComfort();return;}
 if(e.target.closest('button[data-calm]')){S.calm=!S.calm;save();applyLook();syncComfort();return;}
 if(e.target.closest('#aa')){const k=ZOOMS.findIndex(z=>z[0]===(S.zoom||1));S.zoom=ZOOMS[(k+1)%ZOOMS.length][0];save();applyLook();return;}
 const avb=e.target.closest('button[data-av]'); if(avb){setTimeout(()=>{const pv=document.getElementById('avprev');if(pv){pv.innerHTML=av('me','happy');const p=pv.previousElementSibling;if(p&&p.classList.contains('wz-p')) p.textContent='Ele vai ser o(a) protagonista da história, com voz '+(heroSex()==='f'?'feminina':'masculina')+'.';}},0);S.avatar=+avb.dataset.av;save();document.querySelectorAll('button[data-av]').forEach(b=>b.setAttribute('aria-pressed',String(b===avb)));return;}
 const stb=e.target.closest('button[data-start]'); if(stb){saveName();S.startPlan=stb.dataset.start==='place'?'place':'zero';if(S.startPlan==='zero') S.start=0;save();wizard(WZ_STEPS.indexOf('tour'));return;}
 if(e.target.closest('button[data-tour-start]')){tourStart(false);return;}
 if(e.target.closest('button[data-saveprof]')){saveName();home();return;}
 if(e.target.closest('button[data-prof]')){welcome(true);return;}
 if(e.target.closest('button[data-gloss]')){gloss();return;}
 if(e.target.closest('button[data-lsn]')){lsnList();return;}
 const lsi=e.target.closest('button[data-lsnid]'); if(lsi){lsnView(lsi.dataset.lsnid);return;}
 const lpl=e.target.closest('button[data-lplay]'); if(lpl){lsnPlay(lpl.dataset.lplay==='slow');return;}
 const ltx=e.target.closest('button[data-ltext]'); if(ltx){const t=document.getElementById('ltext');if(t){t.hidden=!t.hidden;ltx.setAttribute('aria-expanded',String(!t.hidden));ltx.textContent=t.hidden?'Ver o texto':'Esconder o texto';}return;}
 const pqo=e.target.closest('button[data-pqk]'); if(pqo){if(!pqo.disabled) pqAnswer(pqo);return;}
 if(e.target.closest('button[data-read]')){readList();return;}
 const rdi=e.target.closest('button[data-readid]'); if(rdi){readView(rdi.dataset.readid);return;}
 if(e.target.closest('button[data-rplay]')){readPlay();return;}
 const gw=e.target.closest('button[data-gw]'); if(gw&&PQ&&PQ.g){const k=gw.dataset.gw,o=document.getElementById('gwout');if(o) o.innerHTML=`<b lang="en">${esc(k)}</b> = ${esc(PQ.g[k]||'')}`;speak(k,null,'narr');return;}
 if(e.target.closest('button[data-voc]')){vocList();return;}
 const vg=e.target.closest('button[data-vocgo]'); if(vg){vocStart(vg.dataset.vocgo);return;}
 if(e.target.closest('button[data-vocflip]')){VC.flip=true;vocCard();return;}
 const va=e.target.closest('button[data-vocans]'); if(va){vocAnswer(va.dataset.vocans==='1');return;}
 if(e.target.closest('button[data-wrt]')){wrtList();return;}
 const wti=e.target.closest('button[data-wrtid]'); if(wti){wrtView(wti.dataset.wrtid);return;}
 if(e.target.closest('button[data-wcheck]')){wrtCheck();return;}
 if(e.target.closest('button[data-wmodel]')){wrtShowModel();return;}
 if(e.target.closest('button[data-wplay]')){const W=WRITE.find(x=>x.id===WR.id);if(W) speak(wrtModel(W.text),null,'narr');return;}
 const ce=e.target.closest('button[data-cert]'); if(ce){certView(+ce.dataset.cert);return;}
 if(e.target.closest('button[data-print]')){try{window.print();}catch(err){toast('Não foi possível imprimir aqui.');}return;}
 if(e.target.closest('button[data-pstop]')){placeResult();return;}
 if(e.target.closest('button[data-place]')){placement();return;}
 const pk=e.target.closest('button[data-pk]'); if(pk){if(!pk.disabled) placeAnswer(pk);return;}
 if(e.target.closest('button[data-fromzero]')){S.start=0;save();reader(0);return;}
 if(e.target.closest('[data-rwcheck]')){reviewWrite();return;}
 const qck=e.target.closest('[data-qcheck]'); if(qck){qxCheck(qck.closest('.qx'));return;}
 const qsk=e.target.closest('[data-qskip]'); if(qsk){stopListening();document.querySelectorAll('#quiz .qx[data-qx=s]').forEach(el=>{if(answers[el.dataset.id]!=null) return;el.querySelectorAll('[data-qskip]').forEach(b=>b.disabled=true);qxSet(el.dataset.id,'skip',el,'<b>Tudo bem.</b> As questões de fala deste teste não contam na nota. Treine quando puder.');});return;}
 const qsy=e.target.closest('[data-qsay]'); if(qsy){e.stopPropagation();const o=S.slow;if(qsy.dataset.slow) S.slow=true;speak(qsy.dataset.qsay,qsy,qsy.dataset.who);S.slow=o;return;}
 const mic=e.target.closest('.mic');
 if(mic){e.stopPropagation();listen(mic.closest('.bubble'));return;}
 if(e.target.closest('.pron')) return;
 const say=e.target.closest('[data-say]');
 if(say){e.stopPropagation();speak(say.dataset.say,say,say.dataset.who);if(say.dataset.who) trackReplay(say.dataset.say,say.dataset.who);if(say.dataset.who&&S.week){prog('listen');save();}return;}
 const cast=e.target.closest('#castdemo');
 if(cast){speakSeq([{t:"Hi! I'm Mina, your guide.",who:'mina'},{t:`I'm ${heroName()}. Nice to meet you!`,who:'rafa'},{t:"Hey. I'm Jin.",who:'jin'},{t:'You are weak!',who:'monster'}],cast);return;}
 if(e.target.closest('#srinstall')){installSR();return;}
 if(e.target.closest('#whget')){whInit();return;}
 const fnb=e.target.closest('button[data-fon]'); if(fnb){S.fon=fnb.dataset.fon==='1';save();renderAudio();if(S.fon){if(FN.st!=='ready') fnInit();if(WH.st!=='ready'&&!WH.cached) whInit();}return;}
 if(e.target.closest('[data-offline]')){const b=e.target.closest('[data-offline]');b.disabled=true;offlineAll();return;}
 if(e.target.closest('#appinstall')&&INSTALL){INSTALL.prompt();INSTALL.userChoice.finally(()=>{INSTALL=null;const el=document.getElementById('appsec');if(el) el.outerHTML=appSec();});return;}
 const asb=e.target.closest('button[data-asr]'); if(asb){S.asr=asb.dataset.asr;save();renderAudio();if(S.asr==='whisper'&&WH.st!=='ready') whInit();return;}
 const sl=e.target.closest('#slow,#slowtog');
 if(sl){S.slow=!S.slow;save();sl.setAttribute('aria-pressed',S.slow);speak(S.slow?'This is the slow voice.':'This is the normal voice.',null,'mina');return;}
 const op=e.target.closest('[data-open]'); if(op){reader(+op.dataset.open);return;}
 if(e.target.closest('[data-home]')){home();return;}
 if(e.target.closest('#tog')){S.showAll=!S.showAll;if(S.showAll)R.usedPT=true;save();document.getElementById('rd').classList.toggle('showall',S.showAll);document.getElementById('tog').setAttribute('aria-pressed',S.showAll);return;}
 if(prodClick(e)) return;
 if(e.target.closest('[data-imersao]')){imView();return;}
 {const fb=e.target.closest('button[data-fora]');if(fb){foraAdd(+fb.dataset.fora);return;}}
 if(e.target.closest('[data-imantes]')){const v=Math.round(+document.getElementById('imantes').value||0);S.antes=Math.max(0,Math.min(5000,v));save();const mt=document.querySelector('.immeta');if(mt) mt.outerHTML=metaHTML();toast('Horas anteriores salvas');return;}
 if(e.target.closest('[data-sbank]')){sbList();return;}
 {const sb=e.target.closest('button[data-sb]');if(sb){sbView(sb.dataset.sb);return;}}
 if(e.target.closest('[data-sbslow]')){sbSlow();return;}
 if(e.target.closest('[data-sims]')){simList();return;}
 {const si=e.target.closest('button[data-simid]');if(si){simView(si.dataset.simid);return;}}
 {const sg=e.target.closest('button[data-simgo]');if(sg){simStart(sg.dataset.simgo);return;}}
 {const so=e.target.closest('.sopt');if(so){if(!so.disabled) simPick(so);return;}}
 if(e.target.closest('[data-simconf]')){simConfirm();return;}
 if(e.target.closest('[data-simnext]')){simNext();return;}
 if(e.target.closest('[data-simplay]')){simPlay();return;}
 if(e.target.closest('[data-simtx]')){simTranscript();return;}
 {const pl=e.target.closest('[data-plist]');if(pl){prodList(pl.dataset.plist);return;}}
 {const pi=e.target.closest('button[data-prodid]');if(pi){prodView(pi.dataset.prodid);return;}}
 {const au=e.target.closest('button[data-auto]');if(au){autoSet(+au.dataset.arc,+au.dataset.i,+au.dataset.auto);return;}}
 {const ra=e.target.closest('button[data-revarc]');if(ra){reviewView(+ra.dataset.revarc);return;}}
 {const wo=e.target.closest('#warm .opt');if(wo){if(!wo.disabled) warmAnswer(wo);return;}}
 if(e.target.closest('[data-warmskip]')){document.getElementById('warm')?.remove();return;}
 const opt=e.target.closest('.opt'); if(opt&&!opt.disabled){answer(opt.closest('.q'),+opt.dataset.k);return;}
 const b=e.target.closest('.bubble:not(.thought)'); if(b){b.classList.toggle('open');R.usedPT=true;}
});
app.addEventListener('input',e=>{
 if(e.target.classList&&e.target.classList.contains('ptxt')){const n=prodWords(e.target.value),c=e.target.closest('.prod').querySelector('.pcont');if(c) c.textContent=n+(n===1?' palavra':' palavras');}
 if(e.target.id==='nm'){const cl=e.target.value.replace(/[^\p{L}\p{M}\s'’-]/gu,'').replace(/\s{2,}/g,' ');if(cl!==e.target.value) e.target.value=cl;S.name=cl.slice(0,20);if(!S.avSex) refreshAvatars();save();e.target.classList.remove('need');applyHeroName();}
 if(e.target.id==='gq'){renderGloss(e.target.value);clearTimeout(window.__gq);const v=fold(e.target.value.trim());window.__gq=setTimeout(()=>{if(v.length>=3&&S.week&&!S.week.gq.includes(v)){S.week.gq.push(v);prog('gloss');save();}},1200);}
});
app.addEventListener('change',e=>{
 if(e.target.id==='codefile'&&e.target.files&&e.target.files[0]){const fr=new FileReader();fr.onload=()=>{const ta=document.getElementById('codein');const t=String(fr.result||'').slice(0,200000);if(ta) ta.value=t;loadCode(t);};fr.readAsText(e.target.files[0]);return;}
 if(e.target.id==='voice'){S.voice=e.target.value;save();buildCast();speak('Hello! This is my voice.',null,'narr');}
});
app.addEventListener('keydown',e=>{
 if(e.key==='Enter'&&e.target.id==='rwin'){e.preventDefault();reviewWrite();return;}
 if(e.key==='Enter'&&e.target.closest&&e.target.closest('.qwrite')){e.preventDefault();qxCheck(e.target.closest('.qx'));return;}
 if(e.key==='Enter'&&e.target.id==='clz'){e.preventDefault();trainCheck();return;}
 if(e.key==='Enter'&&e.target.id==='nm'&&document.querySelector('[data-wnext]')){e.preventDefault();document.querySelector('[data-wnext]').click();return;}
 if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('bubble')){e.preventDefault();e.target.classList.toggle('open');R.usedPT=true;}
});

try{S=sanitizeState(S);}catch(e){}
try{applyHeroName();}catch(e){}
applyLook();
rollWeek();
if(!S.welcomed) welcome(false); else if(S.lastWeek&&S.recapSeen!==S.week.id) recapView(); else home();
checkSR();
try{whProbe();}catch(e){}
try{fnProbe();}catch(e){}
initCloud();
