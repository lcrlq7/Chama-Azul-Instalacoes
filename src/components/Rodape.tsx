import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { site } from '../site.config';
import { emailHref, telefoneHref, whatsappLink } from '../lib/contato';

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-marinho pb-24 pt-12 text-white/85 lg:pb-10">
      <div className="container-site grid gap-10 md:grid-cols-3">
        <div>
          <Logo tamanho={128} />
          <p className="mt-4 max-w-xs text-sm">
            Instalações de gás, hidráulica, aquecimento e fogões em {site.cidadeBase} e região do{' '}
            {site.regiao}.
          </p>
          <p className="mt-2 text-sm">Marca irmã: {site.marcaIrma}.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <h2 className="font-serif text-lg text-white">Navegação</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white hover:underline" to="/servicos">
                Serviços
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" to="/trabalhos">
                Trabalhos
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" to="/orcamento">
                Orçamento rápido
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" to="/perguntas">
                Perguntas frequentes
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" to="/privacidade">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-serif text-lg text-white">Contato</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="hover:text-white hover:underline"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {site.contato.telefoneExibicao}
              </a>
            </li>
            <li>
              <a className="hover:text-white hover:underline" href={telefoneHref}>
                Ligar: {site.contato.telefoneExibicao}
              </a>
            </li>
            <li>
              <a className="break-all hover:text-white hover:underline" href={emailHref}>
                {site.contato.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-white hover:underline"
                href={site.contato.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram @{site.contato.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site mt-10 border-t border-white/15 pt-6 text-sm">
        <p>
          © {ano} {site.nome}. CNPJ {site.cnpj}. {site.cidadeBase}, {site.estado}.
        </p>
      </div>
    </footer>
  );
}
