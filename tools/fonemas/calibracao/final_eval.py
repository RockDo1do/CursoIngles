import json, sys
import os
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'..'))
from g2p import key
R=json.load(open(sys.argv[1] if len(sys.argv)>1 else 'teste/res.json'))
fa=ch=0; fal=[]
for r in R:
    if r['erro']: continue
    ch+=r['r']['checados']
    for w,W in zip(key(r['frase']).split(),r['r']['palavras']):
        for e in W['erros']: fa+=1; fal.append((r['voz'],w,e))
        if W['extra']: fa+=1; fal.append((r['voz'],w,W['extra']))
print(f'falas certas: {fa} alarmes falsos em {ch} sons checados ({fa/ch*100:.1f}%)')
for f in fal: print('  falso',f)
hit=tot=0
for r in R:
    if not r['erro'] or r['palavra']=='live' or (r['para']=='ʁ' and r['voz']=='af_heart'): continue
    ws=key(r['frase']).split(); W=r['r']['palavras'][ws.index(r['palavra'])]; tot+=1
    if r['para'] in ('is','ɡi'): ok=bool(W['extra'])
    else: ok=any(e['ph']==r['de'] for e in W['erros'])
    hit+=ok; print(('OK ' if ok else 'XX ')+f"{r['erro']:18s} {r['voz']:9s} {r['palavra']:8s} {W}")
print(f'erros encontrados: {hit}/{tot}')
