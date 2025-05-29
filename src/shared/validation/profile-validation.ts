import { z } from 'zod';
import { email, password } from './login-validation';
import { birthDate, city, country, firstName, lastName, postcode, street } from './registration-validation';

export const addressSchema = z.object({
  country,
  city,
  street,
  postcode,
})

export type AddressFormData = z.infer<typeof addressSchema>;

export const personalInfoSchema = z.object({
  firstName,
  lastName,
  email,
  birthDate
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const newPassword = password;

export const passwordChangeSchema = z.object({
  password,
  newPassword,
})

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;