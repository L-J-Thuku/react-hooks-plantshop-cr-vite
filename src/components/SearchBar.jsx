import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search plants by name or species..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm('')} className="clear-btn">
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;