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