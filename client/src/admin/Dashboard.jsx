// client/src/admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/movies">Manage Movies</Link></li>
        <li><Link to="/admin/add">Add Movie</Link></li>
      </ul>
    </div>
  );
}
