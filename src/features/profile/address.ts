import { ClientResponse, Customer, MyCustomerAddAddressAction, MyCustomerChangeAddressAction } from "@commercetools/platform-sdk";
import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools"
import { notifyError, notifySuccess } from "@/shared/utils/custom-notifications";
import { setAddressActions } from "@/shared/utils/set-address-actions";

export async function deleteAddress(id: string | undefined) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();
            
  if (currentUser && client) {
    try {
      const response = await client.me().post({
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
      if (response.statusCode === 200) {
        notifySuccess({ message: 'Address has been deleted' });
      }
      return response;
    } catch (error) {
      if (error as ClientResponse<Customer>) {
        notifyError(error, { message: 'Something went wrong. Try again' })
      }
    }
  }
}

export async function updateAddress (id: string | undefined, country: string, city: string, street: string, postcode: string, isDelivery: boolean, isBilling: boolean, isDefaultDelivery: boolean, isDefaultBilling: boolean ) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();

  const changeAddress: MyCustomerChangeAddressAction = {
    action: 'changeAddress',
    addressId: id,
    address: {
      country: country,
      city: city,
      streetName: street,
      postalCode: postcode,
    }
  }

  const actions = setAddressActions(id, currentUser, isDelivery, isBilling, isDefaultDelivery, isDefaultBilling);
  actions.push(changeAddress);

  if (currentUser && client) {
    try {
      const response = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: actions
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

export async function addAddress (country: string, city: string, street: string, postcode: string, isDelivery: boolean, isBilling: boolean, isDefaultDelivery: boolean, isDefaultBilling: boolean) {
  const client = apiClientManager.get();
  const currentUser = await getUserInfo();

  const addAddress: MyCustomerAddAddressAction = {
    action: 'addAddress',
    address: {
      country: country,
      city: city,
      streetName: street,
      postalCode: postcode,
    }
  }

  if (currentUser && client) {
    try {
      const response = await client.me().post({
        body: {
          version: currentUser.body.version,
          actions: [addAddress],
        }
      }).execute();
      if (response.statusCode === 200) {
        const currentUser = await getUserInfo();
        if (currentUser) {
          const actions = setAddressActions(response.body.addresses.pop()?.id, currentUser, isDelivery, isBilling, isDefaultDelivery, isDefaultBilling);
          const res = await client.me().post({
            body: {
              version: currentUser.body.version,
              actions: actions,
            }
          }).execute();
          if (res.statusCode === 200) {
            notifySuccess({ message: 'Address has been successfully added' });
          }
        }
      }
      return response;
    } catch (error) {
      if (error as ClientResponse<Customer>) {
        notifyError(error, { message: 'Something went wrong. Try again' })
      }
    }
  }
}