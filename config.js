/*
 * Dayara Alves Advocacia · site
 * Autor: Diego · github.com/diego-dba
 * Versão 1.0 · outubro de 2026
 */

// esse é o arquivo que eu mais mexo. coloquei aqui tudo o que muda no site pra não ter que ficar
// procurando texto no meio do html. depois de mudar eu salvo, faço o commit e o push, e em 1 ou 2
// minutos o site atualiza (se não aparecer é cache, aí eu dou ctrl+f5 ou abro numa aba anônima).
// texto sempre vai entre aspas, e se eu precisar de aspas dentro do texto uso aspas simples ou “curvas”.
// texto vazio ("") não aparece no site, e no rascunho ele aparece como [PREENCHER] pra eu lembrar o que falta.
// quando eu escrevo {telefone}, {nome} ou {cidade} dentro de um texto, o site troca pelo valor daqui de baixo.

window.SITE = {

  modoRascunho: false,  // troquei pra false quando o site ficou pronto (out/2026). se eu voltar pra true, aparecem de novo a faixa amarela e os [PREENCHER]

  nome: "Dayara Alves",  // daqui até a cidade são os dados da cliente, que aparecem na abertura, no contato e no rodapé
  tratamento: "Dra.",
  marca: "Dayara Alves Advocacia",
  oab: "OAB/SP 464.810",
  cidade: "Ribeirão Preto/SP",

  whatsapp: "5516992065376",            // aqui vai só número porque é o que entra no link do wa.me (55 + DDD + celular)
  telefone: "(16) 99206-5376",          // esse é o jeito que o número aparece escrito no site
  // essa é a mensagem que já aparece escrita quando a pessoa clica no botão do whatsapp
  mensagemWhatsApp: "Olá, Dra. Dayara! Vim pelo site e gostaria de agendar um atendimento.",
  instagram: "dayara_alves",            // deixei sem o @ porque o site coloca sozinho
  email: "contato@dayara.adv.br",       // e-mail da cliente no zoho mail, é o que aparece no contato do site
  emailPrivacidade: "privacidade@dayara.adv.br",  // e-mail só pros pedidos da LGPD, quem cuida sou eu. aparece na política de privacidade
  encarregadoNome: "Diego Batista Alves",  // encarregado da LGPD (sou eu, pelo termo de designação que a cliente assinou). a ANPD exige o nome no site, por isso aparece na política

  // essa é a frase grande da abertura (o h1 da página)
  titulo: "Atendimento jurídico online, de onde você estiver, e presencial em Ribeirão Preto/SP.",
  resumo: "Advocacia previdenciária, de família e sucessões e do consumidor.",   // sugestão minha a partir das áreas que a cliente mandou, ela ainda pode trocar
  atendimento: "Online, por videochamada, e presencial em Ribeirão Preto/SP, com hora marcada.",
  regioes: "",                          // deixei vazio de propósito: online ela atende gente de qualquer lugar, até de fora do Brasil. vazio, esse item some do contato
  // texto que a cliente mandou. o \n\n no meio quebra em outro parágrafo no site
  sobre: "Atuo há mais de 4 anos nas áreas previdenciária, de família e do consumidor. Minha trajetória inclui anos em um escritório com grande volume de demandas, onde desenvolvi organização, agilidade e cuidado com o cliente em cada processo.\n\nNo atendimento, ouço a sua situação, analiso os documentos e explico as possibilidades de cada caso.",
  especializacao: "Pós-graduações em Seguridade Social, Planejamento Previdenciário e Contratos.",   // ela tem o título dessas três, então pela regra da OAB pode aparecer
  foto: "assets/img/foto-dayara.jpg",                // escolhi a foto em pé porque ela olha pra frente, como se olhasse pra quem abre o site
  fotoCelular: "assets/img/foto-dayara-rosto.jpg",   // no celular a foto fica pequena, então uso um recorte só do rosto e dos ombros

  areas: [  // segui as áreas que a cliente mandou, com o previdenciário primeiro porque é a principal dela
    { titulo: "Direito Previdenciário", texto: "Benefícios, aposentadorias e planejamento previdenciário." },
    { titulo: "Direito de Família e Sucessões", texto: "Inventário, reconhecimento de união estável e demais demandas familiares." },
    { titulo: "Direito do Consumidor", texto: "Defesa dos direitos do consumidor." },
    // pra colocar outra área eu copio esse modelo, tiro as // do começo e preencho:
    // { titulo: "Nome da área", texto: "Uma ou duas frases explicando o que ela faz nessa área." },
  ],

  passos: [  // os passos do "como funciona" aparecem numerados, na mesma ordem que estão aqui
    {
      titulo: "Conte a sua situação",
      texto: "Mande uma mensagem pelo WhatsApp com um resumo do que aconteceu. Não precisa enviar documentos neste primeiro contato."
    },
    {
      titulo: "Agende o atendimento",
      texto: "Combinamos dia e horário, por videochamada ou presencialmente em Ribeirão Preto."
    },
    {
      titulo: "Receba a orientação",
      texto: "Você entende as possibilidades do seu caso e, se decidir seguir, recebe a proposta de trabalho por escrito."
    }
  ],

  // coloquei esse aviso porque tem muito golpe de gente se passando por advogado e pedindo pix pra "liberar" dinheiro de processo
  avisoGolpe: "A Dra. Dayara não pede pagamento de taxas para liberar valores de processos e só fala com clientes pelos contatos deste site. Se receber uma mensagem diferente disso, confirme antes pelo WhatsApp {telefone}.",

  linkAvaliacoesGoogle: "",  // link das avaliações da cliente no google, vou colocar quando ela tiver o perfil
  linkCanalYoutube: "",  // link do canal da cliente no youtube. preenchido, aparece "ver todos os vídeos no youtube" embaixo dos vídeos
  limiteVideos: 4,  // quantos vídeos aparecem no site: primeiro os fixos, depois os mais novos. número vai sem aspas
  videosFixos: ["Sobre mim", "Como funciona o atendimento"],  // nomes das opções da coluna Fixo da planilha, na ordem em que aparecem no site. de cada uma só entra o vídeo de número maior

  creditoDesenvolvedor: "Site por Diego",  // a cliente autorizou o crédito no primeiro ano, que é grátis. em nov/2027 converso com ela de novo
  emailDesenvolvedor: "fessor.dba@gmail.com",  // meu e-mail profissional (fora do domínio da cliente). preenchido, o "Site por Diego" vira link; vazio, fica só o texto
  tokenContador: "4175e912a5c9494c937e5f0c52984fa3",  // token do contador de visitas (cloudflare web analytics). não é segredo, ele aparece no código do site. vazio, o contador fica desligado

  secoes: {  // aqui eu ligo e desligo as partes do site (true aparece, false some), assim não preciso apagar nada do html
    sobre: true,
    areas: true,
    comoFunciona: true,
    avaliacoes: false,      // só vou ligar depois que os clientes autorizarem
    videos: true,          // com a aba Vídeos vazia, a seção e o link do menu somem sozinhos
    avisos: true,           // é a faixa de avisos embaixo do topo
    golpe: true,
    botaoFlutuante: true    // botão do whatsapp no canto da tela, só aparece no celular
  },

  planilha: {  // links das abas publicadas em csv (arquivo > compartilhar > publicar na web > escolho a aba > csv)
    avisos: "",       // enquanto estiver vazio não carrega nada. o que eu publico lá fica público, então só coloco o que pode aparecer no site
    videos: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbQvE1ZEpLQnpcEzzge3nxHnSXw8YjRG6a2_HBP9U13CvoGCfEZ8_KQ4vmwOQm_7R4c83UokFiPUDs/pub?gid=1982781503&single=true&output=csv",
    avaliacoes: ""
  }
};
