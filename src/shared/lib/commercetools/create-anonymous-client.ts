import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { env } from './environment';
import { httpMiddlewareOptions } from './http-config.ts';
import { anonymousScopes } from '@/shared/lib/commercetools/scopes.ts';
import { makeTokenCache } from '@/shared/lib/commercetools/token-cache.ts';
import { debug } from '@/shared/utils/debug-log.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

const anonymousTokenCache = makeTokenCache('wine-not-anonymous-token');

export const createAnonymousClient = (
  force = false,
): ByProjectKeyRequestBuilder => {
  if (force) {
    anonymousTokenCache.clear();
    debug('anonymousTokenCache cleared with force');
  }

  const authOptions: AnonymousAuthMiddlewareOptions = {
    host: env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: env.VITE_CTP_CLIENT_ID,
      clientSecret: env.VITE_CTP_CLIENT_SECRET,
    },
    scopes: anonymousScopes,
    fetch,
    tokenCache: {
      get: () => {
        const token = anonymousTokenCache.get();
        debug('token-cache:get', token);
        return token;
      },
      set: (token) => {
        debug('token-cache:set', token);
        anonymousTokenCache.set(token);
        return token;
      },
    },
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(authOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};

export type AnonymousApiRoot = ReturnType<typeof createAnonymousClient>;
