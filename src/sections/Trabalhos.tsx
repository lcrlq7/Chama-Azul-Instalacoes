import { useState } from 'react';
import { fotosGaleria } from '../lib/fotos';
import { Foto } from '../components/Foto';
import { Lightbox } from '../components/Lightbox';
import { Secao } from '../components/Secao';

export function Trabalhos() {
  const [aberta, setAberta] = useState<number | null>(null);
  return (
    <Secao
      id="trabalhos"
      titulo="Nossos trabalhos"
      intro="Fotos de obras e instalações feitas pela equipe. Toque em uma foto para ampliar."
    >
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {fotosGaleria.map((f, i) => (
          <li key={f.id}>
            <button
              type="button"
              onClick={() => setAberta(i)}
              className="group block w-full overflow-hidden rounded-md bg-nevoa text-left"
              aria-label={`Ampliar foto: ${f.legenda}`}
            >
              <Foto
                foto={f}
                sizes="(min-width: 1024px) 18rem, (min-width: 768px) 33vw, 50vw"
                className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      {aberta !== null ? (
        <Lightbox
          fotos={fotosGaleria}
          indice={aberta}
          aoMudar={setAberta}
          aoFechar={() => setAberta(null)}
        />
      ) : null}
    </Secao>
  );
}
