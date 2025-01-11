import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyList = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full my-10 text-center">
      <h1 className="text-2xl font-semibold">
        Welcome,{" "}
        <span className="text-green-600 font-bold text-3xl animate-pulse">
          {user?.displayName}{" "}
        </span>
        How about yourself!
      </h1>
    </div>
  );
};

export default MyList;
