import React, { useEffect, useState } from 'react';
// CORRECTED PATHS
import { getMoviesByGenre } from '../services/api';
import MovieGrid from './MovieGrid';
import '../styles/movies.css';

const Comedy = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getMoviesByGenre('Comedy');
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch comedy movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid-container">
      <h2>Comedy Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieGrid key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Comedy;