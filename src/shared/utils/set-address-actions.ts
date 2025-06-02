import { ClientResponse, Customer, MyCustomerUpdateAction } from "@commercetools/platform-sdk";

type Action = 'setDefaultShippingAddress' | 'addShippingAddressId' | 'removeShippingAddressId' | 'setDefaultShippingAddress' | 'setDefaultBillingAddress' | 'addBillingAddressId' | 'removeBillingAddressId' | 'setDefaultBillingAddress';

export const setAddressActions = (id: string | undefined, currentUser: ClientResponse<Customer> | undefined, isShipping: boolean, isBilling: boolean, isDefaultShipping: boolean, isDefaultBilling: boolean) => {
  let actions: MyCustomerUpdateAction[] = [];

  const createAddressAction = (action: Action, addressId: string | undefined): MyCustomerUpdateAction => ({
    action,
    addressId
  });

  if (isShipping) {
    if (isDefaultShipping && id !== currentUser?.body.defaultShippingAddressId) {
      actions.push(createAddressAction('setDefaultShippingAddress', id));
    }
    if (!currentUser?.body.shippingAddressIds?.includes(id ?? '')) {
      actions.push(createAddressAction('addShippingAddressId', id));
    }
  } else {
    if (currentUser?.body.shippingAddressIds?.includes(id ?? '')) {
      actions.push(createAddressAction('removeShippingAddressId', id));
    }
    if (id === currentUser?.body.defaultShippingAddressId) {
      actions.push(createAddressAction('setDefaultShippingAddress', undefined));
    }
  }
  
  if (isBilling) {
    if (isDefaultBilling && id !== currentUser?.body.defaultBillingAddressId) {
      actions.push(createAddressAction('setDefaultBillingAddress', id));
    }
    if (!currentUser?.body.billingAddressIds?.includes(id ?? '')) {
      actions.push(createAddressAction('addBillingAddressId', id));
    }
  } else {
    if (currentUser?.body.billingAddressIds?.includes(id ?? '')) {
      actions.push(createAddressAction('removeBillingAddressId', id));
    }
    if (id === currentUser?.body.defaultBillingAddressId) {
      actions.push(createAddressAction('setDefaultBillingAddress', undefined));
    }
  }
  return actions;
}
