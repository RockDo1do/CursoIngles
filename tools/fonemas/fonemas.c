/* Motor de fonemas da Torre do Inglês: wav2vec2 (6 camadas, 1024 de largura) em C puro.
 *
 * Reconhece os sons (fonemas IPA do eSpeak) de uma fala gravada a 16 kHz e devolve, para cada
 * trecho de 20 ms, a pontuação de cada um dos 392 fonemas. Roda no próprio aparelho, como o Whisper.
 *
 * Os pesos ficam em 8 bits, como no modelo original (uint8 com escala e zero por matriz). As entradas
 * de cada produto são quantizadas em blocos de 32 valores, cada um com sua escala.
 *
 * Compilar para a web (wasi-sdk):
 *   clang -O3 -msimd128 -mexec-model=reactor -Wl,--strip-all -Wl,--initial-memory=33554432
 *         -Wl,--max-memory=1073741824 -o fonemas.wasm fonemas.c
 * Testar no computador: cc -O3 -march=native -DTESTE -o teste fonemas.c -lm
 */
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <stdio.h>
#ifdef __wasm_simd128__
#include <wasm_simd128.h>
#endif

#ifdef __wasm__
#define EXPORT(n) __attribute__((export_name(n)))
#else
#define EXPORT(n)
#endif

#define D 1024      /* largura do transformer */
#define C 512       /* canais da parte convolucional */
#define NH 16       /* cabeças de atenção */
#define HD 64       /* tamanho de cada cabeça */
#define FF 4096
#define NV 392      /* fonemas */
#define NL 6        /* camadas */

typedef struct { const char *name; int type, nd, dims[4]; float scale, zero; const void *data; } Tensor;
static Tensor T_[160]; static int nT = 0;
static const uint8_t *g_model = 0;

static const Tensor *get(const char *n) {
    for (int i = 0; i < nT; i++) if (!strcmp(T_[i].name, n)) return &T_[i];
    return 0;
}
static int ok_model = 0;
static const Tensor *need(const char *n) { const Tensor *t = get(n); if (!t) ok_model = 0; return t; }

/* ---------- produto de matrizes 8 bits ---------- */
/* x: n linhas de k floats -> inteiros de 8 bits (guardados em 16 bits) em blocos de 32, cada bloco com sua escala.
   As linhas são completadas com zeros até um múltiplo de 4. corr[r] = soma(escala do bloco × soma do bloco). */
static int16_t *qx = 0; static float *qd = 0, *qcorr = 0; static size_t qcap = 0, qrcap = 0;
static void quant_rows(const float *x, int n, int k) {
    int n4 = (n + 3) & ~3; size_t need_ = (size_t)n4 * k;
    if (need_ > qcap) { qcap = need_ + need_ / 2; qx = realloc(qx, qcap * 2); qd = realloc(qd, qcap / 32 * sizeof(float)); }
    if ((size_t)n4 > qrcap) { qrcap = n4 + n4 / 2; qcorr = realloc(qcorr, qrcap * sizeof(float)); }
    int nb = k / 32;
    for (int r = 0; r < n4; r++) {
        float corr = 0;
        for (int b = 0; b < nb; b++) {
            int16_t *o = qx + (size_t)r * k + b * 32;
            if (r >= n) { memset(o, 0, 64); qd[(size_t)r * nb + b] = 0; continue; }
            const float *v = x + (size_t)r * k + b * 32; float m = 0;
            for (int i = 0; i < 32; i++) { float a = fabsf(v[i]); if (a > m) m = a; }
            float d = m / 127.f, id = d > 0 ? 1.f / d : 0; int s = 0;
            for (int i = 0; i < 32; i++) { int q = (int)lrintf(v[i] * id); o[i] = (int16_t)q; s += q; }
            qd[(size_t)r * nb + b] = d; corr += d * s;
        }
        qcorr[r] = corr;
    }
}

/* y[n][o] (+)= x[n][k] · W[o][k] + bias, com W em 8 bits sem sinal: (w - zero) × escala.
   Usa as linhas [o0, o0+no) de W; o bias é lido na mesma posição. ystride: tamanho da linha de y. */
