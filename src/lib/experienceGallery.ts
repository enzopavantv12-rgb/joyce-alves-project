export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  type: MediaType;
  src: string;
  youtubeId?: string;
  poster?: string;
  alt: string;
  size: 'hero' | 'portrait';
}

export const experienceGallery: GalleryItem[] = [
  {
    id: 'item-1',
    type: 'image',
    src: '/placeholders/experience-1.jpg',
    alt: 'Joyce realizando atendimento na sala — ambiente Manik',
    size: 'hero',
  },
  {
    id: 'item-2',
    type: 'video',
    src: '',
    youtubeId: 'k9ndD2RSus4',
    poster: 'https://img.youtube.com/vi/k9ndD2RSus4/hqdefault.jpg',
    alt: 'Detalhe do ritual de atendimento em movimento',
    size: 'portrait',
  },
  {
    id: 'item-3',
    type: 'image',
    src: '/placeholders/experience-cha.png',
    alt: 'Chá do ambiente em movimento',
    size: 'portrait',
  },
];
