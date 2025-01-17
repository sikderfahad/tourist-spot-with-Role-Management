import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import TableRow from "../../components/tableRow/TableRow";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../../hooks/services";
import TableSkeleton from "../../components/tableSkeleton/TableSkeleton";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const { data: spotList, isLoading } = useQuery({
    queryKey: ["spotList", user?.email],
    queryFn: () => fetchUserData(user?.email),
  });
  // console.log(spotList);

  setTimeout(() => {
    {
      !spotList && (
        <h1 className="text-4xl font-bold text-red-600 animate-pulse text-center">
          No data found!
        </h1>
      );
    }
  }, 500);

  return (
    <div className="w-10/12 mx-auto my-10 text-center">
      <div className="overflow-x-auto">
        {
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Spot</th>
                <th>Cost</th>
                <th>Season to go</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <TableSkeleton />}
              {spotList &&
                spotList?.data.map((spot) => (
                  <TableRow key={spot?._id} spot={spot} />
                ))}
            </tbody>
          </table>
        }
      </div>
      {!spotList && (
        <h1 className="text-4xl font-bold text-red-600 animate-pulse text-center">
          No data found!
        </h1>
      )}
    </div>
  );
};

export default MyList;
