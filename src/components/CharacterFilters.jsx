import { useSelector } from "react-redux";

const CharacterFilters = ({ filters, setFilters }) => {
  const { episodes, locations } = useSelector((state) => state.global);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // reset to first page on any change
    }));
  };

  return (
    <div className="filters">
      <input
        type="text"
        name="name"
        placeholder="Search by name..."
        value={filters.name}
        onChange={handleChange}
      />

      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <input
        type="text"
        name="species"
        placeholder="Species"
        value={filters.species}
        onChange={handleChange}
      />

      <input
        type="text"
        name="type"
        placeholder="Type (e.g. Poopybutthole, Mythological)"
        value={filters.type}
        onChange={handleChange}
      />

      <select name="location" value={filters.location} onChange={handleChange}>
        <option value="">Filter by Location for this Page</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      <select name="episode" value={filters.episode} onChange={handleChange}>
        <option value="">Filter by Episode for this page</option>
        {episodes.map((ep) => (
          <option key={ep.id} value={ep.episode}>
            {ep.episode} - {ep.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterFilters;
