"""Fonemas do eSpeak NG (inglês americano), no mesmo formato usado para treinar o modelo de fonemas.
Precisa da biblioteca do eSpeak NG: defina ESPEAK_DIR com a pasta que tem libespeak-ng.so.1 e espeak-ng-data
(a mesma pasta piper/ usada para gravar as vozes, veja tools/README.md)."""
import ctypes, os, re, json
DIR = os.environ.get('ESPEAK_DIR', os.path.join(os.path.dirname(__file__), '..', 'vozes', 'piper'))
LIB = ctypes.cdll.LoadLibrary(os.path.join(DIR, 'libespeak-ng.so.1'))
LIB.espeak_Initialize.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_char_p, ctypes.c_int]
assert LIB.espeak_Initialize(2, 0, DIR.encode(), 0) > 0, 'eSpeak NG não iniciou'
LIB.espeak_SetVoiceByName.argtypes = [ctypes.c_char_p]; LIB.espeak_SetVoiceByName(b'en-us')
LIB.espeak_TextToPhonemes.restype = ctypes.c_char_p
LIB.espeak_TextToPhonemes.argtypes = [ctypes.POINTER(ctypes.c_char_p), ctypes.c_int, ctypes.c_int]


def phon(text):
    """lista de trechos; palavras separadas por espaço e fonemas por _"""
    buf = ctypes.c_char_p(text.encode('utf-8')); out = []
    while True:
        r = LIB.espeak_TextToPhonemes(ctypes.byref(buf), 1, 0x02 | (ord('_') << 8))
        if r is None: break
        out.append(r.decode('utf-8'))
        if not buf.value: break
    return out


def key(t):
    """mesma normalização do app.js (fonKey): minúsculas, só letras, números e apóstrofo"""
    t = t.lower().replace('’', "'").replace('‘', "'")
    return ' '.join(re.sub(r"[^a-z0-9' ]+", ' ', t).split())


def tok(ph, V):
    """divide um fonema do eSpeak em símbolos do vocabulário do modelo (sem marcas de tonicidade)"""
    ph = ph.replace('ˈ', '').replace('ˌ', '')
    if not ph: return []
    if ph in V: return [ph]
    out = []; i = 0
    while i < len(ph):
        for L in (3, 2, 1):
            if ph[i:i + L] in V: out.append(ph[i:i + L]); i += L; break
        else: raise KeyError(ph)
    return out


def esperado(k, V):
    """'f o n|e m a s' para a frase normalizada k; a palavra 'rafa' (nome do aluno) vira '*'"""
    ws = k.split(); ch = ' '.join(phon(k)).split()
    if len(ch) != len(ws):
        ch = [' '.join(phon(w)).replace(' ', '_') for w in ws]
    return '|'.join('*' if w == 'rafa' else ' '.join(t for x in p.split('_') for t in tok(x, V)) for w, p in zip(ws, ch))
