import numpy as np
def varint(b,i):
    r=0;s=0
    while True:
        c=b[i];i+=1;r|=(c&0x7f)<<s;s+=7
        if c<0x80: return r,i
def fields(b,start=0,end=None):
    i=start;end=len(b) if end is None else end
    while i<end:
        key,i=varint(b,i);f=key>>3;w=key&7
        if w==0: v,i=varint(b,i);yield f,w,v
        elif w==2:
            l,i=varint(b,i);yield f,w,(i,i+l);i+=l
        elif w==5: yield f,w,b[i:i+4];i+=4
        elif w==1: yield f,w,b[i:i+8];i+=8
        else: raise ValueError(w)
DT={1:np.float32,2:np.uint8,3:np.int8,6:np.int32,7:np.int64,10:np.float16,11:np.float64}
def tensor(b,a,e):
    dims=[];dt=None;name='';raw=None;fl=[];i64=[]
    for f,w,v in fields(b,a,e):
        if f==1:
            if w==0: dims.append(v)
            else:
                j=v[0]
                while j<v[1]: x,j=varint(b,j);dims.append(x)
        elif f==2: dt=v
        elif f==8: name=bytes(b[v[0]:v[1]]).decode()
        elif f==9: raw=bytes(b[v[0]:v[1]])
        elif f==4:
            if w==2: fl=np.frombuffer(bytes(b[v[0]:v[1]]),np.float32)
            else: fl.append(np.frombuffer(v,np.float32)[0])
        elif f==7:
            if w==2:
                j=v[0]
                while j<v[1]: x,j=varint(b,j);i64.append(x)
            else: i64.append(v)
    t=DT.get(dt,np.float32)
    if raw is not None: arr=np.frombuffer(raw,t)
    elif len(fl): arr=np.asarray(fl,np.float32)
    else: arr=np.asarray(i64,np.int64)
    return name,arr.reshape(dims) if dims and arr.size==int(np.prod(dims)) else arr
def load(path):
    b=memoryview(open(path,'rb').read())
    out={};nodes=[]
    for f,w,v in fields(b):
        if f==7:
            for g,w2,v2 in fields(b,*v):
                if g==5: n,a=tensor(b,*v2);out[n]=a
                if g==1:
                    nd={'in':[],'out':[],'op':''}
                    for h,w3,v3 in fields(b,*v2):
                        if h==1: nd['in'].append(bytes(b[v3[0]:v3[1]]).decode())
                        elif h==2: nd['out'].append(bytes(b[v3[0]:v3[1]]).decode())
                        elif h==4: nd['op']=bytes(b[v3[0]:v3[1]]).decode()
                    nodes.append(nd)
    return out,nodes
