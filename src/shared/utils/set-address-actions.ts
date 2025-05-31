import { ClientResponse, Customer, MyCustomerAddBillingAddressIdAction, MyCustomerAddShippingAddressIdAction, MyCustomerRemoveBillingAddressIdAction, MyCustomerRemoveShippingAddressIdAction, MyCustomerSetDefaultBillingAddressAction, MyCustomerSetDefaultShippingAddressAction, MyCustomerUpdateAction } from "@commercetools/platform-sdk";

export const setAddressActions = (id: string | undefined, currentUser: ClientResponse<Customer> | undefined, isDelivery: boolean, isBilling: boolean, isDefaultDelivery: boolean, isDefaultBilling: boolean) => {
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
  

  if (id !== currentUser?.body.defaultShippingAddressId && isDefaultDelivery && isDelivery) {
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


  if (id !== currentUser?.body.defaultBillingAddressId && isDefaultBilling && isBilling) {
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
