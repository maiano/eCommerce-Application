import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools"

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
      }).execute()
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
      const res = await client.me().post({
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
      }).execute()
      return res;
    } catch (error) {
      console.error('failed to update address', error);
    }
    }
}