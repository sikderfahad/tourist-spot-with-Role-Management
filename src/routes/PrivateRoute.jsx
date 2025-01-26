import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Spinner from "../components/spinner/Spinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { user, role, loading } = useContext(AuthContext);
  // console.log(location);

  if (loading) {
    return <Spinner />;
  }

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.node.isRequired,
};

export default PrivateRoute;
