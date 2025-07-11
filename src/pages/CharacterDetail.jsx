import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCharacterByIdQuery,
  useGetEpisodesByUrlsQuery,
  useGetLocationByUrlQuery,
} from "../features/characters/characterApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const CharacterDetail = () => {
    const navigate = useNavigate();
  const { id } = useParams();

  const { data: character, isLoading, isError } = useGetCharacterByIdQuery(id);
  const { data: originData } = useGetLocationByUrlQuery(
    character?.origin?.url || "",
    {
      skip: !character?.origin?.url,
    }
  );
  const { data: episodesData } = useGetEpisodesByUrlsQuery(
    character?.episode || [],
    {
      skip: !character?.episode?.length,
    }
  );

  if (isLoading) return <Loader />;
  if (isError) return <p className="error">Error loading character.</p>;


  return (
    <div>
      <Navbar />
       <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <div className="character-detail-container">
       

        <div className="character-card">
          <div className="image-wrapper">
            <img src={character.image} alt={character.name} />
          </div>

          <h1 className="char-name">{character.name}</h1>

          <div className="char-info">
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Type:</strong> {character.type || "—"}
            </p>
            <p>
              <strong>Origin:</strong> {character.origin.name}
            </p>

            {originData && (
              <>
                <p>
                  <strong>Dimension:</strong> {originData.dimension}
                </p>
                <p>
                  <strong>Residents:</strong> {originData.residents.length}
                </p>
              </>
            )}

            <p>
              <strong>Current Location:</strong> {character.location.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
