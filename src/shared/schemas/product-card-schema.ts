import { z } from 'zod';

const ProductCardSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().url(),
  price: z.number(),
  discountedPrice: z.number().optional(),
  currency: z.string(),
  rating: z.number().min(0).max(5).optional(),
  country: z.string(),
  year: z.string(),
});

export type ProductCard = z.infer<typeof ProductCardSchema>;

export const ProductCardsSchema = z.array(ProductCardSchema);
