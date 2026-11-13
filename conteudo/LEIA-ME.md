# Conteúdo da Torre do Inglês

Esta pasta tem toda a história e todas as questões do curso. O código (`app.js`) não tem nenhum texto de conteúdo: ele lê estes arquivos ao abrir.

## Regra de ouro: só acrescente no fim

O progresso de cada aluno fica guardado pela **posição** do capítulo e da pergunta (capítulo 12, pergunta 3...). Por isso:

- **Capítulo novo:** entra no fim do último arco ou num arco novo, nunca no meio.
- **Pergunta nova:** entra no fim da lista `perguntas` do capítulo.
- **Não apague nem troque de lugar** capítulos ou perguntas que já existem. Corrigir o texto de uma pergunta pode; trocar a ordem, não.

Mudar o meio da lista faz o curso marcar como feitos os capítulos errados para quem já estudou.

## Arquivos

| Arquivo | O que tem |
|---|---|
| `indice.json` | A ordem dos arcos. Para criar um arco, acrescente o nome dele no fim da lista. |
| `historia/arco-NN.json` | Nome e descrição do arco, a lista "agora você consegue" do certificado e os capítulos com os quadros da história. |
| `questoes/arco-NN.json` | As perguntas e as frases extras de cada capítulo, na mesma ordem dos capítulos da história. |
| `historia/bonus.json` e `questoes/bonus.json` | As histórias bônus, no mesmo formato. |
| `pratica/escuta.json` | Diálogos da prática de escuta. |
| `pratica/leitura.json` | Textos da prática de leitura, com glossário. |
| `pratica/vocabulario.json` | Temas de vocabulário: `[tema, [[palavra, tradução, frase de exemplo], ...]]`. O progresso de cada aluno fica guardado pela palavra, então não repita uma palavra que já existe em outro tema. Para gravar as vozes de um lote novo, envie a mudança numa branch com nome `vocabulario/...`: a tarefa "Vozes do vocabulário" do GitHub grava tudo e envia o áudio para a mesma branch. |
| `pratica/escrita.json` | Textos com lacunas da prática de escrita. |
| `pratica/nivelamento.json` | Perguntas do teste de nível. A resposta certa é sempre a **primeira** opção; o curso embaralha na hora de mostrar. |
| `pratica/sons.json` | Pares de palavras do treino de sons e a tradução de cada palavra. A chave `banco` tem o **banco de sons**: grupos (vogais, ditongos...) e, em cada som, `ipa` (o símbolo), `nome`, `como` (como fazer), `erro` (o erro comum de quem fala português), `ex` (3 exemplos `[palavra, tradução]`), `frase` (`[inglês, português]`) e `par` (opcional: o tipo de par do treino de sons, como `th`, para o botão "Treinar a diferença"). Palavras e frases do banco precisam de áudio na voz `narr`. |
| `pratica/simulados.json` | Os **simulados** (A2, B1, B2). Cada um tem `id` (no formato `s-xx`), `nivel`, `titulo`, `tempo` (minutos), `desc` e `partes`, que podem ser `leitura` (com `texto` e `q`), `escuta` (com `lines`, falas `[personagem, inglês]`, e `q`), `lingua` (só `q`), `escrita` ou `fala` (com `tarefa`, no mesmo formato da produção livre). Nas perguntas `q`, `"a"` é a posição da certa; o curso embaralha. Para não bagunçar o histórico dos alunos, não troque o `id` de um simulado que já existe. |
| `pratica/confusoes.json` | Assuntos que se confundem, cada um com **dois lados** (ex.: passado simples × present perfect), uma dica que explica a diferença e, em cada lado, as perguntas que são mesmo sobre ele (por capítulo, pela posição contando do 0). Um par sempre junta uma pergunta de cada lado: na revisão, a do lado oposto vem logo depois; no aquecimento do capítulo novo, entra uma do lado oposto. |

| `pratica/producao.json` | Produção livre, com três listas. **`falar`:** uma pergunta por capítulo (pelo título), mostrada no fim do capítulo em "Sua vez de falar". **`escrever`:** mensagens, e-mails e ensaios escritos do zero. **`mediar`:** um texto em português (`texto`) que o aluno repassa em inglês. Cada tarefa tem `pedido` (o que fazer, em português), `min` (mínimo de palavras), `precisa` (lista de `[regra, o que precisa aparecer]`), `evitar` (opcional, `[regra, aviso]`) e `modelo` (uma resposta-modelo). As regras são expressões regulares, conferidas sem diferenciar maiúsculas. O build confere se cada resposta-modelo passa nas próprias regras. A resposta-modelo precisa de áudio na voz `narr`. |

## Formato de um capítulo (história)

```json
{
 "t": "O Despertar",              título (precisa ser igual ao "capitulo" nas questões)
 "lv": "A1",                      nível
 "topic": "Cumprimentos",         assunto, aparece embaixo do título
 "bg": "gate",                    cenário de abertura
 "hero": "rafa",                  quem aparece na abertura
 "mon": "ERRO", "boss": true,     só em capítulos com monstro ou chefe
 "p": [ quadros ]
}
```

Tipos de quadro:

- **Cena com falas:** `{"bg": "street", "m": {"mina": "happy"}, "c": "legenda opcional", "l": [["mina", "Hi!", "Oi!"]]}`
  - Cada fala é `[personagem, inglês, português]`. Personagens: `rafa` (o aluno), `mina`, `jin`, `olivia` e `harry` (sotaque britânico, Arco 10) e `monster`. Quem fala precisa aparecer em `"m"`.
  - Use `null` no inglês para um pensamento só em português.
  - O protagonista se chama `rafa` nos arquivos, e o curso troca pelo nome do aluno. Escreva "Rafa" no texto onde o nome do aluno deve aparecer.
  - Para palavras que mudam com o gênero do aluno, use `{o|a}`: `cansad{o|a}`.
- **Quadro da Torre (explicação):** `{"sys": "Título", "text": "texto"}`. Pode ter `"r": [["inglês", "português"], ...]` para uma tabela e `"tip": "dica"`.

## Formato das questões

```json
{
 "capitulo": "O Despertar",
 "perguntas": [
  {"q": "Pergunta", "o": ["certa", "errada", "errada"], "a": 0, "why": "explicação"}
 ],
 "frases_extras": [["How are you?", "Como você está?"]]
}
```

- **`"a"`:** a posição da resposta certa em `"o"`, contando do zero (`0` = primeira opção). O curso embaralha as opções na tela.
- **`frases_extras`:** frases usadas nos exercícios de ditado, tradução e fala. São opcionais.

## Depois de editar

1. Rode `python3 tools/site/build_site.py`. Ele confere os arquivos (avisa se faltar um título, se a resposta não existir, se houver opção repetida) e atualiza a marca de versão, para os aparelhos baixarem o conteúdo novo.
2. Rode `python3 tests/test_site.py`. Ele abre o curso inteiro e confere, entre outras coisas, se toda fala nova tem áudio gravado.
3. Falas novas precisam de áudio: veja "Refazer as vozes" em `tools/README.md`. Sem o áudio gravado, o curso usa a voz do aparelho.

Se um arquivo tiver erro de formatação (uma vírgula ou aspas faltando), o curso mostra "Não consegui carregar o curso" com o nome do arquivo, em vez de abrir pela metade.
