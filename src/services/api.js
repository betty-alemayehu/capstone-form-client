//api.js
import axios from "axios";

// Base instance for your server API
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use environment variable for API base URL
});

// Add a request interceptor to include the Authorization header
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User-related services
export const registerUser = (userData) => API.post("/users", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);

// Fetch user by ID
export const getUserById = (id) => API.get(`/users/${id}`);

// Update user by ID
export const updateUserById = (id, updatedData) =>
  API.put(`/users/${id}`, updatedData);

// Update user by ID
export const deleteUserById = (id) => API.delete(`/users/${id}`);

// Pose-related services
export const getAllPoses = () => API.get("/poses");
export const getPoseById = (id) => API.get(`/poses/${id}`);

// Progression-related services
export const getUserProgressions = (userId) =>
  API.get(`/progressions/user`, { params: { user_id: userId } });

// Media-related services

// Fetch the most recent media for a specific progression
export const getLatestMediaByProgression = (progressionId) =>
  API.get(`/media/latest`, { params: { progression_id: progressionId } });

// Fetch all media for a specific user and pose
export const getUserMediaByPose = (userId, poseId) =>
  API.get(`/media/user-pose`, { params: { user_id: userId, pose_id: poseId } });

// Export default API instance for general use
export default API;
