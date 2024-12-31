import React from "react";

import { useAuth } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Replace with a loader/spinner if available
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
