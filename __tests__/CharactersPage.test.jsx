import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersPage from '../src/pages/CharactersPage';

jest.mock('../features/characters/characterApi', () => ({
  useGetCharactersQuery: () => ({
    data: {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'rick.png',
          location: { name: 'Earth' },
          episode: []
        }
      ],
      info: { pages: 1 }
    },
    isLoading: false,
    isError: false
  })
}));

test('renders character card', () => {
  render(
    <MemoryRouter>
      <CharactersPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
});
