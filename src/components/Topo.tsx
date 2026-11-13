import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Icone } from './Icone';
import { whatsappLink } from '../lib/contato';

const itens = [
  { rota: '/servicos', rotulo: 'Serviços' },
  { rota: '/trabalhos', rotulo: 'Trabalhos' },
  { rota: '/como-funciona', rotulo: 'Como funciona' },
  { rota: '/sobre', rotulo: 'Sobre' },
  { rota: '/contato', rotulo: 'Contato' },
];

export function Topo() {
  const [aberto, setAberto] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const local = useLocation();

  useEffect(() => setAberto(false), [local.key]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-marinho text-white shadow-md">
      <a
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('conteudo')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-marinho"
      >
        Pular para o conteúdo
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" className="rounded">
          <Logo claro />
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {itens.map((i) => (
              <li key={i.rota}>
                <Link
                  to={i.rota}
                  className="rounded px-3 py-2 text-[0.95rem] font-medium text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {i.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-acao hidden min-h-[44px] px-4 py-2 sm:inline-flex"
          >
            Pedir orçamento
          </a>
          <button
            ref={botaoRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-celular"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <Icone nome={aberto ? 'fechar' : 'menu'} className="h-7 w-7" />
          </button>
        </div>
      </div>

      <nav
        id="menu-celular"
        aria-label="Menu principal"
        hidden={!aberto}
        className="border-t border-white/15 bg-marinho lg:hidden"
      >
        <ul className="container-site flex flex-col py-2">
          {itens.map((i) => (
            <li key={i.rota}>
              <Link
                to={i.rota}
                className="block rounded px-2 py-3 text-lg font-medium hover:bg-white/10"
              >
                {i.rotulo}
              </Link>
            </li>
          ))}
          <li className="py-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-acao w-full"
            >
              Pedir orçamento
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
