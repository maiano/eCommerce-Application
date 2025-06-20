import { MutableRefObject, ReactElement, SyntheticEvent } from 'react';
import { password } from '@/shared/validation/login-validation.ts';
import { string } from 'zod';

export interface Feature {
  title: string;
  description: string;
  icon: ReactElement;
}

export type Wine = {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  year: string;
  discountedPrice?: number;
  attributes: WineAttribute[];
  image: string[];
  name?: string;
};

export interface WineCardProps {
  wine: Wine;
}

export interface FeatureCardProps {
  feature: Feature;
}

export type WineAttribute = {
  name: string;
  value: string;
};

export type ApplyStylesFunction = (img: HTMLImageElement) => void;

export type ImageLoadHandler = (
  e: SyntheticEvent<HTMLImageElement, Event>,
) => void;

export type CheckImageFunction = (img: HTMLImageElement) => void;

export interface UseImageHandler {
  handleImageLoad: ImageLoadHandler;
  imgRef: MutableRefObject<HTMLImageElement | null>;
  checkImage: CheckImageFunction;
}

export const wines: Wine[] = [
  {
    id: 1,
    title: 'Estate Pinot Noir',
    price: 140,
    discountedPrice: 120,
    rating: 4.8,
    description: 'Elegant red wine with cherry and earthy tones',
    year: '2015',
    attributes: [
      { name: 'Year', value: '2015' },
      { name: 'Country', value: 'France' },
      { name: 'Rating', value: '4.8' },
    ],
    image: [
      '../src/assets/Montrachet Grand Cru 2010-2.jpg',
      '../src/assets/Ellen Lane Estate Chardonnay 2015-1.jpg',
      '../src/assets/Corton-Charlemagne Grand Cru N.V-2..jpg',
      'https://images.vivino.com/thumbs/G3MU5UwBQ1eCX5A6CiPivg_pb_x600.png',
    ],
  },
  {
    id: 2,
    title: 'Sparkling Delight',
    price: 80,
    discountedPrice: 60,
    rating: 4.5,
    description: 'Festive sparkling wine with fine persistent bubbles',
    year: '2024',
    attributes: [
      { name: 'Year', value: '2024' },
      { name: 'Country', value: 'Italy' },
      { name: 'Rating', value: '4.5' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/59a49d75-b7ce-48f0-96d7-d620aefc4e49.png',
      'https://cdn.usegalileo.ai/sdxl10/544838f2-4393-4780-ab1e-7bbef36024f9.png',
      'https://cdn.usegalileo.ai/sdxl10/b25779ab-c1bf-42c0-8245-bc5f7d576365.png',
      'https://cdn.usegalileo.ai/sdxl10/0eea6aee-9921-49ac-bbaa-7def81318f98.png',
    ],
  },
  {
    id: 3,
    title: 'Coastal Breeze Sauvignon',
    price: 200,
    discountedPrice: 160,
    rating: 4.7,
    description: 'Refreshing white wine with tropical fruit accents',
    year: '2017',
    attributes: [
      { name: 'Year', value: '2017' },
      { name: 'Country', value: 'New Zealand' },
      { name: 'Rating', value: '4.7' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/b25779ab-c1bf-42c0-8245-bc5f7d576365.png',
      'https://cdn.usegalileo.ai/sdxl10/544838f2-4393-4780-ab1e-7bbef36024f9.png',
      'https://cdn.usegalileo.ai/sdxl10/59a49d75-b7ce-48f0-96d7-d620aefc4e49.png',
      'https://cdn.usegalileo.ai/sdxl10/0eea6aee-9921-49ac-bbaa-7def81318f98.png',
    ],
  },
  {
    id: 4,
    title: 'Hillside Blend',
    price: 100,
    rating: 5,
    description: 'Complex blend with blackcurrant and spice flavors',
    year: '2009',
    attributes: [
      { name: 'Year', value: '2009' },
      { name: 'Country', value: 'Spain' },
      { name: 'Rating', value: '5' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/0eea6aee-9921-49ac-bbaa-7def81318f98.png',
      'https://cdn.usegalileo.ai/sdxl10/544838f2-4393-4780-ab1e-7bbef36024f9.png',
      'https://cdn.usegalileo.ai/sdxl10/59a49d75-b7ce-48f0-96d7-d620aefc4e49.png',
      'https://cdn.usegalileo.ai/sdxl10/b25779ab-c1bf-42c0-8245-bc5f7d576365.png',
    ],
  },
  {
    id: 5,
    title: 'Sunset Rosé',
    price: 150,
    rating: 3.9,
    description: 'Fruity rosé with strawberry undertones',
    year: '2022',
    attributes: [
      { name: 'Year', value: '2022' },
      { name: 'Country', value: 'France' },
      { name: 'Rating', value: '3.9' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/c6ab2f06-0ec1-4d34-bd49-6520fdd63180.png',
      'https://cdn.usegalileo.ai/sdxl10/d90f77b3-fdd9-4c18-aac8-5a54b27fe7de.png',
      'https://cdn.usegalileo.ai/sdxl10/0f7256d8-8e72-4104-b428-cea3b42e76d9.png',
      'https://cdn.usegalileo.ai/sdxl10/9204a299-2794-4f6b-af2a-2fa313afab9c.png',
    ],
  },
  {
    id: 6,
    title: 'Valley White',
    price: 60,
    rating: 4.2,
    description: 'Crisp white wine with citrus notes',
    year: '2007',
    attributes: [
      { name: 'Year', value: '2007' },
      { name: 'Country', value: 'Germany' },
      { name: 'Rating', value: '4.2' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/d90f77b3-fdd9-4c18-aac8-5a54b27fe7de.png',
      'https://cdn.usegalileo.ai/sdxl10/c6ab2f06-0ec1-4d34-bd49-6520fdd63180.png',
      'https://cdn.usegalileo.ai/sdxl10/0f7256d8-8e72-4104-b428-cea3b42e76d9.png',
      'https://cdn.usegalileo.ai/sdxl10/9204a299-2794-4f6b-af2a-2fa313afab9c.png',
    ],
  },
  {
    id: 7,
    title: 'Vineyard Reserve',
    price: 299,
    discountedPrice: 239,
    rating: 4.4,
    description: 'Aged oak barrel red wine',
    year: '2000',
    attributes: [
      { name: 'Year', value: '2000' },
      { name: 'Country', value: 'Italy' },
      { name: 'Rating', value: '4.4' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/0f7256d8-8e72-4104-b428-cea3b42e76d9.png',
      'https://cdn.usegalileo.ai/sdxl10/c6ab2f06-0ec1-4d34-bd49-6520fdd63180.png',
      'https://cdn.usegalileo.ai/sdxl10/d90f77b3-fdd9-4c18-aac8-5a54b27fe7de.png',
      'https://cdn.usegalileo.ai/sdxl10/9204a299-2794-4f6b-af2a-2fa313afab9c.png',
    ],
  },
  {
    id: 8,
    title: 'Chateau Rouge',
    price: 120,
    rating: 5,
    description: 'Rich red wine with dark berry aromas',
    year: '2010',
    attributes: [
      { name: 'Year', value: '2010' },
      { name: 'Country', value: 'France' },
      { name: 'Rating', value: '5' },
    ],
    image: [
      'https://cdn.usegalileo.ai/sdxl10/9204a299-2794-4f6b-af2a-2fa313afab9c.png',
      'https://cdn.usegalileo.ai/sdxl10/c6ab2f06-0ec1-4d34-bd49-6520fdd63180.png',
      'https://cdn.usegalileo.ai/sdxl10/d90f77b3-fdd9-4c18-aac8-5a54b27fe7de.png',
      'https://cdn.usegalileo.ai/sdxl10/0f7256d8-8e72-4104-b428-cea3b42e76d9.png',
    ],
  },
];

export interface ModalEmbla {
  scrollTo: (index: number) => void;
  reInit: () => void;
}

export interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  description: string;
  contributions: string[];
  github: string, 
}

export interface TeamMemberCardProps {
  member: TeamMember;
}