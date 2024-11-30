//api.js
import axios from "axios";

// Base instance for server API
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

/**
 * User-related services
 */
// Register a new user
// Used in SignUpModal.jsx
export const registerUser = (userData) => API.post("/users", userData);

// Login an existing user
// Used in LoginPage.jsx
export const loginUser = (credentials) => API.post("/users/login", credentials);

// Fetch user details by ID
// Used in ProfileSettings.jsx
export const getUserById = (id) => API.get(`/users/${id}`);

// Update user details by ID
// Used in ProfileSettings.jsx
export const updateUserById = (id, updatedData) =>
  API.put(`/users/${id}`, updatedData);

// Delete user by ID
// Used in ProfileSettings.jsx via delete modal
export const deleteUserById = (id) => API.delete(`/users/${id}`);

/**
 * Pose-related services
 */
// Fetch details for a specific pose by ID
// Used in PoseDetails.jsx
export const getPoseById = (id) => API.get(`/poses/${id}`);

/**
 * Progression-related services
 */
// Fetch all progressions for a user with associated media
// Used in HomeTree.jsx
export const getUserProgressionsWithMedia = (userId) =>
  API.get(`/progressions/user/${userId}/media`);

// Fetch progressions for a specific user
// Used in DeleteModal.jsx
export const getUserProgressions = (userId) =>
  API.get(`/progressions/user`, { params: { user_id: userId } });

/**
 * Media-related services
 */
// Upload a media file for a specific user and pose
// Used in PoseDetails.jsx
export const uploadMedia = (formData) =>
  API.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Fetch all media for a specific user and pose
// Used in PoseDetails.jsx
export const getUserMediaByPose = async (userId, poseId) => {
  try {
    const response = await API.get(`/media/user-pose`, {
      params: { user_id: userId, pose_id: poseId },
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return []; // Return empty array if no media is found
    }
    throw err;
  }
};

// Delete media
export const deleteMedia = (mediaId) => API.delete(`/media/${mediaId}`);

export default API;
