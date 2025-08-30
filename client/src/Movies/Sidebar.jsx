import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sections</h3>
      <ul>
        <li><Link to="/movies/action">Action</Link></li>
      </ul>
    </div>
  );
}
