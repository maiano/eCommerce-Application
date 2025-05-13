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
  // .date()
  // .trim()
  // .min(8, 'Date of birth is required')
  // .regex(/\d{2}\.\d{2}\.\d{4}/)

  
  const deliveryCountry = z
  .string()
  .trim()
  .min(1, 'Country is required')
  
  const deliveryCity = z
  .string()
  .trim()
  .min(1, 'City is required')
  .refine((pass) => !/\d/.test(pass), 'City must not contain any numbers')
  .refine((pass) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s-]/gu.test(pass), 'City must not contain any special characters')
  
  const deliveryStreet = z
  .string()
  .trim()
  .min(1, 'Street is required')
  
  const deliveryPostcode = z
  .string()
  .trim()
  .refine((pass) => !/[a-zA-Z]/.test(pass), 'Postcode must not contain any letters')
  .refine((pass) => !/[^A-Za-z0-9]/.test(pass), 'Postcode must not contain any special characters')
  .refine((pass) => /^\b\d{5}\b/g.test(pass), 'Postcode must contain 5 digits')
  
  const isDefaultDeliveryAddress = z
  .boolean()

  const deliveryAddress = z.object({
    deliveryCountry,
    deliveryCity,
    deliveryStreet,
    deliveryPostcode,
    isDefaultDeliveryAddress,
  })

  const billingCountry = deliveryCountry;
  const billingCity = deliveryCity;
  const billingStreet = deliveryStreet;
  const billingPostcode = deliveryPostcode;
  const isDefaultBillingAddress = isDefaultDeliveryAddress;
  const sameAsDelivery = z
  .boolean()

  const billingAddress = z.object({
    billingCountry,
    billingCity,
    billingStreet,
    billingPostcode,
    isDefaultBillingAddress,
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