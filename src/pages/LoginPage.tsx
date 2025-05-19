import {
  Anchor,
  Box,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { LoginForm } from '@/features/login/LoginForm';
import { LogoWithTitle } from '@/shared/ui/LogoWithTitle';
export function LoginPage() {
  return (
    <Container size={420}>
      <Box pt="sm">
        <Stack align="center">
          <LogoWithTitle />
          <Paper withBorder w="100%" radius="sm" p="md" styles={{}}>
            <Title order={1} ta="center" styles={{}}>
              Welcome Back
            </Title>
            <LoginForm />
            <Group gap="xs">
              <Text mt="md" ta="center" styles={{}}>
                Don't have an account?
                <Anchor ml="xs" component={Link} to={ROUTES.REGISTRATION}>
                  Sign Up
                </Anchor>
              </Text>
            </Group>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
}
