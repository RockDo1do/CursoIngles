# Pronúncia som por som

O Whisper confere se a frase foi entendida, palavra por palavra. A pronúncia som por som vai além: um modelo de fonemas reconhece cada som da fala e compara com os sons esperados da frase. Tudo roda no aparelho do aluno, sem enviar nada para a internet.

É opcional. O aluno liga em **Ajustes → Voz e microfone → Pronúncia som por som**, e o modelo (90 MB) é baixado uma vez e fica guardado no aparelho.

## Como funciona

1. **Modelo.** É um wav2vec2 de 6 camadas, a versão leve de `facebook/wav2vec2-lv-60-espeak-cv-ft`. A cada 20 ms de fala, ele dá a chance de cada um dos 392 fonemas do eSpeak (IPA).
2. **Motor.** O arquivo `fonemas.c` é uma reimplementação do modelo em C puro, compilada para WebAssembly com instruções SIMD. Os pesos ficam em 8 bits, exatamente como no modelo original. Para 3 segundos de fala, a análise leva 1 a 2 segundos num computador e um pouco mais num celular. O limite é de 8 segundos de fala e 172 MB de memória.
3. **Sons esperados.** O arquivo `fonemas/dados.json` tem os fonemas de cada frase e palavra do curso, gerados pelo eSpeak NG em inglês americano (o mesmo usado no treino do modelo). O nome do aluno vira `*`, que aceita qualquer som.
4. **Avaliação.** O `fonemas/avaliar.js` usa o método GOP-CTC. Para cada som que costuma dar problema para quem fala português, compara a chance da frase certa com a da frase com o erro típico. Exemplos de erros típicos: TH virando S, T ou F; V virando B; H sumindo; NG virando N; I longo virando I curto. O som só é marcado quando o erro é mais provável que o certo por uma margem, e nas vogais essa margem é maior. Também testa vogal a mais antes de S + consoante ("iscool") e depois de consoante final ("bigui").

### Precisão

A calibração foi feita com 108 falas sintéticas (Kokoro, com 2 vozes americanas e 2 brasileiras), certas e com os erros inseridos de propósito:

- **Alarmes falsos:** 0,3%, ou 1 em 384 sons conferidos nas falas certas.
- **Erros encontrados:** 24 de 29. A maioria dos que passaram são casos em que a voz sintética não produziu o erro pedido.

Falas reais variam mais. Por isso, a regra é preferir deixar passar um erro a acusar um acerto.

## Arquivos

| Arquivo | O que é |
|---|---|
| `fonemas.c` | O motor (wav2vec2 em C). As instruções de compilação estão no começo do arquivo. |
| `converter.py` | Converte o `light-model.onnx` no formato do motor (`modelo.bin`). |
| `onnxread.py` | Leitor de ONNX sem dependências, usado pelo conversor. |
| `g2p.py` | Fonemas do eSpeak NG no formato do modelo. |
| `gerar_frases.py` | Gera `fonemas/dados.json` a partir da pasta `conteudo/`. |
| `vocab.json` | Os 392 fonemas do modelo. |
| `calibracao/` | Scripts que geram falas de teste com erros e medem a precisão. |

## Conteúdo novo

Sempre que entrar uma frase nova no curso, rode:

```
ESPEAK_DIR=tools/vozes/piper python3 tools/fonemas/gerar_frases.py
```

A pasta `piper/` é a mesma usada para gravar as vozes (veja `tools/README.md`). O teste do site (`tests/test_site.py`) avisa quando alguma frase está sem fonemas.

## Refazer o modelo do zero

1. Baixe `light-model.onnx` em https://github.com/idawud/UK-Pronunciation-Coach-models/releases (tag `models-v1`).
2. `python3 tools/fonemas/converter.py light-model.onnx modelo.bin`
3. `split -b 12000000 -d -a 1 modelo.bin fonemas/modelo.bin.part`
4. Se o tamanho ou as partes mudarem, atualize `VER`, `TOTAL` e `PARTS` em `fonemas/fonemas-worker.js`. Mudar `VER` faz os aparelhos baixarem o modelo de novo.
5. Compile o motor com o wasi-sdk (https://github.com/WebAssembly/wasi-sdk/releases):
   `clang --target=wasm32-wasi -O3 -msimd128 -mexec-model=reactor -Wl,--strip-all -Wl,--initial-memory=33554432 -Wl,--max-memory=1073741824 -o fonemas/fonemas.wasm tools/fonemas/fonemas.c`
6. Rode `node tests/test_fonemas.js`. Ele roda o modelo em uma fala certa e em uma com dois erros, e confere o resultado.

## Licenças

- **Modelo:** Apache 2.0 (Meta, e a versão leve de idawud). Trained in part on the CSTR VCTK Corpus (University of Edinburgh), CC BY 4.0.
- **eSpeak NG:** GPL 3. É usado só aqui, para gerar o `dados.json`, e não vai junto com o site.
