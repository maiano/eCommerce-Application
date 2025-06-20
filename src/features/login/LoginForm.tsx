import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useLogin } from '@/features/login/useLogin';
import { loginSchema } from '@/shared/validation';
import { LoginFormData } from '@/shared/validation/login-validation';

export function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
    validateInputOnBlur: true,
  });

  const { login } = useLogin();

  const handleSubmit = async (values: LoginFormData) => {
    console.log('form submitted:', values);
    await login({ email: values.email, password: values.password });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          classNames={{ input: 'form-input' }}
          label="Email"
          placeholder="Email"
          withAsterisk
          {...form.getInputProps('email')}
        />

        <PasswordInput
          classNames={{ input: 'form-input' }}
          label="Password"
          placeholder="Password"
          withAsterisk
          {...form.getInputProps('password')}
        />

        <Group mt="md" style={{ justifyContent: 'center' }}>
          <Button
            className="button button--primary button--large"
            w="100%"
            type="submit"
            variant="filled"
          >
            Sign In
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
