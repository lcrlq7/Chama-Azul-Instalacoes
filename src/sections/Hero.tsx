import { Link } from 'react-router-dom';
import { site } from '../site.config';
import { whatsappLink } from '../lib/contato';
import { fotoPorId } from '../lib/fotos';
import { Foto } from '../components/Foto';
import { Icone } from '../components/Icone';

export function Hero() {
  const foto = fotoPorId('rede-pex-recorte-laje');
  return (
    <section aria-labelledby="hero-titulo" className="bg-creme pb-14 pt-24 sm:pt-28 lg:pb-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="detalhe-laranja" aria-hidden="true" />
          <h1 id="hero-titulo" className="text-[2rem] leading-tight sm:text-5xl">
            {site.hero.titulo}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-suave">{site.hero.subtitulo}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-acao">
              <Icone nome="whatsapp" className="h-5 w-5" />
              Pedir orçamento no WhatsApp
            </a>
            <Link to="/servicos" className="btn-contorno">
              Ver serviços
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Compromissos">
            {site.hero.selos.map((selo) => (
              <li
                key={selo}
                className="flex items-start gap-2 text-[0.95rem] font-medium text-marinho"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marinho text-white">
                  <Icone nome="check" className="h-4 w-4" />
                </span>
                {selo}
              </li>
            ))}
          </ul>
        </div>
        <figure className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5">
          <Foto
            foto={foto}
            prioridade
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover"
          />
          <figcaption className="bg-marinho px-4 py-2 text-sm text-white/90">
            {foto.legenda}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
