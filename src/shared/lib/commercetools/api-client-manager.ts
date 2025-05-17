import {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import { createAnonymousClient } from './create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';

type ApiRoot = ReturnType<
  typeof createAnonymousClient | typeof createPasswordClient
>;

export const apiClientManager = (() => {
  let client: ApiRoot | null = null;

  const get = (): ApiRoot => {
    if (!client) {
      throw new Error('client not initialized');
    }
    return client;
  };

  const init = () => {
    if (!client) {
      client = createAnonymousClient();
    }
  };

  const register = (
    body: CustomerDraft,
  ): Promise<ClientResponse<CustomerSignInResult>> => {
    return get().customers().post({ body }).execute()
  };

  const login = async (
    credentials: CustomerSignin,
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
    client = createAnonymousClient();
  };

  return {
    get,
    init,
    login,
    register,
    logout,
  };
})();
