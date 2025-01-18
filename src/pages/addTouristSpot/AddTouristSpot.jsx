import { useContext, useState } from "react";
import AUForm from "../../components/AUForm/AUForm";
import { validateForm } from "../../hooks/validateForm";
import getPhotoUrl from "../../hooks/getPhotoUrl";
import axios from "axios";
import { SERVER_BASE_URL } from "../../main";
import { AuthContext } from "../../providers/AuthProvider";

const AddTouristSpot = () => {
  const { user } = useContext(AuthContext);
  const [inputError, setInputError] = useState({});
  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      console.log(Object.keys(errors).length);
      return;
    }
    setInputError({});

    // Prepare spot data to host
    const newSpotData = {
      spot_name: data.spot_name,
      country_name: data.country_name,
      location: data.location,
      details: data.details,
      average_cost: data.average_cost,
      seasonality: data.seasonality,
      travel_time: data.travel_time,
      total_visitors_per_year: data.total_visitors_per_year,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    try {
      // get image info from cloudinary
      const spotPhotoInfo = await getPhotoUrl(data?.photo);
      if (!spotPhotoInfo) {
        console.log(`Image hosting error`);
      }
      const { secure_url, asset_folder, asset_id, public_id } = spotPhotoInfo;

      const imgHostingInfo = { secure_url, asset_folder, asset_id, public_id };
      newSpotData.imgHostingInfo = imgHostingInfo;
      console.log(newSpotData);
      try {
        const res = await axios.post(
          `${SERVER_BASE_URL}/tourist-spot`,
          newSpotData
        );
        if (!res?.data?.success) {
          return alert(res?.data?.message);
        }
        alert(res?.data?.message);
        e.target.reset();
        // console.log(res?.data);
      } catch (err) {
        console.log(`Error when post new spot data: ${err}`);
      }

      // console.log(newSpotData);
    } catch (err) {
      console.log(`Error when host image from add page: ${err}`);
    }
  };
  return (
    <div>
      <AUForm handleForm={handleForm} inputError={inputError} />
    </div>
  );
};

export default AddTouristSpot;
