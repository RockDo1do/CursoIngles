#include <stdlib.h>
#include <stdio.h>
void* __cxa_allocate_exception(size_t n){return malloc(n);}
void __cxa_free_exception(void* p){free(p);}
_Noreturn void __cxa_throw(void* a,void* b,void(*c)(void*)){fprintf(stderr,"whisper: exception\n");abort();}
void* dlopen(const char* f,int m){return 0;}
int dlclose(void* h){return 0;}
void* dlsym(void* h,const char* s){return 0;}
char* dlerror(void){return "no dl";}
