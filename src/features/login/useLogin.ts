import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { HttpErrorType } from '@commercetools/sdk-client-v2';
import { useState } from 'react';

import { useAuthStore } from '@/features/auth/auth-state';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
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
      let message = 'An unexpected error occurred';

      if (isCommerceToolsError(err)) {
        const statusCode = err.body?.statusCode;

        if (statusCode === 400 || statusCode === 401) {
          message = 'Invalid email or password';
        } else if (statusCode === 403) {
          message = 'Access denied';
        } else {
          message = 'Login failed. Please try again later';
        }
      } else {
        message = 'Network error. Please check your connection';
      }

      notifyError(err as Error, {
        message,
      });

      loginState.logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}

function isCommerceToolsError(error: unknown): error is HttpErrorType {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof (error as HttpErrorType).body === 'object'
  );
}
