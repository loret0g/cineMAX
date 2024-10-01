import Form from 'react-bootstrap/Form';

function Searchbar(props) {
  const { searchTerm, handleSearchTermChange, genre, setSelectGenre } = props;

  return (
    <div id="searchbar">
      <label htmlFor="search" className="search-label"></label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)} 
        // id="search"
        placeholder="Search all the movies you want"
      />

      {genre.genres === undefined ? (
        <h3>...Cargando</h3>
      ) : (
        <select id="genre-select" onChange={(e) => setSelectGenre(e.target.value)} defaultValue="">
          <option disabled value="">Select a genre</option>
          {genre.genres.map((eachGenre) => (
            <option key={eachGenre.id} value={eachGenre.id}>
              {eachGenre.name}
            </option>
          ))}
        </select>
      )}
    </div>

  );
}

export default Searchbar;