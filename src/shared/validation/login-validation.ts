import { z } from 'zod';

export const email = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Invalid email format')
  .refine(
    (email) => email.split('@')[1]?.includes('.'),
    'Email address must contain a domain name (e.g., example.com)',
  );

export const password = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Password must contain at least one digit (0-9)')
  .regex(
    /[!@#$%^&*]/,
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  )
  .refine((pass) => !/\s/.test(pass), 'Password must not contain any spaces')
  .refine((pass) => !/[<>]/.test(pass), 'Password must not contain < or >');

export const loginSchema = z.object({
  email,
  password,
});

export type LoginFormData = z.infer<typeof loginSchema>;
