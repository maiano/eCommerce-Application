// temporarily for API testing

import { apiRootAnonymous } from './create-anonymous-client.ts';

export const getCategories = () => {
  return apiRootAnonymous.categories().get().execute();
};

// Retrieve 'category' information and output the result to the log
getCategories()
  .then((response) => {
    response.body.results.forEach((category) => {
      const name = category.name['en-US'];
      console.log(name);
    });
  })
  .catch(console.error);
