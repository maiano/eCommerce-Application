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
};

export interface WineCardProps {
  wine: Wine;
}

export interface FeatureCardProps {
  feature: Feature;
}

export const wines: Wine[] = [
  { id: 1, title: 'Estate Pinot Noir', price: 140, rating: 4.8, description: 'Elegant red wine with cherry and earthy tones' },
  { id: 2, title: 'Sparkling Delight', price: 80, rating: 4.5, description: 'Festive sparkling wine with fine persistent bubbles' },
  { id: 3, title: 'Coastal Breeze Sauvignon', price: 200, rating: 4.7, description: 'Refreshing white wine with tropical fruit accents' },
  { id: 4, title: 'Hillside Blend', price: 100, rating: 5, description: 'Complex blend with blackcurrant and spice flavors' },
  { id: 5, title: 'Sunset Rosé', price: 150, rating: 3.9, description: 'Fruity rosé with strawberry undertones' },
  { id: 6, title: 'Valley White', price: 60, rating: 4.2, description: 'Crisp white wine with citrus notes' },
  { id: 7, title: 'Vineyard Reserve', price: 299, rating: 4.4, description: 'Aged oak barrel red wine' },
  { id: 8, title: 'Chateau Rouge', price: 120, rating: 5, description: 'Rich red wine with dark berry aromas' },
];
