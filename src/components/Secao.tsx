import type { ReactNode } from 'react';

interface Props {
  id: string;
  titulo: string;
  intro?: string;
  fundo?: 'branco' | 'creme' | 'nevoa';
  children: ReactNode;
}

const fundos = { branco: 'bg-white', creme: 'bg-creme', nevoa: 'bg-nevoa' };

export function Secao({ id, titulo, intro, fundo = 'branco', children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`secao ${fundos[fundo]}`}>
      <div className="container-site">
        <span className="detalhe-laranja" aria-hidden="true" />
        <h2 id={`${id}-titulo`} className="titulo-secao">
          {titulo}
        </h2>
        {intro ? <p className="mt-3 max-w-2xl text-lg text-suave">{intro}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
