/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import fetch from 'isomorphic-fetch';
import { env } from './environment.ts';

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions = {
  host: env.VITE_CTP_API_URL,
  fetch: fetch,
};
