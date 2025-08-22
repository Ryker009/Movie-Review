import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import MovieGrid from "./MovieGrid";

export default function Horror() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/movies", { params: { genre: "Horror" } });
        setMovies(data);
      } catch (err) {
        console.error("Error fetching horror movies:", err);
        setError("Failed to load horror movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="container-HORROR">Loading...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="container">No horror movies found.</div>;
  }

  return <MovieGrid movies={movies} />;
}
