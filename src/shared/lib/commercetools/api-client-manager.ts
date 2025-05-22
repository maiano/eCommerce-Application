import {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import {
  clearAnonymousId,
  createAnonymousClient,
} from '@/shared/lib/commercetools/create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';
import { createRefreshClient } from '@/shared/lib/commercetools/create-refresh-client';
import {
  isEmptyToken,
  makeTokenCache,
} from '@/shared/lib/commercetools/token-cache';

type ApiRoot = ReturnType<
  | typeof createAnonymousClient
  | typeof createPasswordClient
  | typeof createRefreshClient
>;

export const apiClientManager = (() => {
  let client: ApiRoot | null = null;

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
      return;
    }

    console.log('initializing client');

    if (!force) {
      const restoredClient = restore();
      if (restoredClient) {
        console.log('Client restored from cache');
        client = restoredClient;
        return;
      }
    }
    console.log('creating new anonymous client');
    client = createAnonymousClient();

    try {
      await client
        .categories()
        .get({ queryArgs: { limit: 1 } })
        .execute();
    } catch (error) {
      console.error('Anonymous client init failed:', error);
    }
  };

  const register = (
    body: MyCustomerDraft,
  ): Promise<ClientResponse<CustomerSignInResult>> => {
    return get().me().signup().post({ body }).execute();
  };

  const login = async (
    credentials: MyCustomerSignin,
  ): Promise<ClientResponse<CustomerSignInResult>> => {
    const authClient = createPasswordClient(
      credentials.email,
      credentials.password,
    );
    return await authClient
      .me()
      .login()
      .post({ body: credentials })
      .execute()
      .then((response) => {
        client = authClient;
        return response;
      });
  };

  const logout = () => {
    console.log('Logging out...');
    passwordTokenCache.clear();
    client = restore() || createAnonymousClient();
  };

  const restore = () => {
    const passwordToken = passwordTokenCache.get();
    if (passwordToken.token && passwordToken.refreshToken) {
      try {
        console.log('restore pass: ', passwordToken);
        return createRefreshClient('wine-not-password-token');
      } catch {
        passwordTokenCache.clear();
      }
    }

    const anonymousToken = anonymousTokenCache.get();
    if (!isEmptyToken(anonymousToken) && anonymousToken.refreshToken) {
      try {
        console.log('restore anonym refresh: ', anonymousToken);
        return createRefreshClient('wine-not-anonymous-token');
      } catch {
        anonymousTokenCache.clear();
        clearAnonymousId();
      }
    }

    console.log('no valid sessions');
    return null;
  };

  return {
    get,
    init,
    login,
    register,
    logout,
  };
})();
