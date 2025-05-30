import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools";
import { notifyError, notifySuccess } from "@/shared/utils/custom-notifications";

export async function updateUserInfo(firstName: string, lastName: string, email: string, birthDate: string ) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const response = await client.me().post({
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
      }).execute();
      if (response.statusCode === 200) {
        notifySuccess({ message: 'Personal information has been updated' });
      }
      return response;
    } catch (error) {
      if (error as ClientResponse<Customer>) {
        notifyError(error, { message: 'Something went wrong. Try again' })
      }
    }
  }
}