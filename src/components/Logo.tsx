import { site } from '../site.config';

interface Props {
  /** Tamanho em pixels (o logo é quadrado). */
  tamanho?: number;
  className?: string;
}

/**
 * Logo oficial da Chama Azul Instalações, idêntico ao arquivo original (vetorizado em
 * public/logo-oficial.svg, fundo transparente). Usar sobre o azul-marinho do topo e do rodapé.
 */
export function Logo({ tamanho = 60, className = '' }: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-oficial.svg`}
      alt={site.nome}
      width={tamanho}
      height={tamanho}
      decoding="async"
      className={`block shrink-0 ${className}`}
      style={{ width: tamanho, height: tamanho }}
    />
  );
}
