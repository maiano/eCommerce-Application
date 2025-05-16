import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { AnonymousAuthMiddlewareOptions } from './auth-config.ts';
import { env } from './environment';
import { httpMiddlewareOptions } from './http-config.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

export const createAnonymousClient = (): ByProjectKeyRequestBuilder => {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(AnonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};

export type AnonymousApiRoot = ReturnType<typeof createAnonymousClient>;
