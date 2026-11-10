import sys, struct, base64, numpy as np
from onnxread import load
D='../sherpa/sherpa-onnx-whisper-tiny.en/'
et,en=load(D+'tiny.en-encoder.onnx'); dt,dn=load(D+'tiny.en-decoder.onnx')
def seq(t,n):
    cons={}
    for x in n:
        for i in x['in']: cons.setdefault(i,[]).append(x)
    out=[]
    for x in n:
        if x['op'] in('MatMul','Conv'):
            ws=[i for i in x['in'] if i in t and t[i].size>100]
            if not ws: continue
            b=None
            for c in cons.get(x['out'][0],[]):
                if c['op']=='Add':
                    bb=[i for i in c['in'] if i in t]
                    if bb: b=t[bb[0]]
            if x['op']=='Conv': b=t[x['in'][2]] if len(x['in'])>2 else b
            out.append((x['op'],t[ws[0]],b))
    return out
sd={}
es=seq(et,en)
sd['encoder.conv1.weight'],sd['encoder.conv1.bias']=es[0][1],es[0][2]
sd['encoder.conv2.weight'],sd['encoder.conv2.bias']=es[1][1],es[1][2]
sd['encoder.positional_embedding']=et['audioEncoder.positional_embedding']
k=2
def lin(name,item,bias=True):
    sd[name+'.weight']=np.ascontiguousarray(item[1].T)
    if bias: assert item[2] is not None,name; sd[name+'.bias']=item[2]
    else: assert item[2] is None,name
for L in range(4):
    p=f'encoder.blocks.{L}.'
    lin(p+'attn.query',es[k]);lin(p+'attn.key',es[k+1],False);lin(p+'attn.value',es[k+2]);lin(p+'attn.out',es[k+3]);lin(p+'mlp.0',es[k+4]);lin(p+'mlp.2',es[k+5]);k+=6
    for n in ('attn_ln','mlp_ln'):
        for w in ('weight','bias'): sd[p+f'{n}.{w}']=et[f'audioEncoder.blocks.{L}.{n}.{w}']
for w in ('weight','bias'): sd['encoder.ln_post.'+w]=et['audioEncoder.ln_post.'+w]
for L in range(4):
    p=f'decoder.blocks.{L}.'
    lin(p+'cross_attn.key',es[k],False);lin(p+'cross_attn.value',es[k+1]);k+=2
assert k==len(es),(k,len(es))
ds=seq(dt,dn); k=0
for L in range(4):
    p=f'decoder.blocks.{L}.'
    lin(p+'attn.query',ds[k]);lin(p+'attn.key',ds[k+1],False);lin(p+'attn.value',ds[k+2]);lin(p+'attn.out',ds[k+3])
    lin(p+'cross_attn.query',ds[k+4]);lin(p+'cross_attn.out',ds[k+5]);lin(p+'mlp.0',ds[k+6]);lin(p+'mlp.2',ds[k+7]);k+=8
    for n in ('attn_ln','cross_attn_ln','mlp_ln'):
        for w in ('weight','bias'): sd[p+f'{n}.{w}']=dt[f'textDecoder.blocks.{L}.{n}.{w}']
assert k==len(ds)
sd['decoder.token_embedding.weight']=dt['textDecoder.token_embedding.weight']
sd['decoder.positional_embedding']=dt['textDecoder.positional_embedding']
for w in ('weight','bias'): sd['decoder.ln.'+w]=dt['textDecoder.ln.'+w]
print('tensors',len(sd))
H=dict(n_vocab=51864,n_audio_ctx=1500,n_audio_state=384,n_audio_head=6,n_audio_layer=4,n_text_ctx=448,n_text_state=384,n_text_head=6,n_text_layer=4,n_mels=80)
filters=np.load('../whisper/whisper/assets/mel_filters.npz')['mel_80']
tokens=[base64.b64decode(a) for a,r in (l.split() for l in open('../whisper/whisper/assets/gpt2.tiktoken','rb').read().splitlines() if l)]
f=open(sys.argv[1],'wb')
f.write(struct.pack('i',0x67676d6c))
for kk in ('n_vocab','n_audio_ctx','n_audio_state','n_audio_head','n_audio_layer','n_text_ctx','n_text_state','n_text_head','n_text_layer','n_mels'): f.write(struct.pack('i',H[kk]))
f.write(struct.pack('i',1))
f.write(struct.pack('ii',*filters.shape)); f.write(filters.astype(np.float32).tobytes())
f.write(struct.pack('i',len(tokens)))
for t in tokens: f.write(struct.pack('i',len(t))); f.write(t)
for name,data in sd.items():
    data=np.asarray(data).squeeze()
    if name in('encoder.conv1.bias','encoder.conv2.bias'): data=data.reshape(data.shape[0],1)
    nd=data.ndim; ft=1
    if nd<2 or name in('encoder.conv1.bias','encoder.conv2.bias','encoder.positional_embedding','decoder.positional_embedding'): data=data.astype(np.float32);ft=0
    else: data=data.astype(np.float16)
    s=name.encode(); f.write(struct.pack('iii',nd,len(s),ft))
    for i in range(nd): f.write(struct.pack('i',data.shape[nd-1-i]))
    f.write(s); f.write(np.ascontiguousarray(data).tobytes())
f.close(); print('ok')
