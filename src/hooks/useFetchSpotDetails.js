import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFetchSpotDetails = (id) => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["spotDetails", id],
    queryFn: async () => {
      const url = `/tourist-spot/${id}`;
      const { data } = await axiosSecure.get(url);
      return data?.data;
    },
    enabled: !!id,
  });

  return { data, refetch, isLoading, error };
};

export default useFetchSpotDetails;
