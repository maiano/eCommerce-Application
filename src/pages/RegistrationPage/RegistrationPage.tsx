import { Title, Text, Container, Group, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '@/features/registration/RegistrationForm';
import '@/pages/RegistrationPage/RegistrationPage.css';

export default function RegistrationPage() {
  return (
    <Container className="page" pt="md">
      <Box className="auth-form">
        <Title order={1} pt="md" className="auth-title">
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
