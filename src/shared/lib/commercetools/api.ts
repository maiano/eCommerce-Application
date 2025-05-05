/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { apiRoot } from './client';

// Example call to return categories
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getCategories = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return apiRoot.categories().get().execute();
};
