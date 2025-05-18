import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';

export function LoginForm() {
  return (
    <form>
      <Stack>
        <TextInput
          label="Email"
          placeholder="Email"
          classNames={{ input: 'form-input' }}
          withAsterisk
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          classNames={{ input: 'form-input' }}
          withAsterisk
        />

        <Group mt="md">
          <Button
            w="100%"
            type="submit"
            variant="filled"
            // style={{ margin: '0.5rem' }}
          >
            Sign In
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
