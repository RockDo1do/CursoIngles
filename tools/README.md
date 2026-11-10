# Ferramentas da Torre do Inglês

Esta pasta guarda os scripts que gravam as vozes e os que preparam o reconhecimento de fala. Os arquivos grandes (modelos de voz, bibliotecas) não ficam no repositório. Abaixo está de onde baixar cada um.

## Estrutura

| Pasta | O que tem |
|---|---|
| `site/` | `build_site.py` (confere o conteúdo e prepara a publicação) e `sw-template.js` (modelo do service worker) |
| `vozes/` | Geração das falas gravadas com Kokoro-82M |
| `whisper/` | Conversão do modelo Whisper tiny.en e o código em C que vira `whisper.wasm` |

Não existe mais um arquivo-fonte separado: os arquivos publicados são os próprios fontes. `index.html` tem a aparência, `app.js` o código e `conteudo/` a história e as questões (veja `conteudo/LEIA-ME.md`).

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

`python3 site/build_site.py` (ou `python3 tools/site/build_site.py`, a partir da raiz) confere o conteúdo, atualiza a marca de versão em `index.html`, gera o `sw.js` e põe no endereço de cada áudio uma marca da versão (`?v=...`), para os aparelhos baixarem os arquivos novos.

- `--audio PASTA` copia antes os áudios gravados de uma pasta com `index.json`.
- `--artefato PASTA` monta a cópia para o Claude: a mesma página, sem as partes marcadas `<!-- só no site -->`, junto com `app.js` e `conteudo/`.
- `--verificar` só confere, sem mudar nada. O teste do GitHub usa essa opção para avisar se alguém esqueceu de rodar o build.

## Testes

`python3 tests/test_site.py` abre todas as telas num navegador automático e confere as respostas, as traduções e os áudios. O GitHub roda esse teste a cada mudança, se o fluxo em `.github/workflows` estiver ativo.
