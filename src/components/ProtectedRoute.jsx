import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated = false }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
