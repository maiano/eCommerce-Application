import { describe, it, expect, beforeAll } from 'vitest';
import { apiClientManager } from './api-client-manager';

const runAllTests = process.env.RUN_ALL_TESTS === 'true';

const describeIf = runAllTests ? describe : describe.skip;

describeIf('Customer registration', () => {
  beforeAll(async () => {
    await apiClientManager.init();
  });

  it('should create a new customer with address and names', async () => {
    const client = apiClientManager.get();

    const email = `test-user-${Date.now()}@example.com`;

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

    const result = await client
      .customers()
      .post({ body: customerDraft })
      .execute();

    expect(result.statusCode).toBe(201);
    expect(result.body.customer).toHaveProperty('id');
    expect(result.body.customer.email).toBe(email);
    expect(result.body.customer.firstName).toBe('John');
    expect(result.body.customer.addresses.length).toBeGreaterThan(0);
    expect(result.body.customer.defaultShippingAddressId).toBeDefined();
  });

  it('should create a new customer with separate shipping and billing addresses', async () => {
    const client = apiClientManager.get();

    const email = `test-user-${Date.now()}@example.com`;

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

    const result = await client
      .customers()
      .post({ body: customerDraft })
      .execute();

    expect(result.statusCode).toBe(201);
    expect(result.body.customer).toHaveProperty('id');
    expect(result.body.customer.email).toBe(email);
    expect(result.body.customer.firstName).toBe('John');

    const { addresses, defaultShippingAddressId, defaultBillingAddressId } =
      result.body.customer;

    expect(addresses.length).toBe(2);
    expect(defaultShippingAddressId).toBeDefined();
    expect(defaultBillingAddressId).toBeDefined();
    expect(defaultShippingAddressId).not.toBe(defaultBillingAddressId);
  });
});
