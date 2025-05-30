import { z } from 'zod';
import { useValidatedSWR } from '@/shared/hooks/custom-use-swr';

const CategorySchema = z.object({
  id: z.string(),
  name: z.record(z.string(), z.string()),
  slug: z.record(z.string(), z.string()),
});

export type Category = z.infer<typeof CategorySchema>;

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
  );
}
