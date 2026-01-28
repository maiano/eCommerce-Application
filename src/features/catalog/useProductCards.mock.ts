import useSWR from 'swr';
import { mockApi } from '@/data/mock/mock-api';
import { ProductCardsResponseSchema } from '@/shared/schemas/product-card-schema';

export function useProductCards({
  categoryIds = [],
  countries = [],
  sortBy,
  page = 1,
  searchTerm = '',
}: {
  categoryIds?: string[];
  countries?: string[];
  sortBy?: string;
  page?: number;
  searchTerm?: string;
}) {
  return useSWR(
    ['products', categoryIds, countries, sortBy, page, searchTerm],
    async () => {
      const data = await mockApi.getProducts({
        categoryIds,
        countries,
        sortBy,
        page,
        searchTerm,
      });
      return ProductCardsResponseSchema.parse(data);
    },
    {
      revalidateOnFocus: false,
    },
  );
}
