import { site } from '../site.config';
import { Icone } from '../components/Icone';
import { Secao } from '../components/Secao';

export function AreaAtendimento() {
  return (
    <Secao
      id="area-atendimento"
      titulo="Área de atendimento"
      intro={`Base em ${site.cidadeBase}, ${site.estado}, com atendimento em ${site.areaAtendimento}.`}
      fundo="creme"
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-marinho px-5 py-2.5 font-semibold text-white">
        <Icone nome="mapa" className="h-5 w-5 text-laranja" />
        Todo o estado do {site.estadoNome}
      </p>
      <h3 className="mt-8 font-sans text-base font-semibold text-suave">
        Base em {site.cidadeBase} e cidades próximas
      </h3>
      <ul className="mt-3 flex flex-wrap gap-3">
        {site.cidadesAtendidas.map((c) => (
          <li
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-borda bg-white px-4 py-2 font-medium text-marinho"
          >
            <Icone nome="mapa" className="h-5 w-5 text-azul" />
            {c}
          </li>
        ))}
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
