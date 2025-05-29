import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools";


export async function changeUserPassword(password: string, newPassword: string) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const res = await client.me().password().post({
        body: {
          version: currentUser.body.version,
          currentPassword: password,
          newPassword: newPassword,
        }
      }).execute()
      return res;
    } catch (error) {
      console.error('failed to change password', error);
    }
  }
}