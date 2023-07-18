import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  const { pathname } = useLocation();
  if (token) {
    if (pathname === "/login" || pathname === "/signup") {
      return <Navigate to="/" />;
    }
  } else if (!token) {
    if (pathname === "/") {
      return <Navigate to="/login" />;
    }
  }
  return children;
};

export default ProtectedRoute;
