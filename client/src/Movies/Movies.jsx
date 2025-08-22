import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { Link, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MovieGrid from "./MovieGrid.jsx";

import HighestRating from "./HighestRating.jsx";
import Trending from "./Trending.jsx";
import Comedy from "./Comedy.jsx";
import Thriller from "./Thriller.jsx";
import Horror from "./Horror.jsx";
import Romance from "./Romance.jsx";
import FanFavourite from "./FanFavourite.jsx";
import ActionMovies from "./ActionMovies.jsx";

import "../styles/movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => { load(); }, [sort]);

  async function load() {
    const { data } = await api.get("/movies", { params: { sort } });
    setMovies(data);
  }

  async function search(query) {
    const { data } = await api.get("/movies", { params: { q: query, sort } });
    setMovies(data);
  }

  useEffect(() => {
    if (q.trim() === "") {
      load();
    } else {
      search(q);
    }
  }, [q, sort]);

  function handleSubmit(e) {
    e.preventDefault();
    search(q);
  }

  return (



    

    <div className="movies-page">
      <div className="side">
        <Sidebar />
      </div>

      <div className="main">
        <div className="movies-main">
        <form className="search" onSubmit={handleSubmit}>
          <input
            placeholder="Search movies..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="btn" type="submit">Search</button>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </form>

        <Routes>
          <Route path="/" element={<MovieGrid movies={movies} />} />
          <Route path="highest-rating" element={<HighestRating />} />
          <Route path="trending" element={<Trending />} />
          <Route path="comedy" element={<Comedy />} />
          <Route path="thriller" element={<Thriller />} />
          <Route path="horror" element={<Horror />} />
          <Route path="romance" element={<Romance />} />
          <Route path="fan-favourite" element={<FanFavourite />} />
          <Route path="action" element={<ActionMovies />} />
        </Routes>
      </div>
      </div>
    </div>
  );
}
