import { apiClientManager } from "@/shared/lib/commercetools";

export const getUserInfo = async() => {
  try {
    const client = apiClientManager.get();
    if (client) {
      const data = await client.me().get().execute();
      if (data) {
        return data;
      }
    }
  } catch (error) {
    console.error('getUserInfo failed:', error);
  }
}