// Gera logo (SVG vetorizado e versões raster), favicon, ícones e a imagem de compartilhamento
// (Open Graph 1200x630) a partir de fotos-originais/logo.jpg, src/data/logo-vetor.json e de uma
// foto de obra. Uso: node scripts/gerar-icones.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const logo = path.join(raiz, 'fotos-originais/logo.jpg');
const pub = (f) => path.join(raiz, 'public', f);
const v = JSON.parse(await fs.readFile(path.join(raiz, 'src/data/logo-vetor.json'), 'utf8'));

// Cores medidas no logo original.
const COR_FUNDO = '#0B1B34';
const COR_ARCO = '#6CCCFF';
const COR_TEXTO_AZUL = '#6FCBFA';

// Logo oficial em vetor, fundo transparente (para o topo e o rodapé, que já são azul-marinho).
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 100 880 880" width="880" height="880" role="img" aria-label="Chama Azul Instalações">
<path d="${v.arco}" fill="none" stroke="${COR_ARCO}" stroke-width="${v.arcoLargura}" stroke-linecap="round"/>
<path d="${v.chamaContorno}" fill="#fff" fill-rule="evenodd"/>
<path d="${v.textoBranco}" fill="#fff" fill-rule="evenodd"/>
<path d="${v.textoAzul}" fill="${COR_TEXTO_AZUL}" fill-rule="evenodd"/>
</svg>
`;
await fs.writeFile(pub('logo-oficial.svg'), logoSvg);

// Favicon: arco e chama do logo (sem o texto, que viraria borrão em 16 px).
// A chama desce para o centro do arco e o traço engrossa um pouco para ler bem pequeno.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 100 880 880">
<rect x="100" y="100" width="880" height="880" rx="190" fill="${COR_FUNDO}"/>
<path d="${v.arco}" fill="none" stroke="${COR_ARCO}" stroke-width="46" stroke-linecap="round"/>
<g transform="translate(540 545) scale(1.28) translate(-540 -440)">
<path d="${v.chamaContorno}" fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
</g>
</svg>
`;
await fs.writeFile(pub('favicon.svg'), faviconSvg);
await sharp(Buffer.from(faviconSvg), { density: 300 })
  .resize(48)
  .png()
  .toFile(pub('favicon-48.png'));

await sharp(logo).resize(480).webp({ quality: 82 }).toFile(pub('logo-chama-azul.webp'));
await sharp(logo).resize(512).png().toFile(pub('logo-chama-azul.png'));
for (const t of [180, 192, 512]) {
  await sharp(logo)
    .resize(t)
    .png()
    .toFile(pub(t === 180 ? 'apple-touch-icon.png' : `icone-${t}.png`));
}

// Open Graph: logo à esquerda, foto de obra à direita, texto curto.
const foto = await sharp(path.join(raiz, 'fotos-originais/foto-11.jpg'))
  .resize(600, 630, { fit: 'cover' })
  .toBuffer();
const logoOg = await sharp(logo).resize(600, 600).toBuffer();
const faixa = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="630">
    <rect width="600" height="630" fill="#0B1B34" opacity="0.0"/>
    <rect x="0" y="560" width="600" height="70" fill="#0B1B34"/>
    <rect x="0" y="560" width="600" height="5" fill="#F4780B"/>
    <text x="24" y="604" font-family="Georgia, serif" font-size="22" fill="#ffffff">Gás e hidráulica em Volta Redonda e região</text>
  </svg>`,
);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0B1B34' } })
  .composite([
    { input: logoOg, left: 0, top: 15 },
    { input: foto, left: 600, top: 0 },
    { input: faixa, left: 600, top: 0 },
  ])
  .jpeg({ quality: 82 })
  .toFile(pub('og-chama-azul.jpg'));
console.log('ícones e imagem de compartilhamento gerados');
