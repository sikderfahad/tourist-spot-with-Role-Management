import axios from "axios";
import { SERVER_BASE_URL } from "../main";

const fetchUserData = async (email) => {
  // const url = `/tourist-spot/user/${email}`;
  if (!email) {
    console.log(`email not found`);
    // return { data: [] };
  }

  try {
    const url = `${SERVER_BASE_URL}/tourist-spot/user/${email}`;
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err) {
    console.log(`Error when fetching all spots data: ${err}`);
    // return { data: [] };
  }
};

const fetchAllData = async () => {
  const url = `${SERVER_BASE_URL}/tourist-spot`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(`Error when fetching users all spots data: ${err}`);
  }
};

const fetchSpotDetails = async (id) => {
  const url = `${SERVER_BASE_URL}/tourist-spot/${id}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(`Error when fetching a single spots data: ${err}`);
  }
};

export { fetchUserData, fetchAllData, fetchSpotDetails };
