import { HashRouter, Route, Routes, useParams } from 'react-router-dom';
import { Topo } from './components/Topo';
import { Rodape } from './components/Rodape';
import { ContatoFixo } from './components/ContatoFixo';
import { Inicio } from './pages/Inicio';
import { SECOES } from './lib/secoes';
import { Privacidade } from './pages/Privacidade';
import { NaoEncontrada } from './pages/NaoEncontrada';

function SecaoOu404() {
  const { secao } = useParams();
  return secao && SECOES.includes(secao) ? <Inicio /> : <NaoEncontrada />;
}

export function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Topo />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/:secao" element={<SecaoOu404 />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Rodape />
      <ContatoFixo />
    </HashRouter>
  );
}
