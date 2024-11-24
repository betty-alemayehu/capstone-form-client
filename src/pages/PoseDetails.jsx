//PoseDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import PoseWidget from "../components/PoseWidget"; // Carousel for displaying media
import { getPoseById, getUserMediaByPose, uploadMedia } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const PoseDetails = () => {
  const { id: poseId } = useParams(); // Pose ID from URL
  const { user } = useContext(UserContext); // Get logged-in user info
  const [pose, setPose] = useState(null); // Pose details
  const [media, setMedia] = useState([]); // Media for the pose and user
  const [file, setFile] = useState(null); // File for upload
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  // Fetch pose details and user-specific media
  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return;

      try {
        // Fetch pose details
        const poseResponse = await getPoseById(poseId);
        setPose(poseResponse.data);

        // Fetch media for the user and pose
        const mediaResponse = await getUserMediaByPose(user.user_id, poseId);
        console.log("Media Response:", mediaResponse.data); // Debugging log
        setMedia(mediaResponse.data);
      } catch (err) {
        if (err.response?.status === 404) {
          console.warn("No user media found for this pose.");
          setMedia([]); // Handle as empty state
        } else {
          console.error("Failed to fetch pose details or media:", err);
          setError("An unexpected error occurred. Please try again.");
        }
      }
    };

    fetchDetails();
  }, [poseId, user, refresh]); // Add `refresh` to the dependency array

  // Handle file upload and progression update
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", user.user_id);
    formData.append("pose_id", poseId);

    try {
      // Upload the file (backend handles progression update)
      const uploadResponse = await uploadMedia(formData);
      alert("File uploaded successfully!");

      // Trigger a refresh by toggling the `refresh` state
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error during upload:", err);
      setError("Failed to upload file.");
    }
  };

  if (!pose) return <p>Loading...</p>;

  return (
    <div>
      {/* Back button */}
      <Link to="/home-tree">
        <img
          src="https://www.svgrepo.com/show/305142/arrow-ios-back.svg"
          alt="back icon"
        />
      </Link>

      {/* Pose title */}
      <h1>{pose.english_name}</h1>

      {/* PoseWidget for media carousel */}
      <PoseWidget pose={pose} media={media} />

      {/* Pose description */}
      <h2>Description:</h2>
      <p>{pose.pose_description}</p>

      {/* Pose benefits */}
      <h3>Benefits:</h3>
      <p>{pose.pose_benefits}</p>

      {/* File upload form */}
      <form onSubmit={handleUpload}>
        <h3>Upload Your Pose Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default PoseDetails;
