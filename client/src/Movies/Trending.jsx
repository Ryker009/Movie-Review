import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import MovieGrid from "./MovieGrid";

export default function Trending() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await api.get("/movies", { params: { category: "trending" } });
      setMovies(data);
    }
    load();
  }, []);

  return <MovieGrid movies={movies} />;
}
