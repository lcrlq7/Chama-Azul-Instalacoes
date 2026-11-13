// =====================================================================
// CONFIGURAÇÃO DO SITE: todos os textos, contatos e links ficam aqui.
// Para trocar telefone, Instagram, cidades, serviços, perguntas etc.,
// edite apenas este arquivo e publique de novo.
// =====================================================================

export type IconeNome =
  | 'chama'
  | 'tubos'
  | 'boiler'
  | 'fogao'
  | 'ferramenta'
  | 'predio'
  | 'documento'
  | 'escudo'
  | 'qualidade'
  | 'pessoa'
  | 'calendario'
  | 'pagamento';

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icone: IconeNome;
}

export interface Diferencial {
  titulo: string;
  descricao: string;
  icone: IconeNome;
}

export interface Depoimento {
  nome: string;
  cidade?: string;
  texto: string;
}

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export const site = {
  nome: 'Chama Azul Instalações',
  marcaIrma: 'Chama Azul Fogões',
  cnpj: '44.794.560/0001-30',
  responsavelTecnico: 'Filipi Gotardo',

  // Endereço público do site (usado em SEO, sitemap e imagem de compartilhamento).
  // Ao ligar um domínio próprio, troque para algo como 'https://chamaazul.com.br/'.
  urlSite: 'https://chama-azul-instalacoes.netlify.app/',

  contato: {
    telefoneExibicao: '(24) 99321-9602',
    // Somente números, com 55 (Brasil) + DDD + número.
    whatsappNumero: '5524993219602',
    telefoneLink: '+5524993219602',
    email: 'chamaazul17@gmail.com',
    instagramUsuario: 'chama_azul_instalacoes',
    instagramUrl: 'https://instagram.com/chama_azul_instalacoes',
  },

  cidadeBase: 'Volta Redonda',
  estado: 'RJ',
  estadoNome: 'Rio de Janeiro',
  // Área de atendimento, usada nos textos do site e no SEO.
  areaAtendimento: 'todo o estado do Rio de Janeiro',
  // Cidades em destaque na seção "Área de atendimento" (além de todo o estado).
  cidadesAtendidas: [
    'Volta Redonda',
    'Barra Mansa',
    'Pinheiral',
    'Barra do Piraí',
    'Piraí',
    'Resende',
    'Bananal',
  ],

  // Link do Google Maps. Quando tiver o perfil no Google Meu Negócio, cole o link dele aqui.
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Volta+Redonda+RJ',

  mensagens: {
    padrao: 'Olá! Vim pelo site da Chama Azul Instalações e gostaria de um orçamento.',
    servico: (titulo: string) =>
      `Olá! Vim pelo site da Chama Azul Instalações e gostaria de um orçamento para: ${titulo}.`,
  },

  hero: {
    titulo:
      'Instalações de gás e hidráulica com segurança e garantia em todo o estado do Rio de Janeiro',
    subtitulo:
      'Base em Volta Redonda, com atendimento em todo o estado do RJ. Redes de gás, hidráulica em multicamadas, boiler, aquecimento e fogões, com orçamento detalhado por escrito e atendimento direto com o responsável técnico.',
    selos: [
      'Orçamento por escrito',
      'Garantia no serviço',
      'Atendimento com o responsável técnico',
    ],
  },

  servicos: [
    {
      id: 'gas',
      titulo: 'Redes de gás GLP e gás encanado',
      descricao:
        'Instalação e manutenção com registros de segurança, reguladores, flexíveis e central de botijas.',
      icone: 'chama',
    },
    {
      id: 'hidraulica',
      titulo: 'Hidráulica em multicamadas e CPVC',
      descricao:
        'Instalações em tubulação multicamadas (PEX/PEX-AL-PEX) e CPVC/Aquatherm para água quente e fria.',
      icone: 'tubos',
    },
    {
      id: 'aquecimento',
      titulo: 'Boiler, aquecimento central e sauna',
      descricao: 'Instalação e manutenção de boiler, sistemas de aquecimento central e sauna.',
      icone: 'boiler',
    },
    {
      id: 'fogoes',
      titulo: 'Fogões e cooktops',
      descricao: 'Instalação e manutenção de fogões e cooktops, com a ligação de gás adequada.',
      icone: 'fogao',
    },
    {
      id: 'reparos',
      titulo: 'Resistência de boiler e reparos',
      descricao: 'Substituição de resistência de boiler e reparos hidráulicos.',
      icone: 'ferramenta',
    },
    {
      id: 'projetos',
      titulo: 'Projetos',
      descricao: 'Projetos para residências, condomínios, clínicas, hospitais e comércio.',
      icone: 'predio',
    },
  ] satisfies Servico[],

  diferenciais: [
    {
      titulo: 'Orçamento detalhado por escrito',
      descricao:
        'Material e mão de obra descritos no orçamento, com validade de 15 dias para você decidir com calma.',
      icone: 'documento',
    },
    {
      titulo: 'Garantia no serviço',
      descricao: 'O serviço executado tem garantia.',
      icone: 'escudo',
    },
    {
      titulo: 'Material de qualidade',
      descricao: 'Trabalhamos com material de qualidade em cada instalação.',
      icone: 'qualidade',
    },
    {
      titulo: 'Atendimento com o responsável técnico',
      descricao:
        'Você fala direto com o responsável técnico, do primeiro contato à entrega. Pagamento facilitado: em obras maiores, 50% ao aceite e 50% ao término.',
      icone: 'pessoa',
    },
  ] satisfies Diferencial[],

  passos: [
    {
      titulo: 'Você chama no WhatsApp',
      descricao: 'Conte o que precisa e onde é o serviço.',
    },
    {
      titulo: 'Visita e orçamento por escrito',
      descricao: 'Avaliamos o local e enviamos o orçamento detalhado, com material e mão de obra.',
    },
    {
      titulo: 'Aprovação e execução',
      descricao: 'Com o orçamento aprovado, o serviço é executado.',
    },
    {
      titulo: 'Entrega com garantia',
      descricao: 'Serviço entregue com garantia.',
    },
  ],

  // Depoimentos reais de clientes. A seção só aparece no site se houver itens aqui.
  // Exemplo: { nome: 'Maria S.', cidade: 'Volta Redonda', texto: '...' }
  depoimentos: [] as Depoimento[],

  perguntas: [
    {
      pergunta: 'Vocês dão garantia?',
      resposta:
        'Sim. Os serviços executados têm garantia. As condições ficam descritas no orçamento.',
    },
    {
      pergunta: 'Como é feito o orçamento?',
      resposta:
        'Você chama no WhatsApp e conta o que precisa. Quando necessário, fazemos uma visita para avaliar o local. Depois enviamos um orçamento detalhado por escrito, com material e mão de obra.',
    },
    {
      pergunta: 'Qual a validade do orçamento?',
      resposta: 'O orçamento tem validade de 15 dias.',
    },
    {
      pergunta: 'Vocês atendem condomínio?',
      resposta:
        'Sim. Fazemos projetos e instalações para residências, condomínios, clínicas, hospitais e comércio.',
    },
    {
      pergunta: 'Como é o pagamento?',
      resposta:
        'O pagamento é facilitado. Em obras maiores, 50% no aceite do orçamento e 50% no término do serviço. As condições ficam no orçamento.',
    },
    {
      pergunta: 'Quais cidades vocês atendem?',
      resposta:
        'Atendemos todo o estado do Rio de Janeiro, com base em Volta Redonda. Atendemos também Barra Mansa, Pinheiral, Barra do Piraí, Piraí, Resende e Bananal.',
    },
  ] satisfies Pergunta[],

  // Título e descrição da página inicial (Google, WhatsApp, redes sociais).
  seo: {
    titulo: 'Chama Azul Instalações | Gás e hidráulica em Volta Redonda e todo o RJ',
    descricao:
      'Instalação e manutenção de redes de gás, hidráulica em multicamadas, boiler, aquecimento e fogões em Volta Redonda e todo o estado do Rio de Janeiro. Orçamento detalhado por escrito e garantia no serviço.',
  },

  // Deixe vazio para não usar analytics. Se ativar, atualize a Política de Privacidade.
  analyticsId: '',
} as const;

export type Site = typeof site;
