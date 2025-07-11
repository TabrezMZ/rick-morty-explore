import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

test('shows brand name and nav links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText(/r&m wiki/i)).toBeInTheDocument();
  expect(screen.getByText(/characters/i)).toBeInTheDocument();
  expect(screen.getByText(/episodes/i)).toBeInTheDocument();
  expect(screen.getByText(/locations/i)).toBeInTheDocument();
});
