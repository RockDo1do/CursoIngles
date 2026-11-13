# Gera os áudios do conteúdo novo em grupos (capítulos, escuta, leitura, vocabulário) e as palavras do treino de sons
import json, subprocess, numpy as np, sys, re
sys.path.insert(0,'.')
import kokoro_tts as K
from build_helpers import trim
SR=24000; PAD=int(0.3*SR); GAP=np.zeros(int(0.28*SR),np.int16)
VOICE={'mina':'af_heart','rafa':'am_michael','rafa_f':'af_kore','jin':'am_puck','narr':'af_bella','monster':'am_fenrir','olivia':'bf_emma','harry':'bm_george'}
d=json.load(open(sys.argv[1] if len(sys.argv)>1 else 'fix5.json'))
k=K.Kokoro(); man=json.load(open('out/audio/index.json'))
def i16(a): return np.clip(a*32767,-32768,32767).astype(np.int16)
def say(t,v,sp):
    if len(t)<=180: return trim(i16(k.synth(t,v,sp)[0]))
    sents=[x for x in re.split(r'(?<=[.!?])\s+',t) if x]
    parts=[]
    for s_ in sents: parts+= [trim(i16(k.synth(s_,v,sp)[0])), GAP]
    return np.concatenate(parts[:-1])
def monster(a):
    # mesma ideia do build.py: voz mais grave e com eco leve
    p=subprocess.run(['ffmpeg','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-af','asetrate=24000*0.8,aresample=24000,atempo=1.25,aecho=0.8:0.5:45:0.25','-f','s16le','-'],input=a.tobytes(),capture_output=True,check=True)
    return np.frombuffer(p.stdout,np.int16)
groups={}
for who,t,g in d['out']: groups.setdefault(g,[]).append((who,t))
for g,items in groups.items():
    for sk,sp in (('n',1.0),('s',0.78)):
        parts=[np.zeros(PAD,np.int16)]; pos=PAD
        for who,t in items:
            a=say(t,VOICE[who],sp)
            if who=='monster': a=monster(a)
            e=man['k'].setdefault(f'{who}|{t}',[g,0,0,0,0,0,0]); o=1 if sk=='n' else 3
            e[0]=g; e[o]=round(pos/SR-0.04,3); e[o+1]=round(len(a)/SR+0.1,3)
            parts+=[a,np.zeros(PAD,np.int16)]; pos+=len(a)+PAD
        subprocess.run(['ffmpeg','-y','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-b:a','40k',f'out/audio/{sk}_{g}.mp3'],input=np.concatenate(parts).tobytes(),check=True)
        print(g,sk,len(items),flush=True)
    man['files'][g]={'n':f'audio/n_{g}.mp3','s':f'audio/s_{g}.mp3'}
# palavras do treino de sons
if d.get('ew'):
    parts=[np.zeros(PAD,np.int16)]; pos=PAD
    for w in d['ew']:
        a=trim(i16(k.synth(w,VOICE['narr'],0.9)[0]))
        man['w'][w]=[round(pos/SR-0.04,3),round(len(a)/SR+0.1,3),'f5w']
        parts+=[a,np.zeros(PAD,np.int16)]; pos+=len(a)+PAD
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-b:a','40k','out/audio/n_f5w.mp3'],input=np.concatenate(parts).tobytes(),check=True)
    man['files']['f5w']={'n':'audio/n_f5w.mp3','s':'audio/n_f5w.mp3'}
json.dump(man,open('out/audio/index.json','w'),ensure_ascii=False,separators=(',',':'))
print('DONE')
