import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from '../src/pages/CharacterDetail';
import jest from 'jest-mock';

jest.mock('../features/characters/characterApi', () => ({
  useGetCharacterByIdQuery: () => ({
    data: {
      id: 1,
      name: 'Rick Sanchez',
      image: 'rick.png',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      type: '',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel of Ricks' },
      episode: ['https://rickandmortyapi.com/api/episode/1']
    },
    isLoading: false,
    isError: false
  }),
  useGetEpisodesByUrlsQuery: () => ({
    data: [{ id: 1, name: 'Pilot', episode: 'S01E01' }]
  }),
  useGetLocationByUrlQuery: () => ({ data: null })
}));

test('renders character name and details', () => {
  render(
    <MemoryRouter initialEntries={['/character/1']}>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/alive/i)).toBeInTheDocument();
  expect(screen.getByText(/citadel of ricks/i)).toBeInTheDocument();
});
