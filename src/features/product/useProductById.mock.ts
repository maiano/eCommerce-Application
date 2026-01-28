import useSWR from 'swr';
import { mockApi } from '@/data/mock/mock-api';
import { ProductDetailsSchema } from '@/shared/schemas/product-details-schema';

export function useProductById(id: string) {
  return useSWR(
    ['product', id],
    async () => {
      const product = await mockApi.getProductById(id);
      if (!product) {
        throw new Error('Product not found');
      }

      // Transform ProductCard to ProductDetails format
      return ProductDetailsSchema.parse({
        ...product,
        image: [product.image],
        attributes: [
          { name: 'year', value: product.year },
          { name: 'country', value: product.country },
          ...(product.rating ? [{ name: 'rating', value: product.rating.toString() }] : []),
        ],
      });
    },
    {
      revalidateOnFocus: false,
    },
  );
}
