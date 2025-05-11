import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/pages/HomePage';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/app/theme';

describe('HomePage Component', () => {
  it('renders main title', () => {
    render(
  <BrowserRouter>
        <MantineProvider theme={theme}>
          <HomePage />
        </MantineProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Explore the Finest Wines/i)).toBeInTheDocument();
  });
});
