import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = () => {
  const { user, setUser } = useAuth();
  console.log(user);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  // return user ? <>{children}</> : <Navigate to="/login" replace />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;