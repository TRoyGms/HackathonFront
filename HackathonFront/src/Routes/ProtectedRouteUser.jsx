import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteUser = () => {
  const { isUserLoggedIn } = useAuth();
  return isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteUser;
