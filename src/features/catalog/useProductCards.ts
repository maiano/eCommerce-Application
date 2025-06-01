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

const sortMap: Record<string, string> = {
  price_asc: 'price asc',
  price_desc: 'price desc',
  rating_desc: 'variants.attributes.rating desc',
  rating_asc: 'variants.attributes.rating asc',
  year_desc: 'variants.attributes.year desc',
  year_asc: 'variants.attributes.year asc',
};

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
          ? categoryIds.map((id) => `categories.id:"${id}"`)
          : [];

      const mappedSort = sortBy ? sortMap[sortBy] : undefined;

      const response = await client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 8,
            offset: (page - 1) * 8,
            ...(mappedSort ? { sort: [mappedSort] } : {}),
            ...(filter.length > 0 ? { filter } : {}),
          },
        })
        .execute();
      return response.body.results.map(mapProductToCard);
    },
    ProductCardsSchema,
  );
}
