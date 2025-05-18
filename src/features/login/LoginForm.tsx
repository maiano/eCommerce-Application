import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
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

  const handleSubmit = (values: LoginFormData) => {
    console.log('form submitted:', values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="Email"
          withAsterisk
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          withAsterisk
          {...form.getInputProps('password')}
        />

        <Group mt="md">
          <Button w="100%" type="submit" variant="filled">
            Sign In
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
