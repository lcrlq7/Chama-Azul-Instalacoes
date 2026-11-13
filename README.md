# Site da Chama Azul Instalações

Site institucional da **Chama Azul Instalações** (Volta Redonda, RJ): redes de gás, hidráulica em
multicamadas, boiler, aquecimento e fogões. Página única com serviços, galeria de trabalhos,
orçamento rápido pelo WhatsApp, perguntas frequentes e contato, mais as páginas de Política de
Privacidade e 404.

Feito com Vite + React + TypeScript + Tailwind CSS. É um site estático: não tem servidor nem banco
de dados. O formulário de orçamento só monta a mensagem e abre o WhatsApp.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm i
```

```bash
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Outros comandos:

| Comando           | O que faz                                           |
| ----------------- | --------------------------------------------------- |
| `npm run build`   | Gera o site pronto em `dist/`                       |
| `npm run preview` | Abre o site gerado em `dist/` para conferir         |
| `npm run lint`    | Confere o código (ESLint) e a formatação (Prettier) |
| `npm run format`  | Corrige a formatação automaticamente                |
| `npm run fotos`   | Reprocessa as fotos e os ícones (ver abaixo)        |

## Trocar telefone, Instagram, textos

Tudo fica em **um único arquivo: `src/site.config.ts`**. Lá estão:

- telefone, número do WhatsApp (`whatsappNumero`, só números com 55 + DDD), e-mail e Instagram;
- cidades atendidas e link do Google Maps (`googleMapsUrl`);
- título e subtítulo do topo, serviços, diferenciais, passos de "Como funciona" e perguntas
  frequentes;
- mensagens prontas do WhatsApp;
- **depoimentos**: a seção só aparece quando houver itens na lista `depoimentos`. Use apenas
  depoimentos reais, com autorização do cliente;
- `urlSite`: o endereço público do site (troque quando tiver domínio próprio).

Depois de editar, salve, confira com `npm run dev` e publique (veja "Publicar").

## Adicionar fotos novas

1. Coloque o arquivo `.jpg` na pasta `fotos-originais/` (ela não vai para o GitHub, guarde uma cópia).
2. Em `src/data/fotos.json`, adicione um item:
   ```json
   {
     "id": "nome-curto-sem-espaco",
     "origem": "foto-30.jpg",
     "recorte": [0, 0, 1, 0.9],
     "categoria": "Gás",
     "legenda": "Texto que aparece na foto ampliada",
     "alt": "Descrição da foto para quem usa leitor de tela"
   }
   ```
   `recorte` é `[esquerda, topo, direita, base]` em frações da foto (0 a 1). Exemplo: `0.9` na
   base corta os 10% de baixo, útil para tirar a marca d'água do celular.
3. Rode `npm run fotos`. As versões otimizadas (AVIF e WebP em vários tamanhos) vão para
   `public/fotos/`.
4. Confira com `npm run dev` e publique.

Para trocar o logo, substitua `fotos-originais/logo.jpg` (quadrado) e rode `npm run fotos`. O
símbolo pequeno do topo e o favicon são vetores em `src/components/Logo.tsx` e
`public/favicon.svg`.

## Publicar

O site é publicado automaticamente no **GitHub Pages** a cada envio (`git push`) para a branch
`main`, pelo GitHub Actions (`.github/workflows/deploy.yml`). Escolhemos o GitHub Pages porque é
gratuito, fica no mesmo lugar do código e não precisa de outra conta.

Na primeira vez, é preciso ligar o Pages no repositório:

1. No GitHub, abra o repositório, **Settings > Pages**.
2. Em **Build and deployment > Source**, escolha **GitHub Actions**.
3. Abra a aba **Actions** e rode de novo o fluxo "Publicar no GitHub Pages" (ou faça um novo push).

O endereço fica `https://lcrlq7.github.io/Chama-Azul-Instalacoes/`.

> Repositório privado: o GitHub Pages em repositório privado exige plano pago (GitHub Pro ou
> Team). No plano gratuito, deixe o repositório público ou publique na Vercel/Netlify
> (importe o repositório, comando de build `npm run build`, pasta `dist`).

Para editar pelo próprio site do GitHub: abra `src/site.config.ts`, clique no lápis, altere e
clique em **Commit changes**. Em 1 a 2 minutos o site atualiza.

## Domínio próprio (ex.: chamaazul.com.br)

1. Compre o domínio (no Brasil, em [registro.br](https://registro.br)).
2. No GitHub: **Settings > Pages > Custom domain**, digite `chamaazul.com.br` e salve.
3. No painel de DNS do domínio (registro.br > DNS > "Editar zona"), crie:

   | Tipo  | Nome        | Valor               |
   | ----- | ----------- | ------------------- |
   | A     | (vazio / @) | 185.199.108.153     |
   | A     | (vazio / @) | 185.199.109.153     |
   | A     | (vazio / @) | 185.199.110.153     |
   | A     | (vazio / @) | 185.199.111.153     |
   | AAAA  | (vazio / @) | 2606:50c0:8000::153 |
   | AAAA  | (vazio / @) | 2606:50c0:8001::153 |
   | AAAA  | (vazio / @) | 2606:50c0:8002::153 |
   | AAAA  | (vazio / @) | 2606:50c0:8003::153 |
   | CNAME | www         | lcrlq7.github.io    |

4. Espere a propagação (de minutos a algumas horas). Depois marque **Enforce HTTPS** em
   Settings > Pages.
5. Em `src/site.config.ts`, troque `urlSite` para `'https://chamaazul.com.br/'` e publique.
   Não precisa mudar mais nada: o site usa caminhos relativos e funciona em qualquer endereço.

## Estrutura

```
src/
  site.config.ts   todos os textos, contatos e links
  components/      peças reutilizáveis (topo, rodapé, ícones, foto, lightbox...)
  sections/        seções da página inicial
  pages/           Início, Política de Privacidade, 404
  lib/             funções (link do WhatsApp, fotos, SEO)
  data/            lista das fotos (fotos.json) e tamanhos gerados
scripts/           otimização de fotos e geração de ícones
public/            fotos otimizadas, ícones, logo, imagem de compartilhamento
```

Endereços das seções usam `#/` (ex.: `.../#/servicos`), o que permite compartilhar o link direto
de uma seção.
