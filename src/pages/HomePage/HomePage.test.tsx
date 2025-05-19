import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { theme } from '@/app/theme';
import { HomePage } from '@/pages/HomePage/HomePage';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('HomePage Component', () => {
  it('renders main title', () => {
    render(
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <HomePage />
        </MantineProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText(/Explore the Finest Wines/i)).toBeInTheDocument();
  });
});
