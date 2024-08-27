import React from 'react';
import feather from 'feather-icons';

const SearchBar = ({ query, setQuery, handleSearch, searchInitiated, setSelectedGenre, genres }) => {
  React.useEffect(() => {
    feather.replace();
  }, []);


  return (
    <form className={`search-form my-4 ${searchInitiated ? 'mt-2 pt-0' : 'mt-5 pt-5'}`} onSubmit={handleSearch}>
      <div className={`search-bar border-special text-white d-flex justify-content-between align-items-center py-2 px-3`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher des films..."
          className="search-input bg-transparent border-0 flex-grow-1"
        />
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-select bg-transparent text-white border-0 mx-2"
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option className="text-dark" key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <button type="submit" className="search-icon-button border-0 bg-transparent color-special ms-2">
          <i data-feather="search"></i>
        </button>
      </div>
    </form>
  );

};

export default SearchBar;