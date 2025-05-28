import { ReactElement } from 'react';

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
};

export interface WineCardProps {
  wine: Wine;
}

export interface FeatureCardProps {
  feature: Feature;
}

export const wines: Wine[] = [
  { id: 1, title: 'Estate Pinot Noir', price: 140, discountedPrice: 120, rating: 4.8, description: 'Elegant red wine with cherry and earthy tones', year: '2015' },
  { id: 2, title: 'Sparkling Delight', price: 80, discountedPrice: 60, rating: 4.5, description: 'Festive sparkling wine with fine persistent bubbles', year: '2024' },
  { id: 3, title: 'Coastal Breeze Sauvignon', price: 200, discountedPrice: 160, rating: 4.7, description: 'Refreshing white wine with tropical fruit accents', year: '2017' },
  { id: 4, title: 'Hillside Blend', price: 100,rating: 5, description: 'Complex blend with blackcurrant and spice flavors', year: '2009' },
  { id: 5, title: 'Sunset Rosé', price: 150, rating: 3.9, description: 'Fruity rosé with strawberry undertones', year: '2022' },
  { id: 6, title: 'Valley White', price: 60, rating: 4.2, description: 'Crisp white wine with citrus notes', year: '2007' },
  { id: 7, title: 'Vineyard Reserve', price: 299, discountedPrice: 239, rating: 4.4, description: 'Aged oak barrel red wine', year: '2000' },
  { id: 8, title: 'Chateau Rouge', price: 120, rating: 5, description: 'Rich red wine with dark berry aromas', year: '2010' },
];
