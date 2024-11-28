//PoseAICamPage.jsx
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import "./PoseAICamPage.scss";

const poseDatabase = {
  mountain: {
    name: "Mountain Pose",
    conditions: (landmarks) => {
      const leftAnkle = landmarks[27];
      const rightAnkle = landmarks[28];
      const leftKnee = landmarks[25];
      const rightKnee = landmarks[26];
      const leftHip = landmarks[23];
      const rightHip = landmarks[24];

      const feetClose = Math.abs(leftAnkle.x - rightAnkle.x) < 0.1;
      const kneesAligned = Math.abs(leftKnee.x - rightKnee.x) < 0.1;

      return feetClose && kneesAligned;
    },
    feedback:
      "Great job! You're standing upright with feet together for Mountain Pose.",
  },
  tree: {
    name: "Tree Pose",
    conditions: (landmarks) => {
      const leftKnee = landmarks[25];
      const rightKnee = landmarks[26];
      const leftAnkle = landmarks[27];
      const leftHip = landmarks[23];

      const leftLegLifted = leftKnee.y < leftHip.y && leftAnkle.y < leftHip.y;
      const rightLegLifted =
        rightKnee.y < landmarks[24].y && landmarks[28].y < landmarks[24].y;

      return leftLegLifted || rightLegLifted;
    },
    feedback:
      "Great job! You're raising one leg to balance and form Tree Pose.",
  },
};

export function PoseAICamPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { poseId } = location.state || {};

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("Initializing camera...");

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (results.poseLandmarks) {
        drawResults(results);
        evaluatePose(results.poseLandmarks);
      }
    });

    const videoElement = videoRef.current;
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => camera.stop();
  }, []);

  const drawResults = (results) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const videoElement = videoRef.current;

    if (!canvas || !ctx || !videoElement) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    drawLandmarks(ctx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
  };

  const evaluatePose = (poseLandmarks) => {
    for (const poseName in poseDatabase) {
      const pose = poseDatabase[poseName];
      if (pose.conditions(poseLandmarks)) {
        setFeedback(pose.feedback);
        return;
      }
    }
    setFeedback("Pose not recognized. Try adjusting your position.");
  };

  const handleBackClick = () => {
    if (poseId) {
      navigate(`/pose-card/${poseId}`);
    } else {
      navigate("/home-tree");
    }
  };

  return (
    <div className="pose-ai-cam-page">
      <header className="pose-ai-cam-page__back-button-wrapper">
        <img
          onClick={handleBackClick}
          src="/assets/icons/arrow_back-24px.png"
          alt="Back"
          className="pose-ai-cam-page__back-button"
        />
      </header>

      <main className="pose-ai-cam-page__main">
        <section className="pose-ai-cam-page__pose-image">
          <video ref={videoRef} playsInline className="hidden-video" />
          <canvas ref={canvasRef} className="pose-canvas" />
        </section>
        <section
          className={`pose-ai-cam-page__feedback-section ${
            feedback === "Pose not recognized. Try adjusting your position."
              ? "pose-ai-cam-page__feedback-section--NA"
              : "pose-ai-cam-page__feedback-section--correct"
          }`}
        >
          <article className="pose-ai-cam-page__feedback-content">
            <h2 className="pose-ai-cam-page__feedback-title">Feedback</h2>
            <p className="pose-ai-cam-page__feedback-message">{feedback}</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default PoseAICamPage;
