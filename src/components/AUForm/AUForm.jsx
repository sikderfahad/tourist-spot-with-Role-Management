import React from "react";
import Input from "../Input/Input";
import FileInput from "../fileInput/FileInput";

const AUForm = ({ handleForm, inputError }) => {
  //   console.log(inputError);
  return (
    <div className="w-10/12 mx-auto p-10 my-10">
      <h1 className="text-4xl font-semibold mb-16 text-center">
        Add new tourists spot!
      </h1>
      <form onSubmit={handleForm} action="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <Input
              type={"text"}
              name={"spot_name"}
              label={"Tourist spot name"}
            />
            {inputError?.spot_name && (
              <p className="text-red-500 text-xs font-medium">
                {inputError?.spot_name}
              </p>
            )}
          </div>

          <Input type={"text"} name={"country_name"} label={"Country name"} />
          <Input type={"text"} name={"location"} label={"Tourist location"} />
          <Input type={"text"} name={"details"} label={"Description"} />
          <Input type={"number"} name={"average_cost"} label={"Average cost"} />
          <Input type={"text"} name={"seasonality"} label={"Standard season"} />
          <Input
            type={"number"}
            name={"travel_time"}
            label={"Travel time (days)"}
          />
          <Input
            type={"number"}
            name={"total_visitors_per_year"}
            label={"Total visitors per year count"}
          />
          <FileInput />
          <button className="btn btn-success">Add Tourists Spot</button>
        </div>
      </form>
    </div>
  );
};

export default AUForm;
