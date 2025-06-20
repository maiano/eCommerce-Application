import { z } from 'zod';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';

const CategorySchema = z.object({
  id: z.string(),
  name: z.record(z.string(), z.string()),
  slug: z.record(z.string(), z.string()),
});

export type Category = z.infer<typeof CategorySchema>;

const fallbackCategories: Category[] = [
  {
    id: 'fallback-1',
    slug: { 'en-US': 'red' },
    name: { 'en-US': 'Red' },
  },
  {
    id: 'fallback-2',
    slug: { 'en-US': 'white' },
    name: { 'en-US': 'White' },
  },
  {
    id: 'fallback-3',
    slug: { 'en-US': 'rose' },
    name: { 'en-US': 'Rose' },
  },
  {
    id: 'fallback-4',
    slug: { 'en-US': 'sparkling' },
    name: { 'en-US': 'Sparkling' },
  },
  {
    id: 'fallback-5',
    slug: { 'en-US': 'dessert' },
    name: { 'en-US': 'Dessert' },
  },
];

export function useCategories() {
  return useValidatedSWR(
    ['categories'],
    (client) =>
      client
        .categories()
        .get({ queryArgs: { limit: 10 } })
        .execute()
        .then((res) => res.body.results),
    z.array(CategorySchema),
    {
      fallbackData: fallbackCategories,
    },
  );
}
