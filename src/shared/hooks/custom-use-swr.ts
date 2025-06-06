import useSWR, { SWRConfiguration } from 'swr';
import { ZodError, type ZodSchema } from 'zod';
import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
import { debug } from '@/shared/utils/debug-log';

export function useValidatedSWR<T>(
  key: string | [string, ...unknown[]],
  fetcherFn: (
    client: ReturnType<typeof apiClientManager.get>,
  ) => Promise<unknown>,
  schema: ZodSchema<T>,
  options?: SWRConfiguration<T>,
) {
  const clientReady = useAuthStore((s) => s.clientReady);

  return useSWR<T>(
    clientReady ? key : null,
    async () => {
      try {
        debug(`fetching data for key: ${JSON.stringify(key)}`);
        const client = apiClientManager.get();
        const data = await fetcherFn(client);
        return schema.parse(data);
      } catch (error) {
        debug('validation or fetch failed:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: (error) => {
        return !(error instanceof ZodError);
      },
      ...options,
    },
  );
}
