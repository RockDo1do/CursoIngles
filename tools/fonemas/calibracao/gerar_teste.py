"""Gera falas de teste com o Kokoro: certas (4 vozes, 2 delas brasileiras) e com erros típicos de brasileiros."""
import sys, json, numpy as np, re
import os
sys.path.insert(0,os.environ.get('KOKORO_DIR',os.path.join(os.path.dirname(__file__),'..','..','vozes')))  # pasta com kokoro_tts.py, kokoro.onnx e voices-v1.0.bin
import kokoro_tts as K

k=K.Kokoro()
def synth_ph(ph,voice):
    toks=[K.VOCAB[c] for c in ph if c in K.VOCAB][:500]
    st=k.v[voice][min(len(toks),len(k.v[voice]))-1]
    sp=np.array([1.0],dtype=np.int32 if 'int' in k.inp['speed'] else np.float32)
    a=np.asarray(k.s.run(None,{k.tok:np.array([[0,*toks,0]],dtype=np.int64),'style':np.asarray(st,dtype=np.float32),'speed':sp})[0]).ravel()
    # 24 kHz -> 16 kHz
    n=int(len(a)*2/3); x=np.interp(np.arange(n)*1.5,np.arange(len(a)),a).astype(np.float32)
    return x
# (frase, palavra, de, para, descrição)
CASOS=[("I think so.","think","θ","s","θ→s"),("I think so.","think","θ","t","θ→t"),("Thank you very much.","thank","θ","f","θ→f"),
 ("The weather is nice.","weather","ð","d","ð→d"),("This is my brother.","this","ð","d","ð→d"),
 ("I live here.","live","ɪ","iː","ɪ→iː"),("I like this sheep.","sheep","iː","ɪ","iː→ɪ"),
 ("It is very good.","very","v","b","v→b"),("My house is big.","house","h","","h apagado"),("He is happy.","happy","h","ʁ","h→r de português"),
 ("She is running fast.","running","ŋ","n","ŋ→n"),("I want to work.","work","w","v","w→v"),("I need a bed.","bed","ɛ","æ","ɛ→æ"),
 ("I go to school.","school","s","is","vogal antes do S"),("My dog is big.","big","ɡ","ɡi","vogal depois do G"),("Read the book.","read","ɹ","h","r→h")]
FRASES=sorted(set(c[0] for c in CASOS)|{"Nice to meet you.","What's your name?","I usually wake up at seven.","Could you help me, please?"})
VOZES=['af_heart','am_michael','pf_dora','pm_alex']
lista=[]
def esp(t):  # fonemas do Kokoro para a frase
    return K.phonemize(t)
for fr in FRASES:
    for v in VOZES:
        x=synth_ph(esp(fr),v); nm=f'teste/ok_{len(lista)}.f32'; x.tofile(nm)
        lista.append({'f':nm,'frase':fr,'voz':v,'erro':None})
for fr,w,de,para,desc in CASOS:
    ph=esp(fr); ws=ph.split(' ')
    # acha a palavra pela posição no texto
    tw=[x for x in re.sub(r"[^a-zA-Z' ]",' ',fr).lower().split()]
    i=tw.index(w); orig=ws[i]; novo=orig.replace(de,para,1) if de in orig else None
    if de=='s' and para=='is': novo='ɪ'+orig
    if de=='ɡ' and para=='ɡi': novo=orig+'i'
    assert novo and novo!=orig,(fr,w,orig)
    ws[i]=novo; ph2=' '.join(ws)
    for v in ['af_heart','pm_alex']:
        x=synth_ph(ph2,v); nm=f'teste/err_{len(lista)}.f32'; x.tofile(nm)
        lista.append({'f':nm,'frase':fr,'voz':v,'erro':desc,'palavra':w,'de':de,'para':para,'kok':ph2})
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'..'))
from g2p import key, esperado
V=json.load(open(os.path.join(os.path.dirname(__file__),'..','vocab.json')))
for c in lista: c['esp']=esperado(key(c['frase']),V)
json.dump(lista,open('teste/lista.json','w'),ensure_ascii=False,indent=0)
print(len(lista),'falas')
