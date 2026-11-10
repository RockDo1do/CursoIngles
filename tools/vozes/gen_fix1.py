import json, subprocess, numpy as np, sys, os
sys.path.insert(0,'.')
import kokoro_tts as K
from build_helpers import trim
SR=24000; PAD=int(0.3*SR)
VOICE={'mina':'af_heart','rafa':'am_michael','rafa_f':'af_kore'}
items=[('rafa',"How old are you, Mina?"),('rafa_f',"How old are you, Mina?"),('mina',"I'm twenty-two.")]
k=K.Kokoro(); man=json.load(open('out/audio/index.json'))
for sk,sp in (('n',1.0),('s',0.78)):
    parts=[np.zeros(PAD,np.int16)]; pos=PAD
    for who,t in items:
        a,_=k.synth(t,VOICE[who],sp); a=trim((np.clip(a,-1,1)*32767).astype(np.int16))
        e=man['k'].setdefault(f'{who}|{t}',['fix1',0,0,0,0,0,0]); o=1 if sk=='n' else 3
        e[0]='fix1'; e[o]=round(pos/SR-0.04,3); e[o+1]=round(len(a)/SR+0.1,3)
        parts+=[a,np.zeros(PAD,np.int16)]; pos+=len(a)+PAD
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-b:a','40k',f'out/audio/{sk}_fix1.mp3'],input=np.concatenate(parts).tobytes(),check=True)
man['files']['fix1']={'n':'audio/n_fix1.mp3','s':'audio/s_fix1.mp3'}
json.dump(man,open('out/audio/index.json','w'),ensure_ascii=False,separators=(',',':'))
print('ok',[man['k'][f'{w}|{t}'] for w,t in items])
