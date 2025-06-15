import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Cart,
  ClientResponse,
  CartDraft,
  CartUpdate,
} from '@commercetools/platform-sdk';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
import { debug } from '@/shared/utils/debug-log';
import { ShippingMethod } from '@commercetools/platform-sdk';

interface CartState {
  cart: Cart | null;
  error: string | null;
  shippingMethod: ShippingMethod | null;
  createCart: () => Promise<ClientResponse<Cart>>;
  fetchCart: () => Promise<void>;
  addLineItem: (productId: string, variantId?: number, quantity?: number) => Promise<void>;
  removeLineItem: (lineItemId: string) => Promise<void>;
  changeLineItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addDiscount: (code: string) => Promise<void>;
  removeDiscount: (discountCodeId: string) => Promise<void>;
  fetchShippingMethod: () => Promise<void>;
}

const CART_STORAGE_KEY = 'wine-not-cart-id';
const ANONYMOUS_ID_KEY = 'wine-not-anonymous-id';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      error: null,
      shippingMethod: null,

      createCart: async () => {
        const client = apiClientManager.get();
        if (!client) throw new Error('Client is not initialized');

        const authType = apiClientManager.getAuthType();

        if (authType === 'password') {
          const draft: CartDraft = {
            currency: 'EUR',
            country: 'FR',
            lineItems: []
          };

          return client.me().carts().post({ body: draft }).execute();
        } else {
          const anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY) || undefined;
          debug(`Using anonymous ID: ${anonymousId}`);

          const draft: CartDraft = {
            currency: 'EUR',
            country: 'FR',
            lineItems: [],
            anonymousId
          };

          const response = await client.me().carts().post({ body: draft }).execute();

          localStorage.setItem(CART_STORAGE_KEY, response.body.id);
          localStorage.setItem(ANONYMOUS_ID_KEY, response.body.anonymousId);

          debug(`Anonymous cartID: ${response.body.id}, AnonymousID: ${response.body.anonymousId}`);
          return response;
        }
      },

      fetchCart: async () => {
        set({ error: null });

        try {
          const authType = apiClientManager.getAuthType();

          if (authType === 'password') {
            try {
              const client = apiClientManager.get();
              if (!client) throw new Error('Client is not initialized');

              const response = await client
                .me()
                .activeCart()
                .get()
                .execute();

              set({ cart: response.body });
              debug(`Active cart loaded: ${response.body.id}`);
              return;
            } catch (error) {
              if (error instanceof Object && 'statusCode' in error && error.statusCode === 404) {
                debug('No active cart, creating new');
                const response = await get().createCart();
                set({ cart: response.body });
                debug(`New cart created: ${response.body.id}`);
              } else {
                throw error;
              }
            }
          } else {
            const savedCartId = localStorage.getItem(CART_STORAGE_KEY);
            const savedAnonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);

            if (savedCartId) {
              try {
                debug(`Fetching cart by ID: ${savedCartId}`);
                const client = apiClientManager.get();
                if (!client) throw new Error('Client is not initialized');

                const response = await client
                  .me()
                  .carts()
                  .withId({ ID: savedCartId })
                  .get()
                  .execute();

                set({ cart: response.body });
                debug('Anonymous cart loaded');

                if (response.body.anonymousId && response.body.anonymousId !== savedAnonymousId) {
                  localStorage.setItem(ANONYMOUS_ID_KEY, response.body.anonymousId);
                }
                return;
              } catch (error) {
                debug('No saved cart, removing ID', error);
                localStorage.removeItem(CART_STORAGE_KEY);
              }
            }

            debug('Creating new anonymous cart');
            const response = await get().createCart();
            set({ cart: response.body });
          }
        } catch (error) {
          let errorMessage;

          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }

          debug('Cart fetch error:', errorMessage);
          set({ error: errorMessage });
        }
      },

      addLineItem: async (productId, variantId = 1, quantity = 1) => {
        set({error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client is not initialized');

          const { cart } = get();
          let currentCart = cart;

          if (!currentCart) throw new Error('No cart');

          const updateActions: CartUpdate = {
            version: currentCart.version,
            actions: [{
              action: 'addLineItem',
              productId,
              variantId,
              quantity
            }]
          };

          const response = await client
            .carts()
            .withId({ ID: currentCart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          debug(`Added product ${productId} to cart`);
        } catch (error) {
          let errorMessage = 'Failed to add product';

          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }

          set({ error: errorMessage });
          debug('Add to cart error:', errorMessage);
          throw error;
        }
      },

      changeLineItemQuantity: async (lineItemId, quantity) => {
        set({ error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client is not initialized');

          const { cart } = get();
          if (!cart) throw new Error('No cart');

          const updateActions: CartUpdate = {
            version: cart.version,
            actions: [{
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            }]
          };

          const response = await client
            .carts()
            .withId({ ID: cart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          console.log(`Changed quantity for ${lineItemId} to ${quantity}`);
        } catch (error) {
          let errorMessage = 'Failed to change quantity';

          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }

          set({ error: errorMessage });
          debug('Change quantity error:', errorMessage);
          throw error;
        }
      },
      removeLineItem: async (lineItemId) => {
        set({ error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client is not initialized');

          const { cart } = get();
          if (!cart) throw new Error('No cart');

          const updateActions: CartUpdate = {
            version: cart.version,
            actions: [{
              action: 'removeLineItem',
              lineItemId
            }]
          };

          const response = await client
            .carts()
            .withId({ ID: cart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          debug(`Removed ${lineItemId}`);
        } catch (error) {
          let errorMessage = 'Failed to remove product';
          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          debug('Remove error:', errorMessage);
          throw error;
        }
      },

      clearCart: async () => {
        set({ error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client is not initialized');

          const { cart } = get();
          if (!cart || cart.lineItems.length === 0) {
            debug('Cart is already empty');
            return;
          }

          const updateActions: CartUpdate = {
            version: cart.version,
            actions: cart.lineItems.map(item => ({
              action: 'removeLineItem',
              lineItemId: item.id
            }))
          };

          const response = await client
            .carts()
            .withId({ ID: cart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          debug('Cart cleared');
        } catch (error) {
          let errorMessage = 'Failed to clear cart';
          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          debug('Clear cart error:', errorMessage);
          throw error;
        }
      },

      addDiscount: async (code: string) => {
        set({ error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client not initialized');

          const { cart } = get();
          if (!cart) throw new Error('No cart');

          const updateActions: CartUpdate = {
            version: cart.version,
            actions: [{
              action: 'addDiscountCode',
              code
            }]
          };

          const response = await client
            .carts()
            .withId({ ID: cart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          debug(`Discount added: ${code}`);

          console.log(response.body)
        } catch (error) {
          let errorMessage = 'Failed to add discount';
          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          debug('Add discount error:', errorMessage);
          throw error;
        }
      },

      removeDiscount: async (discountCodeId: string) => {
        set({ error: null });
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client not initialized');

          const { cart } = get();
          if (!cart) throw new Error('No cart');

          const updateActions: CartUpdate = {
            version: cart.version,
            actions: [{
              action: 'removeDiscountCode',
              discountCode: {
                typeId: 'discount-code',
                id: discountCodeId
              }
            }]
          };

          const response = await client
            .carts()
            .withId({ ID: cart.id })
            .post({ body: updateActions })
            .execute();

          set({ cart: response.body });
          debug(`Discount removed: ${discountCodeId}`);
        } catch (error) {
          let errorMessage = 'Failed to remove discount';
          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          debug('Remove discount error:', errorMessage);
          throw error;
        }
      },
      fetchShippingMethod: async () => {
        try {
          const client = apiClientManager.get();
          if (!client) throw new Error('Client not initialized');

          const response = await client
            .shippingMethods()
            .get()
            .execute();

          const firstMethod = response.body.results[0] || null;
          set({ shippingMethod: firstMethod });
          debug('Shipping method fetched');
        } catch (error) {
          let errorMessage = 'Failed to fetch shipping methods';
          if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }
          debug('Fetch shipping methods error:', errorMessage);
          set({ shippingMethod: null });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export const getCart = () => useCartStore.getState().fetchCart();

export const addToCart = (productId: string, variantId?: number, quantity?: number) =>
  useCartStore.getState().addLineItem(productId, variantId, quantity);

export const changeQuantity = (lineItemId: string, quantity: number) =>
useCartStore.getState().changeLineItemQuantity(lineItemId, quantity);

export const removeFromCart = (lineItemId: string) =>
 useCartStore.getState().removeLineItem(lineItemId);

export const clearCart = () => useCartStore.getState().clearCart();

export const addDiscount = (code: string) =>
  useCartStore.getState().addDiscount(code);

export const removeDiscount = (discountCodeId: string) =>
  useCartStore.getState().removeDiscount(discountCodeId);

export const fetchShippingMethod = () => useCartStore.getState().fetchShippingMethod();
