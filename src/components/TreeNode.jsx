//TreeNode.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestMediaByProgression, getPoseById } from "../services/api";

const PLACEHOLDER_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png";

const TreeNode = ({ progression }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(PLACEHOLDER_IMAGE);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch the pose image first
        const poseResponse = await getPoseById(progression.pose_id);
        if (poseResponse.data?.url_png) {
          setImageSrc(poseResponse.data.url_png);
        }

        // Check for custom media and prioritize it
        const mediaResponse = await getLatestMediaByProgression(progression.id);
        if (mediaResponse.data?.custom_media) {
          setImageSrc(mediaResponse.data.custom_media);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setImageSrc(PLACEHOLDER_IMAGE);
      }
    };

    fetchImages();
  }, [progression.pose_id, progression.id]);

  const handleNodeClick = () => {
    navigate(`/pose-card/${progression.pose_id}`, {
      state: { progressionId: progression.id },
    });
  };

  return (
    <li className="tree-node" onClick={handleNodeClick}>
      <img
        src={imageSrc}
        alt={progression.english_name || "Pose"}
        className="pose-image"
      />
      {/* <p className="pose-name">{progression.english_name}</p> */}
      {/* <p className="pose-status">{progression.status}</p> */}
    </li>
  );
};

export default TreeNode;
