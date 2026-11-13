import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { site } from '../site.config';
import { useSeo } from '../lib/seo';
import { Hero } from '../sections/Hero';
import { Servicos } from '../sections/Servicos';
import { Sobre } from '../sections/Sobre';
import { ComoFunciona } from '../sections/ComoFunciona';
import { Trabalhos } from '../sections/Trabalhos';
import { Orcamento } from '../sections/Orcamento';
import { Depoimentos } from '../sections/Depoimentos';
import { AreaAtendimento } from '../sections/AreaAtendimento';
import { Perguntas } from '../sections/Perguntas';
import { Contato } from '../sections/Contato';

const semMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Inicio() {
  const { secao } = useParams();
  const local = useLocation();

  useSeo(site.seo.titulo, site.seo.descricao);

  // Rolagem até a seção pedida (ex.: #/servicos), descontando o topo fixo via scroll-margin.
  useEffect(() => {
    const comportamento: ScrollBehavior = semMovimento() ? 'auto' : 'smooth';
    if (secao) {
      const alvo = document.getElementById(secao);
      alvo?.scrollIntoView({ behavior: comportamento, block: 'start' });
    } else if (local.key !== 'default') {
      window.scrollTo({ top: 0, behavior: comportamento });
    }
  }, [secao, local.key]);

  return (
    <>
      <Hero />
      <Servicos />
      <Sobre />
      <ComoFunciona />
      <Trabalhos />
      <Orcamento />
      <Depoimentos />
      <AreaAtendimento />
      <Perguntas />
      <Contato />
    </>
  );
}
