import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sections</h3>
      <ul>
        <li><Link to="/movies/highest-rating">Highest Rating</Link></li>
        <li><Link to="/movies/trending">Trending</Link></li>
        <li><Link to="/movies/comedy">Comedy</Link></li>
        <li><Link to="/movies/thriller">Thriller</Link></li>
        <li><Link to="/movies/horror">Horror</Link></li>
        <li><Link to="/movies/romance">Romance</Link></li>
        <li><Link to="/movies/fan-favourite">Fan Favourite</Link></li>
        <li><Link to="/movies/action">Action</Link></li>
      </ul>
    </div>
  );
}
