import { type TokenCache, type TokenStore } from '@commercetools/sdk-client-v2';
import { z } from 'zod';

export type TokenKey = 'wine-not-anonymous-token' | 'wine-not-password-token';

const TOKEN_THRESHOLD = 300_000;
const EMPTY_TOKEN: TokenStore = { token: '', expirationTime: 0 };

const TokenSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().optional(),
  expirationTime: z.number().positive(),
});

const validateToken = (raw: string): TokenStore | null => {
  try {
    const parsed = TokenSchema.parse(JSON.parse(raw));
    return parsed.expirationTime > Date.now() + TOKEN_THRESHOLD ? parsed : null;
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
      if (current.token && current.expirationTime > Date.now()) {
        return current;
      }
      const raw = safeStorage.get(tokenKey);
      if (!raw) {
        current = EMPTY_TOKEN;
        return EMPTY_TOKEN;
      }

      const token = validateToken(raw);
      if (!token) {
        current = EMPTY_TOKEN;
        return EMPTY_TOKEN;
      }

      current = token;
      return token;
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
  token.token === '' || token.expirationTime <= Date.now() + TOKEN_THRESHOLD;
