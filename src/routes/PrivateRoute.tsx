import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
