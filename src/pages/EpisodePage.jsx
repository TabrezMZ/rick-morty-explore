import { useState, useEffect } from "react";
import {
  useGetEpisodeByIdQuery,
} from "../features/characters/characterApi";
import { useLazyGetCharacterByIdQuery } from "../features/characters/characterApi";
import Navbar from "../components/Navbar";
import EpisodeCharacterCard from "../components/EpisodeCharacterCard";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const EpisodePage = () => {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(1);
  const [characterIds, setCharacterIds] = useState([]);
  const { data: episodeData, isLoading } =
    useGetEpisodeByIdQuery(selectedEpisodeId);

  const { episodes } = useSelector((state) => state.global);

  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>Pick Episode</h2>

        <select
          className="custom-select"
          onChange={(e) => setSelectedEpisodeId(e.target.value)}
          value={selectedEpisodeId}
        >
          {episodes.map((ep) => (
            <option key={ep.id} value={ep.id}>
              {ep.episode} - {ep.name}
            </option>
          ))}
        </select>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h3 style={{ marginTop: "1.5rem" }}>
              Episode name:{" "}
              <span style={{ color: "var(--primary)" }}>
                {episodeData.name}
              </span>
            </h3>
            <p>Air Date: {episodeData.air_date}</p>

            <div className="grid" style={{ marginTop: "2rem" }}>
              {episodeData.characters.map((url) => {
                const id = url.split("/").pop();
                return <EpisodeCharacterCard key={id} id={id} />;
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default EpisodePage;
