import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'isomorphic-fetch';
import { env } from './environment';
import { httpMiddlewareOptions } from './http-config.ts';
import {
  makeTokenCache,
  TokenKey,
} from '@/shared/lib/commercetools/token-cache.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

export const createRefreshClient = (
  token: TokenKey,
): ByProjectKeyRequestBuilder | null => {
  const tokenCache = makeTokenCache(token);
  const refreshToken = tokenCache.get()?.refreshToken;

  if (!refreshToken) {
    return null;
  }

  const buildRefreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: env.VITE_CTP_CLIENT_ID,
      clientSecret: env.VITE_CTP_CLIENT_SECRET,
    },
    fetch,
    refreshToken,
    tokenCache,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withRefreshTokenFlow(buildRefreshAuthMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};

export type RefreshApiRoot = ReturnType<typeof createRefreshClient>;
