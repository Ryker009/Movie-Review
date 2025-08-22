import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import MovieGrid from "./MovieGrid";

export default function HighestRating() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await api.get("/movies", { params: { sort: "highest" } });
    setMovies(data);
  }

  return (
    <div>
      <h2>Highest Rated Movies</h2>
      <MovieGrid movies={movies} />
    </div>
  );
}
