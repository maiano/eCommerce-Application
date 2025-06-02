import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductDetails } from '@/shared/schemas/product-details-schema';

export function mapProductToDetails(
  product: ProductProjection,
): ProductDetails {
  const variant = product.masterVariant;
  const priceInfo = variant.prices?.[0];

  const attributesArray = variant.attributes ?? [];

  const attributes = Object.fromEntries(
    attributesArray.map((attr) => [attr.name, attr.value]),
  );

  const rating =
    typeof attributes.rating === 'string'
      ? parseFloat(attributes.rating)
      : undefined;

  const country =
    typeof attributes.country === 'string' ? attributes.country : '';

  const year = typeof attributes.year === 'string' ? attributes.year : '';

  return {
    id: product.id,
    key: product.key ?? '',
    name: product.name['en-US'] ?? '',
    description: product.description?.['en-US'] ?? '',
    image: (variant.images ?? []).map((img) => img.url),
    // images: variant.images?.map((img) => img.url) ?? [],
    price: priceInfo?.value.centAmount ? priceInfo.value.centAmount / 100 : 0,
    discountedPrice: priceInfo?.discounted?.value.centAmount
      ? priceInfo.discounted.value.centAmount / 100
      : undefined,
    currency: priceInfo?.value.currencyCode ?? 'EUR',
    rating:
      rating && !isNaN(rating) ? Math.min(Math.max(rating, 0), 5) : undefined,
    country,
    year,
    attributes: attributesArray,
  };
}
