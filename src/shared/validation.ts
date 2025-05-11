import { z } from 'zod';

const email = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Invalid email format')
  .refine(
    (email) => email.split('@')[1]?.includes('.'),
    'Email address must contain a domain name (e.g., example.com)',
  );

const password = z
  .string()
  .trim()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Must contain at least one digit (0-9)')
  .regex(
    /[!@#$%^&*]/,
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  );

export const loginSchema = z.object({
  email,
  password,
});

export type LoginFormData = z.infer<typeof loginSchema>;
