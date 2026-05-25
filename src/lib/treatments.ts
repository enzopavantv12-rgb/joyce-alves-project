export interface Treatment {
  id: string;
  name: string;
  benefit: string;
  group: 'clareamento' | 'rejuvenescimento' | 'autocuidado' | 'integrativa';
  whatsappMessage: string;
  imagePlaceholder: string;
}

export const TREATMENTS: Treatment[] = [
  // Grupo 1 — Clareamento & Uniformização
  {
    id: 'luminapele',
    name: 'Método Luminapele 360°',
    benefit: 'Clarear a pele enquanto você resgata sua autoestima e equilíbrio interior.',
    group: 'clareamento',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre o Método Luminapele para tratamento de melasma.',
    imagePlaceholder: '/placeholders/treatment-luminapele.jpg'
  },
  {
    id: 'peeling',
    name: 'Peeling Renovador',
    benefit: 'Uma renovação profunda para sua pele voltar a respirar e se iluminar.',
    group: 'clareamento',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre o Peeling Renovador.',
    imagePlaceholder: '/placeholders/treatment-peeling.jpg'
  },
  
  // Grupo 2 — Rejuvenescimento & Vitalidade
  {
    id: 'exo-harmony',
    name: 'EXO Harmony',
    benefit: 'Revitalização inteligente para uma pele mais firme, luminosa e rejuvenescida.',
    group: 'rejuvenescimento',
    whatsappMessage: 'Oi, vim pelo site e gostaria de conhecer o tratamento EXO Harmony.',
    imagePlaceholder: '/placeholders/treatment-exo-harmony.png'
  },
  {
    id: 'microagulhamento',
    name: 'Microagulhamento Regenerativo',
    benefit: 'Estimular o colágeno e devolver viço, textura e vitalidade à pele.',
    group: 'rejuvenescimento',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre o Microagulhamento Regenerativo.',
    imagePlaceholder: '/placeholders/treatment-microagulhamento.png'
  },
  {
    id: 'jato-plasma',
    name: 'Jato de Plasma Pálpebras',
    benefit: 'Um olhar mais leve, descansado e naturalmente rejuvenescido.',
    group: 'rejuvenescimento',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre o Jato de Plasma para pálpebras.',
    imagePlaceholder: '/placeholders/treatment-jato-plasma.png'
  },
  
  // Grupo 3 — Limpeza, Glow & Autocuidado
  {
    id: 'limpeza-premium',
    name: 'Limpeza de Pele Premium',
    benefit: 'Mais do que limpar a pele: um ritual de renovação, cuidado e luminosidade.',
    group: 'autocuidado',
    whatsappMessage: 'Oi, vim pelo site e gostaria de agendar uma Limpeza de Pele Premium.',
    imagePlaceholder: '/placeholders/treatment-limpeza-premium.png'
  },
  {
    id: 'limpeza-plus',
    name: 'Limpeza de Pele Plus',
    benefit: 'Pele renovada, hidratada e com aquele brilho saudável de quem se cuida.',
    group: 'autocuidado',
    whatsappMessage: 'Oi, vim pelo site e gostaria de agendar uma Limpeza de Pele Plus.',
    imagePlaceholder: '/placeholders/treatment-limpeza-plus.png'
  },
  {
    id: 'limpeza-basica',
    name: 'Limpeza de Pele Básica',
    benefit: 'Leveza, frescor e equilíbrio para devolver conforto à sua pele.',
    group: 'autocuidado',
    whatsappMessage: 'Oi, vim pelo site e gostaria de agendar uma Limpeza de Pele Básica.',
    imagePlaceholder: '/placeholders/treatment-limpeza-basica.png'
  },
  
  // Grupo 4 — Terapias Integrativas & Saúde Emocional
  {
    id: 'psicanalise',
    name: 'Sessão de Psicanálise',
    benefit: 'Um espaço seguro para compreender emoções, padrões e dores que impactam sua vida e autoestima.',
    group: 'integrativa',
    whatsappMessage: 'Oi, vim pelo site e gostaria de agendar uma sessão de Psicanálise.',
    imagePlaceholder: '/placeholders/treatment-psicanalise.png'
  },
  {
    id: 'caminho-cura',
    name: 'Caminho de Cura — 4 Semanas',
    benefit: 'Um reencontro com sua essência para aliviar o que sua alma já não consegue carregar sozinha.',
    group: 'integrativa',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre o programa Caminho de Cura.',
    imagePlaceholder: '/placeholders/treatment-caminho-cura.png'
  },
  {
    id: 'reiki',
    name: 'Reiki & Reequilíbrio Energético',
    benefit: 'Silenciar o excesso, restaurar sua energia e voltar para si mesma.',
    group: 'integrativa',
    whatsappMessage: 'Oi, vim pelo site e gostaria de agendar uma sessão de Reiki.',
    imagePlaceholder: '/placeholders/treatment-reiki.png'
  },
  {
    id: 'apometria',
    name: 'Apometria Integrativa',
    benefit: 'Liberar bloqueios emocionais e trazer mais clareza, leveza e alinhamento interior.',
    group: 'integrativa',
    whatsappMessage: 'Oi, vim pelo site e gostaria de saber mais sobre Apometria Integrativa.',
    imagePlaceholder: '/placeholders/treatment-apometria.png'
  },
];
