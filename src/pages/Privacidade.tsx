import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../site.config';
import { useSeo } from '../lib/seo';

export function Privacidade() {
  useSeo(
    `Política de Privacidade | ${site.nome}`,
    `Como o site da ${site.nome} trata dados pessoais, conforme a LGPD.`,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const comAnalytics = Boolean(site.analyticsId);
  return (
    <section className="bg-white pb-20 pt-28">
      <div className="container-site max-w-3xl">
        <span className="detalhe-laranja" aria-hidden="true" />
        <h1 className="text-3xl sm:text-4xl">Política de Privacidade</h1>
        <div className="mt-8 space-y-5 text-lg text-suave [&_h2]:mt-10 [&_h2]:text-2xl">
          <p>
            Esta política explica como o site da {site.nome} (CNPJ {site.cnpj}) trata dados
            pessoais, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
          <h2>Dados coletados pelo site</h2>
          <p>
            Este site não tem servidor próprio de dados e não armazena informações pessoais. Não há
            cadastro, login ou banco de dados.
          </p>
          <h2>Formulário de orçamento</h2>
          <p>
            O formulário de orçamento apenas monta uma mensagem e abre o WhatsApp no seu aparelho.
            Nada é enviado ao site. A mensagem só é enviada se você confirmar o envio no WhatsApp, e
            a partir daí vale a política de privacidade do próprio WhatsApp.
          </p>
          <h2>Cookies e estatísticas</h2>
          <p>
            {comAnalytics
              ? 'O site usa uma ferramenta de estatísticas de visitas (analytics), que pode utilizar cookies para contar acessos de forma agregada.'
              : 'O site não usa cookies de rastreamento nem ferramentas de estatísticas. Se isso mudar, esta página será atualizada.'}
          </p>
          <h2>Links externos</h2>
          <p>
            Os links para WhatsApp, Instagram e Google Maps levam a serviços de terceiros, com
            políticas de privacidade próprias.
          </p>
          <h2>Contato</h2>
          <p>
            Dúvidas sobre esta política:{' '}
            <a className="text-azul underline" href={`mailto:${site.contato.email}`}>
              {site.contato.email}
            </a>
            .
          </p>
        </div>
        <Link to="/" className="btn-contorno mt-10">
          Voltar para a página inicial
        </Link>
      </div>
    </section>
  );
}
