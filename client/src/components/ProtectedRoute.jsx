import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// client/src/components/ProtectedRoute.jsx

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function ProtectedRoute({ children, role = null }) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;
//   if (role && user.role !== role) return <Navigate to="/" replace />;

//   return children;
// }
