import React from "react";
import Input from "../Input/Input";
import FileInput from "../fileInput/FileInput";

const AUForm = ({ handleForm, inputError, update, spotInfo }) => {
  // console.log(spotInfo);

  return (
    <div className="w-10/12 mx-auto p-10 my-10">
      <h1 className="text-4xl font-semibold mb-16 text-center">
        {update ? "Update tourist spot info" : "Add new tourists spot!"}
      </h1>
      <form onSubmit={handleForm} action="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <Input
              type={"text"}
              name={"spot_name"}
              label={"Tourist spot name"}
              defaultValue={spotInfo?.spot_name}
            />
            {inputError?.spot_name && (
              <p className="text-red-500 text-xs font-medium">
                {inputError?.spot_name}
              </p>
            )}
          </div>

          <Input
            type={"text"}
            name={"country_name"}
            label={"Country name"}
            defaultValue={spotInfo?.country_name}
          />
          <Input
            type={"text"}
            name={"location"}
            label={"Tourist location"}
            defaultValue={spotInfo?.location}
          />
          <Input
            type={"text"}
            name={"details"}
            label={"Description"}
            defaultValue={spotInfo?.details}
          />
          <Input
            type={"number"}
            name={"average_cost"}
            label={"Average cost"}
            defaultValue={spotInfo?.average_cost}
          />
          <Input
            type={"text"}
            name={"seasonality"}
            label={"Standard season"}
            defaultValue={spotInfo?.seasonality}
          />
          <Input
            type={"number"}
            name={"travel_time"}
            label={"Travel time (days)"}
            defaultValue={spotInfo?.travel_time}
          />
          <Input
            type={"number"}
            name={"total_visitors_per_year"}
            label={"Total visitors per year count"}
            defaultValue={spotInfo?.total_visitors_per_year}
          />
          <FileInput />
          <button className="btn btn-success">
            {update ? "Update" : "Add"} Tourists Spot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AUForm;
