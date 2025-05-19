import { ReactElement } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface ProductCardProps {
  feature: Feature;
}
