import { apiClientManager } from "@/shared/lib/commercetools";

// export const getUserInfo = () => {
//   try {
//     const data = apiClientManager.get()?.me().get().execute();
//     if (data) {
//       return data;
//     }
//   } catch (error) {
//     console.error('getUserInfo failed:', error);
//   }
// }


export const getUserInfo = async () => {
  try {
    const restoredClient = await apiClientManager.init();
    if (restoredClient.authType === 'password') {
      const data = await restoredClient.client?.me().get().execute();
      return data;
    }
  } catch (error) {
    console.error('getUserInfo failed:', error);
  }
}