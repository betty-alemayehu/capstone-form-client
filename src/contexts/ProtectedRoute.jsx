import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Access user from context

  if (!user) {
    // If no user is logged in, redirect to the landing page
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component if user exists
};

export default ProtectedRoute;
