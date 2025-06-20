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
import '@/pages/RegistrationPage/RegistrationPage.css';

export default function LoginPage() {
  return (
    <Container className="page" pt="md">
      <Box
        w="100%"
        display="flex"
        style={{ justifyContent: 'center' }}
        maw={450}
      >
        <Stack w="100%" className="auth-form">
          <Paper w="100%" radius="sm">
            <Title order={1} pt="md" ta="center">
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
