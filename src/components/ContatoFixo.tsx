import { Icone } from './Icone';
import { site } from '../site.config';
import { telefoneHref, whatsappLink } from '../lib/contato';

/** Botão flutuante de WhatsApp (todas as telas) e barra inferior "Ligar / WhatsApp" no celular. */
export function ContatoFixo() {
  return (
    <>
      <a
        href={whatsappLink(site.mensagens.padrao)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-20 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-2 ring-white hover:brightness-95 lg:bottom-6 lg:right-6"
      >
        <Icone nome="whatsapp" className="h-8 w-8" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-borda bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] lg:hidden">
        <a
          href={telefoneHref}
          className="flex min-h-[56px] items-center justify-center gap-2 bg-marinho font-semibold text-white"
        >
          <Icone nome="telefone" className="h-5 w-5" />
          Ligar
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[56px] items-center justify-center gap-2 bg-whatsapp font-semibold text-[#073b20]"
        >
          <Icone nome="whatsapp" className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
