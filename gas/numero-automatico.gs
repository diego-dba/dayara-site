/*
 * Dayara Alves Advocacia · planilha do site
 * Autor: Diego · github.com/diego-dba
 * Versão 1.0 · outubro de 2026
 */

// esse script roda dentro da planilha, não no site. o original fica aqui no repositório: pra instalar,
// copio tudo, colo na planilha em Extensões > Apps Script e salvo. se eu mudar alguma coisa, mudo aqui e colo de novo lá.
// quando alguém cola um link na coluna "Link do YouTube" da aba Vídeos, ele preenche a coluna "Número" daquela linha
// com o maior número que já existe + 1. o site usa esse número pra saber qual vídeo é o mais novo,
// então ordenar ou mudar as linhas de lugar não estraga nada. o número é dado uma vez só e nunca muda.

var ABA_VIDEOS = 'videos';                // nome da aba, sem acento e em minúsculo (comparo assim pra não dar erro de digitação)
var COLUNA_LINK = 'link do youtube';      // títulos das colunas, também sem acento e em minúsculo
var COLUNA_NUMERO = 'numero';

// onEdit é um gatilho simples: o google roda sozinho a cada edição, sem pedir autorização pra ninguém
function onEdit(e) {
  if (!e || !e.range) return;  // rodando pelo editor não tem edição, então não faço nada
  var aba = e.range.getSheet();
  if (normalizar(aba.getName()) !== ABA_VIDEOS) return;

  // acho as colunas pelo título, assim se alguém mudar a ordem das colunas continua funcionando
  var titulos = aba.getRange(1, 1, 1, aba.getLastColumn()).getValues()[0].map(normalizar);
  var colLink = titulos.indexOf(COLUNA_LINK) + 1;
  var colNumero = titulos.indexOf(COLUNA_NUMERO) + 1;
  if (!colLink || !colNumero) return;

  // só faço alguma coisa se a edição pegou a coluna do link (mudar título, descrição ou fixo não gera número)
  var primeiraColuna = e.range.getColumn();
  var ultimaColuna = primeiraColuna + e.range.getNumColumns() - 1;
  if (colLink < primeiraColuna || colLink > ultimaColuna) return;

  var primeiraLinha = Math.max(e.range.getRow(), 2);  // a linha 1 é a dos títulos
  var ultimaLinha = e.range.getRow() + e.range.getNumRows() - 1;
  if (ultimaLinha < primeiraLinha) return;
  var quantidade = ultimaLinha - primeiraLinha + 1;

  // se ela colar vários links de uma vez, cada linha ganha o seu número, de cima pra baixo
  var links = aba.getRange(primeiraLinha, colLink, quantidade, 1).getValues();
  var numeros = aba.getRange(primeiraLinha, colNumero, quantidade, 1).getValues();
  var maior = maiorNumero(aba, colNumero);
  var mudou = false;
  for (var i = 0; i < quantidade; i++) {
    var temLink = String(links[i][0]).trim() !== '';
    var semNumero = String(numeros[i][0]).trim() === '';
    if (temLink && semNumero) {
      maior += 1;
      numeros[i][0] = maior;
      mudou = true;
    }
  }
  if (mudou) aba.getRange(primeiraLinha, colNumero, quantidade, 1).setValues(numeros);
}

// o maior número que já está na coluna (0 se ainda não tiver nenhum)
function maiorNumero(aba, colNumero) {
  var ultima = aba.getLastRow();
  if (ultima < 2) return 0;
  var maior = 0;
  aba.getRange(2, colNumero, ultima - 1, 1).getValues().forEach(function (linha) {
    var n = Number(linha[0]);
    if (n > maior) maior = n;
  });
  return maior;
}

// tira acento, espaço sobrando e maiúscula: "Vídeos" vira "videos" e "Número" vira "numero"
function normalizar(texto) {
  return String(texto).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}
