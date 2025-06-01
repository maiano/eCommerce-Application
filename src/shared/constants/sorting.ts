export const productSortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Rating: Low to High', value: 'rating_asc' },
  { label: 'Year: Newest First', value: 'year_desc' },
  { label: 'Year: Oldest First', value: 'year_asc' },
] as const;

export type ProductSortOption = (typeof productSortOptions)[number]['value'];
