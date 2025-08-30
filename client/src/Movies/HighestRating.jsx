import React, { useEffect, useState } from 'react';
// CORRECTED PATHS
import { getHighestRatedMovies } from '../services/api';
import MovieGrid from './MovieGrid';
import '../styles/movies.css';

const HighestRating = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getHighestRatedMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch highest rated movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid-container">
      <h2>Highest Rated</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieGrid key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HighestRating;