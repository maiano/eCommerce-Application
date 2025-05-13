import { z } from 'zod';
import { email, password } from './login-validation';

const firstName = z
  .string()
  .trim()
  .min(1, 'First name is required')
  .refine((pass) => !/\d/.test(pass), 'First name must not contain any numbers')
  .refine((pass) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s-]/gu.test(pass), 'First name must not contain any special characters')
  
const lastName = z
  .string()
  .trim()
  .min(1, 'Last name is required')
  .refine((pass) => !/\d/.test(pass), 'Last name must not contain any numbers')
  .refine((pass) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s'-]/gu.test(pass), 'Last name must not contain any special characters')
 
const birthDate = z
  .string()
  .trim()
  .min(1, 'Date of birth is required')
  
  const country = z
  .string()
  .trim()
  .min(1, 'Country is required')
  
  const city = z
  .string()
  .trim()
  .min(1, 'City is required')
  .refine((pass) => !/\d/.test(pass), 'City must not contain any numbers')
  .refine((pass) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s-]/gu.test(pass), 'City must not contain any special characters')
  
  const street = z
  .string()
  .trim()
  .min(1, 'Street is required')
  
  const postcode = z
  .string()
  .trim()
  .refine((pass) => !/[a-zA-Z]/.test(pass), 'Postcode must not contain any letters')
  .refine((pass) => !/[^A-Za-z0-9]/.test(pass), 'Postcode must not contain any special characters')
  .refine((pass) => /^\b\d{5}\b/g.test(pass), 'Postcode must contain 5 digits')
  
  const isDefaultAddress = z
  .boolean()

  const deliveryAddress = z.object({
    country,
    city,
    street,
    postcode,
    isDefaultAddress,
  })

  const sameAsDelivery = z
  .boolean()

  const billingAddress = z.object({
    country,
    city,
    street,
    postcode,
    isDefaultAddress,
    sameAsDelivery,
  })

export const registrationSchema = z.object({
  email,
  password,
  firstName,
  lastName,
  birthDate,
  deliveryAddress,
  billingAddress,
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;