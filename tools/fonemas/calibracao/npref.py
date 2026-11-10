"""Versão de referência do wav2vec2 em numpy (float32), para conferir o motor em C."""
import numpy as np
from math import erf
from scipy.special import erf as verf
def ln(x,w,b,eps=1e-5):
    m=x.mean(-1,keepdims=True); v=((x-m)**2).mean(-1,keepdims=True)
    return (x-m)/np.sqrt(v+eps)*w+b
def gelu(x): return 0.5*x*(1+verf(x/np.sqrt(2)))
def conv1d(x,w,b,stride,pad=0,groups=1):
    # x (C,T)  w (O,I,K)
    if pad: x=np.pad(x,((0,0),(pad,pad)))
    O,I,K=w.shape; C,T=x.shape; To=(T-K)//stride+1
    out=np.zeros((O,To),np.float32); og=O//groups
    for g in range(groups):
        xs=x[g*I:(g+1)*I]
        idx=np.arange(To)[:,None]*stride+np.arange(K)[None]
        cols=xs[:,idx]                 # I,To,K
        cols=cols.transpose(1,0,2).reshape(To,I*K)
        out[g*og:(g+1)*og]=(cols@w[g*og:(g+1)*og].reshape(og,I*K).T).T
    return out+b[:,None]
STR=[5,2,2,2,2,2,2]
def forward(P,x,nl=6):
    x=((x-x.mean())/np.sqrt(x.var()+1e-7)).astype(np.float32)[None]
    for i in range(7):
        p=f'feature_extractor.conv_layers.{i}.'
        x=conv1d(x,P[p+'conv.weight'],P[p+'conv.bias'],STR[i])
        x=gelu(ln(x.T,P[p+'layer_norm.weight'],P[p+'layer_norm.bias']).T)
    h=ln(x.T,P['feature_projection.layer_norm.weight'],P['feature_projection.layer_norm.bias'])
    h=h@P['feature_projection.projection.weight']+P['feature_projection.projection.bias']   # T,1024
    pc=conv1d(h.T,P['encoder.pos_conv_embed.conv.weight'],P['encoder.pos_conv_embed.conv.bias'],1,64,16)[:,:-1]
    h=h+gelu(pc).T
    T=h.shape[0]
    for l in range(nl):
        p=f'encoder.layers.{l}.'
        a=ln(h,P[p+'layer_norm.weight'],P[p+'layer_norm.bias'])
        q=(a@P[p+'attention.q_proj.weight']+P[p+'attention.q_proj.bias']).reshape(T,16,64).transpose(1,0,2)*0.125
        k=(a@P[p+'attention.k_proj.weight']+P[p+'attention.k_proj.bias']).reshape(T,16,64).transpose(1,0,2)
        v=(a@P[p+'attention.v_proj.weight']+P[p+'attention.v_proj.bias']).reshape(T,16,64).transpose(1,0,2)
        s=q@k.transpose(0,2,1); s=np.exp(s-s.max(-1,keepdims=True)); s/=s.sum(-1,keepdims=True)
        o=(s@v).transpose(1,0,2).reshape(T,1024)
        h=h+o@P[p+'attention.out_proj.weight']+P[p+'attention.out_proj.bias']
        a=ln(h,P[p+'final_layer_norm.weight'],P[p+'final_layer_norm.bias'])
        h=h+gelu(a@P[p+'feed_forward.intermediate_dense.weight']+P[p+'feed_forward.intermediate_dense.bias'])@P[p+'feed_forward.output_dense.weight']+P[p+'feed_forward.output_dense.bias']
    h=ln(h,P['encoder.layer_norm.weight'],P['encoder.layer_norm.bias'])
    return h@P['lm_head.weight']+P['lm_head.bias']
