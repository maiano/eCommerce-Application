import {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { createAnonymousClient } from '@/shared/lib/commercetools/create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';
import { createRefreshClient } from '@/shared/lib/commercetools/create-refresh-client';
import {
  isEmptyToken,
  makeTokenCache,
} from '@/shared/lib/commercetools/token-cache';
import { debug } from '@/shared/utils/debug-log';

type AnonymousApiRoot = ReturnType<typeof createAnonymousClient>;
type PasswordApiRoot = ReturnType<typeof createPasswordClient>;
type RefreshApiRoot = ReturnType<typeof createRefreshClient>;

type ApiRoot = AnonymousApiRoot | PasswordApiRoot | RefreshApiRoot;

type AuthType = 'anonymous' | 'password' | 'refresh';

type MyExtendedCustomerSignin = MyCustomerSignin & {
  anonymousId?: string;
  activeCartSignInMode?:
    | 'MergeWithExistingCustomerCart'
    | 'UseAsNewActiveCustomerCart';
  updateProductData?: boolean;
};

export const apiClientManager = (() => {
  let client: ApiRoot | null = null;
  let authType: AuthType = 'anonymous';

  const passwordTokenCache = makeTokenCache('wine-not-password-token');
  const anonymousTokenCache = makeTokenCache('wine-not-anonymous-token');

  const get = (): ApiRoot => {
    if (!client) {
      throw new Error('client not initialized');
    }
    return client;
  };

  const init = async (force = false) => {
    if (client && !force) {
      return { client, authType };
    }

    debug('initializing client');

    if (!force) {
      const restoredClient = restore();
      if (restoredClient) {
        debug('Client restored from cache');
        client = restoredClient.client;
        authType = restoredClient.authType;
        return { client, authType };
      }
    }
    debug('creating new anonymous client');
    client = createAnonymousClient();
    authType = 'anonymous';

    try {
      await client
        .categories()
        .get({ queryArgs: { limit: 1 } })
        .execute();
    } catch (error) {
      console.error('Anonymous client init failed:', error);
    }
    return { client, authType };
  };

  const register = (
    body: MyCustomerDraft,
  ): Promise<ClientResponse<CustomerSignInResult>> => {
    const draft = {
      ...body,
      anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    };

    return get().me().signup().post({ body: draft }).execute();
  };

  const login = async (
    credentials: MyCustomerSignin,
  ): Promise<ClientResponse<CustomerSignInResult>> => {
    const authClient = createPasswordClient(
      credentials.email,
      credentials.password,
    );

    const body: MyExtendedCustomerSignin = {
      ...credentials,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
      updateProductData: true,
    };

    return await authClient
      .me()
      .login()
      .post({ body })
      .execute()
      .then((response) => {
        client = authClient;
        authType = 'password';
        const token = passwordTokenCache.get();
        if (token?.token) {
          passwordTokenCache.set(token);
        }
        return response;
      });
  };

  const logout = () => {
    debug('Logging out...');
    passwordTokenCache.clear();
    const restored = restore();
    if (restored) {
      client = restored.client;
      authType = restored.authType;
    } else {
      client = createAnonymousClient();
      authType = 'anonymous';
    }
  };

  const restore = (): { client: ApiRoot; authType: AuthType } | null => {
    const passwordToken = passwordTokenCache.get();
    if (passwordToken.token && passwordToken.refreshToken) {
      try {
        debug('restore pass: ', passwordToken);
        return {
          client: createRefreshClient('wine-not-password-token'),
          authType: 'password',
        };
      } catch {
        passwordTokenCache.clear();
      }
    }

    const anonymousToken = anonymousTokenCache.get();
    if (!isEmptyToken(anonymousToken) && anonymousToken.refreshToken) {
      try {
        debug('restore anonymous refresh: ', anonymousToken);
        return {
          client: createRefreshClient('wine-not-anonymous-token'),
          authType: 'anonymous',
        };
      } catch {
        anonymousTokenCache.clear();
      }
    }

    debug('no valid sessions');
    return null;
  };

  return {
    get,
    init,
    login,
    register,
    logout,
    getAuthType: () => authType,
  };
})();
