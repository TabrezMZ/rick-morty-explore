import { render, screen, fireEvent } from '@testing-library/react';
import CharacterFilters from '../src/components/CharacterFilters';

test('renders basic filters', () => {
  render(<CharacterFilters filters={{}} setFilters={() => {}} locations={[]} episodes={[]} />);
  expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  expect(screen.getByText(/Status/i)).toBeInTheDocument();
  expect(screen.getByText(/Gender/i)).toBeInTheDocument();
});

test('updates filter input', () => {
  const setFilters = jest.fn();
  render(<CharacterFilters filters={{ name: '' }} setFilters={setFilters} locations={[]} episodes={[]} />);
  fireEvent.change(screen.getByPlaceholderText(/search by name/i), { target: { value: 'morty' } });
  expect(setFilters).toHaveBeenCalled();
});
