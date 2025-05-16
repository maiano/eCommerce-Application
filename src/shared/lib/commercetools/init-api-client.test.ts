import { describe, it, expect, beforeAll } from 'vitest';
import {
  initApiClient,
  getCurrentClient,
  loginCustomer,
} from './api-client-manager';

describe('initApiClient', () => {
  beforeAll(async () => {
    await initApiClient();
  });

  it('initialize client', () => {
    const client = getCurrentClient();
    expect(client).toBeDefined();
  });

  it('login customer', async () => {
    await loginCustomer({
      email: 'test-user-1747386875229@example.com',
      password: 'Qwerty123',
    });

    const client = getCurrentClient();

    const result = await client.me().get().execute();

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('id');
  });
});
