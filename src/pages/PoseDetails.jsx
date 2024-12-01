//PoseDetails.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getPoseById,
  getUserMediaByPose,
  uploadMedia,
  deleteMedia,
} from "../services/api";
import { UserContext } from "../utils/UserContext";
import PoseCarousel from "../components/PoseCarousel";
import Button from "../components/Button";
import "./PoseDetails.scss";

const PoseDetails = () => {
  const { id: poseId } = useParams();
  const { user } = useContext(UserContext);
  const [pose, setPose] = useState(null);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [currentMediaId, setCurrentMediaId] = useState(null); // Track the current media ID

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchDetails = async () => {
      try {
        const poseResponse = await getPoseById(poseId);
        setPose(poseResponse.data);

        const mediaResponse = await getUserMediaByPose(user.user_id, poseId);
        setMedia(mediaResponse || []);
        setCurrentMediaId(mediaResponse?.[0]?.id || null); // Set initial media ID
      } catch (err) {
        console.error("Error fetching pose details:", err.message);
        setError("Failed to fetch pose details. Please try again.");
      }
    };

    fetchDetails();
  }, [poseId, user, refresh]);

  const handleDelete = async () => {
    if (!currentMediaId) {
      console.error("Cannot delete default image");
      return;
    }

    try {
      await deleteMedia(currentMediaId);
      setRefresh((prev) => !prev); // Trigger refresh
    } catch (err) {
      console.error("Error deleting media:", err.message);
      setError("Failed to delete media. Please try again.");
    }
  };

  const triggerFileUpload = (fileInputId) => {
    document.getElementById(fileInputId).click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return alert("Please select a file.");
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", user.user_id);
    formData.append("pose_id", poseId);

    try {
      await uploadMedia(formData);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error uploading media:", err.message);
      setError("Failed to upload file. Please try again.");
    }
  };

  if (!pose) return <p>Loading...</p>;

  return (
    <article className="pose-details">
      <div className="pose-details__scrollable-content">
        <div className="pose-details__back-button-wrapper">
          <Link to="/home-tree" className="pose-details__close-button">
            <img src="/assets/icons/close-24px.svg" alt="Back" />
          </Link>
        </div>
        {error && <p className="pose-details__error">{error}</p>}
        <div className="pose-details__carousel-container">
          <PoseCarousel
            pose={pose}
            media={media}
            onSlideChange={(id) => setCurrentMediaId(id)} // Update the current media ID
          />
          {!media.some((item) => item.id === currentMediaId) ? null : (
            <button
              className="pose-details__delete-icon"
              onClick={handleDelete}
              aria-label="Delete current media"
            >
              <img
                src="/assets/icons/delete_outline-24px.svg"
                alt="Delete Media"
              />
            </button>
          )}
        </div>
        <section className="pose-details__description">
          <h2>{pose.english_name}</h2>
          <h2 className="pose-details__sanskrit">{pose.sanskrit_name}</h2>
          <p>{pose.pose_description}</p>
          <h3>Benefits</h3>
          <p>{pose.pose_benefits}</p>
        </section>
      </div>

      <section className="pose-details__actions">
        <div className="pose-details__actions-container">
          <input
            id="upload-input"
            className="pose-details__file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            variant="secondary"
            onClick={() => triggerFileUpload("upload-input")}
          >
            Upload Practice
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/pose-AI-cam", { state: { poseId } })}
          >
            Check My Form
          </Button>
        </div>
      </section>
    </article>
  );
};

export default PoseDetails;
