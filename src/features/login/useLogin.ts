import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { useState } from 'react';

import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
import { getErrorMessage } from '@/shared/utils/api-error-utils';
import {
  notifySuccess,
  notifyError,
} from '@/shared/utils/custom-notifications';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const loginState = useAuthStore();

  const login = async (credentials: MyCustomerSignin) => {
    setLoading(true);
    loginState.setPending();

    try {
      const result = await apiClientManager.login(credentials);
      loginState.login();

      notifySuccess({
        message: `Welcome back, ${credentials.email}`,
      });

      return result;
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'login');

      notifyError(err as Error, {
        message,
      });

      loginState.setUnauthenticated();
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}
