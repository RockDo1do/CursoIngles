# Arco 8 (C1) e Arco 9 (pronúncia). Formato igual ao dos capítulos existentes.
def L(who, en, pt): return [who, en, pt]
def Q(q, o, why): return {"q": q, "o": o, "a": 0, "why": why}

ARC8 = [
{"t": "Se Eu Tivesse...", "lv": "C1", "topic": "Condicionais mistas", "bg": "room", "hero": "mina", "p": [
 {"sys": "Arco 8 · Vozes da Cidade", "text": "De volta a Seul, o Clube dá a você um cargo novo: ajudar a planejar as missões em inglês. Agora o desafio é falar como profissional."},
 {"bg": "room", "m": {"mina": "happy", "rafa": "normal"}, "l": [
  L("mina", "If you hadn't come back, we wouldn't have anyone to plan our missions now.", "Se você não tivesse voltado, não teríamos ninguém para planejar as missões agora."),
  L("rafa", "And if I were more organized, I would have finished the plan yesterday.", "E se eu fosse mais organizad{o|a}, teria terminado o plano ontem.")]},
 {"bg": "cafe", "m": {"jin": "sad", "mina": "det"}, "l": [
  L("jin", "If I had slept more last night, I wouldn't be so tired now.", "Se eu tivesse dormido mais ontem à noite, não estaria tão cansado agora."),
  L("mina", "If you weren't so stubborn, you would have listened to me.", "Se você não fosse tão teimoso, teria me escutado.")]},
 {"sys": "Condicionais mistas", "r": [
  ["If I had studied, I would be fluent now.", "Passado imaginário → resultado no presente"],
  ["If I were braver, I would have said yes.", "Presente imaginário → resultado no passado"],
  ["if + had + particípio … would + verbo", "Tipo 1: o passado muda o agora"],
  ["if + passado simples … would have + particípio", "Tipo 2: algo permanente muda o passado"],
  ["If I hadn't missed the bus, I'd be home now.", "Se eu não tivesse perdido o ônibus, estaria em casa agora"],
  ["If she spoke English, she would have gotten the job.", "Se ela falasse inglês, teria conseguido a vaga"]],
  "tip": "Pense no tempo de cada metade da frase: a condição pode estar no passado e o resultado no agora, ou o contrário."},
 {"bg": "room", "m": {"rafa": "happy", "mina": "happy"}, "l": [
  L("rafa", "If I hadn't started this course, I wouldn't understand this meeting.", "Se eu não tivesse começado este curso, não entenderia esta reunião."),
  L("mina", "Exactly. Small choices in the past change who you are today.", "Exatamente. Pequenas escolhas no passado mudam quem você é hoje.")]}],
 "q": [
  Q("If I ___ harder at school, I would speak French now.", ["had studied", "studied", "would study"], "Passado imaginário (had studied) com resultado no presente (would speak)."),
  Q("If she weren't so shy, she ___ to the party yesterday.", ["would have gone", "would go", "had gone"], "Característica do presente (weren't shy) com resultado no passado (would have gone)."),
  Q("“If I hadn't missed the bus, I'd be home now” significa:", ["Se eu não tivesse perdido o ônibus, estaria em casa agora", "Se eu não perder o ônibus, estarei em casa", "Eu perdi o ônibus, mas cheguei em casa"], "had + particípio = passado imaginário; I'd be = resultado agora."),
  Q("Qual frase liga o passado ao presente?", ["If I had taken the job, I would live in London now.", "If I take the job, I will live in London.", "If I took the job, I would live in London."], "had taken (passado) + would live (agora)."),
  Q("If I spoke Japanese, I ___ the movie last night without subtitles.", ["would have understood", "would understand", "had understood"], "Habilidade no presente (spoke) com resultado no passado (would have understood)."),
  Q("If we ___ the map, we wouldn't be lost now.", ["had brought", "have brought", "would bring"], "had + particípio para o passado que não aconteceu."),
  Q("Em “I'd be home now”, I'd é:", ["I would", "I had", "I did"], "Antes de verbo puro (be), I'd = I would."),
  Q("If you ___ me earlier, I would have helped you.", ["had told", "told", "have told"], "Terceira condicional: if + had + particípio."),
  Q("A condicional mista serve para:", ["ligar tempos diferentes na condição e no resultado", "falar só do futuro", "dar ordens"], "Uma metade no passado e a outra no presente, ou o contrário.")],
 "xs": [["If I had saved money, I would be rich now.", "Se eu tivesse economizado, estaria ric{o|a} agora."],
  ["If she were taller, she would have reached it.", "Se ela fosse mais alta, teria alcançado."],
  ["If we had left early, we'd be there now.", "Se tivéssemos saído cedo, já estaríamos lá."],
  ["If I weren't afraid, I would have jumped.", "Se eu não tivesse medo, teria pulado."],
  ["If he had trained, he would be stronger.", "Se ele tivesse treinado, estaria mais forte."],
  ["If I knew French, I'd have read that book.", "Se eu soubesse francês, teria lido aquele livro."]]},

{"t": "A Proposta", "lv": "C1", "topic": "Sugerir e exigir com formalidade (subjuntivo)", "bg": "room", "hero": "jin", "p": [
 {"bg": "room", "c": "Reunião com a Diretora do Clube.", "m": {"jin": "det", "rafa": "shock"}, "l": [
  L("jin", "The Director suggested that we change the plan.", "A Diretora sugeriu que mudássemos o plano."),
  L("rafa", "She insists that every team be ready by Friday?", "Ela insiste que todas as equipes estejam prontas até sexta?")]},
 {"bg": "room", "m": {"mina": "det", "jin": "sad"}, "l": [
  L("mina", "Yes. It's essential that everyone understand the risks.", "Sim. É essencial que todos entendam os riscos."),
  L("jin", "I'd rather we waited one more week.", "Eu preferiria que esperássemos mais uma semana.")]},
 {"sys": "Subjuntivo e pedidos formais", "r": [
  ["I suggest that he study more.", "Sugiro que ele estude mais (verbo sem S)"],
  ["She insisted that we be on time.", "Ela insistiu que chegássemos na hora (be para todos)"],
  ["It's essential that everyone arrive early.", "É essencial que todos cheguem cedo"],
  ["recommend, demand, request that + verbo puro", "Verbos que pedem o subjuntivo"],
  ["I'd rather you didn't tell her.", "Eu preferiria que você não contasse a ela"],
  ["It's time we left.", "Já está na hora de irmos"],
  ["If I were you...", "Também é subjuntivo: were para todos"]],
  "tip": "No subjuntivo, o verbo fica na forma pura para todas as pessoas: “that he go”, “that she be”. Muita gente também usa should: “I suggest that he should study”."},
 {"bg": "room", "m": {"rafa": "happy", "mina": "happy"}, "l": [
  L("rafa", "I recommend that we start with the easy portals.", "Recomendo que comecemos pelos portais fáceis."),
  L("mina", "Good. It's time we made a decision.", "Boa. Já está na hora de tomarmos uma decisão.")]}],
 "q": [
  Q("The teacher suggested that he ___ more.", ["study", "studies", "studied"], "Depois de suggest that: verbo puro, sem S."),
  Q("It's essential that she ___ on time.", ["be", "is", "was"], "Subjuntivo: be para todas as pessoas."),
  Q("I'd rather you ___ smoke here.", ["didn't", "don't", "won't"], "I'd rather + pessoa + passado: didn't."),
  Q("It's time we ___.", ["left", "leave", "leaving"], "It's time + pessoa + passado."),
  Q("“They demanded that he apologize” significa:", ["Exigiram que ele pedisse desculpas", "Eles pediram desculpas a ele", "Ele exigiu desculpas"], "demand that = exigir que."),
  Q("Qual frase é formal?", ["I recommend that the meeting be postponed.", "Let's push the meeting, ok?", "Meeting later, yeah?"], "recommend that + be = registro formal."),
  Q("We insist that everyone ___ the rules.", ["follow", "follows", "following"], "Verbo puro depois de insist that."),
  Q("Outra forma correta de “I suggest that he study”:", ["I suggest that he should study.", "I suggest he to study.", "I suggest him studying."], "Com should também é correto."),
  Q("If I ___ you, I would accept the offer.", ["were", "am", "be"], "Subjuntivo: were para todas as pessoas.")],
 "xs": [["I suggest that she call the client.", "Sugiro que ela ligue para o cliente."],
  ["It's important that he be honest.", "É importante que ele seja honesto."],
  ["They insisted that we stay for dinner.", "Eles insistiram que ficássemos para o jantar."],
  ["I'd rather you came with me.", "Eu preferiria que você viesse comigo."],
  ["It's time we went home.", "Está na hora de irmos para casa."],
  ["The doctor recommended that I rest.", "O médico recomendou que eu descansasse."]]},

{"t": "Talvez, Quem Sabe", "lv": "C1", "topic": "Linguagem cautelosa: it seems, tend to, likely", "bg": "cafe", "hero": "mina", "p": [
 {"bg": "cafe", "c": "Relatório sobre um portal estranho.", "m": {"jin": "det", "mina": "normal"}, "l": [
  L("jin", "This portal is dangerous. Period.", "Este portal é perigoso. Ponto final."),
  L("mina", "We don't know that yet. It seems that it might be unstable.", "Ainda não sabemos. Parece que ele pode estar instável.")]},
 {"bg": "cafe", "m": {"rafa": "normal", "mina": "happy"}, "l": [
  L("rafa", "The data suggests that monsters tend to appear at night.", "Os dados sugerem que os monstros costumam aparecer à noite."),
  L("mina", "Good. That's a careful way to say it.", "Boa. Esse é um jeito cuidadoso de dizer.")]},
 {"sys": "Falar com cautela", "r": [
  ["It seems that... / It appears that...", "Parece que..."],
  ["tend to + verbo", "costumar, ter tendência a"],
  ["It's likely / unlikely that...", "É provável / improvável que..."],
  ["might, may, could", "pode ser que, talvez"],
  ["I'd say that...", "Eu diria que..."],
  ["to some extent", "até certo ponto"],
  ["The results suggest that...", "Os resultados sugerem que..."]],
  "tip": "Em relatórios, e-mails de trabalho e discussões, frases cautelosas soam mais profissionais e evitam afirmar o que você não sabe com certeza."},
 {"bg": "cafe", "m": {"jin": "happy", "mina": "happy"}, "l": [
  L("jin", "Fine. I'd say the portal is probably dangerous.", "Tá bom. Eu diria que o portal provavelmente é perigoso."),
  L("mina", "Much better. You might become a diplomat one day.", "Muito melhor. Pode ser que você vire diplomata um dia.")]}],
 "q": [
  Q("Forma mais cautelosa de “The plan is wrong”:", ["It seems that the plan might be wrong.", "The plan is totally wrong.", "The plan wrong is."], "It seems + might = cautela."),
  Q("“Monsters tend to appear at night” significa:", ["Os monstros costumam aparecer à noite", "Os monstros aparecem só à noite", "Os monstros tentam aparecer à noite"], "tend to = costumar."),
  Q("It's ___ that it will rain tomorrow. (provável)", ["likely", "like", "liking"], "likely = provável."),
  Q("“To some extent” significa:", ["até certo ponto", "de jeito nenhum", "em todo lugar"], "Expressão para concordar só em parte."),
  Q("Qual frase NÃO é cautelosa?", ["This is definitely the best solution.", "This could be a good solution.", "I'd say this is a good solution."], "definitely = certeza total."),
  Q("People ___ to sleep less when they are stressed.", ["tend", "tends", "tending"], "People é plural → tend."),
  Q("“It appears that” é parecido com:", ["It seems that", "It's clear that", "It never happens that"], "Os dois significam “parece que”."),
  Q("The results ___ that the method works.", ["suggest", "suggests to", "are suggest"], "results é plural → suggest."),
  Q("Por que usar linguagem cautelosa?", ["para não afirmar o que não se sabe com certeza", "para parecer inseguro", "para falar mais rápido"], "Ela mostra cuidado, não insegurança.")],
 "xs": [["It seems that the train is late.", "Parece que o trem está atrasado."],
  ["Prices tend to rise in summer.", "Os preços costumam subir no verão."],
  ["It's unlikely that he will come.", "É improvável que ele venha."],
  ["I'd say we need more time.", "Eu diria que precisamos de mais tempo."],
  ["The data suggests a different answer.", "Os dados sugerem outra resposta."],
  ["This might be the wrong door.", "Pode ser que esta seja a porta errada."]]},

{"t": "A Apresentação", "lv": "C1", "topic": "Apresentações: abrir, organizar e concluir", "bg": "gate", "hero": "rafa", "p": [
 {"bg": "gate", "c": "Você vai apresentar o plano para todo o Clube.", "m": {"rafa": "det"}, "l": [
  L("rafa", "Good morning, everyone. Today I'd like to talk about our new plan.", "Bom dia a todos. Hoje eu gostaria de falar sobre o nosso novo plano."),
  L("rafa", "First, I'll explain the problem. Then, I'll show you our solution.", "Primeiro, vou explicar o problema. Depois, vou mostrar a nossa solução.")]},
 {"bg": "gate", "m": {"rafa": "normal", "jin": "normal"}, "l": [
  L("rafa", "Moving on to the next point, let's look at this chart.", "Passando para o próximo ponto, vamos olhar este gráfico."),
  L("jin", "Sorry, could you go back to the last slide?", "Desculpe, você poderia voltar ao último slide?")]},
 {"sys": "Organizando uma apresentação", "r": [
  ["Today I'd like to talk about...", "Hoje eu gostaria de falar sobre..."],
  ["First... Then... Finally...", "Primeiro... Depois... Por fim..."],
  ["Moving on to...", "Passando para..."],
  ["As you can see in this chart...", "Como vocês podem ver neste gráfico..."],
  ["Let me give you an example.", "Vou dar um exemplo."],
  ["To sum up...", "Resumindo..."],
  ["Are there any questions?", "Alguém tem alguma pergunta?"]],
  "tip": "Diga no começo o que vai apresentar e, no fim, resuma. O público acompanha melhor quando sabe em que parte você está."},
 {"bg": "gate", "m": {"rafa": "happy", "mina": "happy"}, "l": [
  L("rafa", "To sum up, this plan is faster and safer. Are there any questions?", "Resumindo, este plano é mais rápido e mais seguro. Alguém tem alguma pergunta?"),
  L("mina", "No questions. Just applause.", "Nenhuma pergunta. Só aplausos.")]}],
 "q": [
  Q("Para começar uma apresentação:", ["Today I'd like to talk about...", "To sum up...", "Any questions?"], "Abertura: diga o tema."),
  Q("“Moving on to the next point” significa:", ["Passando para o próximo ponto", "Voltando ao começo", "Terminando a apresentação"], "move on = seguir em frente."),
  Q("Para concluir:", ["To sum up,", "First of all,", "Let me start with"], "To sum up = resumindo."),
  Q("“As you can see in this chart” serve para:", ["mostrar um gráfico", "fazer uma pergunta", "pedir desculpas"], "chart = gráfico."),
  Q("Pedido educado durante a apresentação:", ["Could you go back to the last slide?", "Go back slide.", "You go back now."], "Could you...? é educado."),
  Q("Ordem certa:", ["First, then, finally", "Finally, first, then", "Then, finally, first"], "Primeiro, depois, por fim."),
  Q("“Let me give you an example” significa:", ["Vou dar um exemplo", "Me dê um exemplo", "Deixe o exemplo"], "Let me = deixe-me, vou."),
  Q("Are there ___ questions?", ["any", "some", "much"], "Em perguntas: any."),
  Q("Por que resumir no fim?", ["para o público lembrar os pontos principais", "para a apresentação ficar mais longa", "para não responder perguntas"], "O resumo fixa a mensagem.")],
 "xs": [["Today I'd like to talk about safety.", "Hoje eu gostaria de falar sobre segurança."],
  ["First, let's look at the numbers.", "Primeiro, vamos olhar os números."],
  ["Moving on to the next point.", "Passando para o próximo ponto."],
  ["As you can see, sales went up.", "Como vocês podem ver, as vendas subiram."],
  ["To sum up, the plan works.", "Resumindo, o plano funciona."],
  ["Thank you for listening.", "Obrigad{o|a} pela atenção."]]},

{"t": "Concordo, Mas...", "lv": "C1", "topic": "Reuniões: concordar, discordar e esclarecer", "bg": "room", "hero": "jin", "p": [
 {"bg": "room", "c": "Reunião de equipe. Jin e Mina discordam.", "m": {"jin": "det", "mina": "sad"}, "l": [
  L("jin", "I think we should attack the portal tonight.", "Acho que deveríamos atacar o portal hoje à noite."),
  L("mina", "I see your point, but I'm not sure that's a good idea.", "Entendo seu ponto, mas não tenho certeza de que é uma boa ideia.")]},
 {"bg": "room", "m": {"rafa": "det", "jin": "normal"}, "l": [
  L("rafa", "Sorry to interrupt, but could I add something?", "Desculpe interromper, mas posso acrescentar algo?"),
  L("rafa", "What if we wait until morning? Then we can see the area.", "E se esperarmos até de manhã? Assim conseguimos ver a área.")]},
 {"sys": "Em reuniões", "r": [
  ["I agree with you. / Exactly.", "Concordo com você. / Exatamente."],
  ["I see your point, but...", "Entendo seu ponto, mas..."],
  ["I'm not sure that's a good idea.", "Não tenho certeza de que é uma boa ideia"],
  ["Sorry to interrupt, but...", "Desculpe interromper, mas..."],
  ["What do you mean by...?", "O que você quer dizer com...?"],
  ["So, what you're saying is...", "Então, o que você está dizendo é..."],
  ["What if we...?", "E se nós...?"]],
  "tip": "Para discordar com educação, reconheça a ideia do outro antes de dar a sua: “I see your point, but...”."},
 {"bg": "room", "m": {"jin": "normal", "mina": "happy"}, "l": [
  L("jin", "So, what you're saying is that waiting is safer?", "Então, o que você está dizendo é que esperar é mais seguro?"),
  L("mina", "Exactly. Let's take a vote.", "Exatamente. Vamos votar.")]}],
 "q": [
  Q("Discordar com educação:", ["I see your point, but...", "You're wrong.", "No way, that's stupid."], "Reconheça a ideia antes de discordar."),
  Q("“Sorry to interrupt” significa:", ["Desculpe interromper", "Desculpe o atraso", "Desculpe, não entendi"], "interrupt = interromper."),
  Q("Para pedir um esclarecimento:", ["What do you mean by that?", "I mean that.", "That is what."], "What do you mean by...? = O que você quer dizer com...?"),
  Q("“What if we wait?” significa:", ["E se esperarmos?", "O que esperamos?", "Por que esperamos?"], "What if = e se."),
  Q("Concordar totalmente:", ["Exactly.", "I'm not sure.", "Maybe not."], "Exactly = exatamente."),
  Q("“So, what you're saying is...” serve para:", ["confirmar se você entendeu", "mudar de assunto", "encerrar a reunião"], "Você repete a ideia com suas palavras."),
  Q("I'm not sure ___ a good idea.", ["that's", "that", "it"], "I'm not sure that's... = não tenho certeza de que isso é..."),
  Q("Could I ___ something?", ["add", "adding", "to add"], "Could + verbo puro."),
  Q("Qual frase reconhece a ideia do outro?", ["That's a fair point. However...", "Whatever.", "Stop talking."], "fair point = argumento justo.")],
 "xs": [["I agree with you completely.", "Concordo totalmente com você."],
  ["I see your point, but I disagree.", "Entendo seu ponto, mas discordo."],
  ["Sorry to interrupt, but it's important.", "Desculpe interromper, mas é importante."],
  ["What do you mean by that?", "O que você quer dizer com isso?"],
  ["What if we try another way?", "E se tentarmos de outro jeito?"],
  ["Let's take a vote.", "Vamos votar."]]},

{"t": "A Última Porta", "lv": "C1", "topic": "Revisão do Arco 8", "bg": "dungeon", "hero": "monster", "mon": "SILÊNCIO", "boss": True, "p": [
 {"sys": "Chefe do Arco 8", "text": "Um monstro que se alimenta de hesitação bloqueia a porta do Clube. Ele só desaparece quando alguém fala com clareza e confiança."},
 {"bg": "dungeon", "m": {"monster": "det", "rafa": "shock"}, "l": [
  L("monster", "If you had any talent, you would have spoken already.", "Se você tivesse algum talento, já teria falado."),
  L("rafa", "I see your point, but I disagree. I'm speaking now.", "Entendo seu ponto, mas discordo. Estou falando agora.")]},
 {"bg": "dungeon", "m": {"monster": "det", "rafa": "det"}, "l": [
  L("monster", "It seems that you are afraid.", "Parece que você está com medo."),
  L("rafa", "It's likely that I'm nervous. But it's essential that I continue.", "É provável que eu esteja nervos{o|a}. Mas é essencial que eu continue.")]},
 {"sys": "Revisão do Arco 8", "r": [
  ["If I had practiced, I would be calmer now.", "Condicional mista"],
  ["It's essential that he be ready.", "Subjuntivo"],
  ["It seems that... / tend to...", "Linguagem cautelosa"],
  ["Moving on to... / To sum up...", "Apresentações"],
  ["I see your point, but...", "Discordar com educação"]],
  "tip": "Falar bem não é falar sem errar. É falar com clareza, mesmo com medo."},
 {"bg": "gate", "m": {"mina": "happy", "rafa": "happy"}, "l": [
  L("mina", "To sum up: you're ready.", "Resumindo: você está pront{o|a}."),
  L("rafa", "If I hadn't climbed this tower, I wouldn't be the person I am today.", "Se eu não tivesse subido esta torre, não seria quem sou hoje.")]},
 {"sys": "Arco 8 completo", "text": "Nível C1 concluído. Você planeja, apresenta, discute e escreve em inglês com nuance. Categoria aumentada."}],
 "q": [
  Q("If I ___ the map, we wouldn't be lost now.", ["had checked", "checked", "check"], "Passado imaginário com resultado agora."),
  Q("She suggested that he ___ a break.", ["take", "takes", "took"], "Subjuntivo: verbo puro."),
  Q("Forma cautelosa:", ["It appears that the data is incomplete.", "The data is garbage.", "Data incomplete."], "It appears that = parece que."),
  Q("Para concluir uma apresentação:", ["To sum up,", "Moving on to,", "First of all,"], "To sum up = resumindo."),
  Q("Discordar com educação:", ["I see your point, but...", "No.", "You don't know anything."], "Reconheça antes de discordar."),
  Q("It's time we ___ home.", ["went", "go", "going"], "It's time + pessoa + passado."),
  Q("If he were braver, he ___ the dragon yesterday.", ["would have fought", "would fight", "fought"], "Característica do presente, resultado no passado."),
  Q("“To some extent” =", ["até certo ponto", "sem dúvida", "de vez em quando"], "Concordância parcial."),
  Q("I'd rather you ___ tell anyone.", ["didn't", "don't", "not"], "I'd rather + pessoa + passado."),
  Q("Could you ___ what you mean?", ["explain", "explaining", "to explain"], "Could + verbo puro.")],
 "xs": [["If I hadn't tried, I'd still be afraid.", "Se eu não tivesse tentado, ainda estaria com medo."],
  ["It's essential that we be clear.", "É essencial que sejamos claros."],
  ["It seems that the door is open.", "Parece que a porta está aberta."],
  ["To sum up, we did it.", "Resumindo, nós conseguimos."],
  ["I see your point, but I'm staying.", "Entendo seu ponto, mas vou ficar."],
  ["Let me give you an example.", "Vou dar um exemplo."]]},
]

