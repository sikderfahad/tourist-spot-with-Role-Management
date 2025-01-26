import axios from "axios";
import { SERVER_BASE_URL } from "../main";

const jwtSignin = async (user, redirectPath, navigate) => {
  if (!user) {
    return console.log(`user email not found in user`);
  }
  try {
    const jwtRes = await axios.post(
      `${SERVER_BASE_URL}/jwt`,
      { user },
      { withCredentials: true }
    );
    // console.log(jwtRes, user);
    if (jwtRes?.data?.success) {
      //   return <Navigate to={redirectPath || "/"} />;
      navigate(redirectPath || "/", { replace: true });
    }
  } catch (err) {
    console.log(`error when create access token: ${err}`);
  }
};

export default jwtSignin;
