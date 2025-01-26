import { useState } from "react";
import AUForm from "../../components/AUForm/AUForm";
import { useNavigate, useParams } from "react-router-dom";
import { validateForm } from "../../hooks/validateForm";
import getPhotoUrl from "../../hooks/getPhotoUrl";
import useFetchSpotDetails from "../../hooks/useFetchSpotDetails";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateTouristSpot = () => {
  // const spotInfo = useLoaderData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: spotInfo } = useFetchSpotDetails(id);
  // console.log("data from updata page: ", spotInfo);

  const [inputError, setInputError] = useState({});
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const errors = validateForm(data, true);
    if (Object.keys(errors).length > 0) {
      setInputError(errors);
    }
    setInputError({});

    const updatedSpotData = {
      spot_name: data.spot_name,
      country_name: data.country_name,
      location: data.location,
      details: data.details,
      average_cost: data.average_cost,
      seasonality: data.seasonality,
      travel_time: data.travel_time,
      total_visitors_per_year: data.total_visitors_per_year,
    };

    if (data?.photo?.size > 0) {
      try {
        const spotPhotoInfo = await getPhotoUrl(data.photo);
        if (!spotPhotoInfo) {
          return console.log("Image hosting error while updating");
        }

        const { secure_url, asset_folder, asset_id, public_id } = spotPhotoInfo;

        const imgHostingInfo = {
          secure_url,
          asset_folder,
          asset_id,
          public_id,
        };
        updatedSpotData.imgHostingInfo = imgHostingInfo;
        updatedSpotData.ex_public_id = spotInfo?.imgHostingInfo?.public_id;
      } catch (err) {
        console.log(`Error when host image while update spot info: ${err}`);
      }
    }

    try {
      // const updateRes = await axios.patch(
      //   `${SERVER_BASE_URL}/tourist-spot/${spotInfo?._id}`,
      //   updatedSpotData
      // );

      const updateRes = await axiosSecure.patch(
        `/tourist-spot/${spotInfo?._id}`,
        updatedSpotData
      );

      if (!updateRes?.data?.success) {
        return alert(updateRes?.data?.message);
      }
      alert(updateRes?.data?.message);
      e.target.reset();
      navigate(`/view-spot-details/${spotInfo?._id}`);
    } catch (err) {
      console.log(`Error when hosting updating spot data in MongoDB: ${err}`);
    }
  };
  return (
    <div>
      <AUForm
        spotInfo={spotInfo}
        update={true}
        handleForm={handleForm}
        inputError={inputError}
      />
    </div>
  );
};

export default UpdateTouristSpot;
