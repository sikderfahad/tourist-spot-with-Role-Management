import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_BASE_URL } from "../../main";

const SocialLoginBtn = () => {
  const { googleLogin, githubLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const redirectPath = location?.state?.from?.pathname;

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res?.user?.email;

      if (!user) {
        return console.log(`user email not found in user`);
      }

      try {
        const jwtRes = await axios.post(
          `${SERVER_BASE_URL}/jwt`,
          { user },
          { withCredentials: true }
        );
        console.log(jwtRes, user);
        if (jwtRes?.data?.success) {
          navigate(redirectPath || "/", { replace: true });
        }
      } catch (err) {
        console.log(`error when create access token: ${err}`);
      }
    } catch (err) {
      console.log(`Error when google Login: ${err}`);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const res = await githubLogin();
      const userEmail = res?.user?.email;
      console.log(userEmail);
      navigate(redirectPath || "/", { replace: true });
    } catch (err) {
      console.log(`Error when google Login: ${err}`);
    }
  };

  const commonStyle =
    "text-lg font-semibold flex items-center justify-center gap-2 py-3 rounded-xl bg-black ";
  return (
    <div className="w-full flex flex-col gap-5">
      <button
        onClick={handleGoogleLogin}
        className={`${commonStyle} text-orange-500`}
      >
        <FaGoogle className="text-blue-600" /> <span>Login with google</span>
      </button>

      <button
        onClick={handleGithubLogin}
        className={`${commonStyle} text-sky-600`}
      >
        <FaGithub className="text-white" /> <span>Login with github</span>
      </button>
    </div>
  );
};

export default SocialLoginBtn;