ARC9 = [
{"t": "Vogais e Sílaba Forte", "lv": "B1", "topic": "Vogais curtas e longas e sílaba tônica", "bg": "street", "hero": "mina", "p": [
 {"sys": "Arco 9 · Som e Ritmo", "text": "Antes da próxima missão, Mina organiza um treino de sons no parque. Ouvir bem é metade da conversa."},
 {"bg": "street", "m": {"mina": "happy", "rafa": "normal"}, "l": [
  L("mina", "Listen: ship, sheep. Live, leave. Can you hear the difference?", "Ouça: ship, sheep. Live, leave. Consegue ouvir a diferença?"),
  L("rafa", "Sheep is longer. Ship is short and quick.", "Sheep é mais longo. Ship é curto e rápido.")]},
 {"bg": "street", "m": {"jin": "normal", "rafa": "shock"}, "l": [
  L("jin", "And stress changes the meaning. A present is a gift.", "E a sílaba forte muda o sentido. Present, com força no começo, é um presente."),
  L("jin", "But to present is to show something to people.", "Mas present, com força no fim, é apresentar algo às pessoas.")]},
 {"sys": "Vogais e sílaba forte", "r": [
  ["ship / sheep", "i curto e rápido / i longo"],
  ["full / fool", "u curto / u longo"],
  ["cat / cut", "a bem aberto / som parecido com â rápido"],
  ["photograph / photography", "PHO-to-graph / pho-TOG-ra-phy: a força muda de lugar"],
  ["record (nome) / record (verbo)", "REC-ord: um registro / re-CORD: gravar"],
  ["banana, computer, tomorrow", "ba-NA-na, com-PU-ter, to-MOR-row"],
  ["chocolate", "No dia a dia: CHOC-lit, com duas sílabas"]],
  "tip": "Em inglês, a sílaba forte é mais longa, mais alta e mais clara, e as outras ficam curtas e fracas. Acertar a sílaba forte ajuda você a ser entendido mais do que acertar cada som."},
 {"bg": "street", "m": {"rafa": "happy", "mina": "happy"}, "l": [
  L("rafa", "I'd like to present my project. And this present is for you!", "Eu gostaria de apresentar meu projeto. E este presente é para você!"),
  L("mina", "Perfect stress. Two different words!", "Sílaba forte perfeita. Duas palavras diferentes!")]}],
 "q": [
  Q("Em sheep, o som de ee é:", ["longo", "curto", "mudo"], "sheep tem i longo; ship tem i curto."),
  Q("Onde fica a força em banana?", ["ba-NA-na", "BA-na-na", "ba-na-NA"], "A sílaba do meio é a forte."),
  Q("record com força no começo (REC-ord) é:", ["um nome: registro, disco", "um verbo: gravar", "um advérbio"], "Nomes costumam ter a força no começo."),
  Q("Qual par tem vogal curta e vogal longa?", ["live / leave", "cat / cats", "run / running"], "live é curto; leave é longo."),
  Q("present com força no fim significa:", ["apresentar", "um presente", "o tempo presente"], "Verbo: força no fim."),
  Q("Em photography, a força cai em:", ["pho-TOG-ra-phy", "PHO-to-gra-phy", "pho-to-gra-PHY"], "A força muda de lugar em relação a photograph."),
  Q("No dia a dia, chocolate costuma ter:", ["duas ou três sílabas", "quatro sílabas", "cinco sílabas"], "CHOC-lit ou CHOC-o-lit."),
  Q("Sílabas fracas em inglês são:", ["curtas e rápidas", "mais altas", "mais longas"], "Só a sílaba forte se destaca."),
  Q("full e fool se diferenciam:", ["pela duração da vogal", "pela primeira letra", "pela última letra"], "fool tem u longo.")],
 "xs": [["The sheep is on the ship.", "A ovelha está no navio."],
  ["Please sit in this seat.", "Por favor, sente-se neste assento."],
  ["Don't leave, I live here.", "Não vá embora, eu moro aqui."],
  ["This photograph is beautiful.", "Esta fotografia é linda."],
  ["I love photography.", "Eu amo fotografia."],
  ["She bought a banana and a computer.", "Ela comprou uma banana e um computador."]]},

{"t": "Fala Ligada", "lv": "B1", "topic": "Fala ligada, reduções e entonação", "bg": "cafe", "hero": "jin", "p": [
 {"bg": "cafe", "m": {"jin": "happy", "rafa": "shock"}, "l": [
  L("jin", "Do you want to grab a bite?", "Você quer comer alguma coisa?"),
  L("rafa", "Sorry? Could you say that again, slowly?", "Desculpe? Pode repetir devagar?")]},
 {"bg": "cafe", "m": {"mina": "normal", "rafa": "normal"}, "l": [
  L("mina", "In fast speech, words join together. Want to sounds like wanna.", "Na fala rápida, as palavras se juntam. Want to soa como wanna."),
  L("mina", "And an apple sounds like a napple.", "E an apple soa como a napple.")]},
 {"sys": "Fala ligada e entonação", "r": [
  ["want to, going to", "Na fala rápida: wanna, gonna"],
  ["an apple, turn off", "A consoante final se liga à vogal: a-napple, tur-noff"],
  ["What do you want?", "Na fala rápida: whaddaya want?"],
  ["Did you see it? Don't you know?", "Na fala rápida: didja, donchu"],
  ["You're coming?", "Pergunta de sim ou não: a voz sobe no fim"],
  ["Where are you going?", "Pergunta com where, what, why: a voz desce no fim"],
  ["I'm so tired.", "A palavra mais importante ganha mais força: SO"]],
  "tip": "Você não precisa falar assim para ser entendido. Mas reconhecer essas formas ajuda muito a entender filmes, séries e conversas reais."},
 {"bg": "cafe", "m": {"jin": "happy", "rafa": "happy"}, "l": [
  L("jin", "So... do you want to grab a bite?", "Então... você quer comer alguma coisa?"),
  L("rafa", "Yes! I'm so hungry.", "Sim! Estou com muita fome.")]},
 {"sys": "Arco 9 completo", "text": "Você reconhece vogais curtas e longas, a sílaba forte e a fala ligada. Seu ouvido está pronto para o inglês de verdade."}],
 "q": [
  Q("wanna é a forma rápida de:", ["want to", "want them", "wanted"], "want to → wanna."),
  Q("Em an apple, o som do n:", ["se liga à vogal seguinte", "desaparece", "vira m"], "a-napple."),
  Q("Numa pergunta de sim ou não, a voz geralmente:", ["sobe no fim", "desce no fim", "fica igual"], "You're coming? ↗"),
  Q("Em “Where are you going?”, a voz:", ["desce no fim", "sobe no fim", "para no meio"], "Perguntas com where, what, why descem."),
  Q("didja é a forma rápida de:", ["did you", "did I", "do you"], "did you → didja."),
  Q("gonna é a forma rápida de:", ["going to", "got to", "want to"], "going to → gonna."),
  Q("Em “I'm SO tired”, a força em SO mostra:", ["ênfase", "uma pergunta", "dúvida"], "A palavra importante ganha força."),
  Q("Pedir para repetir com educação:", ["Sorry? Could you say that again?", "What?!", "Repeat."], "Sorry? + Could you...?"),
  Q("Na fala rápida, turn off soa como:", ["tur-noff", "turn-of", "tur-off"], "O n se liga à vogal de off.")],
 "xs": [["Do you want to grab a bite?", "Você quer comer alguma coisa?"],
  ["I'm going to call her later.", "Vou ligar para ela mais tarde."],
  ["Turn off the lights, please.", "Apague as luzes, por favor."],
  ["Did you see that movie?", "Você viu aquele filme?"],
  ["Could you say that again?", "Pode repetir?"],
  ["I'm so tired today.", "Estou tão cansad{o|a} hoje."]]},
]

