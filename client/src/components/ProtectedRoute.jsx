import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ redirect = '/' }) {
  const { isAuthenticated } = useContext(UserContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirect} replace />
  );
}

export default ProtectedRoute;
