import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Trending from './Trending';
import ActionMovies from './ActionMovies';
import Comedy from './Comedy';
import FanFavourite from './FanFavourite';
import HighestRating from './HighestRating';
import Horror from './Horror';
import Romance from './Romance';
import Thriller from './Thriller';
import '../styles/movies.css';

const Movies = () => {
  return (
    <div className="movies-container">
      <Sidebar />
      <div className="movies-content">
        <Routes>
          {/* Default route for /movies will show Trending */}
          <Route index element={<Trending />} /> 
          <Route path="trending" element={<Trending />} />
          <Route path="fan-favourite" element={<FanFavourite />} />
          <Route path="highest-rating" element={<HighestRating />} />
          <Route path="action" element={<ActionMovies />} />
          <Route path="comedy" element={<Comedy />} />
          <Route path="horror" element={<Horror />} />
          <Route path="romance" element={<Romance />} />
          <Route path="thriller" element={<Thriller />} />
        </Routes>
        {/* The Outlet is replaced by the element from the matched Route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Movies;