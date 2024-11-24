//api.js
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

// Add a request interceptor to include the Authorization header
API.interceptors.request.use(
  (config) => {
    // Retrieve and parse the 'user' object
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the Bearer token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example API Services
export const registerUser = (userData) => API.post("/users", userData);
export const loginUser = (credentials) => API.post("/users", credentials);

// Fetch progressions for a specific user
export const getUserProgressions = (userId) =>
  API.get(`/progressions/user`, { params: { user_id: userId } });

// Fetch the most recent media for a specific progression
export const getLatestMediaByProgression = (progressionId) =>
  API.get(`/media/latest`, { params: { progression_id: progressionId } });

// Export default API instance for general use
export default API;