NEW_ARCS = [
 {"n": "Arco 8 · Vozes da Cidade", "d": "Avançado · C1 · condicionais mistas, subjuntivo, reuniões e apresentações"},
 {"n": "Arco 9 · Som e Ritmo", "d": "Pronúncia · B1 · vogais, sílaba forte e fala ligada"},
]

# Metas do Quadro Europeu (CEFR) por arco, para o certificado
CANDO = [
 ["Apresentar-se e falar de onde vem", "Usar o verbo to be, números e possessivos", "Dizer onde as coisas estão"],
 ["Descrever a rotina e falar as horas", "Fazer perguntas simples", "Dizer o que sabe e gosta de fazer"],
 ["Contar o que aconteceu no passado", "Falar de planos e do futuro", "Comparar pessoas e coisas"],
 ["Falar de regras, conselhos e experiências", "Usar condições reais", "Ligar ideias com who, which e where"],
 ["Usar a voz passiva e o discurso indireto", "Falar de arrependimentos e do passado imaginário", "Usar phrasal verbs comuns"],
 ["Evitar falsos cognatos", "Organizar ideias com conectores", "Ajustar o tom entre formal e informal"],
 ["Resolver situações de viagem e de hotel", "Ir ao médico, fazer compras e falar ao telefone", "Participar de uma entrevista de emprego"],
 ["Usar condicionais mistas e o subjuntivo", "Falar com cautela em contextos profissionais", "Apresentar ideias e participar de reuniões"],
 ["Diferenciar vogais curtas e longas", "Usar a sílaba forte certa", "Entender a fala ligada e a entonação"],
]

