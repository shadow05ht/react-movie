import React from "react";
import "./Favorite.css";
import { useNavigate } from "react-router-dom";

const FavoriteList = ({ favoriteList, inputValue }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="favorite">
      <h1>Favorite Movies</h1>

      {favoriteList.length > 0 ? (
        <div className="favorite-container">
          <h2>{inputValue}</h2>
          {favoriteList.map((movie, index) => (
            <div className="favorite-item" key={index}>
              <p>{movie.title}</p>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}/`}
                target="_blank"
                rel="noreferrer"
              >
                <button>IMDB</button>
              </a>
            </div>
          ))}
          <button onClick={handleHomeClick}>Home</button>
        </div>
      ) : (
        <p>No favorite movies added.</p>
      )}
    </div>
  );
};

export default FavoriteList;
