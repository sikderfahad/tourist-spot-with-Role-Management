import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <div className="w-10/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
