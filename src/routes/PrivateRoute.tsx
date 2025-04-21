import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
