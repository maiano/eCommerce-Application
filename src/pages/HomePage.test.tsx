import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/pages/HomePage';

describe('HomePage Component', () => {
  it('renders main title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Explore the Finest Wines/i)).toBeInTheDocument();
  });
});
