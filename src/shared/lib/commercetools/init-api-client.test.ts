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

  it('login customer', async () => {
    await apiClientManager.login({
      email: 'test-user-1747386875229@example.com',
      password: 'Qwerty123',
    });

    const client = apiClientManager.get();

    const result = await client.me().get().execute();

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('id');
  });
});
