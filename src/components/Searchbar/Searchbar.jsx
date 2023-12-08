import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const hendleSubmit = evt => {
    evt.preventDefault();

    if (!search.trim()) {
      return alert('Can not be empty');
    }

    onSubmit(search);
  };

  const handleInputChange = ({ target: { value } }) => {
    setSearch(value);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={hendleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={search}
          onChange={handleInputChange}
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
