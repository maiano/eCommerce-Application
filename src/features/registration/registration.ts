import { HttpErrorType } from '@commercetools/sdk-client-v2';
import {apiClientManager} from '../../shared/lib/commercetools/api-client-manager';
import { useLogin } from '../login/useLogin';
import { getErrorMessage } from '@/shared/utils/api-error-utils';
import { notifyError, notifySuccess } from '@/shared/utils/custom-notifications';
import { getCountryCode } from '@/shared/utils/get-country-code';
import { RegistrationFormData } from '@/shared/validation/registration-validation';

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
      notifySuccess({message: 'Account has been successfully created'});
      useLogin();
    }
  })
  .catch((error: HttpErrorType) => {
    const message = getErrorMessage(error, 'registration');
    notifyError(error, {message});
  });
}