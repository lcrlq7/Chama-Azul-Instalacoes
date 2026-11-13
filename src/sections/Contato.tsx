import { site } from '../site.config';
import { emailHref, telefoneHref, whatsappLink } from '../lib/contato';
import { Icone } from '../components/Icone';
import { Secao } from '../components/Secao';

export function Contato() {
  const itens = [
    {
      icone: 'whatsapp' as const,
      rotulo: 'WhatsApp',
      valor: site.contato.telefoneExibicao,
      href: whatsappLink(),
      externo: true,
    },
    {
      icone: 'telefone' as const,
      rotulo: 'Telefone',
      valor: site.contato.telefoneExibicao,
      href: telefoneHref,
    },
    { icone: 'email' as const, rotulo: 'E-mail', valor: site.contato.email, href: emailHref },
    {
      icone: 'instagram' as const,
      rotulo: 'Instagram',
      valor: `@${site.contato.instagramUsuario}`,
      href: site.contato.instagramUrl,
      externo: true,
    },
  ];
  return (
    <Secao id="contato" titulo="Contato" fundo="nevoa">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {itens.map((i) => (
            <li key={i.rotulo}>
              <a
                href={i.href}
                {...(i.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full items-center gap-4 rounded-lg bg-white p-5 shadow-sm hover:ring-2 hover:ring-azul"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-marinho text-white">
                  <Icone nome={i.icone} className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-suave">{i.rotulo}</span>
                  <span className="block break-words font-semibold text-marinho">{i.valor}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="rounded-lg bg-marinho p-6 text-white">
          <img
            src={`${import.meta.env.BASE_URL}logo-chama-azul.webp`}
            alt="Logo da Chama Azul Instalações"
            width={480}
            height={480}
            loading="lazy"
            className="mx-auto h-40 w-40 rounded-md"
          />
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-white/70">Responsável técnico</dt>
              <dd className="font-semibold">{site.responsavelTecnico}</dd>
            </div>
            <div>
              <dt className="text-white/70">CNPJ</dt>
              <dd className="font-semibold">{site.cnpj}</dd>
            </div>
            <div>
              <dt className="text-white/70">Cidade</dt>
              <dd className="font-semibold">
                {site.cidadeBase}, {site.estado}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Secao>
  );
}
