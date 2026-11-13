import type { IconeNome } from '../site.config';

type Nome =
  | IconeNome
  | 'whatsapp'
  | 'telefone'
  | 'email'
  | 'instagram'
  | 'mapa'
  | 'menu'
  | 'fechar'
  | 'esquerda'
  | 'direita'
  | 'check'
  | 'mais'
  | 'documentoCnpj';

const caminhos: Record<Nome, string> = {
  chama:
    'M12 3c.6 3 4.5 5.2 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.3-4.6.1 1.8.9 3 2.2 3.4-.4-2.8-.6-5.3 0-8.3z',
  tubos: 'M3 6h9a6 6 0 0 1 6 6v9M3 10h9a2 2 0 0 1 2 2v9M3 4v8M12 21h8',
  boiler:
    'M8 3h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 19v2M15 19v2M12 8.5v3.5M10 7h4',
  fogao:
    'M4 5h16v15H4zM4 10h16M8.5 15a1.5 1.5 0 1 0 0 .01M15.5 15a1.5 1.5 0 1 0 0 .01M7 7.5h.01M10 7.5h.01',
  ferramenta:
    'M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.4 1.4 0 0 0 2 2l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.4 2.4-2-.5-.5-2z',
  predio: 'M4 21V5l8-2v18M12 8l8 2v11M3 21h18M7.5 8h1M7.5 12h1M7.5 16h1M15.5 13h1M15.5 17h1',
  documento: 'M7 3h7l5 5v13H7zM14 3v5h5M10 12h6M10 16h6',
  escudo: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4',
  qualidade: 'M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z',
  pessoa: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21a7.5 7.5 0 0 1 15 0',
  calendario: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  pagamento: 'M3 6h18v12H3zM3 10h18M7 15h3',
  whatsapp:
    'M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6zM9 8.5c0 3.3 3.2 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1-.4-2-1.4-2.4-2.4l.9-1-1-2z',
  telefone:
    'M5 4h3.5l1.5 4.5-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z',
  email: 'M3 6h18v12H3zM3 7l9 6 9-6',
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.3 6.7h.01',
  mapa: 'M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  fechar: 'M6 6l12 12M18 6L6 18',
  esquerda: 'M15 5l-7 7 7 7',
  direita: 'M9 5l7 7-7 7',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  mais: 'M12 5v14M5 12h14',
  documentoCnpj: 'M4 5h16v14H4zM8 9h8M8 13h5',
};

interface Props {
  nome: Nome;
  className?: string;
  /** Texto para leitores de tela. Sem ele, o ícone é decorativo. */
  titulo?: string;
}

export function Icone({ nome, className = 'h-6 w-6', titulo }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={titulo ? undefined : true}
      role={titulo ? 'img' : undefined}
      focusable="false"
    >
      {titulo ? <title>{titulo}</title> : null}
      <path d={caminhos[nome]} />
    </svg>
  );
}
