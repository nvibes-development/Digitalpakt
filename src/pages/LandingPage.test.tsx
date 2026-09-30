import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('sends the check entry point to the protected login flow', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'KLARFÖRDERN' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Check starten' })).toHaveAttribute('href', '/check');
    expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/impressum');
  });
});
