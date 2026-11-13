import { site } from '../site.config';

/** Gera o link do WhatsApp com a mensagem já preenchida. */
export function whatsappLink(mensagem: string = site.mensagens.padrao): string {
  return `https://wa.me/${site.contato.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

export const telefoneHref = `tel:${site.contato.telefoneLink}`;
export const emailHref = `mailto:${site.contato.email}`;
