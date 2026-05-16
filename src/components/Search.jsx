import React from 'react';

function Search({ searchQuery, setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search plants..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;