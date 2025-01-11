import React from "react";
import { Link } from "react-router-dom";
import SocialLoginBtn from "../socialLoginBtn/SocialLoginBtn";

const AuthForm = ({ handleForm, formType }) => {
  const signup = formType === "signup";
  const login = formType === "login";

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen p-16">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              <span className="capitalize">{formType}</span> now!
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleForm}>
                {signup && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Profile image</span>
                      </label>
                      <input
                        name="photo"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                      />
                    </div>
                  </>
                )}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  {!login ? (
                    <div className="w-full flex items-center justify-end">
                      <label className="label">
                        <span className="text-xs">
                          Already have an account?{" "}
                        </span>{" "}
                        <Link
                          to={"/login"}
                          className="label-text-alt link link-hover"
                        >
                          Login now
                        </Link>
                      </label>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between">
                      <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                          Forgot password?
                        </a>
                      </label>
                      <label className="label">
                        <span className="text-xs">New in here? </span>{" "}
                        <Link
                          to={"/signup"}
                          className="label-text-alt link link-hover"
                        >
                          Signup now
                        </Link>
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">
                    {signup ? "Signup" : "Login"}
                  </button>
                </div>
              </form>
              <div className="my-6">
                <SocialLoginBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
