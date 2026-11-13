import json, os, re, sys, numpy as np, time
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from kokoro_tts import Kokoro
VOICE={'mina':'af_heart','rafa':'am_michael','rafa_f':'af_kore','jin':'am_puck','monster':'am_fenrir','narr':'af_bella','olivia':'bf_emma','harry':'bm_george'}
SR=24000; SPEED=0.86
FUNC=set("and but or so because to with in on at for of from that which who when if than as about into after before under over near behind between during without until while".split())
DET=set("the a an my your his her our their this that these those to".split())
def chunks(text):
    words=text.split(); out=[]; cur=[]
    punct=lambda w: re.search(r"[,.!?;:]$",w)
    lw=lambda w: re.sub(r"[^a-z']","",w.lower())
    for i,w in enumerate(words):
        if cur and lw(w) in FUNC and len(cur)>=2: out.append(cur); cur=[]
        cur.append(i)
        if punct(w) or len(cur)>=5: out.append(cur); cur=[]
    if cur: out.append(cur)
    # não termina bloco com artigo/possessivo: passa para o próximo
    for k in range(len(out)-1):
        while len(out[k])>1 and (lw(words[out[k][-1]]) in DET or lw(words[out[k][-1]]) in FUNC) and not punct(words[out[k][-1]]):
            out[k+1].insert(0,out[k].pop())
    # última palavra sozinha gruda no bloco anterior
    if len(out)>1 and len(out[-1])==1 and not punct(words[out[-2][-1]]) and len(out[-2])<=5:
        last=out.pop(); out[-1]+=last
    return words,[(c[0],c[-1]) for c in out]
def trim(a):
    nz=np.nonzero(np.abs(a)>300)[0]
    return a[max(0,nz[0]-int(.03*SR)):min(len(a),nz[-1]+int(.06*SR))] if len(nz) else a
k=Kokoro(); os.makedirs('cache',exist_ok=True)
clips=json.load(open('clips_h.json'))
pairs=json.load(open('pairs.json'))
words=sorted(set(w for p in pairs for w in p[:2]))
jobs=[(c['h'],c['t'],c['who'],True) for c in clips]+[('w_'+w,w,'narr',False) for w in words]
timing=json.load(open('clear_timing.json')) if os.path.exists('clear_timing.json') else {}
t0=time.time()
for n,(h,text,who,chunked) in enumerate(jobs):
    p=f'cache/{h}_c.npy'
    if os.path.exists(p) and h in timing: continue
    if chunked:
        ws,cs=chunks(text)
    else:
        ws,cs=[text],[(0,0)]
    parts=[]; tm=[]; pos=0
    for (a,b) in cs:
        seg=' '.join(ws[a:b+1])
        y,_=k.synth(seg,VOICE[who],SPEED if chunked else 0.8)
        y=trim((np.clip(y,-1,1)*32767).astype(np.int16))
        tm.append([round(pos/SR,3),round(len(y)/SR,3),a,b])
        parts.append(y); pos+=len(y)
        gap=int((.32 if re.search(r"[,.!?;:]$",ws[b]) else .22)*SR)
        parts.append(np.zeros(gap,np.int16)); pos+=gap
    a=np.concatenate(parts[:-1]) if len(parts)>1 else parts[0]
    np.save(p,a); timing[h]=tm
    if n%40==0:
        json.dump(timing,open('clear_timing.json','w')); print(f'{n+1}/{len(jobs)} {time.time()-t0:.0f}s',flush=True)
json.dump(timing,open('clear_timing.json','w'))
print('DONE',time.time()-t0,flush=True)
