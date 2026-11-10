# Arco 7 · Missões do Mundo Real (capítulos 37 a 48)
def Q(q, o, why): return {"q": q, "o": o, "a": 0, "why": why}
def P(bg, m=None, c=None, l=None):
    d = {"bg": bg, "m": m or {}, "l": l or []}
    if c: d["c"] = c
    return d
def SYS(title, text=None, r=None, tip=None):
    d = {"sys": title}
    if text: d["text"] = text
    if r: d["r"] = r
    if tip: d["tip"] = tip
    return d

ARC7 = [
{"t": "Rumo a Nova York", "lv": "A2", "topic": "No aeroporto: check-in, embarque e imigração", "bg": "sky", "hero": "jin", "p": [
 SYS("Missão do Mundo Real", "A Guilda convidou Rafa e Mina para uma convenção em Nova York. Para treinar, Mina liga o Simulador da Guilda. Jin vai fazer todos os papéis."),
 P("cafe", {"jin": "normal", "rafa": "normal"}, "Simulador: balcão de check-in.", [["jin", "Good morning. Can I see your passport, please?", "Bom dia. Posso ver seu passaporte, por favor?"], ["rafa", "Sure. Here you are.", "Claro. Aqui está."]]),
 P("cafe", {"jin": "det", "rafa": "normal"}, None, [["jin", "Do you have any bags to check?", "Você tem malas para despachar?"], ["rafa", "Just one. And this is my carry-on.", "Só uma. E esta é minha bagagem de mão."]]),
 P("cafe", {"jin": "happy"}, None, [["jin", "Here is your boarding pass. Your gate is B12, and boarding starts at 9:40.", "Aqui está seu cartão de embarque. Seu portão é o B12, e o embarque começa às 9:40."]]),
 SYS("No aeroporto", r=[["Can I see your passport?", "Posso ver seu passaporte?"], ["Here you are.", "Aqui está (ao entregar algo)"], ["bags to check / carry-on", "malas para despachar / bagagem de mão"], ["boarding pass", "cartão de embarque"], ["gate", "portão"], ["My flight is delayed.", "Meu voo está atrasado"], ["window seat / aisle seat", "assento na janela / no corredor"], ["What's the purpose of your visit?", "Qual o motivo da sua visita?"], ["I'm here on vacation.", "Estou aqui de férias"]], tip="No painel do aeroporto, fique de olho em duas palavras: delayed (atrasado) e cancelled (cancelado)."),
 P("sky", {"mina": "det", "rafa": "shock"}, "Imigração, já em Nova York.", [["mina", "What's the purpose of your visit?", "Qual o motivo da sua visita?"], ["rafa", "I'm here for a hunter convention. For five days.", "Estou aqui para uma convenção de caçadores. Por cinco dias."], ["mina", "Welcome to the United States!", "Bem-vindo aos Estados Unidos!"]]),
], "q": [
 Q("'boarding pass' é:", ["cartão de embarque", "passaporte", "portão de embarque"], "Boarding = embarque. Pass = passe, cartão."),
 Q("Ao entregar algo: 'Aqui está.'", ["Here you are.", "Here are you.", "Here is you."], "Expressão fixa: Here you are."),
 Q("'My flight is delayed' significa:", ["Meu voo está atrasado", "Meu voo foi cancelado", "Meu voo está lotado"], "Delayed = atrasado."),
 Q("'bags to check' são:", ["malas para despachar", "malas para revisar", "malas de mão"], "Check a bag = despachar uma mala."),
 Q("'Assento no corredor'", ["aisle seat", "window seat", "hall seat"], "Aisle (pronuncia-se 'ail') = corredor."),
 Q("Boa resposta para 'What's the purpose of your visit?'", ["I'm here on vacation.", "I'm here since Monday.", "I'm here by plane."], "Purpose = motivo."),
 Q("'gate B12' é:", ["o portão B12", "a bagagem B12", "o assento B12"], "Gate = portão."),
 Q("'Boarding starts at 9:40' significa:", ["O embarque começa às 9:40", "O voo chega às 9:40", "O check-in fecha às 9:40"], "Boarding = embarque."),
 Q("'cancelled' significa:", ["cancelado", "atrasado", "confirmado"], "Cancelled = cancelado."),
]},

{"t": "O Hotel", "lv": "A2", "topic": "Reservas, check-in e pedidos no hotel", "bg": "room", "hero": "jin", "p": [
 P("cafe", {"rafa": "normal", "jin": "happy"}, "Simulador: recepção do hotel.", [["rafa", "Hi. I have a reservation under the name Rafa Lima.", "Oi. Tenho uma reserva no nome de Rafa Lima."], ["jin", "Welcome! Let me check. Yes, a single room for five nights.", "Bem-vindo! Deixe-me ver. Sim, um quarto de solteiro por cinco noites."]]),
 P("cafe", {"rafa": "happy", "jin": "normal"}, None, [["rafa", "Is breakfast included?", "O café da manhã está incluído?"], ["jin", "Yes, it's served from seven to ten. Here's your key card.", "Sim, é servido das sete às dez. Aqui está seu cartão-chave."]]),
 P("room", {"rafa": "sad"}, "Mais tarde, no quarto.", [["rafa", "Hello, reception? I'm afraid the air conditioning isn't working.", "Alô, recepção? Infelizmente o ar-condicionado não está funcionando."], ["jin", "I'm sorry about that. I'll send someone right away.", "Sinto muito. Vou mandar alguém agora mesmo."]]),
 SYS("No hotel", r=[["I have a reservation under...", "Tenho uma reserva no nome de..."], ["single room / double room", "quarto de solteiro / de casal"], ["Is breakfast included?", "O café está incluído?"], ["key card", "cartão-chave"], ["check-in time / check-out time", "horário de entrada / de saída"], ["The shower isn't working.", "O chuveiro não está funcionando"], ["Could I have an extra towel?", "Poderia me dar uma toalha extra?"], ["I'd like to check out, please.", "Gostaria de fazer o check-out"]], tip="Para reclamar com educação, comece com 'I'm afraid...': 'I'm afraid the shower isn't working.' A frase fica mais suave."),
 P("cafe", {"mina": "happy", "rafa": "happy"}, None, [["mina", "How was your stay?", "Como foi sua estadia?"], ["rafa", "Great! The staff was very helpful.", "Ótima! A equipe foi muito prestativa."]]),
], "q": [
 Q("'Tenho uma reserva no nome de Ana.'", ["I have a reservation under the name Ana.", "I have a reservation in the name of Ana's.", "I have reservation on Ana."], "Expressão fixa: under the name..."),
 Q("'double room' é:", ["quarto de casal", "dois quartos", "quarto duplo de solteiro"], "Double = de casal. Single = de solteiro."),
 Q("'Is breakfast included?' pergunta:", ["se o café da manhã está incluído", "onde é o café", "quando é o almoço"], "Included = incluído."),
 Q("'O chuveiro não está funcionando.'", ["The shower isn't working.", "The shower doesn't works.", "The shower not working."], "Isn't working = não está funcionando."),
 Q("Pedido educado:", ["Could I have an extra towel?", "Give me towel.", "I want towel now."], "Could I have...? é educado."),
 Q("'key card' é:", ["cartão-chave", "cartão de crédito", "cartão de visita"], "O cartão que abre a porta do quarto."),
 Q("Em 'I'm afraid the TV is broken', 'I'm afraid':", ["suaviza a reclamação", "quer dizer que estou com medo", "é uma ameaça"], "Aqui significa 'infelizmente'."),
 Q("'How was your stay?' significa:", ["Como foi sua estadia?", "Quanto tempo você fica?", "Onde você ficou?"], "Stay = estadia."),
 Q("'check-out' é:", ["a saída do hotel", "a entrada no hotel", "o pagamento antecipado"], "Check-in = entrada."),
]},

{"t": "Perdidos em Manhattan", "lv": "A2", "topic": "Pedir e dar direções", "bg": "street", "hero": "rafa", "p": [
 P("street", {"rafa": "shock", "jin": "normal"}, "O celular do Rafa descarregou.", [["rafa", "Excuse me, how do I get to Central Park?", "Com licença, como eu chego ao Central Park?"], ["jin", "Go straight for two blocks, then turn left.", "Siga reto por dois quarteirões e depois vire à esquerda."]]),
 P("street", {"jin": "happy"}, None, [["jin", "It's across from the museum. You can't miss it.", "Fica em frente ao museu. Não tem como errar."]]),
 P("street", {"rafa": "normal", "jin": "normal"}, None, [["rafa", "Is it far from here?", "É longe daqui?"], ["jin", "No, it's about a ten-minute walk.", "Não, uns dez minutos a pé."]]),
 SYS("Direções", r=[["Excuse me, how do I get to...?", "Com licença, como chego a...?"], ["Go straight.", "Siga reto"], ["Turn left. / Turn right.", "Vire à esquerda / à direita"], ["at the corner", "na esquina"], ["two blocks", "dois quarteirões"], ["across from", "em frente a (do outro lado)"], ["It's a ten-minute walk.", "São dez minutos a pé"], ["You can't miss it.", "Não tem como errar"], ["Is it far from here?", "É longe daqui?"]], tip="'Excuse me' serve para chamar a atenção de um desconhecido. 'Sorry' é para pedir desculpas."),
 P("street", {"mina": "det", "rafa": "happy"}, None, [["mina", "Turn right at the corner. Then it's on your left.", "Vire à direita na esquina. Aí fica à sua esquerda."], ["rafa", "Got it! Thanks a lot!", "Entendi! Muito obrigado!"]]),
], "q": [
 Q("'Siga reto.'", ["Go straight.", "Go right.", "Go back straight."], "Straight = reto."),
 Q("'Vire à esquerda.'", ["Turn left.", "Turn right.", "Turn the left."], "Left = esquerda. Right = direita."),
 Q("'across from the bank' significa:", ["em frente ao banco, do outro lado", "dentro do banco", "atrás do banco"], "Across from = do outro lado, em frente."),
 Q("Para chamar um desconhecido:", ["Excuse me,", "Sorry me,", "Hey you,"], "Excuse me é educado."),
 Q("'It's a ten-minute walk' significa:", ["São dez minutos a pé", "Fica a dez quarteirões", "Abre em dez minutos"], "Walk = caminhada."),
 Q("'at the corner'", ["na esquina", "no centro", "no fim da rua"], "Corner = esquina."),
 Q("'You can't miss it' significa:", ["Não tem como errar", "Você não pode perder isso", "Você não pode ir"], "É fácil de achar."),
 Q("'Como eu chego ao museu?'", ["How do I get to the museum?", "How I get to the museum?", "How do I arrive the museum?"], "How do I get to...?"),
 Q("'block' em direções é:", ["quarteirão", "bloqueio", "prédio"], "Two blocks = dois quarteirões."),
]},

{"t": "Compras na Quinta Avenida", "lv": "A2", "topic": "Tamanhos, provador e too / enough", "bg": "street", "hero": "mina", "p": [
 P("street", {"mina": "happy", "jin": "normal"}, "Simulador: loja de roupas.", [["mina", "Can I try this jacket on?", "Posso experimentar esta jaqueta?"], ["jin", "Of course. The fitting room is over there.", "Claro. O provador é ali."]]),
 P("room", {"mina": "sad"}, None, [["mina", "It's too small. Do you have it in a medium?", "Está pequena demais. Vocês têm no tamanho M?"]]),
 P("street", {"rafa": "shock", "jin": "normal"}, None, [["rafa", "Two hundred dollars? It's too expensive!", "Duzentos dólares? É caro demais!"], ["jin", "It's on sale today. Twenty percent off.", "Está em promoção hoje. Vinte por cento de desconto."]]),
 SYS("Too e enough", r=[["too small / too expensive", "pequeno demais / caro demais"], ["big enough / old enough", "grande o suficiente / velho o suficiente"], ["I don't have enough money.", "Não tenho dinheiro suficiente"], ["Can I try it on?", "Posso experimentar?"], ["fitting room", "provador"], ["small / medium / large", "P / M / G"], ["It's on sale.", "Está em promoção"], ["Can I pay by card?", "Posso pagar com cartão?"], ["I'm just looking, thanks.", "Só estou olhando, obrigado"]], tip="TOO vem antes do adjetivo (too big). ENOUGH vem depois do adjetivo (big enough), mas antes do substantivo (enough money)."),
 P("street", {"mina": "happy", "rafa": "happy"}, None, [["mina", "This one fits perfectly. Can I pay by card?", "Esta serviu perfeitamente. Posso pagar com cartão?"], ["rafa", "And I'm just looking, thanks.", "E eu só estou olhando, obrigado."]]),
], "q": [
 Q("'Caro demais'", ["too expensive", "expensive enough", "enough expensive"], "Too + adjetivo."),
 Q("'Grande o suficiente'", ["big enough", "enough big", "too enough big"], "Adjetivo + enough."),
 Q("'Não tenho dinheiro suficiente.'", ["I don't have enough money.", "I don't have money enough.", "I don't have too money."], "Enough + substantivo."),
 Q("'Posso experimentar?' (uma roupa)", ["Can I try it on?", "Can I try on it?", "Can I prove it?"], "Com pronome: try it on."),
 Q("'fitting room' é:", ["provador", "academia", "depósito"], "Fit = servir (roupa)."),
 Q("'It's on sale' significa:", ["Está em promoção", "Está à venda, só isso", "Está esgotado"], "On sale = em promoção."),
 Q("'I'm just looking' significa:", ["Só estou olhando", "Estou procurando algo", "Estou com pressa"], "Frase útil quando o vendedor oferece ajuda."),
 Q("She is ___ young to drive.", ["too", "enough", "so"], "Too young = jovem demais."),
 Q("'medium' em roupas é:", ["tamanho M", "tamanho G", "tamanho P"], "Small, medium, large."),
]},

{"t": "No Médico", "lv": "B1", "topic": "Corpo, sintomas e conselhos", "bg": "room", "hero": "rafa", "p": [
 P("room", {"rafa": "sad"}, "Depois de um treino pesado.", [["rafa", "I don't feel well. I have a headache and a sore throat.", "Não estou me sentindo bem. Estou com dor de cabeça e dor de garganta."]]),
 P("cafe", {"jin": "det", "rafa": "sad"}, "Simulador: consultório do Dr. Jin.", [["jin", "How long have you had these symptoms?", "Há quanto tempo você tem esses sintomas?"], ["rafa", "Since yesterday. I also have a fever.", "Desde ontem. Também estou com febre."]]),
 P("cafe", {"jin": "normal"}, None, [["jin", "You should rest and drink plenty of water. Take this medicine twice a day.", "Você deveria descansar e beber bastante água. Tome este remédio duas vezes por dia."]]),
 SYS("Saúde", r=[["I don't feel well.", "Não estou me sentindo bem"], ["I have a headache. / I have a stomachache.", "Estou com dor de cabeça / de estômago"], ["sore throat", "dor de garganta"], ["fever / cough / cold", "febre / tosse / resfriado"], ["My back hurts.", "Minhas costas doem"], ["How long have you had...?", "Há quanto tempo você tem...?"], ["twice a day", "duas vezes por dia"], ["You should rest.", "Você deveria descansar"], ["prescription / pharmacy", "receita / farmácia"]], tip="Para dor em uma parte do corpo, use HAVE + ache (headache, toothache, earache) ou diga 'my ... hurts'."),
 P("room", {"mina": "happy", "rafa": "normal"}, None, [["mina", "Get well soon! I brought you some soup.", "Melhoras! Te trouxe uma sopa."], ["rafa", "Thanks. I already feel better.", "Valeu. Já me sinto melhor."]]),
], "q": [
 Q("'Estou com dor de cabeça.'", ["I have a headache.", "I am headache.", "I have a head pain ache."], "Have + headache."),
 Q("'sore throat' é:", ["dor de garganta", "garganta seca", "tosse"], "Sore = dolorido. Throat = garganta."),
 Q("'Minhas costas doem.'", ["My back hurts.", "My back hurt me is.", "My back is hurt."], "Back = costas. Hurts = dói."),
 Q("'twice a day' significa:", ["duas vezes por dia", "a cada dois dias", "dois dias"], "Once = uma vez. Twice = duas vezes."),
 Q("'Get well soon!' serve para:", ["desejar melhoras", "dar parabéns", "dizer adeus"], "Melhoras!"),
 Q("'fever' é:", ["febre", "fervura", "favor"], "I have a fever = estou com febre."),
 Q("Conselho médico correto:", ["You should drink more water.", "You should to drink more water.", "You should drinking more water."], "Should + verbo puro."),
 Q("'pharmacy' é:", ["farmácia", "fazenda", "hospital"], "Nos EUA também se diz drugstore."),
 Q("'I don't feel well' significa:", ["Não estou me sentindo bem", "Não sinto nada", "Não me sinto à vontade com isso"], "Feel well = sentir-se bem."),
]},

{"t": "Alô? Quem Fala?", "lv": "B1", "topic": "Conversas por telefone", "bg": "room", "hero": "jin", "p": [
 P("room", {"jin": "normal", "rafa": "normal"}, "O telefone da Guilda toca.", [["jin", "Hunter Guild, Jin speaking. How can I help you?", "Guilda dos Caçadores, aqui é o Jin. Como posso ajudar?"], ["rafa", "Hi, could I speak to Mina, please?", "Oi, eu poderia falar com a Mina, por favor?"]]),
 P("room", {"jin": "det"}, None, [["jin", "Hold on a second, please. I'm sorry, she's not available right now.", "Aguarde um segundo, por favor. Sinto muito, ela não está disponível agora."]]),
 P("room", {"jin": "happy", "rafa": "normal"}, None, [["jin", "Would you like to leave a message?", "Gostaria de deixar um recado?"], ["rafa", "Yes, please ask her to call me back.", "Sim, por favor peça para ela me ligar de volta."]]),
 SYS("Ao telefone", r=[["Jin speaking.", "Aqui é o Jin (quem atende)"], ["Could I speak to...?", "Poderia falar com...?"], ["Hold on, please.", "Aguarde, por favor"], ["She's not available right now.", "Ela não está disponível agora"], ["Can I take a message?", "Posso anotar um recado?"], ["Please ask her to call me back.", "Peça para ela me ligar de volta"], ["Sorry, you're breaking up.", "Desculpe, está cortando"], ["Could you speak up, please?", "Pode falar mais alto?"], ["I'll put you through.", "Vou transferir a ligação"]], tip="Ao atender, diga seu nome com 'speaking': 'Rafa speaking'. Evite 'Here is Rafa', que soa estranho em inglês."),
 P("sky", {"mina": "shock", "rafa": "happy"}, "Uma hora depois.", [["mina", "Rafa? Sorry, you're breaking up! Could you speak up?", "Rafa? Desculpa, está cortando! Pode falar mais alto?"], ["rafa", "I said: dinner tonight at eight!", "Eu disse: jantar hoje às oito!"]]),
], "q": [
 Q("Ao atender: 'Aqui é o Rafa.'", ["Rafa speaking.", "Here is Rafa.", "I am Rafa here."], "Nome + speaking."),
 Q("'Hold on, please' significa:", ["Aguarde, por favor", "Desligue, por favor", "Segure isto"], "Hold on = esperar na linha."),
 Q("'Posso anotar um recado?'", ["Can I take a message?", "Can I make a message?", "Can I write you message?"], "Take a message = anotar um recado."),
 Q("'call me back' significa:", ["me ligar de volta", "me chamar para trás", "me mandar mensagem"], "Back = de volta."),
 Q("'You're breaking up' significa:", ["Está cortando (a ligação)", "Você está terminando comigo", "Você está quebrando algo"], "Em ligação, breaking up = sinal ruim."),
 Q("'Could you speak up?' pede para:", ["falar mais alto", "falar mais devagar", "parar de falar"], "Speak up = falar mais alto."),
 Q("'Poderia falar com a Mina?'", ["Could I speak to Mina?", "Could I speak Mina?", "Could I talk with to Mina?"], "Speak to + pessoa."),
 Q("'She's not available' significa:", ["Ela não está disponível", "Ela não é válida", "Ela não existe"], "Available = disponível."),
 Q("'I'll put you through' significa:", ["Vou transferir a ligação", "Vou desligar", "Vou te deixar esperando"], "Put through = transferir."),
]},

{"t": "Conversa Fiada", "lv": "B1", "topic": "Small talk, so / such e question tags", "bg": "cafe", "hero": "mina", "p": [
 P("cafe", {"mina": "happy", "rafa": "shock"}, "Convenção de caçadores. Hora do intervalo.", [["mina", "Small talk is easy. Just talk about the weather.", "Conversa fiada é fácil. Fale do tempo."], ["rafa", "The weather? Really?", "Do tempo? Sério?"]]),
 P("cafe", {"jin": "happy", "rafa": "normal"}, None, [["jin", "Nice day, isn't it?", "Dia bonito, né?"], ["rafa", "Yes, it's so sunny! You're from Chicago, aren't you?", "Sim, está tão ensolarado! Você é de Chicago, não é?"]]),
 P("cafe", {"jin": "normal"}, None, [["jin", "I am. It was such a long flight, wasn't it?", "Sou. Foi um voo tão longo, não foi?"]]),
 SYS("Small talk", r=[["Nice day, isn't it?", "Dia bonito, né?"], ["You're from Chicago, aren't you?", "Você é de Chicago, não é?"], ["She can swim, can't she?", "Ela sabe nadar, não sabe?"], ["so sunny", "tão ensolarado (so + adjetivo)"], ["such a long day", "um dia tão longo (such + a + adjetivo + nome)"], ["How's it going?", "Como vão as coisas?"], ["What do you do?", "O que você faz (profissão)?"], ["Have a good one!", "Tenha um bom dia! (informal)"]], tip="Na question tag, frase positiva leva tag negativa (It's nice, isn't it?) e frase negativa leva tag positiva (You aren't tired, are you?)."),
 P("cafe", {"mina": "happy", "rafa": "happy"}, None, [["rafa", "So, what do you do?", "Então, o que você faz?"], ["mina", "I'm a teacher. And you're doing great, aren't you?", "Sou professora. E você está indo muito bem, né?"]]),
], "q": [
 Q("It's cold today, ___?", ["isn't it", "is it", "doesn't it"], "Positiva → tag negativa com o mesmo verbo."),
 Q("You aren't tired, ___?", ["are you", "aren't you", "do you"], "Negativa → tag positiva."),
 Q("She can drive, ___?", ["can't she", "can she", "doesn't she"], "Can → can't."),
 Q("It was ___ a good movie!", ["such", "so", "very such"], "Such + a + adjetivo + nome."),
 Q("The movie was ___ good!", ["so", "such", "such a"], "So + adjetivo sozinho."),
 Q("'What do you do?' pergunta:", ["sua profissão", "o que está fazendo agora", "o que você quer"], "Agora seria 'What are you doing?'."),
 Q("'How's it going?' significa:", ["Como vão as coisas?", "Para onde você vai?", "Como você vai embora?"], "Cumprimento informal."),
 Q("They live here, ___?", ["don't they", "aren't they", "do they"], "Presente simples → tag com do."),
 Q("'Have a good one!' é:", ["uma despedida informal", "um pedido", "uma pergunta"], "Muito comum nos EUA."),
]},

{"t": "O Mapa Misterioso", "lv": "A2", "topic": "Artigos: a, an, the e quando não usar", "bg": "dungeon", "hero": "rafa", "p": [
 P("room", {"rafa": "shock", "mina": "normal"}, "Rafa encontra um envelope no quarto do hotel.", [["rafa", "There's a map in this envelope!", "Tem um mapa neste envelope!"], ["mina", "Let me see the map.", "Deixa eu ver o mapa."]]),
 P("room", {"mina": "det"}, None, [["mina", "The map shows a door. The door is under the Brooklyn Bridge.", "O mapa mostra uma porta. A porta fica embaixo da Ponte do Brooklyn."]]),
 SYS("Artigos", r=[["a / an", "um / uma (algo novo na conversa)"], ["the", "o / a (algo já conhecido ou único)"], ["I saw a dog. The dog was big.", "Primeiro 'a', depois 'the'"], ["the sun, the moon, the internet", "Coisas únicas levam 'the'"], ["I love music. Dogs are smart.", "Falando em geral: sem artigo"], ["Brazil, Lisbon, Mina", "Países, cidades e pessoas: sem artigo"], ["the United States, the UK", "Exceções que levam 'the'"], ["at home, at school, by bus", "Expressões fixas sem artigo"]], tip="Em português dizemos 'A vida é bela'. Em inglês, falando em geral, não se usa artigo: 'Life is beautiful'."),
 P("dungeon", {"rafa": "det", "mina": "normal"}, "Embaixo da ponte.", [["rafa", "Life is full of surprises.", "A vida é cheia de surpresas."], ["mina", "And this door is full of monsters. Let's go home.", "E esta porta está cheia de monstros. Vamos pra casa."]]),
], "q": [
 Q("I have ___ idea!", ["an", "a", "the"], "Idea começa com som de vogal → an."),
 Q("I saw a cat. ___ cat was black.", ["The", "A", "An"], "Segunda menção → the."),
 Q("'A vida é bela.' (em geral)", ["Life is beautiful.", "The life is beautiful.", "A life is beautiful."], "Em geral, sem artigo."),
 Q("___ sun is hot.", ["The", "A", "(sem artigo)"], "Coisa única → the."),
 Q("'Ela mora no Brasil.'", ["She lives in Brazil.", "She lives in the Brazil.", "She lives in a Brazil."], "Países, em geral, sem artigo."),
 Q("'Ele mora nos Estados Unidos.'", ["He lives in the United States.", "He lives in United States.", "He lives in a United States."], "Exceção: the United States."),
 Q("'Eu vou de ônibus.'", ["I go by bus.", "I go by the bus.", "I go by a bus."], "By + meio de transporte, sem artigo."),
 Q("'Eu amo música.' (em geral)", ["I love music.", "I love the music.", "I love a music."], "Em geral, sem artigo."),
 Q("'the' é usado para:", ["algo já conhecido ou único", "algo novo na conversa", "nomes de pessoas"], "A / an apresenta algo novo."),
]},

{"t": "A Entrevista", "lv": "B1", "topic": "Entrevista de emprego: falar de você", "bg": "cafe", "hero": "jin", "p": [
 P("cafe", {"jin": "det", "rafa": "normal"}, "A Guilda de Nova York está contratando.", [["jin", "Tell me about yourself.", "Fale um pouco sobre você."], ["rafa", "I'm a hunter from Brazil. I've been training for two years.", "Sou um caçador do Brasil. Treino há dois anos."]]),
 P("cafe", {"jin": "normal", "rafa": "det"}, None, [["jin", "What are your strengths?", "Quais são seus pontos fortes?"], ["rafa", "I'm good at working in a team, and I never give up.", "Sou bom em trabalhar em equipe e nunca desisto."]]),
 P("cafe", {"jin": "det", "rafa": "sad"}, None, [["jin", "And your weaknesses?", "E seus pontos fracos?"], ["rafa", "I'm not very good at waking up early. But I'm working on it.", "Não sou muito bom em acordar cedo. Mas estou melhorando nisso."]]),
 SYS("Na entrevista", r=[["Tell me about yourself.", "Fale sobre você"], ["I've been working as a hunter for two years.", "Trabalho como caçador há dois anos"], ["strengths / weaknesses", "pontos fortes / pontos fracos"], ["I'm good at solving problems.", "Sou bom em resolver problemas"], ["I'm working on it.", "Estou melhorando nisso"], ["Why do you want this job?", "Por que você quer esta vaga?"], ["I'm a fast learner.", "Aprendo rápido"], ["When can you start?", "Quando pode começar?"]], tip="Use o present perfect para experiência ('I've worked in a team for three years') e o passado quando houver data ('In 2023, I joined the Guild')."),
 P("cafe", {"jin": "happy", "rafa": "happy"}, None, [["jin", "When can you start?", "Quando você pode começar?"], ["rafa", "Right away!", "Agora mesmo!"], ["jin", "You're hired.", "Você está contratado."]]),
], "q": [
 Q("'Fale sobre você.'", ["Tell me about yourself.", "Say me about you.", "Talk me yourself."], "Tell me about..."),
 Q("'Sou bom em resolver problemas.'", ["I'm good at solving problems.", "I'm good in solve problems.", "I'm good for solving problems."], "Good at + ING."),
 Q("'strengths' são:", ["pontos fortes", "forças armadas", "exercícios"], "Strength = força, ponto forte."),
 Q("'Trabalho aqui há 3 anos.' (e continuo)", ["I've been working here for 3 years.", "I work here since 3 years.", "I'm working here for 3 years ago."], "Have been + ING + for."),
 Q("'You're hired' significa:", ["Você está contratado", "Você está cansado", "Você está demitido"], "Demitido = fired."),
 Q("'I'm a fast learner' significa:", ["Aprendo rápido", "Corro rápido", "Estudo rápido demais"], "Learner = quem aprende."),
 Q("'When can you start?' pergunta:", ["quando você pode começar", "quando você terminou", "quando você nasceu"], "Start = começar."),
 Q("In 2023, I ___ the Guild.", ["joined", "have joined", "join"], "Com data → passado simples."),
 Q("'weaknesses' são:", ["pontos fracos", "semanas", "fraquezas físicas apenas"], "Weak = fraco."),
]},

{"t": "Mandei Consertar", "lv": "B2", "topic": "Have something done (causativo)", "bg": "street", "hero": "rafa", "p": [
 P("street", {"rafa": "sad", "mina": "normal"}, "A espada do Rafa quebrou na última missão.", [["rafa", "My sword is broken. I need to fix it.", "Minha espada quebrou. Preciso consertar."], ["mina", "You don't fix it yourself. You have it fixed by a blacksmith.", "Você não conserta sozinho. Você manda consertar com um ferreiro."]]),
 P("street", {"jin": "happy"}, None, [["jin", "I had my armor repaired here last month. They're the best.", "Mandei consertar minha armadura aqui mês passado. Eles são os melhores."]]),
 P("cafe", {"rafa": "happy", "mina": "shock"}, "No dia seguinte.", [["rafa", "I had my sword fixed, and I got my hair cut!", "Mandei consertar minha espada e cortei o cabelo!"], ["mina", "You look like a new hunter.", "Você parece um novo caçador."]]),
 SYS("Have something done", r=[["I had my sword fixed.", "Mandei consertar minha espada"], ["She's having her car washed.", "Ela está mandando lavar o carro"], ["I got my hair cut.", "Cortei o cabelo (no cabeleireiro)"], ["We need to have the roof repaired.", "Precisamos mandar consertar o telhado"], ["have + objeto + particípio", "A estrutura (get também serve)"], ["I cut my hair. / I had my hair cut.", "Eu mesmo cortei / alguém cortou para mim"]], tip="Em português dizemos 'cortei o cabelo' mesmo quando foi o cabeleireiro. Em inglês, 'I cut my hair' quer dizer que você mesmo cortou."),
], "q": [
 Q("'Mandei consertar meu celular.'", ["I had my phone fixed.", "I fixed my phone by someone.", "I had fixed my phone."], "Have + objeto + particípio."),
 Q("'Cortei o cabelo' (no salão):", ["I had my hair cut.", "I cut my hair myself.", "I had cut my hair."], "Alguém cortou → had my hair cut."),
 Q("She's ___ her nails done.", ["having", "doing", "making"], "Having + objeto + particípio."),
 Q("A estrutura correta é:", ["have + objeto + particípio", "have + particípio + objeto", "have + verbo-ING"], "I had my car washed."),
 Q("'I got my car washed' significa:", ["Mandei lavar meu carro", "Eu lavei meu carro", "Ganhei um carro lavado"], "Get também funciona como have aqui."),
 Q("'Precisamos mandar pintar a casa.'", ["We need to have the house painted.", "We need to paint the house by someone.", "We need have painted the house."], "Have the house painted."),
 Q("'I cut my hair' quer dizer:", ["Eu mesmo cortei", "Alguém cortou para mim", "Vou cortar"], "Sem have, foi você."),
 Q("He had his armor ___.", ["repaired", "repair", "repairing"], "Particípio: repaired."),
 Q("'blacksmith' é:", ["ferreiro", "ladrão", "vendedor"], "Quem trabalha com metal."),
]},

{"t": "Daqui a Um Ano", "lv": "B2", "topic": "Futuro contínuo e futuro perfeito", "bg": "sky", "hero": "mina", "p": [
 P("sky", {"mina": "normal", "rafa": "happy"}, "Última noite em Nova York. Terraço do hotel.", [["mina", "What will you be doing this time next year?", "O que você vai estar fazendo nesta época, ano que vem?"], ["rafa", "I'll be living in Seoul and working for the Guild.", "Vou estar morando em Seul e trabalhando para a Guilda."]]),
 P("sky", {"mina": "happy", "rafa": "det"}, None, [["mina", "By next year, you'll have finished the whole course.", "Até o ano que vem, você vai ter terminado o curso todo."], ["rafa", "And I'll have read a hundred manhwa in English!", "E vou ter lido cem manhwas em inglês!"]]),
 SYS("Futuro avançado", r=[["will be + ING", "vai estar fazendo (em andamento no futuro)"], ["This time tomorrow, I'll be flying.", "Amanhã a esta hora, estarei voando"], ["will have + particípio", "vai ter feito (terminado até um momento)"], ["By 2027, I'll have graduated.", "Até 2027, terei me formado"], ["by Friday", "até sexta, no máximo"], ["Will you be using the car tonight?", "Você vai usar o carro hoje à noite? (educado)"]], tip="'Will you be using...?' é um jeito educado de perguntar os planos de alguém antes de pedir algo emprestado."),
 P("sky", {"rafa": "sad", "mina": "happy"}, None, [["rafa", "This time tomorrow, we'll be flying home.", "Amanhã a esta hora, estaremos voando pra casa."], ["mina", "And you'll have completed your first real-world mission.", "E você vai ter completado sua primeira missão no mundo real."]]),
], "q": [
 Q("This time tomorrow, I ___ on the beach.", ["will be lying", "will lie yesterday", "am lie"], "Em andamento num momento futuro → will be + ING."),
 Q("By June, she ___ the book.", ["will have finished", "will finishing", "has finish"], "Terminado até um momento → will have + particípio."),
 Q("'by Friday' significa:", ["até sexta, no máximo", "perto de sexta", "por causa de sexta"], "By = até (prazo)."),
 Q("'Vou estar trabalhando às 9.'", ["I'll be working at 9.", "I'll working at 9.", "I'll have work at 9."], "Will be + ING."),
 Q("Pergunta educada sobre planos:", ["Will you be using the car tonight?", "Do you will use the car tonight?", "You using the car tonight?"], "Will you be + ING?"),
 Q("'will have + particípio' indica:", ["algo terminado até um momento futuro", "algo acontecendo agora", "um hábito do passado"], "By then, I will have left."),
 Q("By 2030, we ___ in Seoul for five years.", ["will have lived", "will live since", "are living"], "Duração até um ponto futuro."),
 Q("'this time next year' significa:", ["nesta época, ano que vem", "no ano passado", "este ano"], "Next year = ano que vem."),
 Q("Next week we ___ travelling around Japan.", ["will be", "will have", "are be"], "Will be + ING."),
]},

{"t": "O Eco", "lv": "B2", "topic": "Pronúncia (th e -ed) e revisão do mundo real", "bg": "dungeon", "hero": "monster", "mon": "ECO", "boss": True, "p": [
 SYS("Chefe do Arco 7", "Na volta para casa, o avião atravessa um portal. Lá dentro, um monstro repete tudo com a pronúncia errada."),
 P("dungeon", {"rafa": "shock"}, None, [["monster", "I tink you are tree years late!", "(O Eco fala errado de propósito: 'tink' e 'tree' no lugar de 'think' e 'three')"], ["rafa", "It's think and three! Tongue between the teeth!", "É think e three! Língua entre os dentes!"]]),
 P("dungeon", {"mina": "det"}, None, [["mina", "Careful with the endings too. Walked, played, wanted.", "Cuidado também com as terminações. Walked, played, wanted."]]),
 SYS("Pronúncia", r=[["think, three, thanks", "TH sem voz: língua entre os dentes, solte o ar"], ["this, that, mother", "TH com voz: mesma posição, com vibração"], ["walked, helped, watched", "-ED soa como /t/ depois de k, p, ch, sh, s"], ["played, cleaned, lived", "-ED soa como /d/"], ["wanted, needed, started", "-ED vira sílaba /id/ só depois de t ou d"], ["comfortable", "Fala-se COMF-ta-ble: algumas palavras perdem sílabas"]], tip="Erro comum de quem fala português: dizer 'walk-ED' com uma sílaba a mais. 'Walked' tem uma sílaba só."),
 P("action", {"rafa": "det"}, None, [["monster", "You can't defeat me!", "Você não pode me derrotar!"], ["rafa", "I've already thought about it. Three, two, one. Thanks for the practice!", "Já pensei nisso. Três, dois, um. Valeu pelo treino!"]]),
 SYS("Arco 7 completo", "Você sobreviveu ao mundo real: aeroporto, hotel, compras, médico, telefone e entrevista. Agora é hora de usar o inglês fora da Torre."),
], "q": [
 Q("Em 'walked', o -ED soa como:", ["/t/", "/id/", "/d/"], "Depois de K, o -ED soa como /t/."),
 Q("Em 'wanted', o -ED soa como:", ["/id/", "/t/", "/d/"], "Depois de T ou D vira sílaba: want-id."),
 Q("Para o som de 'think':", ["língua entre os dentes", "lábios fechados", "som de 'f'"], "TH: língua entre os dentes."),
 Q("Quantas sílabas tem 'played'?", ["uma", "duas", "três"], "Played = /pleid/, uma sílaba."),
 Q("'Meu voo está atrasado.'", ["My flight is delayed.", "My flight is late-ed.", "My fly is delayed."], "Flight = voo. Delayed = atrasado."),
 Q("'Vire à direita na esquina.'", ["Turn right at the corner.", "Turn right in the corner of.", "Return right at corner."], "At the corner."),
 Q("It's ___ expensive. I can't buy it.", ["too", "enough", "such"], "Too = demais."),
 Q("Ao atender o telefone: 'Aqui é a Ana.'", ["Ana speaking.", "Here is Ana.", "Ana is me."], "Nome + speaking."),
 Q("I had my phone ___ yesterday.", ["repaired", "repair", "repairing"], "Have + objeto + particípio."),
 Q("Nice weather, ___?", ["isn't it", "is it", "doesn't it"], "Positiva → tag negativa."),
]},
]
