import { z } from 'zod';

export const ProductDetailsSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.array(z.string().url()),
  // images: z.array(z.string().url()),
  price: z.number(),
  discountedPrice: z.number().optional(),
  currency: z.string(),
  rating: z.number().min(0).max(5).optional(),
  country: z.string(),
  year: z.string(),
  attributes: z.array(
    z.object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    }),
  ),
});

export type ProductDetails = z.infer<typeof ProductDetailsSchema>;
