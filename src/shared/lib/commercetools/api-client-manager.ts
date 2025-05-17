import {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { createAnonymousClient } from './create-anonymous-client';
import { createPasswordClient } from '@/shared/lib/commercetools/create-password-client';
import { useAuthStore } from '@/shared/lib/commercetools/auth-state'

type ApiRoot = ReturnType<
  typeof createAnonymousClient | typeof createPasswordClient
>;

let currentClient: ApiRoot | null = null;

export const initApiClient = (): ApiRoot => {
  currentClient = createAnonymousClient();
  return currentClient;
};

export const registerCustomer = (
  body: MyCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return getCurrentClient().me().signup().post({ body }).execute();
};

export const loginCustomer = async (
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
      useAuthStore.getState().login();
      return response;
    });
};

export const logoutCustomer = () => {
  currentClient = createAnonymousClient();
  useAuthStore.getState().logout();
};

export const getCurrentClient = (): ApiRoot => {
  if (!currentClient) {
    return initApiClient();
  }
  return currentClient;
};
