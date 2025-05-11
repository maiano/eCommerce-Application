import { describe, expect, test } from 'vitest';
import { loginSchema } from '@/shared/validation';

describe('Email', () => {
  test('Rejects invalid email', () => {
    expect(() =>
      loginSchema.parse({ email: 'invalid', password: '1BestPassword!' }),
    ).toThrow('Invalid email format');
  });

  test('Accepts valid email', () => {
    expect(() =>
      loginSchema.parse({
        email: 'valid@example.com',
        password: '1BestPassword!',
      }),
    ).not.toThrow('Invalid email format');
  });
});

describe('Password', () => {
  test('Accepts valid passwords', () => {
    ['1BestPassword!', 'Qwerty@!1'].forEach((password) => {
      expect(() =>
        loginSchema.parse({ email: 'valid@example.com', password }),
      ).not.toThrow();
    });
  });

  test('Rejects passwords with spaces', () => {
    expect(() =>
      loginSchema.parse({
        email: 'valid@example.com',
        password: ' 1NotBest Password!',
      }),
    ).toThrow('Password must not contain any spaces');
  });
});
