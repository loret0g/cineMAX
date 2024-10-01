function Searchbar(props) {
  const { searchTerm, handleSearchTermChange, genre, setSelectGenre } = props;

  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)} 
        id="search"
        placeholder="Todas las películas"
      />

      {genre.genres === undefined ? (
        <h3>...Cargando</h3>
      ) : (
        <select id="genre-select" onChange={(e) => setSelectGenre(e.target.value)}>
          <option disabled selected>Select a genre</option>
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