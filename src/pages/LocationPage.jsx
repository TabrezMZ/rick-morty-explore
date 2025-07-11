import { useState } from 'react';
import { useGetLocationByIdQuery } from '../features/characters/characterApi';
import Navbar from '../components/Navbar';
import EpisodeCharacterCard from '../components/EpisodeCharacterCard';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const LocationPage = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(1);

   const { locations } = useSelector((state) => state.global);

  const { data: selectedLocation, isLoading } = useGetLocationByIdQuery(selectedLocationId);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Pick Location</h2>

        <select
         className="custom-select"
          onChange={(e) => setSelectedLocationId(e.target.value)}
          value={selectedLocationId}
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} — {loc.type}
            </option>
          ))}
        </select>

        {isLoading ? (
          <Loader   />
        ) : (
          <>
            <h3 style={{ marginTop: '1.5rem' }}>
              Location: <span style={{ color: 'var(--primary)' }}>{selectedLocation.name}</span>
            </h3>
            <p>Type: {selectedLocation.type}</p>
            <p>Dimension: {selectedLocation.dimension}</p>
            <p>Residents: {selectedLocation.residents.length}</p>

            <div className="grid" style={{ marginTop: '2rem' }}>
              {selectedLocation.residents.map((url) => {
                const id = url.split('/').pop();
                return <EpisodeCharacterCard key={id} id={id} />;
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LocationPage;
