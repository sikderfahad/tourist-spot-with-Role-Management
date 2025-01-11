import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Spinner from "../components/spinner/Spinner";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  //   console.log(location);

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default PublicRoute;
