import axios from "axios";
import useAuth from "./useAuth";
import { SERVER_BASE_URL } from "../main";

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const axiosSecure = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://tourist-server-zeta.vercel.app",
    withCredentials: true,
  });

  axiosSecure.interceptors.response.use(
    (res) => {
      console.log(res);
      return res;
    },
    async (error) => {
      console.log(error);
      if (error?.status === 401 || error?.status === 403) {
        try {
          const { data } = await axios.post(
            `${SERVER_BASE_URL}/jwt-logout`,
            null,
            {
              withCredentials: true,
            }
          );
          console.log(data);
        } catch (error) {
          console.log(`jwt logout error`, error);
        }
        await logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
