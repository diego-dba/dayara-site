# Site da Dra. Dayara Alves

Esse é o site que eu fiz pra Dra. Dayara Alves, advogada em Ribeirão Preto/SP.
Fiz com HTML, CSS e JavaScript, sem framework, e ele fica no GitHub Pages, então não tem mensalidade de hospedagem.
Se um dia eu quiser levar pra outra hospedagem, tipo a Hostinger, é só copiar os arquivos.

## Onde eu mexo

- **textos, telefone, OAB, foto, áreas e o que aparece ou não:** `config.js`. É o arquivo que eu mais uso, deixei tudo lá pra não ter que mexer no HTML.
- **avisos, vídeos e avaliações:** na planilha do Google, nas abas publicadas em CSV.
- **cores e tamanho dos textos:** `assets/css/site.css`, no começo do arquivo. Pra mudar o tamanho de todos os textos de uma vez eu mudo só o `--escala`.
- **logo, ícones e foto:** pasta `assets/img/`.
- **política de privacidade:** `politica-de-privacidade.html`.

## Modo rascunho

Enquanto o `modoRascunho` estiver `true` no `config.js`, aparece uma faixa amarela no topo e o que falta preencher aparece como `[PREENCHER]`.
Antes de divulgar eu troco pra `false`, aí os campos vazios somem do site.

## Foto da cliente

Quando a foto chegar:

1. deixo ela em pé, em JPG, com até uns 300 KB (dá pra reduzir no https://squoosh.app)
2. salvo como `assets/img/foto-dayara.jpg`
3. no `config.js` coloco `foto: "assets/img/foto-dayara.jpg",`

## Logo

Quando chegar o arquivo original da logo, eu troco o `logo-dayara-alves.webp` e o `logo-dayara-alves.png` da pasta `assets/img/`, com os mesmos nomes.
Aí também preciso refazer os ícones da aba (favicon) e a imagem que aparece quando compartilham o link (`og-image.jpg`).

## Planilha: avisos, vídeos e avaliações

1. subo o `painel-site-dayara.xlsx` no Google Drive e salvo como Planilhas Google (Arquivo › Salvar como Planilhas Google)
2. em Arquivo › Configurações, deixo a localidade como Brasil
3. em cada aba (Avisos, Vídeos e Avaliações): Arquivo › Compartilhar › Publicar na Web › escolho a aba › Valores separados por vírgula (.csv) › Publicar, e copio o link
4. colo cada link no `config.js`, dentro de `planilha`
5. ligo as seções em `secoes` (`videos: true`, `avaliacoes: true`) quando tiver conteúdo

A planilha publicada fica pública, então lá eu só coloco o que pode aparecer no site.
Depois que eu mexo na planilha, o site mostra a mudança em alguns minutos.

## Publicar mudanças (terminal do VS Code)

```
git add .
git commit -m "o que eu mudei"
git push
```

Antes do commit eu confiro no painel de controle do código-fonte do VS Code quais arquivos mudaram.
Se a mudança não aparecer no site, é cache: Ctrl+F5 ou aba anônima.

## Domínio dayara.adv.br

No Registro.br, como contato técnico, em DNS › Configurar zona DNS, eu crio:

- 4 registros **A** pro próprio domínio: 185.199.108.153, 185.199.109.153, 185.199.110.153 e 185.199.111.153
- 1 registro **CNAME** com o nome `www` apontando pra `diego-dba.github.io`
- 1 registro **TXT** com o nome `_github-pages-challenge-diego-dba`, que o GitHub usa pra confirmar que o domínio é meu

No GitHub, em Settings › Pages › Custom domain, coloco `dayara.adv.br` e salvo. Quando o GitHub liberar, marco **Enforce HTTPS**.
O arquivo `CNAME` na raiz do projeto é o GitHub que cria quando eu salvo o domínio. Não posso apagar, senão o site sai do dayara.adv.br.
O Registro.br não tem botão de editar: pra mudar uma entrada eu apago no X, crio de novo e clico em **Salvar alterações**.

## E-mail (Zoho Mail)

O e-mail do domínio fica no Zoho Mail, no plano grátis (até 5 contas, sem IMAP/POP, então é pelo site do Zoho ou pelo app).

- `contato@dayara.adv.br`: e-mail da cliente, que aparece no contato do site. A senha é só dela.
- `privacidade@dayara.adv.br`: e-mail dos pedidos da LGPD, que aparece na política de privacidade. Quem cuida sou eu.

Na zona DNS do Registro.br ficam também os registros do e-mail. Se um dia eu mexer no DNS, não posso apagar esses:

- 3 registros **MX** pro próprio domínio: `mx.zoho.com` (prioridade 10), `mx2.zoho.com` (20) e `mx3.zoho.com` (50)
- **TXT** do SPF pro próprio domínio: `v=spf1 include:zohomail.com ~all`
- **TXT** do DKIM com o nome `zmail._domainkey` (a chave fica no painel do Zoho, em DNS Mapping)
- **TXT** do DMARC com o nome `_dmarc`: `v=DMARC1; p=quarantine`
- **TXT** `zoho-verification=...` pro próprio domínio, que o Zoho usou pra confirmar que o domínio é nosso

Pra conferir se está tudo certo, mando um e-mail pro meu Gmail e abro **Mostrar original**: SPF, DKIM e DMARC têm que estar com PASS.

## O que nunca vai pro GitHub

O repositório é público. O `.gitignore` bloqueia planilhas, PDFs, documentos, arquivos `.env`, zips e as pastas `privado/`, `originais/`, `rascunhos/`, `backup/` e `clientes/`.
Mesmo assim, antes de cada commit eu confiro a lista de arquivos no VS Code.

## Antes de divulgar

Fiz tudo isso antes de lançar o site, em outubro de 2026. Deixei aqui pra lembrar se um dia eu voltar pro rascunho:

- a cliente revisa os textos do `config.js`: a frase principal, os passos do atendimento e o aviso contra golpes
- a cliente revisa a política de privacidade
- nas áreas de atuação, só posso usar a palavra "especialista" se ela tiver o título (regra da OAB)
- troco o `modoRascunho` pra `false`

## Fontes

Montserrat e Cormorant Garamond, com licença SIL Open Font License (os arquivos estão em `assets/fonts/`).
