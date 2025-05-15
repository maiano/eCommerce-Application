import fetch from 'isomorphic-fetch';
import { env } from './environment';

const projectKey = env.VITE_CTP_PROJECT_KEY;

const anonymousId = crypto.randomUUID();

// for unauthorized users
const scopes = [
  'view_published_products:<project-key>',
  'view_categories:<project-key>',
  'create_anonymous_token:<project-key>',
].map((scope) => scope.replace('<project-key>', projectKey));

// Configure authMiddlewareOptions
export const AnonymousAuthMiddlewareOptions = {
  host: env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: env.VITE_CTP_CLIENT_ID,
    clientSecret: env.VITE_CTP_CLIENT_SECRET,
    anonymousId: anonymousId,
  },
  scopes,
  fetch: fetch,
};
