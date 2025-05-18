import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'isomorphic-fetch';
import { env } from './environment';
import { httpMiddlewareOptions } from './http-config.ts';
import { customerPasswordFlowScopes } from './scopes.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

const buildPasswordFlowOptions = (
  username: string,
  password: string,
): PasswordAuthMiddlewareOptions => ({
  host: env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: env.VITE_CTP_CLIENT_ID,
    clientSecret: env.VITE_CTP_CLIENT_SECRET,
    user: { username, password },
  },
  scopes: customerPasswordFlowScopes,
  fetch,
});

export const createPasswordClient = (
  username: string,
  password: string,
): ByProjectKeyRequestBuilder => {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(buildPasswordFlowOptions(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey,
  });
};

export type PasswordApiRoot = ReturnType<typeof createPasswordClient>;
