import {
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
import '@/pages/RegistrationPage.css';

export function LoginPage() {
  return (
    <Container className="page" pt="20vh">
      <Box w="100%" display="flex" style={{ justifyContent: 'center' }} maw={450}>
        <Stack w="100%" className="auth-form">
          <LogoWithTitle />
          <Paper w="100%" radius="sm">
            <Title order={1} ta="center">
              Welcome Back
            </Title>
            <LoginForm />
            <Group gap="xs" className="auth-footer">
              <Text mt="md" ta="center" style={{ margin: 'auto' }}>
                Don't have an account?{' '}
                <Link className="auth-link" to={ROUTES.REGISTRATION}>
                  Sign Up
                </Link>
              </Text>
            </Group>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
}
