#!/bin/bash
# Baixa o Kokoro-82M e o eSpeak NG (do pacote do Piper) na pasta indicada, conferindo se são
# exatamente os arquivos usados para gravar as falas do curso.
set -e
D=${1:-$HOME/kokoro}; mkdir -p "$D"; cd "$D"
[ -f kokoro.onnx ] || curl -sSL -o kokoro.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -f voices-v1.0.bin ] || curl -sSL -o voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
[ -d piper ] || curl -sSL https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz | tar xz
echo "7d5df8ecf7d4b1878015a32686053fd0eebe2bc377234608764cc0ef3636a6c5  kokoro.onnx" | sha256sum -c
echo "bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d  voices-v1.0.bin" | sha256sum -c
test -f piper/libespeak-ng.so.1
