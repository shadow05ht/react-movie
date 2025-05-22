import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = ({ searchInputValue, setSearchInputValue, setMovieSearch }) => {
  const location = useLocation();

  const handleSearch = () => {
    if (searchInputValue.trim() !== "") {
      setMovieSearch(searchInputValue);
    }
  };

  return (
    <header>
      <div className="site-title">Movie</div>

      {location.pathname === "/" && (
        <div className="header-search-container">
          <input
            type="text"
            placeholder="Axtar..."
            className="input"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Axtar
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
