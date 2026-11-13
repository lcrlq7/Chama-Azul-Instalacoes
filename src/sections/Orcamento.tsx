import { useId, useState, type FormEvent } from 'react';
import { site } from '../site.config';
import { whatsappLink } from '../lib/contato';
import { Secao } from '../components/Secao';

type Campos = { nome: string; local: string; servico: string; descricao: string };
type Erros = Partial<Record<keyof Campos, string>>;

const vazio: Campos = { nome: '', local: '', servico: '', descricao: '' };

function validar(c: Campos): Erros {
  const e: Erros = {};
  if (c.nome.trim().length < 2) e.nome = 'Informe seu nome.';
  if (c.local.trim().length < 2) e.local = 'Informe o bairro e a cidade do serviço.';
  if (!c.servico) e.servico = 'Escolha o tipo de serviço.';
  if (c.descricao.trim().length < 10)
    e.descricao = 'Descreva o serviço em poucas palavras (mínimo de 10 caracteres).';
  return e;
}

function montarMensagem(c: Campos): string {
  return [
    `Olá! Vim pelo site da ${site.nome} e gostaria de um orçamento.`,
    '',
    `Nome: ${c.nome.trim()}`,
    `Bairro/cidade: ${c.local.trim()}`,
    `Serviço: ${c.servico}`,
    `Descrição: ${c.descricao.trim()}`,
  ].join('\n');
}

export function Orcamento() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Erros>({});
  const id = useId();

  const alterar = (k: keyof Campos) => (v: string) => {
    setCampos((c) => ({ ...c, [k]: v }));
    if (erros[k]) setErros((e) => ({ ...e, [k]: undefined }));
  };

  const enviar = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validar(campos);
    setErros(e);
    const primeiro = (Object.keys(e) as (keyof Campos)[])[0];
    if (primeiro) {
      document.getElementById(`${id}-${primeiro}`)?.focus();
      return;
    }
    window.open(whatsappLink(montarMensagem(campos)), '_blank', 'noopener,noreferrer');
  };

  const prop = (k: keyof Campos) => ({
    id: `${id}-${k}`,
    name: k,
    value: campos[k],
    'aria-invalid': erros[k] ? true : undefined,
    'aria-describedby': erros[k] ? `${id}-${k}-erro` : undefined,
    className: `campo ${erros[k] ? 'border-red-700 ring-1 ring-red-700' : ''}`,
  });

  const Erro = ({ k }: { k: keyof Campos }) =>
    erros[k] ? (
      <p id={`${id}-${k}-erro`} className="mt-1 text-sm font-medium text-red-800">
        {erros[k]}
      </p>
    ) : null;

  return (
    <Secao
      id="orcamento"
      titulo="Orçamento rápido"
      intro="Preencha e toque em enviar: a mensagem abre pronta no WhatsApp. Nada fica salvo neste site."
      fundo="nevoa"
    >
      <form
        noValidate
        onSubmit={enviar}
        className="grid max-w-3xl gap-5 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-8"
      >
        <div>
          <label htmlFor={`${id}-nome`} className="font-semibold text-marinho">
            Nome
          </label>
          <input
            type="text"
            autoComplete="name"
            {...prop('nome')}
            onChange={(e) => alterar('nome')(e.target.value)}
          />
          <Erro k="nome" />
        </div>
        <div>
          <label htmlFor={`${id}-local`} className="font-semibold text-marinho">
            Bairro e cidade
          </label>
          <input
            type="text"
            autoComplete="address-level2"
            placeholder="Ex.: Aterrado, Volta Redonda"
            {...prop('local')}
            onChange={(e) => alterar('local')(e.target.value)}
          />
          <Erro k="local" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-servico`} className="font-semibold text-marinho">
            Tipo de serviço
          </label>
          <select {...prop('servico')} onChange={(e) => alterar('servico')(e.target.value)}>
            <option value="">Selecione</option>
            {site.servicos.map((s) => (
              <option key={s.id} value={s.titulo}>
                {s.titulo}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
          <Erro k="servico" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-descricao`} className="font-semibold text-marinho">
            Descrição curta
          </label>
          <textarea
            rows={4}
            maxLength={600}
            placeholder="Ex.: instalar cooktop e trocar o flexível do gás"
            {...prop('descricao')}
            onChange={(e) => alterar('descricao')(e.target.value)}
          />
          <Erro k="descricao" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-acao w-full sm:w-auto">
            Enviar pelo WhatsApp
          </button>
        </div>
      </form>
    </Secao>
  );
}
