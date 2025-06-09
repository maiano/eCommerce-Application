import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Cart,
  ClientResponse,
  LineItemDraft,
  CartDraft
} from '@commercetools/platform-sdk';
import { apiClientManager } from '@/shared/lib/commercetools/api-client-manager';
import { debug } from '@/shared/utils/debug-log';

interface CartState {
  cart: Cart | null;
  error: string | null;
  fetchCart: () => Promise<void>;
}

const CART_STORAGE_KEY = 'wine-not-cart-id';

const createCart = async (): Promise<ClientResponse<Cart>> => {
  const client = apiClientManager.get();
  if (!client) throw new Error('Client not initialized');

  const authType = apiClientManager.getAuthType();
  debug('Creating new cart');

  if (authType === 'password') {
    const draft: CartDraft = {
      currency: 'EUR',
      country: 'FR',
      lineItems: []
    };

    return client.me().carts().post({ body: draft }).execute();
  } else {
    const draft: CartDraft = {
      currency: 'EUR',
      country: 'FR',
      lineItems: []
    };

    return client.carts().post({ body: draft }).execute();
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      error: null,

      fetchCart: async () => {
        set({ error: null });

        try {
          await apiClientManager.init();
          const authType = apiClientManager.getAuthType();
          const savedCartId = localStorage.getItem(CART_STORAGE_KEY);

          if (authType === 'password') {
            try {
              debug('Fetching active cart');
              const client = apiClientManager.get();
              if (!client) throw new Error('Client not initialized');

              const response = await client.me().activeCart().get().execute();
              set({ cart: response.body });
              localStorage.setItem(CART_STORAGE_KEY, response.body.id);
              debug(`Active cart saved: ${response.body.id}`);
              return;
            } catch (error) {
              if (error instanceof Object && 'statusCode' in error && error.statusCode === 404) {
                debug('No active cart, creating new');
                const response = await createCart();
                set({ cart: response.body });
                localStorage.setItem(CART_STORAGE_KEY, response.body.id);
                debug(`New cart created: ${response.body.id}`);
              } else {
                throw error;
              }
            }
          }
          else {
            if (savedCartId) {
              try {
                debug(`Fetching cart by ID: ${savedCartId}`);
                const client = apiClientManager.get();
                if (!client) throw new Error('Client not initialized');

                const response = await client.carts().withId({ ID: savedCartId }).get().execute();
                set({ cart: response.body });
                debug('Saved cart loaded');
                return;
              } catch (error) {
                debug('Saved cart not found', error);
                localStorage.removeItem(CART_STORAGE_KEY);
              }
            }

            const response = await createCart();
            set({ cart: response.body });
            localStorage.setItem(CART_STORAGE_KEY, response.body.id);
            debug(`New anonymous cart created: ${response.body.id}`);
          }
        } catch (error) {
          let errorMessage = 'Unknown cart error';

          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
            errorMessage = error.message;
          }

          debug('Cart fetch error:', errorMessage);
          set({ error: errorMessage });
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export const getCart = () => useCartStore.getState().fetchCart();
