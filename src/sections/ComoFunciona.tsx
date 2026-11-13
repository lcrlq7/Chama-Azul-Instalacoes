import { site } from '../site.config';
import { Secao } from '../components/Secao';

export function ComoFunciona() {
  return (
    <Secao id="como-funciona" titulo="Como funciona" fundo="creme">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {site.passos.map((p, i) => (
          <li key={p.titulo} className="relative rounded-lg border border-borda bg-white p-6">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-laranja font-serif text-lg font-bold text-marinho"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg">
              <span className="sr-only">Passo {i + 1}: </span>
              {p.titulo}
            </h3>
            <p className="mt-2 text-suave">{p.descricao}</p>
          </li>
        ))}
      </ol>
    </Secao>
  );
}
