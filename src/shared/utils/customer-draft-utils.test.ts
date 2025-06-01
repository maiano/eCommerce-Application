import { describe, test, expect } from 'vitest';
import { createCustomerDraft } from '@/shared/utils/customer-draft-utils';
import type { RegistrationFormData } from '@/shared/validation/registration-validation';

const mockData: RegistrationFormData = {
  email: 'test@example.com',
  password: 'Password123!',
  firstName: 'John',
  lastName: 'Doe',
  birthDate: '1990-01-01',
  shippingAddress: {
    country: 'United States',
    street: 'Main St',
    city: 'New York',
    postcode: '10001',
    isDefaultAddress: true,
  },
  billingAddress: {
    country: 'Germany',
    street: 'Berliner Str.',
    city: 'Berlin',
    postcode: '10115',
    isDefaultAddress: false,
    sameAsShipping: false,
  },
};

describe('createCustomerDraft', () => {
  test('creates draft with single address when sameAddress is true', () => {
    const draft = createCustomerDraft(mockData, true);
    expect(draft.addresses).toHaveLength(1);
    expect(draft.defaultShippingAddress).toBe(0);
    expect(draft.defaultBillingAddress).toBeUndefined();
  });

  test('creates draft with two addresses when sameAddress is false', () => {
    const draft = createCustomerDraft(mockData, false);
    expect(draft.addresses).toHaveLength(2);
    expect(draft.addresses?.[1].city).toBe('Berlin');
  });

  test('sets defaultBillingAddress to 0 if sameAddress and isDefaultAddress are true', () => {
    const draft = createCustomerDraft(
      {
        ...mockData,
        billingAddress: {
          ...mockData.billingAddress,
          isDefaultAddress: true,
          sameAsShipping: true,
        },
      },
      true,
    );
    expect(draft.defaultBillingAddress).toBe(0);
  });
});
