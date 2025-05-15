import { apiRoot } from './create-anonymous-client.ts';

export const getCategories = () => {
  return apiRoot.categories().get().execute();
};
