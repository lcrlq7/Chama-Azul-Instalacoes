// Gera as fotos otimizadas do site a partir de fotos-originais/.
// Uso: npm run fotos
// Para adicionar uma foto: coloque o .jpg em fotos-originais/, inclua um item em
// src/data/fotos.json (id, origem, recorte, legenda, alt) e rode este script.
// "recorte" = [esquerda, topo, direita, base] em frações (0 a 1) da imagem original;
// use-o para tirar marca d'água, pichações ou fundos que atrapalham.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const origemDir = path.join(raiz, 'fotos-originais');
const destinoDir = path.join(raiz, 'public', 'fotos');
const larguras = [480, 800, 1200, 1600];

const fotos = JSON.parse(await fs.readFile(path.join(raiz, 'src/data/fotos.json'), 'utf8'));
await fs.rm(destinoDir, { recursive: true, force: true });
await fs.mkdir(destinoDir, { recursive: true });

const dimensoes = {};
for (const foto of fotos) {
  const arquivo = path.join(origemDir, foto.origem);
  const meta = await sharp(arquivo).rotate().metadata();
  const [e, t, d, b] = foto.recorte;
  const area = {
    left: Math.round(e * meta.width),
    top: Math.round(t * meta.height),
    width: Math.round((d - e) * meta.width),
    height: Math.round((b - t) * meta.height),
  };
  // Nunca amplia: usa só as larguras menores que a foto recortada, mais a largura real dela.
  const usadas = larguras.filter((l) => l < area.width);
  usadas.push(area.width);
  for (const l of usadas) {
    const base = sharp(arquivo).rotate().extract(area).resize({ width: l });
    await base
      .clone()
      .webp({ quality: 74 })
      .toFile(path.join(destinoDir, `${foto.id}-${l}.webp`));
    await base
      .clone()
      .avif({ quality: 52 })
      .toFile(path.join(destinoDir, `${foto.id}-${l}.avif`));
  }
  dimensoes[foto.id] = { largura: area.width, altura: area.height, larguras: usadas };
  console.log(`${foto.id}: ${area.width}x${area.height} -> ${usadas.join(', ')}`);
}
await fs.writeFile(
  path.join(raiz, 'src/data/fotos-dimensoes.json'),
  JSON.stringify(dimensoes, null, 2) + '\n',
);
