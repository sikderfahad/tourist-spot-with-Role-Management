import { useParams } from "react-router-dom";
import useFetchSpotDetails from "../../hooks/useFetchSpotDetails";
import Spinner from "../../components/spinner/Spinner";

const ViewDetails = () => {
  // const spot = useLoaderData();
  const { id } = useParams();
  const { data, isLoading, error } = useFetchSpotDetails(id);
  // console.log(data);

  if (isLoading) {
    return (
      <div className="w-full text-center">
        <Spinner />{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <h1 className="text-red-600 text-2xl my-10 animate-pulse font-bold text-center">
          An error occurd please try again later
        </h1>
        ;
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full">
        <h1 className="text-red-600 text-2xl my-10 animate-pulse font-bold text-center">
          No data found of this spot
        </h1>
        ;
      </div>
    );
  }

  const {
    spot_name,
    imgHostingInfo,
    country_name,
    location,
    details,
    average_cost,
    seasonality,
    travel_time,
    total_visitors_per_year,
  } = data;
  // console.log(spot);

  return (
    <div className="w-10/12 mx-auto my-10">
      <div
        className="w-full rounded-xl"
        style={{ boxShadow: "0 0 50px white" }}
      >
        <img
          className="rounded-xl w-full"
          src={imgHostingInfo?.secure_url}
          alt=""
        />
      </div>

      <div className="my-10 w-1/2">
        <ul style={{ listStyle: "disc" }} className="ml-12 flex flex-col gap-5">
          <li className="text-lg font-medium">
            <span className="">Spot name: </span>{" "}
            <span className="text-green-600 font-bold">{spot_name}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Details: </span>{" "}
            <span className="text-green-600 font-bold">{details}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Country name: </span>{" "}
            <span className="text-green-600 font-bold">{country_name}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Location: </span>{" "}
            <span className="text-green-600 font-bold">{location}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Average cost: </span>{" "}
            <span className="text-green-600 font-bold">${average_cost}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Standard season: </span>{" "}
            <span className="text-green-600 font-bold">{seasonality}</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Travel time: </span>{" "}
            <span className="text-green-600 font-bold">{travel_time} days</span>
          </li>
          <li className="text-lg font-medium">
            <span className="">Total visitors per year: </span>
            <span className="text-green-600 font-bold">
              {total_visitors_per_year ? total_visitors_per_year : "No"} person
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewDetails;
