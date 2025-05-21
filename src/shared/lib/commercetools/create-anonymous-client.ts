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

const anonymousId = crypto.randomUUID();

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: env.VITE_CTP_CLIENT_ID,
    clientSecret: env.VITE_CTP_CLIENT_SECRET,
    anonymousId: anonymousId,
  },
  scopes: anonymousScopes,
  fetch: fetch,
  tokenCache: makeTokenCache('wine-not-anonymous-token'),
};

export const createAnonymousClient = (): ByProjectKeyRequestBuilder => {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};

export type AnonymousApiRoot = ReturnType<typeof createAnonymousClient>;
