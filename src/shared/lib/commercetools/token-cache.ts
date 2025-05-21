import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';
import { z } from 'zod';

export type TokenKey = 'wine-not-anonymous-token' | 'wine-not-password-token';

const TOKEN_THRESHOLD = 2500;
const EMPTY_TOKEN: TokenStore = { token: '', expirationTime: 0 };

const TokenSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().optional(),
  expirationTime: z.number().positive(),
});

const validateToken = (raw: string): TokenStore | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    const token = TokenSchema.parse(parsed);
    return token.expirationTime >= Date.now() + TOKEN_THRESHOLD ? token : null;
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
};

const safeStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('LocalStorage access failed:', error);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('LocalStorage write failed:', error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage remove failed:', error);
    }
  },
};

export function makeTokenCache(
  tokenKey: TokenKey,
): TokenCache & { clear: () => void } {
  let current: TokenStore = EMPTY_TOKEN;

  return {
    get: (): TokenStore => {
      const raw = safeStorage.get(tokenKey);
      if (!raw) return EMPTY_TOKEN;

      const token = validateToken(raw);
      if (!token) {
        safeStorage.remove(tokenKey);
        return EMPTY_TOKEN;
      }

      current = token;
      return current;
    },

    set: (newValue: TokenStore): TokenStore => {
      const token = TokenSchema.parse(newValue);
      current = token;
      safeStorage.set(tokenKey, JSON.stringify(current));
      return current;
    },

    clear: (): void => {
      current = EMPTY_TOKEN;
      safeStorage.remove(tokenKey);
    },
  };
}

export const isEmptyToken = (token: TokenStore): boolean =>
  token.token === '' || token.expirationTime <= Date.now();

export const getRefreshToken = (tokenKey: TokenKey): string | undefined =>
  makeTokenCache(tokenKey).get().refreshToken;

export const deleteToken = (tokenKey: TokenKey): void => {
  safeStorage.remove(tokenKey);
};
