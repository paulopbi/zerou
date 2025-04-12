import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
