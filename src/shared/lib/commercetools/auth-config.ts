import fetch from 'isomorphic-fetch';
import { env } from './environment';
import { anonymousScopes } from './scopes';

const projectKey = env.VITE_CTP_PROJECT_KEY;

const anonymousId = crypto.randomUUID();

export const AnonymousAuthMiddlewareOptions = {
  host: env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: env.VITE_CTP_CLIENT_ID,
    clientSecret: env.VITE_CTP_CLIENT_SECRET,
    anonymousId: anonymousId,
  },
  scopes: anonymousScopes,
  fetch: fetch,
};
