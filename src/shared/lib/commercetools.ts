/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getCategories } from './commercetools/api.ts';

// Retrieve 'category' information and output the result to the log
getCategories()
  .then((response) => {
    response.body.results.forEach((category) => {
      const name = category.name['en-US'];
      console.log(name);
    });
  })
  .catch(console.error);
