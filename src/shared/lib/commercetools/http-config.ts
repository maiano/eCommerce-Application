import fetch from 'isomorphic-fetch';
import { env } from './environment.ts';

export const httpMiddlewareOptions = {
  host: env.VITE_CTP_API_URL,
  fetch: fetch,
};
