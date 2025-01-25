import TableRow from "../../components/tableRow/TableRow";

import "./style.css";
import { SERVER_BASE_URL } from "../../main";
import axios from "axios";
import { useFetchUserData } from "../../hooks/useFetchUserData";
import RowSkeleton from "../../components/rowSkeleton/rowSkeleton";

const MyList = () => {
  const { data: spotList, isLoading, refetch, error } = useFetchUserData();
  console.log(spotList);

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
      console.log(`Error when deleting spot data: ${err}`);
    }
  };

  return (
    <div className="w-10/12 mx-auto my-10 text-center">
      {!spotList?.data.length > 0 ? (
        <h1 className="text-4xl font-bold text-red-600 animate-pulse text-center">
          No data found!
        </h1>
      ) : (
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
                {isLoading && <RowSkeleton />}
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
      )}
      {/* {!spotList && (
        <h1 className="text-4xl font-bold text-red-600 animate-pulse text-center">
          No data found!
        </h1>
      )} */}
    </div>
  );
};

export default MyList;
