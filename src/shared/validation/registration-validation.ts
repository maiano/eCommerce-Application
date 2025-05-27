import { z } from 'zod';
import { email, password } from './login-validation';

const firstName = z
  .string()
  .trim()
  .min(1, 'First name is required')
  .refine((val) => !/\d/.test(val), 'First name must not contain any numbers')
  .refine(
    (val) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s-]/gu.test(val),
    'First name must not contain any special characters',
  );

const lastName = z
  .string()
  .trim()
  .min(1, 'Last name is required')
  .refine((val) => !/\d/.test(val), 'Last name must not contain any numbers')
  .refine(
    (val) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s'-]/gu.test(val),
    'Last name must not contain any special characters',
  );

const birthDate = z
  .string()
  .min(1, 'Date of birth is required')
  .refine(
    (val) =>
      new Date().getTime() >=
      new Date(
        new Date(Date.parse(val)).getFullYear() + 18,
        new Date(Date.parse(val)).getMonth(),
        new Date(Date.parse(val)).getDate(),
      ).getTime(),
    'You must be at least 18 years old',
  )
  .optional()
  .refine((val) => val !== undefined, 'Date of birth is required');

const country = z
  .string()
  .min(1, 'Country is required')
  .optional()
  .refine((val) => val !== undefined, 'Country is required');

const city = z
  .string()
  .trim()
  .min(1, 'City is required')
  .refine((val) => !/\d/.test(val), 'City must not contain any numbers')
  .refine(
    (val) => !/[^A-Za-z0-9\u0401\u0451\u0410-\u044f\s-]/gu.test(val),
    'City must not contain any special characters',
  );

const street = z.string().trim().min(1, 'Street is required');

const postcode = z
  .string()
  .trim()
  .refine(
    (val) => !/[a-zA-Z]/.test(val),
    'Postcode must not contain any letters',
  )
  .refine(
    (val) => !/[^A-Za-z0-9]/.test(val),
    'Postcode must not contain any special characters',
  )
  .refine((val) => /^\b\d{5}\b/g.test(val), 'Postcode must contain 5 digits');

const isDefaultAddress = z
  .boolean();

const deliveryAddress = z.object({
  country,
  city,
  street,
  postcode,
  isDefaultAddress,
});

const sameAsDelivery = z.boolean();

const billingAddress = z.object({
  country,
  city,
  street,
  postcode,
  isDefaultAddress,
  sameAsDelivery,
});

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

export const addressSchema = z.object({
  country,
  city,
  street,
  postcode,
})

export type AddressFormData = z.infer<typeof addressSchema>;