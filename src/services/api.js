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
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use environment variable for API base URL
});

// Example API Services
export const registerUser = (userData) => API.post("/users", userData);
export const loginUser = (credentials) => API.post("/users", credentials);

// Export default API instance for general use
export default API;
