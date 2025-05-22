import type { TokenStore } from '@commercetools/sdk-client-v2';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { makeTokenCache } from '@/shared/lib/commercetools/token-cache';

const mockLocalStorage = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.store[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage.store = {};
  }),
};

beforeEach(() => {
  vi.stubGlobal('localStorage', mockLocalStorage);
  mockLocalStorage.clear();
});

describe('makeTokenCache', () => {
  const tokenKey = 'wine-not-anonymous-token';

  it('set token', () => {
    const cache = makeTokenCache(tokenKey);
    const testToken: TokenStore = {
      token: 'test-token',
      expirationTime: Date.now() + 10_000,
    };

    cache.set(testToken);
    expect(cache.get()).toEqual(testToken);
  });

  it('clear token', () => {
    const cache = makeTokenCache(tokenKey);
    const expiredToken: TokenStore = {
      token: 'expired',
      expirationTime: Date.now() - 1000,
    };

    cache.set(expiredToken);
    cache.clear();
    expect(cache.get().token).toBe('');
    expect(mockLocalStorage.removeItem).toHaveBeenCalled();
  });
});
