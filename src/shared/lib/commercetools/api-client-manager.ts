import {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { createAnonymousClient } from './create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';

type ApiRoot = ReturnType<
  typeof createAnonymousClient | typeof createPasswordClient
>;

let currentClient: ApiRoot | null = null;

export const initApiClient = (): ApiRoot => {
  currentClient = createAnonymousClient();
  return currentClient;
};

export const register = (
  body: MyCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return createAnonymousClient().me().signup().post({ body }).execute();
};

export const login = async (
  credentials: CustomerSignin,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = createPasswordClient(credentials.email, credentials.password);
  return await client
    .me()
    .login()
    .post({ body: credentials })
    .execute()
    .then((response) => {
      currentClient = client;
      return response;
    });
};

export const logout = () => {
  currentClient = createAnonymousClient();
};

export const getCurrentClient = (): ApiRoot => {
  if (!currentClient) {
    return initApiClient();
  }
  return currentClient;
};
