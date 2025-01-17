import { useQuery } from "@tanstack/react-query";
import { fetchAllData } from "../../hooks/services";
import TouristCard from "../../components/touristCard/TouristCard";

const AllTouristSpot = () => {
  const {
    data: touristSpots,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tourist-spots"],
    queryFn: fetchAllData,
  });

  return (
    <div className="w-10/12 mx-auto my-10">
      {isError && (
        <p className="text-red-500 text-center font-semibold text-xs my-5">
          Error:{error?.message}
        </p>
      )}

      {isLoading && (
        <span className="loading text-center mx-auto loading-spinner text-success loading-lg"></span>
      )}

      <div className="grid grid-cols-3 gap-5">
        {touristSpots?.data.map((spot) => (
          <TouristCard key={spot?._id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default AllTouristSpot;
