"""Converte o light-model.onnx (wav2vec2 de fonemas, 6 camadas) no arquivo fonemas.bin do motor em C.

Os pesos ficam exatamente como no original (uint8 com escala e zero por tensor), só reorganizados:
cada matriz vira [saída][entrada] para o produto ficar contínuo na memória.
Uso: python3 converter.py light-model.onnx fonemas.bin
"""
import sys, re, struct, numpy as np
sys.path.insert(0, __import__('os').path.dirname(__file__))
from onnxread import load, attrs

def main(src, dst):
    W, _ = load(src); N = attrs(src)
    out = []  # (nome, tipo, array, escala, zero)
    for k, v in W.items():
        if k.startswith('model.') and not k.endswith(('_quantized', '_scale', '_zero_point')):
            out.append((k.replace('model.wav2vec2.', '').replace('model.', ''), 0, v.astype(np.float32), 0.0, 0.0))
    for n in N:
        if n['op'] not in ('MatMulInteger', 'ConvInteger'):
            continue
        q = n['in'][1]; base = q[:-len('_quantized')]
        m = re.search(r'/model/(?:wav2vec2/)?(.*)/(?:MatMul|Conv)_output_0', n['out'][0])
        name = m.group(1).replace('/', '.') + '.weight'
        a = W[q]; zp = np.asarray(W[base + '_zero_point']).ravel(); sc = np.asarray(W[base + '_scale']).ravel()
        assert zp.size == 1 and sc.size == 1, name
        if n['op'] == 'MatMulInteger':
            a = a.T                      # (entrada, saída) -> (saída, entrada)
        else:
            a = a.reshape(a.shape[0], -1)  # (O, I, K) -> (O, I*K)
        out.append((name, 1, np.ascontiguousarray(a, np.uint8), float(sc[0]), float(zp[0])))
    with open(dst, 'wb') as f:
        f.write(b'FON1' + struct.pack('<I', len(out)))
        for name, t, a, sc, zp in sorted(out):
            nb = name.encode()
            f.write(struct.pack('<B', len(nb)) + nb + struct.pack('<BI', t, a.ndim) + struct.pack(f'<{a.ndim}I', *a.shape) + struct.pack('<ff', sc, zp))
            f.write(b'\0' * (-f.tell() % 16))
            f.write(a.tobytes())
    print(len(out), 'tensores')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
