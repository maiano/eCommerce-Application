import { mapProductToCard } from '@/features/catalog/map-product-to-card-util';
import { sortMap } from '@/features/catalog/sort-map-util';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';
import { ProductCardsResponseSchema } from '@/shared/schemas/product-card-schema';

export function useProductCards({
  categoryIds = [],
  countries = [],
  sortBy,
  page = 1,
}: {
  categoryIds?: string[];
  countries?: string[];
  sortBy?: string;
  page?: number;
}) {
  return useValidatedSWR(
    ['products', categoryIds, countries, sortBy, page],
    async (client) => {
      const filters: string[] = [];

      if (categoryIds.length > 0) {
        filters.push(
          `categories.id: ${categoryIds.map((id) => `"${id}"`).join(',')}`,
        );
      }

      if (countries.length > 0) {
        filters.push(
          `variants.attributes.country: ${countries.map((c) => `"${c}"`).join(',')}`,
        );
      }

      const mappedSort = sortBy ? sortMap[sortBy] : undefined;

      const response = await client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 8,
            offset: (page - 1) * 8,
            ...(mappedSort ? { sort: [mappedSort] } : {}),
            ...(filters.length ? { filter: filters } : {}),
          },
        })
        .execute();

      return {
        items: response.body.results.map(mapProductToCard),
        total: response.body.total,
      };
    },
    ProductCardsResponseSchema,
  );
}
