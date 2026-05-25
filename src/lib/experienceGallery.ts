export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  type: MediaType;
  src: string;
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
    src: '/placeholders/experience-2.mp4',
    poster: '/placeholders/experience-2-poster.jpg',
    alt: 'Detalhe do ritual de atendimento em movimento',
    size: 'portrait',
  },
  {
    id: 'item-3',
    type: 'image',
    src: '/placeholders/experience-cha.gif',
    alt: 'Chá do ambiente em movimento',
    size: 'portrait',
  },
];
