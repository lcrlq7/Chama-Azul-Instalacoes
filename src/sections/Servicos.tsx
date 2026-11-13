import { site } from '../site.config';
import { whatsappLink } from '../lib/contato';
import { Icone } from '../components/Icone';
import { Secao } from '../components/Secao';

export function Servicos() {
  return (
    <Secao
      id="servicos"
      titulo="Serviços"
      intro="Instalação e manutenção para residências, condomínios, clínicas, hospitais e comércio."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.servicos.map((s) => (
          <li
            key={s.id}
            className="flex flex-col rounded-lg border border-borda bg-white p-6 shadow-sm"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-nevoa text-azul">
              <Icone nome={s.icone} className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-xl">{s.titulo}</h3>
            <p className="mt-2 flex-1 text-suave">{s.descricao}</p>
            <a
              href={whatsappLink(site.mensagens.servico(s.titulo))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-semibold text-azul underline-offset-4 hover:underline"
              aria-label={`Pedir orçamento deste serviço: ${s.titulo} (abre o WhatsApp)`}
            >
              Pedir orçamento deste serviço
              <Icone nome="direita" className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
