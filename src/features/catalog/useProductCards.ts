import { ProductProjection } from '@commercetools/platform-sdk';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';
import {
  ProductCard,
  ProductCardsSchema,
} from '@/shared/schemas/product-card-schema';

export function mapProductToCard(product: ProductProjection): ProductCard {
  const variant = product.masterVariant;
  const priceInfo = variant.prices?.[0];

  const attributes = Object.fromEntries(
    (variant.attributes ?? []).map((attr) => [attr.name, attr.value]),
  );

  const ratingAttribute: unknown = attributes.rating;
  const rating =
    typeof ratingAttribute === 'string'
      ? parseFloat(String(ratingAttribute))
      : undefined;

  const country =
    typeof attributes.country === 'string' ? attributes.country : '';
  const year = typeof attributes.year === 'string' ? attributes.year : '';

  const description =
    product.description && typeof product.description['en-US'] === 'string'
      ? product.description['en-US']
      : undefined;

  return {
    id: product.id,
    key: product.key ?? '',
    name: product.name['en-US'],
    image: variant.images?.[0]?.url ?? '',
    price: priceInfo?.value.centAmount ? priceInfo.value.centAmount / 100 : 0,
    discountedPrice: priceInfo?.discounted?.value.centAmount
      ? priceInfo.discounted.value.centAmount / 100
      : undefined,
    currency: priceInfo?.value.currencyCode ?? 'EUR',
    rating:
      rating && !isNaN(rating) ? Math.min(Math.max(rating, 0), 5) : undefined,
    country,
    year,
    description,
  };
}

export function useProductCards() {
  return useValidatedSWR(
    ['products'],
    async (client) => {
      const response = await client
        .productProjections()
        .get({ queryArgs: { limit: 8 } })
        .execute();
      return response.body.results.map(mapProductToCard);
    },
    ProductCardsSchema,
  );
}
