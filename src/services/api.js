import axios from "axios";

// Base instance for Yoga API
const yogaApi = axios.create({
  baseURL: "https://yoga-api-nzy4.onrender.com/v1/",
});

// Yoga API services
export const getAllPoses = () => yogaApi.get("poses");
export const getPoseById = (id) => yogaApi.get(`poses/?id=${id}`);

//=========================================================

// Base instance for next set of server needs
