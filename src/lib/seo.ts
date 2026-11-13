import { useEffect } from 'react';

/** Define o título e a descrição da página atual. */
export function useSeo(titulo: string, descricao: string) {
  useEffect(() => {
    document.title = titulo;
    document.querySelector('meta[name="description"]')?.setAttribute('content', descricao);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', titulo);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', descricao);
  }, [titulo, descricao]);
}
