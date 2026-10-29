# Site da Dayara Alves Advocacia

Site institucional da Dra. Dayara Alves (OAB/SP 464.810), publicado em [dayara.adv.br](https://dayara.adv.br).
É um site estático, feito com HTML, CSS e JavaScript, sem framework e sem etapa de build, hospedado no GitHub Pages.

## Como o site funciona

Todo o conteúdo que muda fica no `config.js`. O HTML traz só a estrutura, com marcações que o `assets/js/site.js` preenche quando a página carrega:

- `data-campo="chave"`: recebe o texto de `window.SITE.chave`;
- `data-link="chave"`: recebe o endereço do link (WhatsApp, e-mail, Instagram);
- `data-secao="chave"`: some quando `secoes.chave` é `false`;
- `data-ocultar="seletor"`: indica o que esconder quando o campo está vazio.

Com `modoRascunho: true`, os campos vazios aparecem como `[PREENCHER]` e uma faixa amarela avisa que é versão de teste.
Com `modoRascunho: false`, que é a versão publicada, os campos vazios simplesmente somem.

## Estrutura

```
index.html                    página principal
politica-de-privacidade.html  política de privacidade (LGPD)
404.html                      página de erro (com CSS próprio)
config.js                     dados e configurações do site
assets/js/site.js             monta a página a partir do config.js
assets/css/site.css           estilos (cores, fontes e escala no começo do arquivo)
assets/img/                   logo, fotos, ícones e imagem de compartilhamento
assets/fonts/                 Montserrat e Cormorant Garamond
gas/numero-automatico.gs      script da planilha (Google Apps Script), para colar em Extensões › Apps Script
CNAME                         domínio do GitHub Pages (não apagar)
robots.txt, sitemap.xml       orientação para os buscadores
```

## Rodar no computador

Abra a pasta no VS Code e use a extensão Live Server, ou rode no terminal, dentro da pasta:

```
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. Abrir o `index.html` com dois cliques também funciona, mas o servidor local reproduz melhor o site publicado.

## O que fica no config.js

| Campo | Para que serve |
| --- | --- |
| `modoRascunho` | `true` mostra a faixa de teste e os [PREENCHER]; `false` é a versão publicada |
| `nome`, `tratamento`, `marca`, `oab`, `cidade` | identificação da advogada |
| `whatsapp`, `telefone`, `mensagemWhatsApp` | botões do WhatsApp (`whatsapp` só com números: 55 + DDD + celular) |
| `instagram`, `email` | outros contatos |
| `emailPrivacidade`, `encarregadoNome` | canal e encarregado da LGPD, na política de privacidade |
| `titulo`, `resumo`, `atendimento`, `regioes` | textos da abertura e do contato |
| `sobre`, `especializacao`, `foto`, `fotoCelular` | seção "Quem vai atender você" (`\n\n` no `sobre` abre um parágrafo novo) |
| `areas`, `passos` | áreas de atuação e etapas do atendimento |
| `avisoGolpe` | aviso contra golpes |
| `secoes` | liga (`true`) e desliga (`false`) partes do site |
| `planilha` | links CSV das abas da planilha (opcional) |
| `limiteVideos` | quantos vídeos aparecem no site (número, sem aspas) |
| `videosFixos` | nomes das vagas fixas de vídeo, iguais às opções da coluna Fixo da planilha, na ordem do site |
| `linkAvaliacoesGoogle`, `linkCanalYoutube` | links "Ver todas as avaliações no Google" e "Ver todos os vídeos no YouTube"; vazios, não aparecem |
| `creditoDesenvolvedor`, `emailDesenvolvedor` | crédito no rodapé (com e-mail, vira link) |
| `tokenContador` | token do Cloudflare Web Analytics; vazio desliga o contador |

Os textos vão sempre entre aspas. Dentro de um texto, `{telefone}`, `{nome}` e `{cidade}` são trocados pelos valores do próprio `config.js`.

## Imagens

- `foto-dayara.jpg` (computador, 760×950) e `foto-dayara-rosto.jpg` (celular, 320×400), em JPG e sem dados EXIF;
- `logo-dayara-alves.webp` e `logo-dayara-alves.png`: para trocar a logo, manter os mesmos nomes;
- `og-image.jpg` (1200×630): imagem da prévia quando o link é compartilhado;
- `favicon.ico`, `favicon-16.png`, `favicon-32.png` e `apple-touch-icon.png`: ícones da aba e da tela do celular.

## Planilha (opcional): avisos, vídeos e avaliações

A planilha fica no Google Drive, fora do repositório (o `.gitignore` bloqueia planilhas), com as abas Avisos, Vídeos e Avaliações. Para ligar uma planilha ao site:

1. Em Arquivo › Configurações, deixe a localidade Brasil.
2. Em Extensões › Apps Script, apague o que estiver no editor, cole todo o conteúdo de `gas/numero-automatico.gs` e salve. É esse script que preenche o Número dos vídeos. Quando o arquivo mudar aqui, cole a versão nova lá do mesmo jeito.
3. Em cada aba: Arquivo › Compartilhar › Publicar na Web › escolha a aba › Valores separados por vírgula (.csv) › Publicar.
4. Cole cada link em `planilha`, no `config.js`, e ligue a seção em `secoes`.

A planilha publicada fica pública, então só pode ter o que pode aparecer no site. Uma avaliação só aparece com Exibir e Autorizado marcados como SIM.

**Vídeos.** A aba tem as colunas Número, Título, Link do YouTube, Descrição e Fixo.

- Quando um link é colado, o script preenche o Número com o maior número + 1. Ele nunca muda, e é ele que diz qual vídeo é o mais novo.
- A coluna Fixo é uma lista com os nomes de `videosFixos`. De cada vaga só aparece o vídeo de maior Número; os mais antigos da mesma vaga ficam guardados na planilha. Para trocar o vídeo de uma vaga, basta escolher a mesma vaga no vídeo novo.
- O site mostra primeiro as vagas fixas, na ordem de `videosFixos`, e completa com os mais novos sem vaga até o `limiteVideos`. Os outros ficam guardados na planilha.
- Linha sem Número (se o script não rodar) usa a posição da linha no lugar dele. A descrição aparece cortada em 3 linhas.

## Publicar uma mudança

Cada push na branch `main` publica o site no GitHub Pages em 1 a 2 minutos:

```
git pull
git add .
git commit -m "descrição da mudança"
git push
```

Se a mudança não aparecer, é cache do navegador: Ctrl+F5 ou janela anônima.

## Domínio e serviços

- **Domínio:** `dayara.adv.br`, no Registro.br, com 4 registros A e um CNAME `www` apontando para o GitHub Pages. HTTPS obrigatório (Enforce HTTPS).
- **E-mail:** Zoho Mail, com SPF, DKIM e DMARC na zona DNS.
- **Estatísticas:** Cloudflare Web Analytics, sem cookies.
- **Buscas:** Google Search Console, com o `sitemap.xml` enviado. Página nova no site entra também no `sitemap.xml`.

A zona DNS também guarda os registros de verificação do GitHub, do Zoho e do Google. Eles não podem ser apagados, senão o serviço perde a verificação.

## Cuidados

- O repositório é público. O `.gitignore` bloqueia planilhas, PDFs, documentos, `.env`, zips e as pastas `privado/`, `originais/`, `rascunhos/`, `backup/` e `clientes/`. Mesmo assim, confira a lista de arquivos antes de cada commit.
- Os textos seguem o Provimento 205/2021 da OAB: nada de "especialista" sem título, expressões persuasivas, preços ou resultados de processos.

## Autoria e licença

Desenvolvido por Diego ([github.com/diego-dba](https://github.com/diego-dba)). Versão 1.0, outubro de 2026.
Sugestões e correções podem ser enviadas como issue neste repositório.

O código está visível, mas não tem licença de uso aberta: não pode ser copiado ou reutilizado sem autorização.
Textos, fotos e logo pertencem à cliente.
As fontes Montserrat e Cormorant Garamond têm licença SIL Open Font License (arquivos em `assets/fonts/`).
