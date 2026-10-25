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

  modoRascunho: true,  // enquanto estiver true aparece a faixa amarela e os [PREENCHER], vou trocar pra false quando for divulgar

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
  email: "",                            // ainda está vazio, quando tiver eu coloco aqui, tipo "contato@dayara.adv.br"

  // essa é a frase grande da abertura (o h1 da página)
  titulo: "Atendimento jurídico online e presencial, com hora marcada, em Ribeirão Preto/SP.",
  resumo: "",                           // 1 ou 2 frases com o que ela trabalha e pra quem, ainda falta a cliente me passar
  atendimento: "Online, por videochamada, e presencial com agendamento em Ribeirão Preto/SP.",
  regioes: "",                          // tipo "Ribeirão Preto e região", ainda falta a cliente confirmar
  sobre: "",                            // trajetória e formação. quando eu deixo uma linha em branco no meio, vira outro parágrafo no site
  especializacao: "",                   // só vou preencher se ela tiver o título, porque pela regra da OAB não pode dizer especialista sem ter
  foto: "",                             // quando a foto chegar vai ficar "assets/img/foto-dayara.jpg"

  areas: [  // pra colocar uma área eu copio o modelo de baixo, tiro as // do começo e preencho. vazia, a seção some na versão final
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

  creditoDesenvolvedor: "",  // crédito no rodapé, tipo "Site por Diego". deixei vazio por enquanto, aí ele não aparece

  secoes: {  // aqui eu ligo e desligo as partes do site (true aparece, false some), assim não preciso apagar nada do html
    sobre: true,
    areas: true,
    comoFunciona: true,
    avaliacoes: false,      // só vou ligar depois que os clientes autorizarem
    videos: false,          // vou ligar quando tiver vídeo na planilha
    avisos: true,           // é a faixa de avisos embaixo do topo
    golpe: true,
    botaoFlutuante: true    // botão do whatsapp no canto da tela, só aparece no celular
  },

  planilha: {  // links das abas publicadas em csv (arquivo > compartilhar > publicar na web > escolho a aba > csv)
    avisos: "",       // enquanto estiver vazio não carrega nada. o que eu publico lá fica público, então só coloco o que pode aparecer no site
    videos: "",
    avaliacoes: ""
  }
};
