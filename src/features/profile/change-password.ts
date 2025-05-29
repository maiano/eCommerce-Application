import { ClientResponse, Customer } from "@commercetools/platform-sdk";
import { useLogin } from "../login/useLogin";
import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools";
import { notifyError, notifySuccess } from "@/shared/utils/custom-notifications";

export function useChangePassword () {
  const { login } = useLogin();

  const changePassword = async(password: string, newPassword: string) => {
    const client = apiClientManager.get();
    const currentUser = await getUserInfo();

    if (currentUser && client) {
      try {
        const response: ClientResponse<Customer> = await client.me().password().post({
          body: {
            version: currentUser.body.version,
            currentPassword: password,
            newPassword: newPassword,
          }
        }).execute()
        if (response.statusCode === 200) {
          notifySuccess({ message: 'Password has been changed' });
          apiClientManager.logout();
          await login({ email: currentUser.body.email, password: newPassword });
        }
        return response;
      } catch (error: unknown) {
        if ((error as ClientResponse<Customer>).statusCode === 400) {
          notifyError(error, { message: 'Current password does not match. Try again' })
        }
      }
    }
  }
  return { changePassword };
}