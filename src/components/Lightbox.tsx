import { useCallback, useEffect, useRef } from 'react';
import type { Foto as FotoTipo } from '../lib/fotos';
import { Foto } from './Foto';
import { Icone } from './Icone';

interface Props {
  fotos: FotoTipo[];
  indice: number;
  aoMudar: (indice: number) => void;
  aoFechar: () => void;
}

/** Visualizador de fotos ampliadas: setas, teclado (←, →, Esc) e deslizar no celular. */
export function Lightbox({ fotos, indice, aoMudar, aoFechar }: Props) {
  const dialogoRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const toqueX = useRef<number | null>(null);
  const foto = fotos[indice];
  const total = fotos.length;

  const anterior = useCallback(
    () => aoMudar((indice - 1 + total) % total),
    [indice, total, aoMudar],
  );
  const proxima = useCallback(() => aoMudar((indice + 1) % total), [indice, total, aoMudar]);

  useEffect(() => {
    const focoAnterior = document.activeElement as HTMLElement | null;
    fecharRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      focoAnterior?.focus();
    };
  }, []);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
      else if (e.key === 'ArrowLeft') anterior();
      else if (e.key === 'ArrowRight') proxima();
      else if (e.key === 'Tab') {
        // Mantém o foco dentro do visualizador.
        const focaveis = dialogoRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focaveis || focaveis.length === 0) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [anterior, proxima, aoFechar]);

  return (
    <div
      ref={dialogoRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${indice + 1} de ${total}: ${foto.legenda}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
      onTouchStart={(e) => (toqueX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toqueX.current === null) return;
        const dx = e.changedTouches[0].clientX - toqueX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? anterior : proxima)();
        toqueX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm" aria-live="polite">
          {indice + 1} / {total}
        </p>
        <button
          ref={fecharRef}
          type="button"
          onClick={aoFechar}
          aria-label="Fechar foto ampliada"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/15"
        >
          <Icone nome="fechar" className="h-7 w-7" />
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
        onClick={(e) => {
          if (e.target === e.currentTarget) aoFechar();
        }}
      >
        <Foto
          key={foto.id}
          foto={foto}
          prioridade
          sizes="100vw"
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
        <button
          type="button"
          onClick={anterior}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-white/20 sm:left-4"
        >
          <Icone nome="esquerda" className="h-7 w-7" />
        </button>
        <button
          type="button"
          onClick={proxima}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-white/20 sm:right-4"
        >
          <Icone nome="direita" className="h-7 w-7" />
        </button>
      </div>
      <p className="px-4 pb-6 pt-3 text-center text-base">{foto.legenda}</p>
    </div>
  );
}
