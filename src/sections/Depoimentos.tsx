import { site } from '../site.config';
import { Secao } from '../components/Secao';

/** Só aparece se houver depoimentos reais em site.config.ts. */
export function Depoimentos() {
  if (site.depoimentos.length === 0) return null;
  return (
    <Secao id="depoimentos" titulo="O que dizem os clientes">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {site.depoimentos.map((d, i) => (
          <li key={i}>
            <figure className="h-full rounded-lg border border-borda bg-white p-6">
              <blockquote className="text-texto">“{d.texto}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-marinho">
                {d.nome}
                {d.cidade ? <span className="font-normal text-suave">, {d.cidade}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
