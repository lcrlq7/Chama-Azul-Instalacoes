import { site } from '../site.config';
import { fotoPorId } from '../lib/fotos';
import { Foto } from '../components/Foto';
import { Icone } from '../components/Icone';

export function Sobre() {
  const foto = fotoPorId('tecnico-atendimento');
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="secao bg-nevoa">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <span className="detalhe-laranja" aria-hidden="true" />
          <h2 id="sobre-titulo" className="titulo-secao">
            Por que a Chama Azul
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-suave">
            A {site.nome} tem base em {site.cidadeBase} e atende {site.areaAtendimento}, com o
            responsável técnico {site.responsavelTecnico} à frente de cada serviço. O mesmo CNPJ
            atende também a {site.marcaIrma}.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {site.diferenciais.map((d) => (
              <li key={d.titulo} className="rounded-lg bg-white p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-marinho text-white">
                  <Icone nome={d.icone} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg">{d.titulo}</h3>
                <p className="mt-2 text-suave">{d.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
        <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md lg:mt-16">
          <Foto
            foto={foto}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 24rem, 100vw"
            className="aspect-[4/5] h-auto w-full object-cover object-top"
          />
          <figcaption className="px-4 py-3 text-sm text-suave">{foto.legenda}</figcaption>
        </figure>
      </div>
    </section>
  );
}