static void matmul(float *y, int ystride, const float *x, int n, int k, const Tensor *w, int o0, int no, const float *bias, int acc) {
    quant_rows(x, n, k);
    const uint8_t *W = (const uint8_t *)w->data; int nb = k / 32; float sc = w->scale, zp = w->zero;
    for (int r = 0; r < n; r += 4) {
        int nr = n - r < 4 ? n - r : 4;
        const int16_t *x0 = qx + (size_t)r * k, *x1 = x0 + k, *x2 = x1 + k, *x3 = x2 + k;
        const float *d0 = qd + (size_t)r * nb, *d1 = d0 + nb, *d2 = d1 + nb, *d3 = d2 + nb;
        for (int o = 0; o < no; o++) {
            const uint8_t *wr = W + (size_t)(o0 + o) * k;
            float s[4];
#ifdef __wasm_simd128__
            v128_t a0 = wasm_f32x4_splat(0), a1 = a0, a2 = a0, a3 = a0;
            for (int b = 0; b < nb; b++) {
                const int off = b * 32;
                v128_t wa = wasm_v128_load(wr + off), wb = wasm_v128_load(wr + off + 16);
                v128_t w0 = wasm_u16x8_extend_low_u8x16(wa), w1 = wasm_u16x8_extend_high_u8x16(wa);
                v128_t w2 = wasm_u16x8_extend_low_u8x16(wb), w3 = wasm_u16x8_extend_high_u8x16(wb);
#define ROW(X, D, A) { const int16_t *xp = X + off; \
                v128_t t = wasm_i32x4_add(wasm_i32x4_add(wasm_i32x4_dot_i16x8(w0, wasm_v128_load(xp)), wasm_i32x4_dot_i16x8(w1, wasm_v128_load(xp + 8))), \
                                          wasm_i32x4_add(wasm_i32x4_dot_i16x8(w2, wasm_v128_load(xp + 16)), wasm_i32x4_dot_i16x8(w3, wasm_v128_load(xp + 24)))); \
                A = wasm_f32x4_add(A, wasm_f32x4_mul(wasm_f32x4_convert_i32x4(t), wasm_f32x4_splat(D[b]))); }
                ROW(x0, d0, a0) ROW(x1, d1, a1) ROW(x2, d2, a2) ROW(x3, d3, a3)
#undef ROW
            }
#define HS(A) (wasm_f32x4_extract_lane(A, 0) + wasm_f32x4_extract_lane(A, 1) + wasm_f32x4_extract_lane(A, 2) + wasm_f32x4_extract_lane(A, 3))
            s[0] = HS(a0); s[1] = HS(a1); s[2] = HS(a2); s[3] = HS(a3);
#undef HS
#else
            const int16_t *xs[4] = {x0, x1, x2, x3}; const float *ds[4] = {d0, d1, d2, d3};
            for (int j = 0; j < 4; j++) {
                float t = 0;
                for (int b = 0; b < nb; b++) {
                    int32_t i32 = 0; const uint8_t *wp = wr + b * 32; const int16_t *xp = xs[j] + b * 32;
                    for (int i = 0; i < 32; i++) i32 += (int32_t)wp[i] * xp[i];
                    t += ds[j][b] * (float)i32;
                }
                s[j] = t;
            }
#endif
            for (int j = 0; j < nr; j++) {
                float v = (s[j] - zp * qcorr[r + j]) * sc + (bias ? bias[o0 + o] : 0);
                float *dst = y + (size_t)(r + j) * ystride + o;
                *dst = acc ? *dst + v : v;
            }
        }
    }
}

