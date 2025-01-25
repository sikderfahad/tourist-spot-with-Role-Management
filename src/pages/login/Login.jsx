import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../components/auhForm/AuthForm";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { SERVER_BASE_URL } from "../../main";

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
        const user = res?.user?.email;
        const jwtRes = axios.post(
          `${SERVER_BASE_URL}/jwt`,
          { user },
          { withCredentials: true }
        );
        if (jwtRes?.data?.success) {
          console.log(`jwt token create success`);
          navigate(redirectPath || "/", { replace: true });
        }
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
