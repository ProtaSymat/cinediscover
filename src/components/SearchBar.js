import React from 'react';
import feather from 'feather-icons';

const SearchBar = ({ query, setQuery, handleSearch, searchInitiated }) => {
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
        <button type="submit" className="search-icon-button border-0 bg-transparent color-special ms-2">
          <i data-feather="search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;