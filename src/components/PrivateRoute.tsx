import React from "react";
import Loading from "./ui/loading/Loading";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Loading />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
