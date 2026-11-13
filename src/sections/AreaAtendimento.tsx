import { site } from '../site.config';
import { Icone } from '../components/Icone';
import { Secao } from '../components/Secao';

export function AreaAtendimento() {
  return (
    <Secao
      id="area-atendimento"
      titulo="Área de atendimento"
      intro={`Base em ${site.cidadeBase}, ${site.estado}. Atendemos também as cidades abaixo e a região do ${site.regiao}.`}
      fundo="creme"
    >
      <ul className="flex flex-wrap gap-3">
        {site.cidadesAtendidas.map((c) => (
          <li
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-borda bg-white px-4 py-2 font-medium text-marinho"
          >
            <Icone nome="mapa" className="h-5 w-5 text-azul" />
            {c}
          </li>
        ))}
        <li className="inline-flex items-center rounded-full border border-dashed border-borda px-4 py-2 text-suave">
          e região do {site.regiao}
        </li>
      </ul>
      <a
        href={site.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-contorno mt-8"
      >
        <Icone nome="mapa" className="h-5 w-5" />
        Abrir no Google Maps
      </a>
    </Secao>
  );
}
