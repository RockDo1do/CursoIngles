// Compilar (wasi-sdk 27): cmake -S whisper.cpp -B build-wasm -DCMAKE_TOOLCHAIN_FILE=$WS/share/cmake/wasi-sdk.cmake -DWASI_SDK_PREFIX=$WS -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DWHISPER_BUILD_EXAMPLES=OFF -DWHISPER_BUILD_TESTS=OFF -DGGML_NATIVE=OFF -DGGML_OPENMP=OFF -DCMAKE_C_FLAGS="-msimd128 -D_WASI_EMULATED_MMAN -D_WASI_EMULATED_SIGNAL -D_WASI_EMULATED_PROCESS_CLOCKS" (mesmas flags em CMAKE_CXX_FLAGS)
// Ligar: clang++ -O3 -msimd128 -mexec-model=reactor wrap.o stubs.o libwhisper.a libggml.a libggml-cpu.a libggml-base.a -lwasi-emulated-mman -lwasi-emulated-signal -lwasi-emulated-process-clocks -Wl,--initial-memory=67108864 -Wl,--max-memory=2147483648 -Wl,-z,stack-size=2097152 -Wl,--strip-all -o whisper.wasm
#include "whisper.h"
#include <cstdlib>
#include <cstring>
#include <string>
#define EXPORT(n) extern "C" __attribute__((export_name(n)))
static whisper_context* g_ctx=nullptr;
static std::string g_out;
EXPORT("w_alloc") void* w_alloc(size_t n){return malloc(n);}
EXPORT("w_free") void w_free(void* p){free(p);}
EXPORT("w_init") int w_init(void* buf,size_t n){
  if(g_ctx){whisper_free(g_ctx);g_ctx=nullptr;}
  whisper_context_params cp=whisper_context_default_params(); cp.use_gpu=false; cp.flash_attn=false;
  g_ctx=whisper_init_from_buffer_with_params(buf,n,cp);
  return g_ctx?1:0;
}
EXPORT("w_run") const char* w_run(const float* pcm,int n,int audio_ctx,const char* prompt){
  g_out.clear(); if(!g_ctx) return "";
  whisper_full_params p=whisper_full_default_params(WHISPER_SAMPLING_GREEDY);
  p.n_threads=1; p.language="en"; p.translate=false; p.no_context=true; p.single_segment=true;
  p.print_progress=false; p.print_realtime=false; p.print_special=false; p.print_timestamps=false;
  p.no_timestamps=true; p.suppress_blank=true; p.audio_ctx=audio_ctx; p.temperature_inc=0.0f;
  if(prompt&&*prompt) p.initial_prompt=prompt;
  if(whisper_full(g_ctx,p,pcm,n)!=0) return "";
  int ns=whisper_full_n_segments(g_ctx);
  for(int i=0;i<ns;i++) g_out+=whisper_full_get_segment_text(g_ctx,i);
  // confiança média dos tokens
  return g_out.c_str();
}
EXPORT("w_conf") float w_conf(){
  if(!g_ctx) return 0; double s=0;int c=0;
  int ns=whisper_full_n_segments(g_ctx);
  for(int i=0;i<ns;i++){int nt=whisper_full_n_tokens(g_ctx,i);for(int j=0;j<nt;j++){auto d=whisper_full_get_token_data(g_ctx,i,j);if(d.id>=whisper_token_eot(g_ctx)) continue;s+=d.p;c++;}}
  return c?(float)(s/c):0;
}
