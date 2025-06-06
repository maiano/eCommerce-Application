import { mapProductToCard } from '@/features/catalog/map-product-to-card-util';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';
import { ProductCardsSchema } from '@/shared/schemas/product-card-schema';

export function useFeaturedProducts(limit = 12) {
  return useValidatedSWR(
    ['featured-products', limit],
    async (client) => {
      const response = await client
        .productProjections()
        .search()
        .get({ queryArgs: { limit } })
        .execute();

      return response.body.results.map(mapProductToCard);
    },
    ProductCardsSchema,
  );
}
