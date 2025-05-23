import { ReactElement } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface CardProps {
  feature?: Feature;
  wine?: { title: string; description: string; imageClass: string }
}