/* ---------- operações simples ---------- */
static void layernorm(float *x, int n, int k, const float *g, const float *b) {
    for (int r = 0; r < n; r++) {
        float *v = x + (size_t)r * k; double m = 0, s = 0;
        for (int i = 0; i < k; i++) m += v[i];
        m /= k;
        for (int i = 0; i < k; i++) { double d = v[i] - m; s += d * d; }
        float is = (float)(1.0 / sqrt(s / k + 1e-5));
        for (int i = 0; i < k; i++) v[i] = (float)((v[i] - m) * is) * g[i] + b[i];
    }
}
static void gelu(float *x, size_t n) { for (size_t i = 0; i < n; i++) x[i] = 0.5f * x[i] * (1.f + erff(x[i] * 0.70710678f)); }
static const float *F(const char *n) { const Tensor *t = need(n); return t ? (const float *)t->data : 0; }

/* ---------- modelo ---------- */
static float *g_out = 0; static int g_frames = 0;

EXPORT("f_alloc") void *f_alloc(size_t n) { return malloc(n); }
EXPORT("f_free") void f_free(void *p) { free(p); }

/* buf: conteúdo do fonemas.bin (fica com o motor; não liberar) */
EXPORT("f_init") int f_init(const uint8_t *buf, size_t n) {
    if (n < 8 || memcmp(buf, "FON1", 4)) return 0;
    uint32_t cnt; memcpy(&cnt, buf + 4, 4); size_t p = 8; nT = 0;
    static char names[160][96];
    for (uint32_t i = 0; i < cnt && nT < 160; i++) {
        Tensor *t = &T_[nT]; int l = buf[p++]; if (l > 95) return 0;
        memcpy(names[nT], buf + p, l); names[nT][l] = 0; t->name = names[nT]; p += l;
        t->type = buf[p++]; uint32_t nd; memcpy(&nd, buf + p, 4); p += 4; t->nd = nd; size_t sz = 1;
        for (uint32_t d = 0; d < nd; d++) { uint32_t v; memcpy(&v, buf + p, 4); p += 4; t->dims[d] = v; sz *= v; }
        memcpy(&t->scale, buf + p, 4); memcpy(&t->zero, buf + p + 4, 4); p += 8;
        p += (16 - p % 16) % 16;
        t->data = buf + p; p += sz * (t->type ? 1 : 4); if (p > n) return 0; nT++;
    }
    g_model = buf; ok_model = 1;
    /* confere se tudo o que o motor usa existe */
    char nm[96];
    for (int i = 0; i < 7; i++) { snprintf(nm, 96, "feature_extractor.conv_layers.%d.conv.weight", i); need(nm); }
    for (int l = 0; l < NL; l++) { snprintf(nm, 96, "encoder.layers.%d.feed_forward.output_dense.weight", l); need(nm); }
    need("lm_head.weight"); need("encoder.pos_conv_embed.conv.weight");
    return ok_model;
}

static const int KS[7] = {10, 3, 3, 3, 3, 2, 2}, ST[7] = {5, 2, 2, 2, 2, 2, 2};

