import React, { useEffect, useState } from 'react';
import { getMoviesByGenre } from '../../services/api';
import MovieGrid from './MovieGrid';
import '../../styles/movies.css';

const Romance = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getMoviesByGenre('Romance');
        setMovies(data);
      } catch (error) => {
        console.error('Failed to fetch romance movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-grid-container">
      <h2>Romance Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieGrid key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Romance;