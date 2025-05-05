/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import fetch from 'isomorphic-fetch';

import { z } from 'zod';

const envSchema = z.object({
  VITE_CTP_PROJECT_KEY: z.string().min(1),
  VITE_CTP_CLIENT_ID: z.string().min(1),
  VITE_CTP_CLIENT_SECRET: z.string().min(1),
  VITE_CTP_API_URL: z.string().url(),
  VITE_CTP_AUTH_URL: z.string().url(),
});

const env = envSchema.parse(import.meta.env);

const projectKey = env.VITE_CTP_PROJECT_KEY;

// for unauthorized users
const scopes = [
  'view_published_products:<project-key>',
  'view_categories:<project-key>',
].map((scope) => scope.replace('<project-key>', projectKey));

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: env.VITE_CTP_CLIENT_ID,
    clientSecret: env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch: fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: env.VITE_CTP_API_URL,
  fetch: fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

// Example call to return categories
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getCategories = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return apiRoot.categories().get().execute();
};

// Retrieve 'category' information and output the result to the log
getCategories()
  .then((response) => {
    response.body.results.forEach((category) => {
      const name = category.name['en-US'];
      console.log(name);
    });
  })
  .catch(console.error);
