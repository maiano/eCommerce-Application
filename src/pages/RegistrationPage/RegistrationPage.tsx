import { Title, Text, Container, Group, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '@/features/registration/RegistrationForm';
import '@/pages/RegistrationPage/RegistrationPage.css';
import { LogoWithTitle } from '@/shared/ui/LogoWithTitle';

export default function RegistrationPage() {
  return (
    <Container className="page">
      <Box className="auth-form">
        <Group className="header__logo">
          <LogoWithTitle />
        </Group>

        <Title order={1} className="auth-title">
          Create Account
        </Title>

        <RegistrationForm />

        <Group className="auth-footer">
          <Text>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </Text>
        </Group>
      </Box>
    </Container>
  );
}
