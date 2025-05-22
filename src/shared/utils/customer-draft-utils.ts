import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { getCountryCode } from '@/shared/utils/get-country-code';
import { RegistrationFormData } from '@/shared/validation/registration-validation';

export const createCustomerDraft = (
  data: RegistrationFormData,
  sameAddress: boolean,
): MyCustomerDraft => {
  const addresses = [
    {
      country: getCountryCode(data.deliveryAddress.country),
      streetName: data.deliveryAddress.street,
      postalCode: data.deliveryAddress.postcode,
      city: data.deliveryAddress.city,
    },
    ...(sameAddress
      ? []
      : [
          {
            country: getCountryCode(data.billingAddress.country),
            streetName: data.billingAddress.street,
            postalCode: data.billingAddress.postcode,
            city: data.billingAddress.city,
          },
        ]),
  ];

  return {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birthDate,
    addresses,
    defaultShippingAddress: data.deliveryAddress.isDefaultAddress
      ? 0
      : undefined,
    defaultBillingAddress: data.billingAddress.isDefaultAddress
      ? sameAddress
        ? 0
        : 1
      : undefined,
  };
};

export const getAddressIndexes = (sameAddress: boolean) => ({
  shippingAddresses: [0],
  billingAddresses: sameAddress ? [0] : [1],
});
