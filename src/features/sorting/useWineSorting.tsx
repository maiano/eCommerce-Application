import { useState, useEffect } from 'react';
import { Wine } from '@/types/types';

export function useWineSorting(initialWines: Wine[]) {
  const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating: High to Low', value: 'rating_desc' },
    { label: 'Rating: Low to High', value: 'rating_asc' },
    { label: 'Year: Newest First', value: 'year_desc' },
    { label: 'Year: Oldest First', value: 'year_asc' },
  ];
  const [sortBy, setSortBy] = useState<string>('price_asc');
  const [sortedWines, setSortedWines] = useState<Wine[]>(initialWines);

  useEffect((): void => {
    const sorted: Wine[] = [...initialWines].sort(
      (a: Wine, b: Wine): number => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating_desc':
            return b.rating - a.rating;
          case 'rating_asc':
            return a.rating - b.rating;
          case 'year_desc':
            return parseInt(b.year) - parseInt(a.year);
          case 'year_asc':
            return parseInt(a.year) - parseInt(b.year);
          default:
            return 0;
        }
      },
    );
    setSortedWines(sorted);
  }, [sortBy, initialWines]);

  return {
    sortedWines,
    sortBy,
    setSortBy,
    sortOptions,
  };
}
