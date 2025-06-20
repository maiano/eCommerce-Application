import { mapProductToDetails } from '@/features/product/map-product-to-detail-util';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';
import { ProductDetailsSchema } from '@/shared/schemas/product-details-schema';

export function useProductById(id: string) {
  return useValidatedSWR(
    ['product', id],
    async (client) => {
      const response = await client
        .productProjections()
        .withId({ ID: id })
        .get()
        .execute();

      return mapProductToDetails(response.body);
    },
    ProductDetailsSchema,
  );
}
