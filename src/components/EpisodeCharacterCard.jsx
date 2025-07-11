import { useGetCharacterByIdQuery } from '../features/characters/characterApi';
import { Link } from 'react-router-dom';

const EpisodeCharacterCard = ({ id }) => {
  const { data: char, isLoading } = useGetCharacterByIdQuery(id);

  if (isLoading) return <div className="card">Loading...</div>;

  return (
    <Link to={`/character/${id}`} className="card">
      <img src={char.image} alt={char.name} />
      <h3>{char.name}</h3>
      <p>Last Location</p>
      <p><strong>{char.location.name}</strong></p>
    </Link>
  );
};

export default EpisodeCharacterCard;
