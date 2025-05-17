import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { notifications } from "@mantine/notifications";
import {apiClientManager} from './../../shared/lib/commercetools/api-client-manager';
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

const showNotification = async (message: string, color: string) => {
  notifications.show({
    message: `${message}`,
    color: `${color}`,
    autoClose: 5000,
    withCloseButton: true,
  })
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
      await showNotification("Account has been successfully created", "green");
     // redirect
    }
  })
  .catch((error: ClientResponse<CustomerSignInResult>) => {
    if (error.statusCode === 400) {
      showNotification("Account with this email already exist. Log in or use another email", "red");
    } else {
      showNotification("Something went wrong", "red");
    }
  });

}