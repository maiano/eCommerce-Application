import useSWR from 'swr';
import { mockApi } from '@/data/mock/mock-api';
import { ProductCardsSchema } from '@/shared/schemas/product-card-schema';

export function useFeaturedProducts(limit = 12) {
  return useSWR(
    ['featured-products', limit],
    async () => {
      const data = await mockApi.getFeaturedProducts(limit);
      return ProductCardsSchema.parse(data);
    },
    {
      revalidateOnFocus: false,
    },
  );
}
