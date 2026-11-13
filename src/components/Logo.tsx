import { site } from '../site.config';

// Traçado do logo oficial (arco azul-claro + chama vazada), em vetor para ficar nítido em tamanho pequeno.
export const LOGO_ARCO = 'M858 292A405 405 0 1 0 858 788';
export const LOGO_CHAMA =
  'M540 310C580 370 628 420 628 475C628 535 588 575 540 575C492 575 452 535 452 475C452 435 475 405 498 388C500 410 515 432 538 440C522 400 525 350 540 310Z';

/** Símbolo da marca, sobre fundo azul-marinho do logo. */
export function SimboloMarca({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg
      viewBox="80 80 920 920"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="80" y="80" width="920" height="920" rx="200" fill="#0B1B34" />
      <path d={LOGO_ARCO} fill="none" stroke="#6CCCFF" strokeWidth="44" strokeLinecap="round" />
      <path d={LOGO_CHAMA} fill="none" stroke="#FFFFFF" strokeWidth="36" strokeLinejoin="round" />
    </svg>
  );
}

interface Props {
  claro?: boolean;
  className?: string;
}

/** Logotipo horizontal: símbolo + "CHAMA AZUL / INSTALAÇÕES", como no logo oficial. */
export function Logo({ claro = false, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SimboloMarca />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span
          className={`font-serif text-lg uppercase tracking-[0.12em] sm:text-xl ${claro ? 'text-white' : 'text-marinho'}`}
        >
          Chama Azul
        </span>
        <span
          className={`mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.34em] ${claro ? 'text-[#6CCCFF]' : 'text-azul'}`}
        >
          Instalações
        </span>
      </span>
      <span className="sr-only">{site.nome}</span>
    </span>
  );
}
