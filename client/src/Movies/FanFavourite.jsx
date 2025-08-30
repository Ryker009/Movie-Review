import React, { useEffect, useState } from 'react';
// CORRECTED PATHS
import { getFanFavouriteMovies } from '../services/api';
import MovieGrid from './MovieGrid';
import '../styles/movies.css';

const FanFavourite = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getFanFavouriteMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch fan favourite movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid-container">
      <h2>Fan Favourites</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieGrid key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FanFavourite;