import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { useAuthStore } from '@/features/auth/auth-state';
import { useCartStore } from '@/shared/hooks/useCartStore';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
import { getErrorMessage } from '@/shared/utils/api-error-utils';
import {
  notifySuccess,
  notifyError,
} from '@/shared/utils/custom-notifications';

export function useLogin() {
  const { setAuthenticated, setPending, setUnauthenticated } = useAuthStore();
  const { fetchCart } = useCartStore();

  const login = async (credentials: MyCustomerSignin) => {
    setPending();

    try {
      const result = await apiClientManager.login(credentials);
      setAuthenticated();

      await fetchCart();
      notifySuccess({
        message: `Welcome back, ${credentials.email}`,
      });

      return result;
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'login');

      notifyError(err as Error, {
        message,
      });

      setUnauthenticated();
    }
  };

  return {
    login,
  };
}
