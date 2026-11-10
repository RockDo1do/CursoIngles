import json, os, re, sys, subprocess, unicodedata, numpy as np, ctypes, time
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import kokoro_tts as K
from build_helpers import trim
SR=24000; PAD=int(0.12*SR)
VOICE={'mina':'af_heart','rafa':'am_michael','rafa_f':'af_kore','narr':'af_bella'}
SPEEDS={'n':1.0,'s':0.78}
PT="""Ana Maria João José Antônio Francisco Carlos Paulo Pedro Lucas Luiz Luís Marcos Luciano Gabriel Rafael Rafaela Daniel Daniela Marcelo Bruno Eduardo Felipe Raimundo Rodrigo Manoel Manuel Mateus Matheus André Fernando Fernanda Fábio Fabiana Leonardo Leandro Gustavo Guilherme Leandra Tiago Thiago Diego Vitor Victor Vítor Sérgio Ricardo Roberto Renato Renata Igor Caio Cauã Davi David Arthur Artur Heitor Bernardo Miguel Enzo Lorenzo Théo Theo Samuel Benício Benjamin Joaquim Henrique Murilo Nicolas Nícolas Otávio Vinícius Wesley Willian William Wagner Washington Wellington Juliano Júlio Júlia Juliana Jéssica Jaqueline Joana Josefa Joaquina Francisca Antônia Adriana Adriano Alessandra Alexandre Alice Aline Amanda Ângela Bárbara Beatriz Bianca Bruna Camila Carla Carolina Catarina Cecília Clara Cláudia Cláudio Cristiane Cristiano Cristina Débora Denise Diana Eduarda Elaine Eliane Elisa Emanuel Emanuele Érica Erick Fabrício Flávia Flávio Gabriela Giovana Giovanna Gisele Helena Heloísa Inês Isabel Isabela Isabella Isadora Ivone Jorge Laís Larissa Laura Leila Letícia Lívia Lorena Luana Lúcia Luciana Luiza Luísa Manuela Marcela Márcia Mariana Marina Marta Melissa Michele Mônica Natália Nathalia Nicole Patrícia Paula Priscila Raquel Rebeca Regina Rita Rosa Rosana Sabrina Sandra Sara Sarah Silvia Sílvia Simone Sofia Sophia Sônia Stella Tânia Tatiana Teresa Valentina Vanessa Vera Verônica Vitória Yasmin Yara Zélia Álvaro Afonso Diogo Duarte Gonçalo Hugo Ivo Nuno Rui Simão Tomás Tomé Vasco Leonor Matilde Mafalda Margarida Constança Madalena Benedita Carmo Conceição Fátima Graça Lurdes Pietra Lara Lia Mel Noah Gael Ravi Kauã Kauê Yuri Iuri Wilson Edson Nelson Jefferson Anderson Emerson Everton Alan Allan Luan Lucca Luca Bento Raul Otto Ian Ícaro Rogério Reginaldo Rafa Martim Dinis Lourenço Salvador Santiago Vicente Gaspar Leonel Rúben Ruben Filipa Filipe Carlota Telma Vânia Susana Sónia Odete Neusa Délcio Edmilson Amílcar Agostinho Domingos Esperança Felisberto Hélder Ivandro Jacinto Laurinda Osvaldo Rosário Sebastião Teodoro Valdemar Zacarias Zita Íris Nzinga Kiala Celeste Graciete Mariza Cátia Liliana Andreia Marisa Sandro Mário Márcio Óscar Lucas Kevin Wellington Jéssica Kátia Elisa Adelaide Fernanda Gabriel"""
EN="""Walter Peter Michael John James Robert William Richard Thomas Charles George Edward Kevin Brian Steven Mark Paul Jennifer Jessica Emily Emma Olivia Sophie Grace Kelly Karen Linda Susan Nancy Mary Elizabeth Alex Sam Max Leo Chris Kate Lucy Jack Harry Oliver Charlie Henry Noah Liam Ethan Mason Logan Ryan Tyler Brandon Justin Megan Ashley Taylor Jordan Morgan""".split()
PT=PT.split()
def norm(n): return ''.join(c for c in unicodedata.normalize('NFD',n.lower()) if unicodedata.category(c)!='Mn')
names={}
for n in PT: names.setdefault(norm(n),(n,'pt'))
for n in EN: names[norm(n)]=(n,'en')
def ph_name(n,lang):
    K.LIB.espeak_SetVoiceByName(b'pt-br' if lang=='pt' else b'en-us')
    p=K._chunk(n); K.LIB.espeak_SetVoiceByName(b'en-us')
    if lang=='pt': p=p.replace('x','h')
    return ''.join(c for c in p if c in K.VOCAB).strip()
