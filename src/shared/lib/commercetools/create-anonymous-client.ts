import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { AnonymousAuthMiddlewareOptions } from './auth-config.ts';
import { env } from './environment';
import { httpMiddlewareOptions } from './http-config.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withAnonymousSessionFlow(AnonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

console.log('Anonymous client created');

export const apiRootAnonymous = createApiBuilderFromCtpClient(
  ctpClient,
).withProjectKey({
  projectKey,
});
