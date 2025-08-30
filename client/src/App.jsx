import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Movies from "./Movies/Movies.jsx";   // ✅ corrected path (was ./Movies/Movies.jsx)
import MovieGrid from "./Movies/MovieGrid.jsx";
import ActionMovies from "./Movies/ActionMovies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { setAuthToken } from "./services/api.js";

const token = localStorage.getItem("token");
setAuthToken(token);

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/movies" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/movies" /> : <Register />}
        />

        {/* Movies parent route */}
        <Route path="/movies" element={<Movies />}>
          {/* Default child */}
          <Route index element={<MovieGrid />} />

          {/* Genre page */}
          <Route path="action" element={<ActionMovies />} />

          {/* Movie details */}
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
