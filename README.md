# Torre do Inglês

Curso de inglês do básico ao avançado em formato de manhwa (webtoon vertical). Você é o protagonista e sobe a torre ao lado da Mina, aprendendo com diálogos do dia a dia.

## O que tem

- 56 capítulos em 9 arcos, do A1 ao C1, mais 4 histórias extras e um certificado ao concluir cada arco
- Prática: 8 diálogos longos para ouvir, 5 textos para ler com glossário, 120 cartões de vocabulário e 8 escritas guiadas
- Nivelamento adaptativo de 20 perguntas e notas de inglês americano x britânico
- Vozes naturais gravadas (Kokoro-82M) com o nome do aluno nos diálogos
- Treino de fala com **Whisper** (whisper.cpp compilado para WebAssembly), rodando no próprio aparelho: nada é enviado para a internet e funciona em qualquer navegador moderno, inclusive Safari e Firefox
- **Pronúncia som por som** (opcional, 90 MB): um modelo de fonemas wav2vec2, também no aparelho, confere os sons que mais dão problema para quem fala português (TH, V, W, H, R, NG, vogais curtas e longas, vogal a mais no fim ou antes do S) e diz qual saiu diferente
- Revisão espaçada, treino extra, baú semanal com recompensas
- Ajustes de acessibilidade: TDAH (modo calmo), TPAC (fala clara, destaque de palavras, repetição) e leitura confortável
- Funciona como app (PWA): pode ser instalado na tela inicial e funciona offline depois do primeiro uso

## Como publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz de um repositório público.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, escolha `main` e a pasta `/ (root)`, e salve.
3. Em 1 a 2 minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

Não precisa de servidor nem de configuração extra. O progresso de cada pessoa fica salvo no navegador dela, e pode ser levado para outro aparelho com o "código de progresso" (tela Conta e progresso).

## Estrutura

| Pasta/arquivo | O que é |
|---|---|
| `index.html` | A página: aparência (CSS) e o carregador do conteúdo |
| `app.js` | O código do curso |
| `conteudo/` | A história e as questões, em arquivos JSON separados por arco. Como editar: [conteudo/LEIA-ME.md](conteudo/LEIA-ME.md) |
| `audio/` | Falas gravadas (sprites MP3) e o índice `index.json` |
| `whisper/` | Reconhecimento de fala: `whisper.wasm`, o worker e o modelo `tiny.en` (q5_1, 32 MB, dividido em 3 partes) |
| `fonemas/` | Pronúncia som por som: o motor `fonemas.wasm`, o modelo de fonemas (89 MB, em 8 partes), a avaliação (`avaliar.js`) e os fonemas esperados de cada frase (`dados.json`) |
| `sw.js` | Service worker: cache para funcionar offline |
| `manifest.webmanifest`, `icons/` | Dados para instalar como app |
| `tools/` | Scripts para publicar, gravar as vozes e preparar o Whisper e o modelo de fonemas |
| `tests/` | Teste automático que abre o curso inteiro num navegador |

Depois de mudar o conteúdo, o código ou os áudios, rode `python3 tools/site/build_site.py`. Ele confere o conteúdo e atualiza as marcas de versão, para os aparelhos baixarem a versão nova.

## Licença

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/licen%C3%A7a-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br)

O curso é gratuito para estudar, ensinar e compartilhar, com crédito. **É proibido usar para fins comerciais**, como vender, cobrar acesso ou colocar em plataformas pagas. Versões adaptadas precisam manter esta mesma licença. Uso comercial só com autorização por escrito. O resumo em português está em [LICENCA.md](LICENCA.md), e o texto legal completo em [LICENSE](LICENSE).

© 2026 RockDo1do. Todos os direitos não concedidos pela licença são reservados.

## Créditos e licenças de terceiros

- Reconhecimento de fala: [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) e o modelo [Whisper](https://github.com/openai/whisper) da OpenAI (MIT)
- Vozes: [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (Apache 2.0), fonemas por [eSpeak NG](https://github.com/espeak-ng/espeak-ng)
- Pronúncia som por som: modelo de fonemas [light-model](https://github.com/idawud/UK-Pronunciation-Coach-models) (Apache 2.0), destilado de [wav2vec2-lv-60-espeak-cv-ft](https://huggingface.co/facebook/wav2vec2-lv-60-espeak-cv-ft) da Meta. Trained in part on the CSTR VCTK Corpus (University of Edinburgh), CC BY 4.0. O motor em C foi escrito para este curso
- Fontes: Atkinson Hyperlegible, Lilita One, DotGothic16 e Fredoka (Google Fonts, OFL)
