export interface BeforeAfterCase {
  id: string;
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
  caseName: string;
  duration: string;
  description: string;
}

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'caso-angela',
    beforeImage: '/placeholders/before-after-1-antes.png',
    afterImage: '/placeholders/before-after-1-depois.png',
    altBefore: 'Pele com melasma antes do tratamento — Caso Angela',
    altAfter: 'Pele uniformizada após tratamento Luminapele — Caso Angela',
    caseName: 'CASO ANGELA',
    duration: '2 sessões · 60 dias',
    description: 'Convivia com o melasma há mais de 15 anos e havia desistido dos tratamentos. Já na primeira sessão, apresentou clareamento significativo. Na segunda, o melasma estava praticamente imperceptível.'
  },
  {
    id: 'caso-graciele',
    beforeImage: '/placeholders/before-after-2-antes.png',
    afterImage: '/placeholders/before-after-2-depois.png',
    altBefore: 'Pele com melasma antes do tratamento — Caso Graciele',
    altAfter: 'Pele uniformizada após tratamento Luminapele — Caso Graciele',
    caseName: 'CASO GRACIELE',
    duration: '2 sessões · 45 dias',
    description: 'Sofria com melasma há 13 anos e tinha medo de tratamentos agressivos. Com protocolo personalizado, clareou o melasma de forma saudável sem sensibilizar a pele — devolvendo autoestima e segurança.'
  },
  {
    id: 'caso-3',
    beforeImage: '/placeholders/before-after-3-antes.png',
    afterImage: '/placeholders/before-after-3-depois.png',
    altBefore: 'Pele com melasma antes do tratamento — Caso 3',
    altAfter: 'Pele uniformizada após tratamento Luminapele — Caso 3',
    caseName: 'CASO [NOME]',
    duration: '[X sessões · X dias]',
    description: '[Descrição editorial do caso a ser preenchida pela Joyce. Manter mesmo tom dos casos anteriores: começa pelo contexto da cliente, menciona a transformação técnica, finaliza com o resultado emocional ou de autoestima.]'
  },
  {
    id: 'caso-4',
    beforeImage: '/placeholders/before-after-4-antes.png',
    afterImage: '/placeholders/before-after-4-depois.png',
    altBefore: 'Pele com melasma antes do tratamento — Caso 4',
    altAfter: 'Pele uniformizada após tratamento Luminapele — Caso 4',
    caseName: 'CASO [NOME]',
    duration: '[X sessões · X dias]',
    description: '[Descrição editorial do caso a ser preenchida pela Joyce. Manter mesmo tom dos casos anteriores.]'
  }
];
