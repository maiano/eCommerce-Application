import { mapProductToCard } from '@/features/catalog/map-product-to-card-util';
import { sortMap } from '@/features/catalog/sort-map-util';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';
import { ProductCardsSchema } from '@/shared/schemas/product-card-schema';

export function useProductCards({
  categoryIds = [],
  sortBy,
  page = 1,
}: {
  categoryIds?: string[];
  sortBy?: string;
  page?: number;
}) {
  return useValidatedSWR(
    ['products', categoryIds, sortBy, page],
    async (client) => {
      const filter =
        categoryIds.length > 0
          ? [`categories.id: ${categoryIds.map((id) => `"${id}"`).join(',')}`]
          : undefined;

      const mappedSort = sortBy ? sortMap[sortBy] : undefined;

      const response = await client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 8,
            offset: (page - 1) * 8,
            ...(mappedSort ? { sort: [mappedSort] } : {}),
            ...(filter ? { filter } : {}),
          },
        })
        .execute();
      return response.body.results.map(mapProductToCard);
    },
    ProductCardsSchema,
  );
}
