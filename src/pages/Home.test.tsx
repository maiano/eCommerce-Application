import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/pages/Home';

describe('HomePage Component', () => {
  it('renders welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});
