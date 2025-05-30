import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools"
import { notifyError, notifySuccess } from "@/shared/utils/custom-notifications";

export async function deleteAddress(id: string | undefined) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const res = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: [
            {
              action: 'removeAddress',
              addressId: id,
            }
          ],
        }
      }).execute();
      return res;
    } catch (error) {
      console.error('failed to delete address', error);
    }
    }
}

export async function updateAddress (id: string | undefined, country: string, city: string, street: string, postcode: string) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const response = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: [
            {
              action: 'changeAddress',
              addressId: id,
              address: {
                country: country,
                city: city,
                streetName: street,
                postalCode: postcode,
              }
            }
          ],
        }
      }).execute();
      if (response.statusCode === 200) {
        notifySuccess({ message: 'Address has been updated' });
      }
      return response;
    } catch (error) {
      if (error as ClientResponse<Customer>) {
        notifyError(error, { message: 'Something went wrong. Try again' })
      }
    }
  }
}

export async function addAddress (country: string, city: string, street: string, postcode: string) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const response = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: [
            {
              action: 'addAddress',
              address: {
                country: country,
                city: city,
                streetName: street,
                postalCode: postcode,
              }
            }
          ],
        }
      }).execute();
      if (response.statusCode === 200) {
        notifySuccess({ message: 'Address has been successfully added' });
      }
      return response;
    } catch (error) {
      if (error as ClientResponse<Customer>) {
        notifyError(error, { message: 'Something went wrong. Try again' })
      }
    }
  }
}