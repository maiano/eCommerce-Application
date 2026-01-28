import { describe, it, expect, beforeAll } from 'vitest';
import { apiClientManager } from './api-client-manager';

describe('initApiClient', () => {
  beforeAll(async () => {
    await apiClientManager.init();
  });

  it('initialize client', () => {
    const client = apiClientManager.get();
    expect(client).toBeDefined();
  });
});
