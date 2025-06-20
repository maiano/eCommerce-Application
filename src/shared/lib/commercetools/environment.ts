import { z } from 'zod';

const envSchema = z.object({
  VITE_CTP_PROJECT_KEY: z.string().min(1),
  VITE_CTP_CLIENT_ID: z.string().min(1),
  VITE_CTP_CLIENT_SECRET: z.string().min(1),
  VITE_CTP_API_URL: z.string().url(),
  VITE_CTP_AUTH_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
