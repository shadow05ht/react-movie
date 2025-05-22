import { useState, useEffect } from "react";
import "./Main.css";
import { NavLink } from "react-router-dom";

const Main = ({
  movieData,
  favoriteList,
  setFavoriteList,
  favoriteInputValue,
  setFavoriteInputValue,
  setMovieSearch
}) => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const [disNone, setDisNone] = useState(false);
  const [favoriteListSave, setFavoriteListSave] = useState(true);

  const classDisNone = () => {
    setDisNone(!disNone);
  };

  const clear = (favoriteItem) => {
    setFavoriteList((prevList) =>
      prevList.filter((item) => item.title !== favoriteItem)
    );
    setDisabledButtons((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[favoriteItem];
      return updatedState;
    });
  };

  const addToFavorites = (movieTitle, movieImdbID) => {
    if (!favoriteList.some((fav) => fav.title === movieTitle)) {
      const newFavorite = { title: movieTitle, imdbID: movieImdbID };
      setFavoriteList((prevList) => [...prevList, newFavorite]);
      setDisabledButtons((prevState) => ({
        ...prevState,
        [movieTitle]: true,
      }));
    }
  };
  console.log(favoriteList);

  useEffect(() => {
    setFavoriteListSave(!(favoriteInputValue.trim() !== "" && favoriteList.length > 0));
  }, [favoriteInputValue, favoriteList]);

  return (
    <>
      <main>
        <div className="movie-cards">
          {movieData.length > 0 ? (
            movieData.map((movie, i) => (
              <div className="movie-card" key={i}>
                <img src={movie.Poster} alt="photo" />
                <h2>{movie.Title}</h2>
                <h5>{movie.Year}</h5>
                <button
                  className={
                    disabledButtons[movie.Title]
                      ? "disable-button"
                      : "add-favorite-button"
                  }
                  disabled={disabledButtons[movie.Title] || disNone}
                  onClick={() => addToFavorites(movie.Title, movie.imdbID)}
                >
                  Add to Favorites
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">Axtardiginiz film tapilmadi</p>
          )}
        </div>
      </main>
      <div className="favorite-list">
        <input
          type="text"
          value={favoriteInputValue}
          className={disNone ? "disable-inp" : "input"}
          onChange={(e) => setFavoriteInputValue(e.target.value)}
          disabled={disNone ? "disable" : ""}
        />
        <div className="list-name-button">
          <div className="favorite-list-names">
            {favoriteList.map((favorite, index) => (
              <div className="favorite-list-item" key={index}>
                <p>{favorite.title}</p>
                <button
                  className={disNone ? "dis-none" : "clear"}
                  onClick={() => clear(favorite.title)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            className={disNone ? "dis-none" : "favorite-list-save"}
            disabled={favoriteListSave}
            onClick={classDisNone}
          >
            Save
          </button>
          <NavLink
            to="/favorite"
            className={!disNone ? "dis-none" : "favorite-list-link"}
          >
            Favorite List
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Main;
