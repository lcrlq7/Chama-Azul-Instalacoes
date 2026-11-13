// Gera logo otimizado, ícones e a imagem de compartilhamento (Open Graph 1200x630)
// a partir de fotos-originais/logo.jpg e de uma foto de obra. Uso: node scripts/gerar-icones.mjs
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const logo = path.join(raiz, 'fotos-originais/logo.jpg');
const pub = (f) => path.join(raiz, 'public', f);

await sharp(logo).resize(480).webp({ quality: 82 }).toFile(pub('logo-chama-azul.webp'));
await sharp(logo).resize(512).png().toFile(pub('logo-chama-azul.png'));
for (const t of [180, 192, 512]) {
  await sharp(logo)
    .resize(t)
    .png()
    .toFile(pub(t === 180 ? 'apple-touch-icon.png' : `icone-${t}.png`));
}
await sharp(logo).resize(48).png().toFile(pub('favicon-48.png'));

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
