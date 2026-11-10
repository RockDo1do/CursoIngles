import json, os, subprocess, numpy as np, tempfile, shutil
SR=24000; PAD=int(0.35*SR)
clips=json.load(open('clips_h.json'))
timing=json.load(open('clear_timing.json'))
pairs=json.load(open('pairs.json')); words=sorted(set(w for p in pairs for w in p[:2]))
out='out/audio'; shutil.rmtree('out',ignore_errors=True); os.makedirs(out)
def ff(a,af):
    r=subprocess.run(['ffmpeg','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-af',af,'-f','s16le','-ac','1','-ar',str(SR),'-'],input=a.astype(np.int16).tobytes(),capture_output=True,check=True)
    return np.frombuffer(r.stdout,dtype=np.int16)
MONSTER_FX='asetrate=24000*0.8,aresample=24000,atempo=1.25,aecho=0.8:0.5:45:0.25'
MONSTER_CLEAR='asetrate=24000*0.86,aresample=24000,atempo=1.1628'
CLEAR_FX='highpass=f=90,equalizer=f=2800:t=q:w=1.0:g=4,equalizer=f=5200:t=q:w=1.2:g=2.5,acompressor=threshold=0.1:ratio=2.5:attack=5:release=60:makeup=1.5'
def level(a,target=3900):
    x=a.astype(np.float32); rms=np.sqrt(np.mean(x**2))+1e-6
    return np.clip(x*min(target/rms,4.0),-31000,31000).astype(np.int16)
def trim(a):
    nz=np.nonzero(np.abs(a)>300)[0]
    return a[max(0,nz[0]-int(.04*SR)):min(len(a),nz[-1]+int(.08*SR))] if len(nz) else a
groups={}
for c in clips: groups.setdefault(c['g'],[]).append(c)
man={'v':2,'files':{},'k':{},'ch':{},'w':{}}; total=0
for g,cs in groups.items():
    man['files'][g]={}
    for sk in ('n','s','c'):
        parts=[np.zeros(PAD,np.int16)]; pos=PAD
        items=[(c['k'],c['h'],c['who']) for c in cs]
        if g=='misc' and sk=='c': items+= [('word|'+w,'w_'+w,'narr') for w in words]
        for key,h,who in items:
            a=np.load(f"cache/{h}_{sk}.npy")
            if sk=='c':
                if who=='monster': a=ff(a,MONSTER_CLEAR)
                a=level(a)
            else:
                if who=='monster': a=ff(a,MONSTER_FX)
                a=trim(a)
            st=round(pos/SR-0.04,3); du=round(len(a)/SR+0.1,3)
            if key.startswith('word|'): man['w'][key[5:]]=[st,du]
            else:
                e=man['k'].setdefault(key,[g,0,0,0,0,0,0])
                j={'n':1,'s':3,'c':5}[sk]; e[j]=st; e[j+1]=du
                if sk=='c' and h in timing: man['ch'][key]=[[round(t[0]+0.04,3),t[1],t[2],t[3]] for t in timing[h]]
            parts+=[a,np.zeros(PAD,np.int16)]; pos+=len(a)+PAD
        p=f'{out}/{sk}_{g}.mp3'
        cmd=['ffmpeg','-y','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-']
        if sk=='c': cmd+=['-af',CLEAR_FX]
        cmd+=['-c:a','libmp3lame','-b:a','40k',p]
        subprocess.run(cmd,input=np.concatenate(parts).tobytes(),check=True)
        man['files'][g][sk]=f'audio/{sk}_{g}.mp3'; total+=os.path.getsize(p)
json.dump(man,open(f'{out}/index.json','w'),ensure_ascii=False,separators=(',',':'))
print('groups',len(groups),'files',len(os.listdir(out)),'MB',round(total/1e6,1),'manifest KB',round(os.path.getsize(f'{out}/index.json')/1e3))
