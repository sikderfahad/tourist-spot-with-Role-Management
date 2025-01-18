import PropTypes from "prop-types";
import "./style.css";
import { useNavigate } from "react-router-dom";

const TableRow = ({ spot, handleDeleteSpot }) => {
  const navigate = useNavigate();

  return (
    <tr className="my-10">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask moving-border mask-squircle h-24 w-24">
              <img
                className=""
                src={spot?.imgHostingInfo?.secure_url}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{spot?.spot_name}</div>
            <div className="text-sm opacity-50">{spot?.location}</div>
          </div>
        </div>
      </td>
      <td className="break-words">
        {spot?.details}
        <br />
        <span className="badge badge-ghost badge-lg mt-6">
          ${spot.average_cost}
        </span>
      </td>
      <td>{spot?.seasonality}</td>
      <th className="flex flex-col gap-5">
        <button
          onClick={() => navigate(`/view-spot-details/${spot?._id}`)}
          className="btn btn-success "
        >
          Details
        </button>

        <button
          onClick={() => navigate(`/update-tourist-spot/${spot?._id}`)}
          className="btn btn-info "
        >
          Update info
        </button>

        <button
          onClick={() => handleDeleteSpot(spot?._id)}
          className="btn bg-red-600 text-white "
        >
          Delete this spot
        </button>
      </th>
    </tr>
  );
};

TableRow.propTypes = {};

export default TableRow;
