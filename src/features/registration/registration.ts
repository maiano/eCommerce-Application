import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import {apiClientManager} from './../../shared/lib/commercetools/api-client-manager';
import { notifyError, notifySuccess } from '@/shared/utils/custom-notifications';
import { RegistrationFormData } from '@/shared/validation/registration-validation';

const countryCodes = {
  "Italy": "IT",
  "France": "FR",
  "Spain": "ES",
}

export const countries = [
  'Italy',
  'France',
  'Spain',
];

export const getCountryCode = (country: string) => {
  return Object.values(countryCodes)[Object.keys(countryCodes).indexOf(country)];
}

export const registrationHandler = async (data: RegistrationFormData) => {
  await apiClientManager.register({
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birthDate,
    addresses: [
      {
        country: getCountryCode(data.deliveryAddress.country),
        streetName: data.deliveryAddress.street,
        postalCode: data.deliveryAddress.postcode,
        city: data.deliveryAddress.city,
      },
      {
        country: getCountryCode(data.billingAddress.country),
        streetName: data.billingAddress.street,
        postalCode: data.billingAddress.postcode,
        city: data.billingAddress.city,
      }
    ],
    defaultShippingAddress: data.deliveryAddress.isDefaultAddress ? 0 : undefined,
    defaultBillingAddress: data.billingAddress.isDefaultAddress ? 1 : undefined,
    shippingAddresses: [0],
    billingAddresses: [1],
  })
  .then(async(response) => {
    if (response.statusCode === 201) {
      notifySuccess({message: 'Account has been successfully created'})
    }
  })
  .catch((error: ClientResponse<CustomerSignInResult>) => {
    if (error.statusCode === 400) {
      notifyError(error,{message: 'Account with this email already exist. Log in or use another email'})
    } else {
      notifyError(error,{message: 'Something went wrong'})
    }
  });

}