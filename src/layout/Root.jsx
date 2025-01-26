import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
