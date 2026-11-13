import { Link } from 'react-router-dom';
import { site } from '../site.config';
import { useSeo } from '../lib/seo';
import { whatsappLink } from '../lib/contato';

export function NaoEncontrada() {
  useSeo(`Página não encontrada | ${site.nome}`, 'A página que você procurou não existe.');
  return (
    <section className="bg-creme pb-24 pt-32">
      <div className="container-site max-w-2xl text-center">
        <p className="font-serif text-6xl font-bold text-azul">404</p>
        <h1 className="mt-4 text-3xl">Página não encontrada</h1>
        <p className="mt-4 text-lg text-suave">
          O endereço pode ter mudado. Volte para a página inicial ou fale com a gente pelo WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-contorno">
            Página inicial
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-acao">
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
