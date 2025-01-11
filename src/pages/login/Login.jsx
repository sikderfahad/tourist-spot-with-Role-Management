import React, { useContext } from "react";
import {
  Link,
  Navigate,
  replace,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AuthForm from "../../components/auhForm/AuthForm";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { signIn, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location);

  const redirectPath = location?.state?.from?.pathname;

  const handleForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const pass = form.get("pass");

    try {
      const res = await signIn(email, pass);
      if (res?.user) {
        navigate(redirectPath || "/", { replace: true });
      }
    } catch (err) {
      console.log(`Error when login: ${err}`);
    }
  };
  return (
    <div>
      <AuthForm handleForm={handleForm} formType={"login"} />
    </div>
  );
};

export default Login;
