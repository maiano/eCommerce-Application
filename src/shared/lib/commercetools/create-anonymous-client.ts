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

const projectKey = env.VITE_CTP_PROJECT_KEY;

const ANONYMOUS_ID_KEY = 'wine-not-anonymous-id';

const getAnonymousId = (): string => {
  let id = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_ID_KEY, id);
  }
  return id;
};

export const clearAnonymousId = () => {
  localStorage.removeItem(ANONYMOUS_ID_KEY);
};

const anonymousTokenCache = makeTokenCache('wine-not-anonymous-token');

export const createAnonymousClient = (options?: {
  token?: string;
}): ByProjectKeyRequestBuilder => {
  if (options?.token) {
    anonymousTokenCache.set({
      token: options.token,
      expirationTime: Date.now() + 3600 * 1000,
    });
  }

  const authOptions: AnonymousAuthMiddlewareOptions = {
    host: env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: env.VITE_CTP_CLIENT_ID,
      clientSecret: env.VITE_CTP_CLIENT_SECRET,
      anonymousId: getAnonymousId(),
    },
    scopes: anonymousScopes,
    fetch,
    tokenCache: {
      get: () => {
        const token = anonymousTokenCache.get();
        console.log('TokenCache.get() called, returning:', token);
        return token;
      },
      set: (token) => {
        console.log('TokenCache.set() called with:', token);
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