k=K.Kokoro()
def synth_ph(ph,voice,speed):
    toks=[K.VOCAB[c] for c in ph if c in K.VOCAB][:500]
    st=k.v[voice][min(len(toks),len(k.v[voice]))-1]
    sp=np.array([speed],dtype=np.int32 if 'int' in k.inp['speed'] else np.float32)
    a=k.s.run(None,{k.tok:np.array([[0,*toks,0]],dtype=np.int64),'style':np.asarray(st,dtype=np.float32),'speed':sp})[0]
    return np.asarray(a).ravel()
def i16(a): return np.clip(a*32767,-32768,32767).astype(np.int16)
clips=[c for c in json.load(open('clips.json')) if 'Rafa' in c['t']]
out='out/audio'; man=json.load(open(f'{out}/index.json'))
man['files']={g:v for g,v in man['files'].items() if not g.startswith('nm_')}
nm={'parts':{},'names':{}}
def write(fname,arrs):
    parts=[np.zeros(PAD,np.int16)]; pos=PAD; idx=[]
    for a in arrs:
        idx.append([round(pos/SR-0.02,3),round(len(a)/SR+0.04,3)]); parts+=[a,np.zeros(PAD,np.int16)]; pos+=len(a)+PAD
    subprocess.run(['ffmpeg','-y','-loglevel','error','-f','s16le','-ar',str(SR),'-ac','1','-i','-','-c:a','libmp3lame','-b:a','40k',f'{out}/{fname}'],input=np.concatenate(parts).tobytes(),check=True)
    return idx
t0=time.time()
# partes das frases (antes/depois do nome)
for sk,sp in SPEEDS.items():
    arrs=[];slots=[]
    for c in clips:
        a,b=c['t'].split('Rafa',1)
        a=a.strip(); b=re.sub(r'^\s*Lima','Lima',b); b=re.sub(r'^[\s,.!?]+(?=\w)','',b).strip()
        if re.fullmatch(r'[\s.,!?]*',b): b=''
        for j,txt in enumerate((a,b)):
            if txt:
                w,_=K.Kokoro.synth(k,txt,VOICE[c['who']],sp); arrs.append(trim(i16(w))); slots.append((c['k'],j))
    idx=write(f'nm_parts_{sk}.mp3',arrs)
    for (key,j),(st,du) in zip(slots,idx):
        e=nm['parts'].setdefault(key,[None,None])
        if e[j] is None: e[j]=[0,0,0,0]
        o=0 if sk=='n' else 2; e[j][o]=st; e[j][o+1]=du
man['files']['nm_parts']={'n':'audio/nm_parts_n.mp3','s':'audio/nm_parts_s.mp3'}
print('parts ok',round(time.time()-t0),flush=True)
keys=sorted(names)
phs={kk:ph_name(*names[kk]) for kk in keys}
for who,vo in VOICE.items():
    nm['names'][who]={}
    for sk,sp in SPEEDS.items():
        arrs=[trim(i16(synth_ph(phs[kk],vo,sp))) for kk in keys]
        idx=write(f'nm_{who}_{sk}.mp3',arrs)
        for kk,(st,du) in zip(keys,idx):
            e=nm['names'][who].setdefault(kk,[0,0,0,0]); o=0 if sk=='n' else 2; e[o]=st; e[o+1]=du
    man['files']['nm_'+who]={'n':f'audio/nm_{who}_n.mp3','s':f'audio/nm_{who}_s.mp3'}
    print(who,'ok',round(time.time()-t0),flush=True)
man['nm']=nm
json.dump(man,open(f'{out}/index.json','w'),ensure_ascii=False,separators=(',',':'))
print('names',len(keys),'done',round(time.time()-t0))
