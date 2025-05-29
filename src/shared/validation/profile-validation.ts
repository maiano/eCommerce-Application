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
const confirmNewPassword = password

export const passwordChangeSchema = z.object({
  password,
  newPassword,
  confirmNewPassword,
})
.refine((data) => data.newPassword === data.confirmNewPassword, { message: 'Passwords do not match', path: ['confirmNewPassword']})
.refine((data) => data.newPassword !== data.password, { message: 'New password must be different from current password', path: ['newPassword']});

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;