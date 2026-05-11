import React from 'react';

function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Type a name to search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;