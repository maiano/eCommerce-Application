import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools";

export async function updateUserInfo(firstName: string, lastName: string, email: string, birthDate: string ) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const res = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: [
            {
              action: 'setFirstName',
              firstName: firstName,
            },
            {
              action: 'setLastName',
              lastName: lastName,
            },
            {
              action: 'changeEmail',
              email: email,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: birthDate,
            },
          ],
        }
      }).execute()
      return res;
    } catch (error) {
      console.error('failed to update personal info', error);
    }
    }
}