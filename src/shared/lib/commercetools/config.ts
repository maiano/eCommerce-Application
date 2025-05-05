/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import fetch from 'isomorphic-fetch';
import { env } from './environment.ts';

const projectKey = env.VITE_CTP_PROJECT_KEY;

// for unauthorized users
const scopes = [
  'view_published_products:<project-key>',
  'view_categories:<project-key>',
].map((scope) => scope.replace('<project-key>', projectKey));

// Configure authMiddlewareOptions
export const authMiddlewareOptions = {
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
export const httpMiddlewareOptions = {
  host: env.VITE_CTP_API_URL,
  fetch: fetch,
};
