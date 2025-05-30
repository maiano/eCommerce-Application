import { ClientResponse, Customer, MyCustomerAddAddressAction, MyCustomerAddBillingAddressIdAction, MyCustomerAddShippingAddressIdAction, MyCustomerChangeAddressAction, MyCustomerRemoveBillingAddressIdAction, MyCustomerRemoveShippingAddressIdAction, MyCustomerSetDefaultBillingAddressAction, MyCustomerSetDefaultShippingAddressAction, MyCustomerUpdateAction } from "@commercetools/platform-sdk";
import { getUserInfo } from "./profile";
import { apiClientManager } from "@/shared/lib/commercetools"
import { notifyError, notifySuccess } from "@/shared/utils/custom-notifications";

const setAddressActions = (id: string | undefined, currentUser: ClientResponse<Customer> | undefined, isDelivery: boolean, isBilling: boolean, isDefaultDelivery: boolean, isDefaultBilling: boolean) => {
  let actions: MyCustomerUpdateAction[] = [];

  const setDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction = {
    action: 'setDefaultShippingAddress',
    addressId: id,
  }
  
  const setDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction = {
    action: 'setDefaultBillingAddress',
    addressId: id,
  }

  const removeDefaultShippingAddress: MyCustomerSetDefaultShippingAddressAction = {
    action: 'setDefaultShippingAddress',
    addressId: undefined,
  }
  
  const removeDefaultBillingAddress: MyCustomerSetDefaultBillingAddressAction = {
    action: 'setDefaultBillingAddress',
    addressId: undefined,
  }

  const addShippingAddressId: MyCustomerAddShippingAddressIdAction = {
    action: 'addShippingAddressId',
    addressId: id,
  }
  
  const addBillingAddressId: MyCustomerAddBillingAddressIdAction = {
    action: 'addBillingAddressId',
    addressId: id,
  }

  const removeShippingAddressId: MyCustomerRemoveShippingAddressIdAction = {
    action: 'removeShippingAddressId',
    addressId: id,
  }

  const removeBillingAddressId: MyCustomerRemoveBillingAddressIdAction = {
    action: 'removeBillingAddressId',
    addressId: id,
  }
  

  if (id !== currentUser?.body.defaultShippingAddressId && isDefaultDelivery) {
    actions.push(setDefaultShippingAddress);
  }
  if (id === currentUser?.body.defaultShippingAddressId && !isDefaultDelivery) {
    actions.push(removeDefaultShippingAddress);
  }
  if (!currentUser?.body.shippingAddressIds?.includes(id ?? '') && isDelivery && !actions.includes(setDefaultShippingAddress)) {
    actions.push(addShippingAddressId);
  }
  if (currentUser?.body.shippingAddressIds?.includes(id ?? '') && !isDelivery) {
    actions.push(removeShippingAddressId);
  }


  if (id !== currentUser?.body.defaultBillingAddressId && isDefaultBilling) {
    actions.push(setDefaultBillingAddress);
  } 
  if (id === currentUser?.body.defaultBillingAddressId && !isDefaultBilling) {
    actions.push(removeDefaultBillingAddress);
  }
  if (!currentUser?.body.billingAddressIds?.includes(id ?? '') && isBilling && !actions.includes(setDefaultBillingAddress)) {
    actions.push(addBillingAddressId);
  }
  if (currentUser?.body.billingAddressIds?.includes(id ?? '') && !isBilling) {
    actions.push(removeBillingAddressId);
  }
  return actions;
}


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
      }).execute();
      return res;
    } catch (error) {
      console.error('failed to delete address', error);
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