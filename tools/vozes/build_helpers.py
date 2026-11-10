import numpy as np
SR=24000
def trim(a):
    nz=np.nonzero(np.abs(a)>300)[0]
    return a[max(0,nz[0]-int(.04*SR)):min(len(a),nz[-1]+int(.08*SR))] if len(nz) else a
