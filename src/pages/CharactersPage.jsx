import { useEffect, useState } from "react";
import {
  useGetCharactersQuery,
  useGetEpisodesByUrlsQuery,
} from "../features/characters/characterApi";
import Navbar from "../components/Navbar";
import CharacterFilters from "../components/CharacterFilters";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const CharactersPage = () => {
  // Full filters controlled by user input
  const [inputFilters, setInputFilters] = useState({
    page: 1,
    name: "",
    status: "",
    gender: "",
    species: "",
    location: "",
    type: "",
    episode: "",
  });

  // Debounced filters actually used in API query
  const [filters, setFilters] = useState(inputFilters);

  // Debounce name/search field (only name)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(inputFilters);
    }, 500); // wait 500ms after last keystroke

    return () => clearTimeout(timer); // cleanup previous timer
  }, [inputFilters]);

  const { data, isLoading, isError, error } = useGetCharactersQuery(filters);

  let results = isError ? [] :  data?.results;
  console.log("Filters applied:", filters);
  console.log("Results fetched:", data?.results.length);

  if (filters.location) {
    // Filter characters by location name
    results = results.filter((char) =>
      char.location.name.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.episode) {
    // Filter characters by episode name

    results = results.filter((char) =>
      char.episode.some((ep) =>
        ep.toLowerCase().includes(filters.episode.toLowerCase())
      )
    );
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>Characters</h1>

        <CharacterFilters filters={inputFilters} setFilters={setInputFilters} />

        {isLoading && <Loader />}

        {!isLoading && results?.length === 0 && (
          <div className="no-data">
            🚫 No characters found with current filters.
          </div>
        )}

        {isError && error?.status !== 404 && (
          <p>Error: {error?.data?.error || error?.message}</p>
        )}

        {results && (
          <div className="grid">
            {results?.map((char, index) => (
              <Link key={index} to={`/character/${char.id}`} className="card">
                <img src={char.image} alt={char.name} />
                <h3>{char.name}</h3>
                <p>Last Location</p>
                <p>
                  <strong>{char.location.name}</strong>
                </p>
              </Link>
            ))}
          </div>
        )}

        {results?.length > 0 && data?.info && (
          <Pagination
            currentPage={filters.page}
            totalPages={data.info.pages}
            onPageChange={(page) =>
              setInputFilters((prev) => ({ ...prev, page }))
            }
          />
        )}
      </main>
    </div>
  );
};

export default CharactersPage;
