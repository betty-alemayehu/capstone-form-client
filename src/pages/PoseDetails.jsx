//PoseDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import PoseWidget from "../components/PoseWidget";
import UploadEvaluation from "../components/UploadEvaluation";
import { getPoseById, getUserMediaByPose } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const PoseDetails = () => {
  const { id } = useParams(); // Pose ID from URL
  const { user } = useContext(UserContext); // Get logged-in user info
  const [pose, setPose] = useState(null); // Pose details
  const [media, setMedia] = useState([]); // Media for the pose and user
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return;

      try {
        // Fetch pose details
        const poseResponse = await getPoseById(id);
        setPose(poseResponse.data);

        // Fetch media for the user and pose
        const mediaResponse = await getUserMediaByPose(user.user_id, id);
        setMedia(mediaResponse.data);
      } catch (err) {
        console.error("Error fetching pose details or media:", err);
        setError("Failed to load pose details. Please try again.");
      }
    };

    fetchDetails();
  }, [id, user]);

  if (error) return <p className="error">{error}</p>;
  if (!pose) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/home-tree">
        <img
          src="https://www.svgrepo.com/show/305142/arrow-ios-back.svg"
          alt="back icon"
        />
      </Link>
      <h1>{pose.english_name}</h1>

      {/* Pass pose and user-specific media to PoseWidget */}
      <PoseWidget pose={pose} media={media} />

      <p>{feedback || "Upload your pose to receive feedback!"}</p>

      <h2>Description:</h2>
      <p>{pose.pose_description}</p>

      <h3>Benefits:</h3>
      <p>{pose.pose_benefits}</p>

      <UploadEvaluation
        uploadedImages={media} // Ensure this is the correct state
        setUploadedImages={setMedia} // Ensure this is the correct setter function
        setFeedback={setFeedback}
      />
    </div>
  );
};

export default PoseDetails;
