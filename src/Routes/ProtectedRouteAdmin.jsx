import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteAdmin = () => {
  const { isAdmin, isUserLoggedIn } = useAuth();

  if (!isUserLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouteAdmin;
