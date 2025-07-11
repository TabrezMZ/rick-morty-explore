import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import CharacterDetail from './pages/CharacterDetail';
import EpisodePage from './pages/EpisodePage';
import LocationPage from './pages/LocationPage';
import { useDispatch } from 'react-redux';
import {
  useGetAllEpisodesQuery,
  useGetAllLocationsQuery,
} from './features/characters/characterApi';
import { setEpisodes, setLocations } from './features/global/globalSlice';

const App = () => {
   const dispatch = useDispatch();

  const { data: ep1 } = useGetAllEpisodesQuery(1);
  const { data: ep2 } = useGetAllEpisodesQuery(2);
  const { data: loc1 } = useGetAllLocationsQuery(1);
  const { data: loc2 } = useGetAllLocationsQuery(2);

  useEffect(() => {
    if (ep1?.results && ep2?.results) {
      dispatch(setEpisodes([...ep1.results, ...ep2.results]));
    }
    if (loc1?.results && loc2?.results) {
      dispatch(setLocations([...loc1.results, ...loc2.results]));
    }
  }, [ep1, ep2, loc1, loc2, dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/characters" />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/episodes" element={<EpisodePage />} />
        <Route path="/locations" element={<LocationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
