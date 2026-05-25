export type TestimonialType = 'video' | 'text';

export interface Testimonial {
  id: string;
  type: TestimonialType;
  
  // Para vídeos:
  videoSrc?: string;
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
    videoSrc: '/depoimentos/depoimento-insta-1.mov',
    authorName: 'Angela',
    authorLocation: 'Belo Horizonte',
  },
  {
    id: 'depoimento-2',
    type: 'video',
    videoSrc: '/depoimentos/depoimento-insta-2.mov',
    authorName: 'Patrícia',
    authorLocation: 'Pompéu',
  },
  {
    id: 'depoimento-3',
    type: 'video',
    videoSrc: '/depoimentos/depoimento-insta-4.mp4',
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
