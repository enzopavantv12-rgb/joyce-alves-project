export type TestimonialType = 'video' | 'text';

export interface Testimonial {
  id: string;
  type: TestimonialType;
  
  // Para vídeos:
  videoSrc?: string;
  youtubeId?: string;
  posterSrc?: string;
  
  // Para depoimentos em texto:
  photoSrc?: string;
  quote?: string;
  
  // Comum a todos:
  authorName: string;
  authorLocation: string;
  authorAge?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'depoimento-1',
    type: 'video',
    youtubeId: 'KS1x_BQYN9U',
    authorName: 'Angela',
    authorLocation: 'Belo Horizonte',
  },
  {
    id: 'depoimento-2',
    type: 'video',
    youtubeId: 'KXbEAIahRyg',
    authorName: 'Patrícia',
    authorLocation: 'Pompéu',
  },
  {
    id: 'depoimento-3',
    type: 'video',
    youtubeId: 'ch7KaLaYBxM',
    authorName: 'Débora',
    authorLocation: 'Contagem',
  },
  {
    id: 'depoimento-4',
    type: 'text',
    photoSrc: '/depoimentos/graciele-foto.jpg',
    quote: 'Não tem nem como agradecer a Deus por ter colocado você em minha vida, Joyce Alves. Você me devolveu a vida novamente hoje. Me sinto outra mulher, mais realizada e mais feliz.',
    authorName: 'Graciele',
    authorLocation: 'Instagram',
  },
];
