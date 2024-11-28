//PoseDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPoseById, getUserMediaByPose, uploadMedia } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import PoseCarousel from "../components/PoseCarousel";
import "./PoseDetails.scss";

const PoseDetails = () => {
  const { id: poseId } = useParams();
  const { user } = useContext(UserContext);
  const [pose, setPose] = useState(null);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user) return;

      try {
        const poseResponse = await getPoseById(poseId);
        setPose(poseResponse.data);

        const mediaResponse = await getUserMediaByPose(user.user_id, poseId);
        setMedia(mediaResponse.length ? mediaResponse : []); // Handle empty media gracefully
      } catch (err) {
        console.error("Unexpected error fetching pose details:", err.message);
        setError("Failed to fetch pose details. Please try again.");
      }
    };

    fetchDetails();
  }, [poseId, user, refresh]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", user.user_id);
    formData.append("pose_id", poseId);

    try {
      await uploadMedia(formData);
      setRefresh((prev) => !prev);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    }
  };

  const triggerFileDialog = () => {
    document.getElementById("upload-input").click();
  };

  if (!pose) return <p>Loading...</p>;

  return (
    <article className="pose-details">
      {/* Back button */}
      <Link to="/home-tree">
        <img src="/assets/icons/arrow_back-24px.svg" alt="back icon" />
      </Link>
      {/* Carousel */}
      <PoseCarousel pose={pose} media={media} />
      {/* Pose Header */}
      <section className="pose-details__header">
        <div className="pose-details__title">
          <h1>{pose.english_name}</h1>
          <h2>{pose.sanskrit_name}</h2>
        </div>
      </section>
      {/* Description */}
      <section className="pose-details__description">
        <h3>Description:</h3>
        <p>{pose.pose_description}</p>
      </section>

      {/* Benefits */}
      <section className="pose-details__benefits">
        <h3>Benefits:</h3>
        <p>{pose.pose_benefits}</p>
      </section>

      {/* Upload Button */}
      <section className="pose-details__actions">
        <input
          id="upload-input"
          className="pose-details__file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          className="button button--secondary"
          onClick={triggerFileDialog}
        >
          Upload Practice
        </button>

        <button
          className="button button--primary"
          onClick={() => navigate("/pose-AI-cam", { state: { poseId } })}
        >
          Check My Form
        </button>
      </section>
    </article>
  );
};

export default PoseDetails;
