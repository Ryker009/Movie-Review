import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieGrid from './MovieGrid';
import '../../styles/movies.css';

const Trending = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid-container">
      <h2>Trending Now</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieGrid key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Trending;