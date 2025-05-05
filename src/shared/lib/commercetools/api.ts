/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { apiRoot } from './create-anonymous-client.ts';

export const getCategories = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return apiRoot.categories().get().execute();
};
