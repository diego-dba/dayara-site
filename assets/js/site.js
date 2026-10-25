/*
 * Dayara Alves Advocacia · site
 * Autor: Diego · github.com/diego-dba
 * Versão 1.0 · outubro de 2026
 */

(function () {
  'use strict';

  var S = window.SITE || {};
  var rascunho = S.modoRascunho === true;
  var secoes = S.secoes || {};

  function txt(v) { return v == null ? '' : String(v).trim(); }

  var instagram = txt(S.instagram).replace(/^@/, '');
  var dados = Object.assign({}, S, {
    instagramArroba: instagram ? '@' + instagram : ''
  });

  function comTokens(v) {
    return txt(v).replace(/\{(\w+)\}/g, function (_, chave) { return txt(dados[chave]); });
  }
  function normalizar(v) {
    return txt(v).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }
  function sim(v) {
    var n = normalizar(v);
    return n === 'sim' || n === 's' || n === 'x' || n === 'true' || n === 'yes';
  }
  function urlSegura(v) { v = txt(v); return /^https?:\/\//i.test(v) ? v : ''; }
  function criar(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }
  function todos(seletor) { return Array.prototype.slice.call(document.querySelectorAll(seletor)); }

  function ocultarSecao(chave) {
    todos('[data-secao="' + chave + '"]').forEach(function (n) { n.hidden = true; });
  }

  function marcarVazio(alvo, rotulo) {
    if (rascunho && !alvo.hasAttribute('data-opcional')) {
      alvo.textContent = '[PREENCHER: ' + (rotulo || 'campo') + ']';
      alvo.classList.add('preencher');
      return;
    }
    var seletor = alvo.getAttribute('data-ocultar');
    var ocultar = seletor ? alvo.closest(seletor) : alvo;
    (ocultar || alvo).hidden = true;
  }

  function semConteudo(chave, lista, rotulo) {
    if (rascunho) {
      var aviso = criar('p');
      marcarVazio(aviso, rotulo);
      lista.appendChild(aviso);
    } else {
      ocultarSecao(chave);
    }
  }

  if (rascunho) {
    var faixa = criar('p', 'faixa-rascunho',
      'Versão de teste. Os campos marcados com [PREENCHER] somem quando o modoRascunho for false no config.js.');
    var topo = document.querySelector('.topo');
    document.body.insertBefore(faixa, topo || document.body.firstChild);
  }

  Object.keys(secoes).forEach(function (chave) {
    if (secoes[chave] === false) ocultarSecao(chave);
  });

  todos('[data-campo]').forEach(function (n) {
    var chave = n.getAttribute('data-campo');
    var valor = comTokens(dados[chave]);
    if (valor) n.textContent = valor;
    else marcarVazio(n, n.getAttribute('data-rotulo') || chave);
  });

  todos('[data-paragrafos]').forEach(function (n) {
    var valor = comTokens(dados[n.getAttribute('data-paragrafos')]);
    if (!valor) { marcarVazio(n, n.getAttribute('data-rotulo')); return; }
    n.textContent = '';
    valor.split(/\n\s*\n/).forEach(function (paragrafo) {
      if (paragrafo.trim()) n.appendChild(criar('p', null, paragrafo.trim()));
    });
  });

  var numero = txt(S.whatsapp).replace(/\D/g, '');
  var mensagem = txt(S.mensagemWhatsApp);
  var links = {
    whatsapp: numero ? 'https://wa.me/' + numero + (mensagem ? '?text=' + encodeURIComponent(mensagem) : '') : '',
    instagram: instagram ? 'https://www.instagram.com/' + instagram + '/' : '',
    email: txt(S.email) ? 'mailto:' + txt(S.email) : '',
    avaliacoesGoogle: urlSegura(S.linkAvaliacoesGoogle)
  };
  todos('[data-link]').forEach(function (n) {
    var url = links[n.getAttribute('data-link')];
    if (url) { n.setAttribute('href', url); return; }
    if (n.hasAttribute('data-campo')) return;
    var seletor = n.getAttribute('data-ocultar');
    ((seletor && n.closest(seletor)) || n).hidden = true;
  });

  var figura = document.querySelector('[data-foto]');
  if (figura) {
    var caminhoFoto = txt(S.foto);
    var imagem = figura.querySelector('img');
    var vazia = figura.querySelector('.foto-vazia');
    if (caminhoFoto && imagem) {
      imagem.src = caminhoFoto;
      imagem.hidden = false;
      if (vazia) vazia.hidden = true;
    } else if (!rascunho) {
      figura.hidden = true;
      var inicio = document.getElementById('inicio');
      if (inicio) inicio.classList.add('sem-foto');
    }
  }

  var listaAreas = document.getElementById('lista-areas');
  if (listaAreas) {
    var areas = (S.areas || []).filter(function (a) { return a && txt(a.titulo); });
    if (areas.length) {
      areas.forEach(function (a) {
        var item = criar('li');
        item.appendChild(criar('h3', null, comTokens(a.titulo)));
        if (txt(a.texto)) item.appendChild(criar('p', null, comTokens(a.texto)));
        listaAreas.appendChild(item);
      });
    } else {
      semConteudo('areas', listaAreas, 'áreas de atuação (veja o modelo no config.js)');
    }
  }

  var listaPassos = document.getElementById('lista-passos');
  if (listaPassos) {
    var passos = (S.passos || []).filter(function (p) { return p && txt(p.titulo); });
    if (passos.length) {
      passos.forEach(function (p) {
        var item = criar('li');
        item.appendChild(criar('h3', null, comTokens(p.titulo)));
        if (txt(p.texto)) item.appendChild(criar('p', null, comTokens(p.texto)));
        listaPassos.appendChild(item);
      });
    } else {
      semConteudo('comoFunciona', listaPassos, 'passos do atendimento');
    }
  }

  if (!rascunho) {
    if (!txt(S.sobre) && !txt(S.especializacao)) ocultarSecao('sobre');
    if (!txt(S.avisoGolpe)) ocultarSecao('golpe');
  }

  todos('[data-ano]').forEach(function (n) { n.textContent = String(new Date().getFullYear()); });

  var botaoMenu = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu');
  if (botaoMenu && menu) {
    var fecharMenu = function () {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
    };
    botaoMenu.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(); });
  }

  var flutuante = document.querySelector('.flutuante');
  var abertura = document.querySelector('.inicio__acoes') || document.getElementById('inicio');
  if (flutuante && abertura && 'IntersectionObserver' in window) {
    flutuante.classList.add('flutuante--oculto');
    new IntersectionObserver(function (entradas) {
      flutuante.classList.toggle('flutuante--oculto', entradas[0].isIntersecting);
    }, { threshold: 0.1 }).observe(abertura);
  }

  if (document.getElementById('inicio')) {
    try {
      var canonico = document.querySelector('link[rel="canonical"]');
      var base = canonico ? canonico.href : location.href.split('#')[0];
      var ld = {
        '@context': 'https://schema.org',
        '@type': 'Attorney',
        name: txt(S.marca) || txt(S.nome),
        url: base,
        image: new URL('assets/img/og-image.jpg', base).href,
        areaServed: txt(S.cidade)
      };
      if (numero) ld.telephone = '+' + numero;
      if (txt(S.email)) ld.email = txt(S.email);
      if (links.instagram) ld.sameAs = [links.instagram];
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
    } catch (e) {}
  }

  function lerCSV(texto) {
    var linhas = [], linha = [], campo = '', aspas = false;
    texto = texto.replace(/^﻿/, '');
    for (var i = 0; i < texto.length; i++) {
      var c = texto[i];
      if (aspas) {
        if (c === '"') {
          if (texto[i + 1] === '"') { campo += '"'; i++; }
          else aspas = false;
        } else {
          campo += c;
        }
      } else if (c === '"') {
        aspas = true;
      } else if (c === ',') {
        linha.push(campo); campo = '';
      } else if (c === '\n') {
        linha.push(campo); linhas.push(linha); linha = []; campo = '';
      } else if (c !== '\r') {
        campo += c;
      }
    }
    if (campo !== '' || linha.length) { linha.push(campo); linhas.push(linha); }
    return linhas;
  }

  function paraObjetos(linhas) {
    if (!linhas.length) return [];
    var cabecalho = linhas[0].map(normalizar);
    return linhas.slice(1)
      .filter(function (l) { return l.some(function (v) { return txt(v) !== ''; }); })
      .map(function (l) {
        var obj = {};
        cabecalho.forEach(function (chave, i) { if (chave) obj[chave] = txt(l[i]); });
        return obj;
      });
  }

  function lerData(v) {
    v = txt(v);
    var m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
    if (m) {
      var ano = +m[3];
      if (ano < 100) ano += 2000;
      return new Date(ano, +m[2] - 1, +m[1]);
    }
    return null;
  }

  function carregarAba(nome) {
    var url = urlSegura((S.planilha || {})[nome]);
    if (!url) return Promise.resolve(null);
    var chaveCopia = 'dayara-site:' + nome;
    var controle = ('AbortController' in window) ? new AbortController() : null;
    var limite = controle ? setTimeout(function () { controle.abort(); }, 8000) : null;
    return fetch(url, { cache: 'no-store', signal: controle ? controle.signal : undefined })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (t) {
        if (/^\s*</.test(t)) throw new Error('O link não é de uma aba publicada em CSV');
        try { localStorage.setItem(chaveCopia, t); } catch (e) {}
        return t;
      })
      .catch(function () {
        try { return localStorage.getItem(chaveCopia); } catch (e) { return null; }
      })
      .then(function (t) {
        if (limite) clearTimeout(limite);
        return t ? paraObjetos(lerCSV(t)) : null;
      });
  }

  var caixaAvisos = document.getElementById('avisos');
  if (caixaAvisos && secoes.avisos !== false) {
    carregarAba('avisos').then(function (linhas) {
      if (!linhas) return;
      var hoje = new Date();
      hoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
      var ativos = linhas.filter(function (a) {
        if (!sim(a.ativo) || !txt(a.texto)) return false;
        var ini = lerData(a.inicio);
        var fim = lerData(a.fim);
        if (ini && hoje < ini) return false;
        if (fim && hoje > fim) return false;
        return true;
      });
      if (!ativos.length) return;
      var lista = criar('div', 'envoltorio avisos__lista');
      ativos.forEach(function (a) {
        var p = criar('p', 'avisos__item', a.texto);
        var link = urlSegura(a.link);
        if (link) {
          var ancora = criar('a', null, txt(a.texto_do_link) || 'Saiba mais');
          ancora.href = link;
          ancora.target = '_blank';
          ancora.rel = 'noopener';
          p.appendChild(ancora);
        }
        lista.appendChild(p);
      });
      caixaAvisos.appendChild(lista);
      caixaAvisos.hidden = false;
    });
  }

  function idYouTube(url) {
    url = txt(url);
    var m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{11}$/.test(url) ? url : '';
  }

  function cartaoVideo(v) {
    var id = idYouTube(v.link_do_youtube);
    var titulo = txt(v.titulo) || 'Vídeo';
    var figura = criar('figure', 'video');
    var capa = criar('button', 'video__capa');
    capa.type = 'button';
    capa.setAttribute('aria-label', 'Assistir: ' + titulo);
    capa.style.backgroundImage = 'url("https://i.ytimg.com/vi/' + id + '/hqdefault.jpg")';
    var play = criar('span', 'video__play');
    play.setAttribute('aria-hidden', 'true');
    play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    capa.appendChild(play);
    capa.addEventListener('click', function () {
      var quadro = document.createElement('iframe');
      quadro.className = 'video__quadro';
      quadro.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      quadro.title = titulo;
      quadro.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      quadro.allowFullscreen = true;
      capa.replaceWith(quadro);
    });
    figura.appendChild(capa);
    var legenda = criar('figcaption');
    legenda.appendChild(criar('span', 'video__titulo', titulo));
    if (txt(v.descricao)) legenda.appendChild(criar('p', 'video__descricao', v.descricao));
    figura.appendChild(legenda);
    return figura;
  }

  var listaVideos = document.getElementById('lista-videos');
  if (listaVideos && secoes.videos !== false) {
    carregarAba('videos').then(function (linhas) {
      var videos = (linhas || [])
        .filter(function (v) { return sim(v.exibir) && idYouTube(v.link_do_youtube); })
        .sort(function (a, b) { return (parseFloat(a.ordem) || 999) - (parseFloat(b.ordem) || 999); });
      if (!videos.length) {
        semConteudo('videos', listaVideos, 'vídeos: conecte a aba Vídeos da planilha e marque Exibir = SIM');
        return;
      }
      videos.forEach(function (v) { listaVideos.appendChild(cartaoVideo(v)); });
    });
  }

  function cartaoAvaliacao(a) {
    var figura = criar('figure', 'avaliacao');
    var citacao = criar('blockquote', 'avaliacao__texto');
    citacao.appendChild(criar('p', null, a.texto_exato));
    figura.appendChild(citacao);
    var legenda = criar('figcaption', 'avaliacao__autor');
    legenda.appendChild(criar('span', 'avaliacao__nome', txt(a.autor) || 'Cliente'));
    var fonte = txt(a.fonte);
    var link = urlSegura(a.link_da_avaliacao);
    if (link) {
      var ancora = criar('a', null, 'Fonte: ' + (fonte || 'avaliação original'));
      ancora.href = link;
      ancora.target = '_blank';
      ancora.rel = 'noopener';
      legenda.appendChild(ancora);
    } else if (fonte) {
      legenda.appendChild(criar('span', null, 'Fonte: ' + fonte));
    }
    figura.appendChild(legenda);
    return figura;
  }

  var listaAvaliacoes = document.getElementById('lista-avaliacoes');
  if (listaAvaliacoes && secoes.avaliacoes !== false) {
    carregarAba('avaliacoes').then(function (linhas) {
      var avaliacoes = (linhas || []).filter(function (a) {
        return sim(a.exibir) && sim(a.autorizado) && txt(a.texto_exato);
      });
      if (!avaliacoes.length) {
        semConteudo('avaliacoes', listaAvaliacoes, 'avaliações: conecte a aba Avaliações e marque Exibir e Autorizado = SIM');
        return;
      }
      avaliacoes.forEach(function (a) { listaAvaliacoes.appendChild(cartaoAvaliacao(a)); });
    });
  }
})();
