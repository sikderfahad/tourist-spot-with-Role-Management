import React from "react";
import AUForm from "../../components/AUForm/AUForm";
import { useLoaderData } from "react-router-dom";

const UpdateTouristSpot = () => {
  const spotInfo = useLoaderData();
  console.log(spotInfo);
  return (
    <div>
      <AUForm spotInfo={spotInfo?.data} update={true} />
    </div>
  );
};

export default UpdateTouristSpot;
