import axios from "axios";
const getPhotoUrl = async (photo) => {
  const imgData = new FormData();
  imgData.append("file", photo);
  imgData.append("upload_preset", "unsigned_preset");
  imgData.append("folder", "tourist_spot");

  try {
    const imgRes = await axios.post(
      `https://api.cloudinary.com/v1_1/dwa2voehg/image/upload`,
      imgData
    );
    const imgHostingInfo = imgRes?.data;
    // console.log(imgHostingInfo);
    return imgHostingInfo;
  } catch (err) {
    console.log(`Error when hosting image: ${err}`);
  }
};
export default getPhotoUrl;
