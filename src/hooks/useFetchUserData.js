import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export const useFetchUserData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["spotList", user?.email],
    queryFn: async () => {
      const url = `/tourist-spot/user/${user?.email}`;
      const spotListRes = await axiosSecure.get(url);
      return spotListRes?.data;
    },
    enabled: !!user?.email,
  });

  // console.log(data);
  return { data, isLoading, refetch, error };
};
