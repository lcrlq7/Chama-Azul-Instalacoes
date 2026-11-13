import lista from '../data/fotos.json';
import dimensoes from '../data/fotos-dimensoes.json';

export interface Foto {
  id: string;
  legenda: string;
  alt: string;
  categoria: string;
  largura: number;
  altura: number;
  larguras: number[];
  /** false = não aparece na galeria (usada em outra seção). */
  galeria: boolean;
}

const dims = dimensoes as Record<string, { largura: number; altura: number; larguras: number[] }>;

export const fotos: Foto[] = lista.map((f) => ({
  id: f.id,
  legenda: f.legenda,
  alt: f.alt,
  categoria: f.categoria,
  galeria: (f as { galeria?: boolean }).galeria !== false,
  ...dims[f.id],
}));

export function fotoPorId(id: string): Foto {
  const foto = fotos.find((f) => f.id === id);
  if (!foto) throw new Error(`Foto não encontrada: ${id}`);
  return foto;
}

export function caminhoFoto(id: string, largura: number, formato: 'webp' | 'avif'): string {
  return `${import.meta.env.BASE_URL}fotos/${id}-${largura}.${formato}`;
}

export function srcset(foto: Foto, formato: 'webp' | 'avif'): string {
  return foto.larguras.map((l) => `${caminhoFoto(foto.id, l, formato)} ${l}w`).join(', ');
}

export const fotosGaleria = fotos.filter((f) => f.galeria);
