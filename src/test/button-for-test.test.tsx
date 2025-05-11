import { Button } from '@mantine/core';
import { screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import { customRender } from '@/test';

it('renders hello button', () => {
  customRender(<Button>Hello</Button>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
