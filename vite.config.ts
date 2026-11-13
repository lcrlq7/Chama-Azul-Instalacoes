import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/site.config';
import logoVetor from './src/data/logo-vetor.json';

const titulo = site.seo.titulo;
const descricao = site.seo.descricao;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Plumber'],
  name: site.nome,
  url: site.urlSite,
  logo: `${site.urlSite}logo-chama-azul.png`,
  image: `${site.urlSite}og-chama-azul.jpg`,
  telephone: site.contato.telefoneLink,
  email: site.contato.email,
  taxID: site.cnpj,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.cidadeBase,
    addressRegion: site.estado,
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'State', name: site.estadoNome },
    ...site.cidadesAtendidas.map((c) => ({ '@type': 'City', name: c })),
  ],
  sameAs: [site.contato.instagramUrl],
  employee: { '@type': 'Person', name: site.responsavelTecnico, jobTitle: 'Responsável técnico' },
  knowsAbout: site.servicos.map((s) => s.titulo),
};

/** Preenche o index.html e gera sitemap.xml, robots.txt, manifest e 404.html a partir do site.config.ts. */
function seoDoConfig(): Plugin {
  return {
    name: 'seo-do-config',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const troca: Record<string, string> = {
          TITULO: titulo,
          DESCRICAO: descricao,
          URL: site.urlSite,
          NOME: site.nome,
          TELEFONE: site.contato.telefoneExibicao,
          EMAIL: site.contato.email,
          // Formas do logo oficial usadas na abertura animada.
          LOGOARCO: logoVetor.arco,
          LOGOARCOLARGURA: String(logoVetor.arcoLargura),
          LOGOARCOTRACO: String(Math.ceil(logoVetor.arcoComprimento) + 4),
          LOGOSILHUETA: logoVetor.chamaSilhueta,
          LOGOCONTORNO: logoVetor.chamaContorno,
          LOGOTEXTOBRANCO: logoVetor.textoBranco,
          LOGOTEXTOAZUL: logoVetor.textoAzul,
          JSONLD: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        };
        return html.replace(/%([A-Z]+)%/g, (m, k: string) => troca[k] ?? m);
      },
    },
    generateBundle() {
      const hoje = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site.urlSite}</loc><lastmod>${hoje}</lastmod></url>\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.urlSite}sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.webmanifest',
        source: JSON.stringify(
          {
            name: site.nome,
            short_name: 'Chama Azul',
            lang: 'pt-BR',
            start_url: './',
            display: 'browser',
            background_color: '#FDF8F2',
            theme_color: '#0D2B4E',
            icons: [
              { src: 'icone-192.png', sizes: '192x192', type: 'image/png' },
              { src: 'icone-512.png', sizes: '512x512', type: 'image/png' },
            ],
          },
          null,
          2,
        ),
      });
      // GitHub Pages mostra este arquivo para endereços inexistentes; ele leva à página 404 do site.
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página não encontrada | ${site.nome}</title>
<script>var p=location.pathname.split('/');var b=location.hostname.endsWith('github.io')&&p[1]?'/'+p[1]+'/':'/';location.replace(b+'#/pagina-nao-encontrada');</script>
</head><body style="font-family:system-ui;padding:2rem"><h1>Página não encontrada</h1><p><a href="/">Ir para a página inicial</a></p></body></html>\n`,
      });
    },
  };
}

// base relativa ('./') + HashRouter: o mesmo build funciona no GitHub Pages
// (https://usuario.github.io/nome-do-repo/) e em domínio próprio, sem ajustes.
export default defineConfig({
  base: './',
  plugins: [react(), seoDoConfig()],
});
