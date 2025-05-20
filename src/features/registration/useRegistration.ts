import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools';
import { getErrorMessage } from '@/shared/utils/api-error-utils';
import {
  notifyError,
  notifySuccess,
} from '@/shared/utils/custom-notifications';
import {
  createCustomerDraft,
  getAddressIndexes,
} from '@/shared/utils/customer-draft-utils';
import { RegistrationFormData } from '@/shared/validation/registration-validation';

export function useRegistration() {
  const { login, setPending } = useAuthStore();

  const registerUser = async (
    data: RegistrationFormData,
    sameAddress: boolean,
  ) => {
    setPending();

    try {
      const draft = createCustomerDraft(data, sameAddress);
      const addressIndexes = getAddressIndexes(sameAddress);

      const response = await apiClientManager.register(
        Object.assign(draft, addressIndexes),
      );

      if (response.statusCode === 201) {
        notifySuccess({ message: 'Account created successfully' });
        await login();
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'registration');
      notifyError(err, { message });
      useAuthStore.getState().setUnauthenticated();
    } finally {
    }
  };

  return { registerUser };
}
