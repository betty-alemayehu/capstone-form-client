import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PoseWidget from "../components/PoseWidget";
import UploadEvaluation from "../components/UploadEvaluation";
import { getPoseById } from "../services/api";

const PoseDetails = () => {
  const { id } = useParams();
  const [pose, setPose] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]); // State for uploaded images
  const [feedback, setFeedback] = useState(""); // State for feedback from evaluation

  useEffect(() => {
    const fetchPose = async () => {
      try {
        const response = await getPoseById(id);
        setPose(response.data);
      } catch (err) {
        console.error("Error fetching pose:", err);
        setError("Failed to load pose details. Please try again.");
      }
    };

    fetchPose();
  }, [id]);

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
      <PoseWidget pose={pose} uploadedImages={uploadedImages} />
      <p>{feedback || "Upload your pose to receive feedback!"}</p>
      <h2>Description:</h2>
      <p>{pose.pose_description}</p>
      <h3>Benefits:</h3>
      <p>{pose.pose_benefits}</p>
      <UploadEvaluation
        setUploadedImages={setUploadedImages}
        uploadedImages={uploadedImages}
        setFeedback={setFeedback}
      />
    </div>
  );
};

export default PoseDetails;
