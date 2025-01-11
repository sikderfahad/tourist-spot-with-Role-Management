import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../components/auhForm/AuthForm";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Signup = () => {
  const { signup, userProfile, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = location?.state?.from?.pathname;

  const handleForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("name");
    const email = form.get("email");
    const pass = form.get("pass");
    const photo = form.get("photo");

    //   Cloudinary photoURL integration
    let photoURL;
    if (photo.size > 0) {
      const imgData = new FormData();
      imgData.append("file", photo);
      imgData.append("upload_preset", "unsigned_preset");
      imgData.append("folder", "tourist_spot");
      try {
        const imgRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imgData
        );

        photoURL = imgRes?.data?.secure_url;
      } catch (err) {
        console.log(`Error when image host in cloudinary: ${err}`);
      }
    }

    //   Update profile data
    const updateProfile = { displayName };
    if (photoURL) {
      updateProfile.photoURL = photoURL;
    }

    //   Create user integration
    try {
      const res = await signup(email, pass);
      try {
        const setUserProfileName = await userProfile(updateProfile);
        navigate(redirectPath || "/", { replace: true });
      } catch (err) {
        console.log(`Error when update user profile name: ${err}`);
      }
    } catch (err) {
      console.log(`Error when signup: ${err}`);
    }
  };
  return (
    <div>
      <AuthForm handleForm={handleForm} formType={"signup"} />
    </div>
  );
};

export default Signup;
