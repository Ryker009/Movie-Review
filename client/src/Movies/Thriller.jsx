import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import MovieGrid from "./MovieGrid";

export default function Thriller() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await api.get("/movies", { params: { genre: "Thriller" } });
      setMovies(data);
    }
    load();
  }, []);

  return <MovieGrid movies={movies} />;
}
