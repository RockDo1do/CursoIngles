import json, os, sys, hashlib, numpy as np, time
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from kokoro_tts import Kokoro
VOICE={'mina':'af_heart','rafa':'am_michael','rafa_f':'af_kore','jin':'am_puck','monster':'am_fenrir','narr':'af_bella','olivia':'bf_emma','harry':'bm_george'}
SPEEDS={'n':1.0,'s':0.78}
clips=json.load(open('clips.json')); os.makedirs('cache',exist_ok=True)
k=Kokoro(); t0=time.time(); done=0
for i,c in enumerate(clips):
    h=hashlib.sha1(c['k'].encode()).hexdigest()[:16]; c['h']=h
    for sk,sp in SPEEDS.items():
        p=f'cache/{h}_{sk}.npy'
        if os.path.exists(p): continue
        a,_=k.synth(c['t'],VOICE[c['who']],sp)
        np.save(p,(np.clip(a,-1,1)*32767).astype(np.int16))
    done+=1
    if i%25==0: print(f'{i+1}/{len(clips)} {time.time()-t0:.0f}s',flush=True)
json.dump(clips,open('clips_h.json','w'))
print('DONE',time.time()-t0,flush=True)
