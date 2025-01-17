import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Spinner from "../spinner/Spinner";

const Header = () => {
  const { user, role, logout, loading } = useContext(AuthContext);
  // console.log(role);

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
    } catch (err) {
      console.log(`Error when logout: ${err}`);
    }
  };

  const navigate = useNavigate();
  const navs = [
    { path: "/", name: "home" },
    { path: "/all-tourist-spot", name: "all tourists spot" },
    { path: "/add-tourist-spot", name: "add tourists spot" },
    { path: "/my-list", name: "my list" },
  ];

  const displayNav = () => {
    return navs.map((nav, idx) => (
      <li key={idx}>
        <NavLink to={nav.path} className="capitalize font-medium">
          {nav.name}
        </NavLink>{" "}
      </li>
    ));
  };

  return (
    <div>
      <div className="navbar h-[100px] bg-gray-900">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {displayNav()}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl animate-bounce">
            <span className="animate-pulse">Tourist Hunt</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{displayNav()}</ul>
        </div>

        <div className="navbar-end">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {user ? (
                <div className="group relative flex items-center justify-center">
                  <div className="avatar">
                    <div
                      className={`group-hover:hidden ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2 duration-200`}
                    >
                      <img src={user?.photoURL} />
                    </div>
                  </div>

                  <div
                    className={`hidden group-hover:flex items-center gap-3 duration-200`}
                  >
                    <span className="profile-name text-center text-xl font-semibold text-green-600">
                      {user && user?.displayName}
                    </span>
                    <button onClick={handleLogout} className="btn">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-success"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="btn btn-info"
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
