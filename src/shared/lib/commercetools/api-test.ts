// temporarily for API testing

import { createAnonymousClient } from './create-anonymous-client.ts';

export const getCategories = () => {
  return createAnonymousClient().categories().get().execute();
};

getCategories()
  .then((response) => {
    response.body.results.forEach((category) => {
      const name = category.name['en-US'];
      console.log(name);
    });
  })
  .catch(console.error);
