# Vetoriza o logo oficial (fotos-originais/logo.jpg) em partes: chama, arco, textos.
# Uso (uma vez, só se o logo mudar):
#   pip install potracer
#   python3 scripts/vetorizar-logo.py fotos-originais/logo.jpg src/data/logo-vetor.json
#   node scripts/gerar-icones.mjs
import json
import math
import sys

import numpy as np
from PIL import Image, ImageFilter
import potrace

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
K = 3
big = im.resize((im.width * K, im.height * K), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.0))
a = np.asarray(big).astype(int)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
H, W = R.shape
yy, xx = np.mgrid[0:H, 0:W]
cx = cy = 540 * K
dist = np.hypot(xx - cx, yy - cy)

branco = (R > 140) & (G > 140) & (B > 140) & (np.abs(R - B) < 70)
azul = (B > 150) & (B - R > 50)

chama = branco & (xx > 420 * K) & (xx < 660 * K) & (yy > 280 * K) & (yy < 600 * K)
texto_branco = branco & (yy > 600 * K) & (yy < 715 * K) & (dist < 370 * K)
texto_azul = azul & (yy > 715 * K) & (yy < 800 * K) & (dist < 370 * K)
arco = azul & (dist > 360 * K) & (dist < 450 * K)

# Ajuste de círculo (mínimos quadrados) sobre os pixels do arco.
ys, xs = np.nonzero(arco)
xs_f, ys_f = xs / K, ys / K
A = np.c_[2 * xs_f, 2 * ys_f, np.ones_like(xs_f)]
b = xs_f**2 + ys_f**2
(ccx, ccy, c), *_ = np.linalg.lstsq(A, b, rcond=None)
r_all = np.hypot(xs_f - ccx, ys_f - ccy)
raio = float(np.median(r_all))
largura = float(np.percentile(r_all, 99) - np.percentile(r_all, 1))
ang = np.degrees(np.arctan2(ys_f - ccy, xs_f - ccx))  # 0 = direita, positivo = para baixo
# Lacuna à direita: ângulos entre o fim de cima (negativo) e o de baixo (positivo).
direita = np.abs(ang) < 90
cima = ang[direita & (ang < 0)].max()  # extremo do lado de cima (mais próximo de 0)
baixo = ang[direita & (ang > 0)].min()
# Descontar a tampa arredondada (meia largura).
cap = math.degrees((largura / 2) / raio)
a_cima = cima - cap
a_baixo = baixo + cap


def ponto(graus):
    t = math.radians(graus)
    return ccx + raio * math.cos(t), ccy + raio * math.sin(t)


p1, p2 = ponto(a_cima), ponto(a_baixo)
arco_d = (
    f'M{p1[0]:.1f} {p1[1]:.1f}A{raio:.1f} {raio:.1f} 0 1 0 {p2[0]:.1f} {p2[1]:.1f}'
)
comprimento = raio * math.radians(360 - (a_baixo - a_cima))


def tracar(mask):
    bm = potrace.Bitmap(mask)
    plist = bm.trace(turdsize=30, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda p: f'{p.x / K:.1f} {p.y / K:.1f}'
    partes = []
    for curva in plist:
        # O potracer devolve também um contorno da borda da imagem: descarta.
        pts = [curva.start_point] + [s.end_point for s in curva.segments]
        if max(p.x for p in pts) - min(p.x for p in pts) > (W - 10) and max(p.y for p in pts) - min(p.y for p in pts) > (H - 10):
            continue
        d = ['M' + f(curva.start_point)]
        for s in curva.segments:
            if s.is_corner:
                d.append('L' + f(s.c) + 'L' + f(s.end_point))
            else:
                d.append('C' + f(s.c1) + ' ' + f(s.c2) + ' ' + f(s.end_point))
        d.append('Z')
        partes.append(''.join(d))
    return partes


chama_partes = tracar(chama)
# Silhueta cheia da chama = maior contorno (o externo).
chama_partes.sort(key=len, reverse=True)
dados = {
    'chamaContorno': ''.join(chama_partes),
    'chamaSilhueta': chama_partes[0],
    'textoBranco': ''.join(tracar(texto_branco)),
    'textoAzul': ''.join(tracar(texto_azul)),
    'arco': arco_d,
    'arcoLargura': round(largura, 1),
    'arcoComprimento': round(comprimento, 1),
    'centro': [round(float(ccx), 1), round(float(ccy), 1)],
    'raio': round(raio, 1),
}
ys2, xs2 = np.nonzero(chama)
dados['chamaCaixa'] = [round(xs2.min() / K, 1), round(ys2.min() / K, 1), round(xs2.max() / K, 1), round(ys2.max() / K, 1)]
for nome, m in (('textoBranco', texto_branco), ('textoAzul', texto_azul)):
    y3, x3 = np.nonzero(m)
    dados[nome + 'Caixa'] = [round(x3.min() / K, 1), round(y3.min() / K, 1), round(x3.max() / K, 1), round(y3.max() / K, 1)]
json.dump(dados, open(out, 'w'))
print({k: v for k, v in dados.items() if not isinstance(v, str)})
print('tamanhos', {k: len(v) for k, v in dados.items() if isinstance(v, str)})
