import { caminhoFoto, srcset, type Foto as FotoTipo } from '../lib/fotos';

interface Props {
  foto: FotoTipo;
  sizes: string;
  className?: string;
  prioridade?: boolean;
}

/** Foto responsiva (AVIF com WebP de reserva), com largura e altura definidas. */
export function Foto({ foto, sizes, className = '', prioridade = false }: Props) {
  const menor = foto.larguras.find((l) => l >= 800) ?? foto.larguras[foto.larguras.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(foto, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(foto, 'webp')} sizes={sizes} />
      <img
        src={caminhoFoto(foto.id, menor, 'webp')}
        alt={foto.alt}
        width={foto.largura}
        height={foto.altura}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding={prioridade ? 'sync' : 'async'}
        // @ts-expect-error atributo válido no HTML, ainda não tipado no React 18
        fetchpriority={prioridade ? 'high' : undefined}
        className={className}
      />
    </picture>
  );
}
