# Ferramentas da Torre do Inglês

Esta pasta guarda tudo o que é preciso para refazer o curso: o arquivo-fonte da página, os scripts que gravam as vozes e os que preparam o reconhecimento de fala. Os arquivos grandes (modelos de voz, bibliotecas) não ficam no repositório. Abaixo está de onde baixar cada um.

## Estrutura

| Pasta | O que tem |
|---|---|
| `site/` | `build_site.py` (gera o site a partir do arquivo-fonte), `sw-template.js` (service worker), `privacy.html` |
| `conteudo/` | Conteúdo em Python que já foi incorporado ao curso: Arco 7, questões extras, frases extras por capítulo |
| `vozes/` | Geração das falas gravadas com Kokoro-82M |
| `whisper/` | Conversão do modelo Whisper tiny.en e o código em C que vira `whisper.wasm` |

O arquivo-fonte do curso é o `index.html` publicado, sem o cabeçalho que o `build_site.py` acrescenta. Para editar, use a cópia em `site/torre-do-ingles.html`.

## Refazer as vozes

1. Baixe para `vozes/`:
   - `kokoro-v1.0.onnx` e `voices-v1.0.bin`: https://github.com/thewh1teagle/kokoro-onnx/releases (tag `model-files-v1.0`)
   - a pasta `piper/` com `libespeak-ng.so.1` e `espeak-ng-data`: do pacote Linux do Piper em https://github.com/rhasspy/piper/releases
2. Instale `numpy` e `onnxruntime`, e tenha o `ffmpeg` no sistema.
3. Para gravar falas novas sem refazer tudo, use o modelo de `gen_fix3.py`: liste em um `.json` os pares `[personagem, frase]` e gere um arquivo novo (`n_fixN.mp3` e `s_fixN.mp3`). Nunca regrave um arquivo antigo com o mesmo nome.
4. `gen_names.py` grava os nomes dos alunos (lista no início do arquivo) e as partes das frases em que o nome entra.
5. `build.py` refaz todas as falas do zero a partir de `clips.json` (demora cerca de 1 hora).

Vozes usadas: Mina `af_heart`, protagonista masculino `am_michael`, protagonista feminina `af_kore`, Jin `am_puck`, monstros `am_fenrir`, narrador `af_bella`.

## Refazer o Whisper

1. Baixe o modelo `sherpa-onnx-whisper-tiny.en.tar.bz2` em https://github.com/k2-fsa/sherpa-onnx/releases (tag `asr-models`) e clone https://github.com/openai/whisper (para `mel_filters.npz` e `gpt2.tiktoken`).
2. `python3 onnx2ggml.py ggml-tiny.en.bin` converte para o formato do whisper.cpp. Depois, `whisper-quantize ggml-tiny.en.bin ggml-tiny.en-q5_1.bin q5_1` reduz para 32 MB.
3. Compile o whisper.cpp com o wasi-sdk (https://github.com/WebAssembly/wasi-sdk/releases) e ligue com `wrap.cpp` e `stubs.c`, gerando `whisper.wasm`. As opções de compilação estão no começo de `wrap.cpp`.
4. Divida o modelo em partes de até 11 MB (`split -b 11000000 -d -a 1 ... model.bin.part`) e atualize `whisper/whisper-worker.js` se o tamanho mudar.

## Publicar

`python3 site/build_site.py` gera o site. Ao trocar um áudio, o script coloca no endereço do arquivo uma marca da versão (`?v=...`), e os aparelhos baixam o arquivo novo.

## Testes

`python3 tests/test_site.py` abre todas as telas num navegador automático e confere as respostas, as traduções e os áudios. O GitHub roda esse teste a cada mudança, se o fluxo em `.github/workflows` estiver ativo.
