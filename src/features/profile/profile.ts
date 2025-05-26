import { apiClientManager } from "@/shared/lib/commercetools";

export const getUserInfo = async() => {
  try {
    const data = await apiClientManager.get()?.me().get().execute();
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error('getUserInfo failed:', error);
  }
}