# Inglês americano x britânico: um quadro no fim de cada arco
USUK = [
 [["color / colour", "cor (EUA / Reino Unido)"], ["apartment / flat", "apartamento"], ["zee / zed", "a letra Z"], ["Hi! / Hiya!", "oi (informal)"]],
 [["vacation / holiday", "férias"], ["fall / autumn", "outono"], ["on the weekend / at the weekend", "no fim de semana"], ["soccer / football", "futebol"]],
 [["I just ate. / I've just eaten.", "acabei de comer (nos EUA o passado simples também serve)"], ["gotten / got", "particípio de get"], ["store / shop", "loja"], ["cookie / biscuit", "biscoito doce"]],
 [["Do you have...? / Have you got...?", "Você tem...?"], ["math / maths", "matemática"], ["line / queue", "fila"], ["check / bill", "a conta do restaurante"]],
 [["realize / realise", "perceber (com z ou s)"], ["traveling / travelling", "viajando (um ou dois l)"], ["center / centre", "centro"], ["gas / petrol", "gasolina"]],
 [["The team is / The team are", "grupo: singular nos EUA, plural comum no Reino Unido"], ["Sincerely / Yours sincerely", "despedida de carta"], ["awesome / brilliant", "ótimo (informal)"], ["I'll / I shall", "futuro (shall é raro nos EUA)"]],
 [["elevator / lift", "elevador"], ["subway / underground", "metrô (em Londres: the Tube)"], ["first floor / ground floor", "o térreo (EUA / Reino Unido)"], ["cell phone / mobile", "celular"]],
 [["schedule", "EUA: SKED-jool · Reino Unido: SHED-jool"], ["fill out / fill in a form", "preencher um formulário"], ["résumé / CV", "currículo"], ["I suggest he go / I suggest he should go", "o subjuntivo é mais comum nos EUA"]],
 [["water", "EUA: o t soa como um d rápido (WAH-der)"], ["can't", "EUA: vogal de cat · Reino Unido: vogal de car"], ["car, park, hard", "EUA: o r é pronunciado · Reino Unido: quase mudo"], ["tomato", "EUA: to-MAY-to · Reino Unido: to-MAH-to"]],
]
USUK_TIP = "Este curso usa o inglês americano. Os dois são corretos: o importante é ser consistente e reconhecer as diferenças."
