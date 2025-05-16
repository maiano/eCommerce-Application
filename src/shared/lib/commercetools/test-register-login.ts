import { login, register, getCurrentClient } from './api-client-manager';

export const testRegisterAndLogin = async () => {
  const testUser = {
    email: `test-user-${Date.now()}@example.com`,
    password: 'Qwerty123',
    firstName: 'Test',
    lastName: 'User',
  };

  console.log('registration...');
  try {
    const registration = await register({
      email: testUser.email,
      password: testUser.password,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    });
    console.log('registration success:', registration.body.customer.email);

    console.log('login...');
    const loginResult = await login({
      email: testUser.email,
      password: testUser.password,
    });
    console.log('login success:', loginResult.body.customer.email);
    const client = getCurrentClient();
    const me = await client.me().get().execute();

    console.log('my customer:', me.body);
  } catch (error) {
    console.error('error:', error);
  }
};
