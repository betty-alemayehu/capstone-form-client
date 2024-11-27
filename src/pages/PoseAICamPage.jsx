//PoseAICamPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PoseAICamPage.scss";

export function PoseAICamPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poseId } = location.state || {}; // Retrieve poseId from state

  const handleBackClick = () => {
    if (poseId) {
      navigate(`/pose-card/${poseId}`);
    } else {
      navigate("/home-tree"); // Fallback if no poseId is provided
    }
  };

  return (
    <div className="pose-ai-cam-page">
      <header className="pose-ai-cam-page__header">
        <img
          onClick={handleBackClick}
          src="/assets/icons/close-24px.svg"
          alt="Back"
        />
      </header>
      <main className="pose-ai-cam-page__main">
        <section className="pose-ai-cam-page__pose-image">
          <img className="pose-ai-cam-page__pose-icon" src="" alt="Camera" />
        </section>
        <section className="pose-ai-cam-page__feedback-section">
          <article className="pose-ai-cam-page__feedback-content">
            <h2 className="pose-ai-cam-page__feedback-title">Feedback</h2>
            <p className="pose-ai-cam-page__feedback-message">
              Great job! You're standing upright with feet together for Mountain
              Pose.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default PoseAICamPage;
