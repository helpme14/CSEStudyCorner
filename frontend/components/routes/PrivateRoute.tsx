import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../src/context/AuthContext";

// Define the type for the props
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Use the AuthContext to get authTokens

  const context = useContext(AuthContext);
  //check if undefined, else error
  if (!context) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { authTokens } = context;

  // If the user is not authenticated, redirect to the login page
  if (!authTokens) {
    return <Navigate to="/registration" />;
  }

  // else, render the children components
  return <>{children}</>;
};

export default PrivateRoute;
