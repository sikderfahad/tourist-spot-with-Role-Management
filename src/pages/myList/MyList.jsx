import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import TableRow from "../../components/tableRow/TableRow";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../../hooks/services";
import TableSkeleton from "../../components/tableSkeleton/TableSkeleton";
import "./style.css";
import { SERVER_BASE_URL } from "../../main";
import axios from "axios";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const {
    data: spotList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["spotList", user?.email],
    queryFn: () => fetchUserData(user?.email),
  });
  // console.log(spotList);

  const handleDeleteSpot = async (id) => {
    try {
      const deleteRes = await axios.delete(
        `${SERVER_BASE_URL}/tourist-spot/${id}`
      );
      if (!deleteRes?.data?.success) {
        return alert(deleteRes?.data?.message);
      }
      alert(deleteRes?.data?.message);
      refetch();
    } catch (err) {
      console.log(`Error when deleting spot data`);
    }
  };

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
            <tbody className="">
              {isLoading && <TableSkeleton />}
              {spotList &&
                spotList?.data.map((spot) => (
                  <TableRow
                    key={spot?._id}
                    spot={spot}
                    handleDeleteSpot={handleDeleteSpot}
                  />
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
