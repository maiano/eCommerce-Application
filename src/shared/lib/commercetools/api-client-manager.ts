import {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { createAnonymousClient } from './create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';
import { createRefreshClient } from '@/shared/lib/commercetools/create-refresh-client';

type ApiRoot = ReturnType<
  | typeof createAnonymousClient
  | typeof createPasswordClient
  | typeof createRefreshClient
>;

export const apiClientManager = (() => {
  let client: ApiRoot | null = null;

  const get = (): ApiRoot => {
    if (!client) {
      throw new Error('client not initialized');
    }
    return client;
  };

  const init = (force = false) => {
    if (!client || force) {
      client = createAnonymousClient();
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
    client = null;
  };

  return {
    get,
    init,
    login,
    register,
    logout,
  };
})();
