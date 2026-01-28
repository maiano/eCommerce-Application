import useSWR from 'swr';
import { z } from 'zod';
import { mockApi } from '@/data/mock/mock-api';

const CategorySchema = z.object({
  id: z.string(),
  name: z.record(z.string(), z.string()),
  slug: z.record(z.string(), z.string()),
});

export type Category = z.infer<typeof CategorySchema>;

export function useCategories() {
  return useSWR(
    ['categories'],
    async () => {
      const data = await mockApi.getCategories();
      return z.array(CategorySchema).parse(data);
    },
    {
      revalidateOnFocus: false,
    },
  );
}
