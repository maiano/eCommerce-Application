import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { apiClientManager } from './api-client-manager';

const runAllTests = process.env.RUN_ALL_TESTS === 'true';
const describeIf = runAllTests ? describe : describe.skip;

describeIf('Customer registration via apiClientManager', () => {
  beforeAll(async () => {
    apiClientManager.init(true);
  });

  beforeEach(() => {
    apiClientManager.init(true);
  });

  it('registers a customer with address and names', async () => {
    const email = `test-${Date.now()}@example.com`;

    const customerDraft = {
      email,
      password: 'Qwerty123!',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        {
          country: 'DE',
          streetName: 'Main Street',
          streetNumber: '123',
          postalCode: '10115',
          city: 'Berlin',
        },
      ],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };

    const result = await apiClientManager.register(customerDraft);

    expect(result.statusCode).toBe(201);
    const customer = result.body.customer;

    expect(customer).toHaveProperty('id');
    expect(customer.email).toBe(email);
    expect(customer.firstName).toBe('John');
    expect(customer.addresses).toHaveLength(1);
    expect(customer.defaultShippingAddressId).toBeDefined();
    expect(customer.defaultBillingAddressId).toBeDefined();
  });

  it('registers a customer with different shipping and billing addresses', async () => {
    const email = `test-${Date.now()}@example.com`;

    const customerDraft = {
      email,
      password: 'Qwerty123!',
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        {
          country: 'DE',
          streetName: 'Shipping Street',
          streetNumber: '1',
          postalCode: '10115',
          city: 'Berlin',
        },
        {
          country: 'DE',
          streetName: 'Billing Avenue',
          streetNumber: '99',
          postalCode: '10243',
          city: 'Munich',
        },
      ],
      defaultShippingAddress: 0,
      defaultBillingAddress: 1,
    };

    const result = await apiClientManager.register(customerDraft);

    expect(result.statusCode).toBe(201);
    const customer = result.body.customer;

    expect(customer.email).toBe(email);
    expect(customer.addresses).toHaveLength(2);
    expect(customer.defaultShippingAddressId).not.toBe(
      customer.defaultBillingAddressId,
    );
  });

  it('logs in with newly registered customer', async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = 'Qwerty123!';

    const customerDraft = {
      email,
      password,
      firstName: 'Maria',
      lastName: 'Roth',
    };

    await apiClientManager.register(customerDraft);

    const loginResult = await apiClientManager.login({
      email,
      password,
    });

    expect(loginResult.statusCode).toBe(200);
    expect(loginResult.body.customer.email).toBe(email);
  });
});
