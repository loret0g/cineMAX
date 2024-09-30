function Searchbar(props) {
  const { searchTerm, handleSearchTermChange } = props;

  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)} 
        id="search"
      />
      {/* <button onClick={handleSearch}>🔍</button> */}

      <select id="genre-select">
        <option value="">Diferentes géneros</option>
      </select>
    </div>
  );
}

export default Searchbar;