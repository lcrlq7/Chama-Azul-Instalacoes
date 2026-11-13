import { useId, useState } from 'react';
import { site } from '../site.config';
import { Icone } from '../components/Icone';
import { Secao } from '../components/Secao';

export function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0);
  const id = useId();
  return (
    <Secao id="perguntas" titulo="Perguntas frequentes">
      <div className="max-w-3xl divide-y divide-borda rounded-lg border border-borda bg-white">
        {site.perguntas.map((p, i) => {
          const aberto = aberta === i;
          return (
            <div key={p.pergunta}>
              <h3 className="font-sans text-base">
                <button
                  type="button"
                  id={`${id}-p${i}`}
                  aria-expanded={aberto}
                  aria-controls={`${id}-r${i}`}
                  onClick={() => setAberta(aberto ? null : i)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-marinho hover:bg-nevoa"
                >
                  {p.pergunta}
                  <Icone
                    nome="mais"
                    className={`h-5 w-5 shrink-0 text-azul transition-transform ${aberto ? 'rotate-45' : ''}`}
                  />
                </button>
              </h3>
              <div
                id={`${id}-r${i}`}
                role="region"
                aria-labelledby={`${id}-p${i}`}
                hidden={!aberto}
                className="px-5 pb-5 text-suave"
              >
                {p.resposta}
              </div>
            </div>
          );
        })}
      </div>
    </Secao>
  );
}