/* pcm: n amostras a 16 kHz. Devolve ponteiro para frames×392 pontuações (logits). */
EXPORT("f_run") float *f_run(const float *pcm, int n) {
    g_frames = 0; if (!ok_model || n < 400) return 0;
    if (n > 16000 * 8) n = 16000 * 8;   /* no máximo 8 segundos */
    char nm[96];
    /* normaliza o áudio (média zero, variância um) */
    double m = 0, v = 0; for (int i = 0; i < n; i++) m += pcm[i];
    m /= n; for (int i = 0; i < n; i++) v += (pcm[i] - m) * (pcm[i] - m);
    float is = (float)(1.0 / sqrt(v / n + 1e-7));
    float *x = malloc(sizeof(float) * n); for (int i = 0; i < n; i++) x[i] = (float)((pcm[i] - m) * is);

    /* camada convolucional 0: 1 canal, núcleo 10, passo 5 (float) */
    int Tn = (n - 10) / 5 + 1; float *a = malloc(sizeof(float) * (size_t)Tn * C);
    const float *w0 = F("feature_extractor.conv_layers.0.conv.weight"), *b0 = F("feature_extractor.conv_layers.0.conv.bias");
    for (int t = 0; t < Tn; t++) for (int c = 0; c < C; c++) {
        float s = b0[c]; const float *xi = x + t * 5, *wc = w0 + c * 10;
        for (int k = 0; k < 10; k++) s += xi[k] * wc[k];
        a[(size_t)t * C + c] = s;
    }
    free(x);
    for (int L = 0; L < 7; L++) {
        if (L > 0) {
            int K = KS[L], S = ST[L], To = (Tn - K) / S + 1; if (To < 1) { free(a); return 0; }
            /* em pedaços de 256 quadros, para não montar uma tabela gigante na memória */
            const int CH = 256;
            float *col = malloc(sizeof(float) * (size_t)CH * C * K), *o = malloc(sizeof(float) * (size_t)To * C);
            snprintf(nm, 96, "feature_extractor.conv_layers.%d.conv.weight", L); const Tensor *w = need(nm);
            snprintf(nm, 96, "feature_extractor.conv_layers.%d.conv.bias", L); const float *bb = F(nm);
            for (int t0 = 0; t0 < To; t0 += CH) {
                int nt = To - t0 < CH ? To - t0 : CH;
                for (int t = 0; t < nt; t++) for (int i = 0; i < C; i++) for (int k = 0; k < K; k++)
                    col[((size_t)t * C + i) * K + k] = a[((size_t)(t0 + t) * S + k) * C + i];
                matmul(o + (size_t)t0 * C, C, col, nt, C * K, w, 0, C, bb, 0);
            }
            free(col); free(a); a = o; Tn = To;
        }
        snprintf(nm, 96, "feature_extractor.conv_layers.%d.layer_norm.weight", L); const float *g = F(nm);
        snprintf(nm, 96, "feature_extractor.conv_layers.%d.layer_norm.bias", L);
        layernorm(a, Tn, C, g, F(nm)); gelu(a, (size_t)Tn * C);
    }
    int T = Tn;
    /* projeção 512 -> 1024 */
    layernorm(a, T, C, F("feature_projection.layer_norm.weight"), F("feature_projection.layer_norm.bias"));
    float *h = malloc(sizeof(float) * (size_t)T * D);
    matmul(h, D, a, T, C, need("feature_projection.projection.weight"), 0, D, F("feature_projection.projection.bias"), 0);
    free(a);
    /* posição: convolução em 16 grupos, núcleo 128, borda 64 */
    {
        const Tensor *w = need("encoder.pos_conv_embed.conv.weight"); const float *pb = F("encoder.pos_conv_embed.conv.bias");
        int G = 16, IC = D / G, K = 128;
        float *col = malloc(sizeof(float) * (size_t)T * IC * K), *pc = malloc(sizeof(float) * (size_t)T * D);
        for (int g = 0; g < G; g++) {
            for (int t = 0; t < T; t++) for (int i = 0; i < IC; i++) for (int k = 0; k < K; k++) {
                int src = t + k - 64;
                col[((size_t)t * IC + i) * K + k] = (src >= 0 && src < T) ? h[(size_t)src * D + g * IC + i] : 0.f;
            }
            matmul(pc + g * IC, D, col, T, IC * K, w, g * IC, IC, pb, 0);
        }
        /* o bias de cada grupo é lido a partir de o0; a saída vai para as colunas do grupo */
        gelu(pc, (size_t)T * D);
        for (size_t i = 0; i < (size_t)T * D; i++) h[i] += pc[i];
        free(col); free(pc);
    }
    /* transformer */
    float *ln = malloc(sizeof(float) * (size_t)T * D), *q = malloc(sizeof(float) * (size_t)T * D), *k = malloc(sizeof(float) * (size_t)T * D),
          *vv = malloc(sizeof(float) * (size_t)T * D), *att = malloc(sizeof(float) * (size_t)T * D), *ff = malloc(sizeof(float) * (size_t)T * FF),
          *sc = malloc(sizeof(float) * (size_t)T);
    for (int l = 0; l < NL; l++) {
#define P(s) (snprintf(nm, 96, "encoder.layers.%d." s, l), nm)
        memcpy(ln, h, sizeof(float) * (size_t)T * D);
        { const float *g = F(P("layer_norm.weight")); layernorm(ln, T, D, g, F(P("layer_norm.bias"))); }
        { const Tensor *w = need(P("attention.q_proj.weight")); matmul(q, D, ln, T, D, w, 0, D, F(P("attention.q_proj.bias")), 0); }
        { const Tensor *w = need(P("attention.k_proj.weight")); matmul(k, D, ln, T, D, w, 0, D, F(P("attention.k_proj.bias")), 0); }
        { const Tensor *w = need(P("attention.v_proj.weight")); matmul(vv, D, ln, T, D, w, 0, D, F(P("attention.v_proj.bias")), 0); }
        for (int hh = 0; hh < NH; hh++) for (int i = 0; i < T; i++) {
            const float *qi = q + (size_t)i * D + hh * HD; float mx = -1e30f;
            for (int j = 0; j < T; j++) {
                const float *kj = k + (size_t)j * D + hh * HD; float s = 0;
                for (int e = 0; e < HD; e++) s += qi[e] * kj[e];
                s *= 0.125f; sc[j] = s; if (s > mx) mx = s;
            }
            float sum = 0; for (int j = 0; j < T; j++) { sc[j] = expf(sc[j] - mx); sum += sc[j]; }
            float *oi = att + (size_t)i * D + hh * HD; for (int e = 0; e < HD; e++) oi[e] = 0;
            for (int j = 0; j < T; j++) {
                const float *vj = vv + (size_t)j * D + hh * HD; float p = sc[j] / sum;
                for (int e = 0; e < HD; e++) oi[e] += p * vj[e];
            }
        }
        { const Tensor *w = need(P("attention.out_proj.weight")); matmul(h, D, att, T, D, w, 0, D, F(P("attention.out_proj.bias")), 1); }
        memcpy(ln, h, sizeof(float) * (size_t)T * D);
        { const float *g = F(P("final_layer_norm.weight")); layernorm(ln, T, D, g, F(P("final_layer_norm.bias"))); }
        { const Tensor *w = need(P("feed_forward.intermediate_dense.weight")); matmul(ff, FF, ln, T, D, w, 0, FF, F(P("feed_forward.intermediate_dense.bias")), 0); }
        gelu(ff, (size_t)T * FF);
        { const Tensor *w = need(P("feed_forward.output_dense.weight")); matmul(h, D, ff, T, FF, w, 0, D, F(P("feed_forward.output_dense.bias")), 1); }
#undef P
    }
    layernorm(h, T, D, F("encoder.layer_norm.weight"), F("encoder.layer_norm.bias"));
    g_out = realloc(g_out, sizeof(float) * (size_t)T * NV);
    matmul(g_out, NV, h, T, D, need("lm_head.weight"), 0, NV, F("lm_head.bias"), 0);
    free(ln); free(q); free(k); free(vv); free(att); free(ff); free(sc); free(h);
    g_frames = T;
    return g_out;
}
EXPORT("f_frames") int f_frames(void) { return g_frames; }

#ifdef TESTE
#include <stdio.h>
/* uso: teste fonemas.bin audio.f32 saida.f32 */
int main(int argc, char **argv) {
    FILE *f = fopen(argv[1], "rb"); fseek(f, 0, SEEK_END); size_t n = ftell(f); fseek(f, 0, SEEK_SET);
    uint8_t *b = malloc(n); fread(b, 1, n, f); fclose(f);
    if (!f_init(b, n)) { fprintf(stderr, "modelo inválido\n"); return 1; }
    f = fopen(argv[2], "rb"); fseek(f, 0, SEEK_END); size_t na = ftell(f) / 4; fseek(f, 0, SEEK_SET);
    float *pcm = malloc(na * 4); fread(pcm, 4, na, f); fclose(f);
    float *o = f_run(pcm, (int)na); if (!o) { fprintf(stderr, "falhou\n"); return 1; }
    f = fopen(argv[3], "wb"); fwrite(o, 4, (size_t)f_frames() * NV, f); fclose(f);
    printf("%d quadros\n", f_frames()); return 0;
}
#endif
