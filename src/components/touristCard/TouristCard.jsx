import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../../main";
const TouristCard = ({ spot }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-[300px] w-full">
        <img
          src={spot?.imgHostingInfo?.secure_url}
          className="w-full h-full"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {spot?.spot_name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>

        <div className="my-5">
          <button
            onClick={() => navigate(`/view-spot-details/${spot?._id}`)}
            className="btn btn-info"
          >
            View spot details
          </button>
        </div>
      </div>
    </div>
  );
};

TouristCard.propTypes = {
  spot: PropTypes.shape({
    imgHostingInfo: PropTypes.shape({
      secure_url: PropTypes.string.isRequired,
    }),
    spot_name: PropTypes.string.isRequired,
  }),
};

export default TouristCard;
