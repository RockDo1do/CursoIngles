import ctypes, json, re, numpy as np, onnxruntime as ort, os
HERE=os.path.dirname(os.path.abspath(__file__))
LIB=ctypes.cdll.LoadLibrary(os.path.join(HERE,'piper','libespeak-ng.so.1'))
LIB.espeak_Initialize.argtypes=[ctypes.c_int,ctypes.c_int,ctypes.c_char_p,ctypes.c_int]
assert LIB.espeak_Initialize(2,0,os.path.join(HERE,'piper').encode(),0)>0
LIB.espeak_SetVoiceByName.argtypes=[ctypes.c_char_p]
LIB.espeak_SetVoiceByName(b'en-us')
LIB.espeak_TextToPhonemes.restype=ctypes.c_char_p
LIB.espeak_TextToPhonemes.argtypes=[ctypes.POINTER(ctypes.c_char_p),ctypes.c_int,ctypes.c_int]
VOCAB=json.load(open(os.path.join(HERE,'config.json')))['vocab']
PUNCT=re.compile(r'([.,!?;:—…]+)')
def _chunk(text):
    raw=text.encode('utf-8'); buf=ctypes.c_char_p(raw); out=[]
    while buf.value:
        r=LIB.espeak_TextToPhonemes(ctypes.byref(buf),1,0x02)
        if r: out.append(r.decode('utf-8'))
    return ' '.join(out)
def phonemize(text):
    res=''
    for part in PUNCT.split(text):
        if not part.strip(): continue
        if PUNCT.fullmatch(part): res=res.rstrip()+part+' '
        else: res+=_chunk(part.strip())+' '
    res=re.sub(r'\([a-z]+\)','',res)
    res=re.sub(r'\s+',' ',res)
    return ''.join(c for c in res if c in VOCAB).strip()
SR=24000
class Kokoro:
    def __init__(self):
        so=ort.SessionOptions(); so.intra_op_num_threads=os.cpu_count() or 4
        self.s=ort.InferenceSession(os.path.join(HERE,'kokoro.onnx'),so,providers=['CPUExecutionProvider'])
        self.v=np.load(os.path.join(HERE,'voices-v1.0.bin'))
        self.inp={i.name:i.type for i in self.s.get_inputs()}
        self.tok='input_ids' if 'input_ids' in self.inp else 'tokens'
    def synth(self,text,voice,speed=1.0):
        ph=phonemize(text); toks=[VOCAB[c] for c in ph if c in VOCAB][:500]
        st=self.v[voice][min(len(toks),len(self.v[voice]))-1]
        sp=np.array([speed],dtype=np.int32 if 'int' in self.inp['speed'] else np.float32)
        a=self.s.run(None,{self.tok:np.array([[0,*toks,0]],dtype=np.int64),'style':np.asarray(st,dtype=np.float32),'speed':sp})[0]
        return np.asarray(a).ravel(), ph
