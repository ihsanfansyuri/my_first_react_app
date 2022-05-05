import React, { useEffect, useState } from "react";

import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// 22775245

const API_URL = "https://www.omdbapi.com/?apikey=22775245";
// const API_URL = "https://api.themoviedb.org/3";
// const API_KEY = "be42a911c47a690bd54e2e9f1e0a831d";

// const movie1 = {
//   Title: "Amazing Spiderman Syndrome",
//   Year: "2012",
//   imdbID: "tt2586634",
//   Type: "movie",
//   Poster: "N/A",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    // const res = await fetch(
    //   `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`
    // );
    const data = await res.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for moives"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
