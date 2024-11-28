//TreeNode.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// import "./TreeNode.scss";

const PLACEHOLDER_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png";

const TreeNode = ({ progression }) => {
  const navigate = useNavigate();
  const { media_url, english_name, status, pose_id } = progression;

  const handleNodeClick = () => {
    navigate(`/pose-card/${pose_id}`, {
      state: { progressionId: progression.progression_id },
    });
  };

  return (
    <li className={`tree-node tree-node--${status}`} onClick={handleNodeClick}>
      <img
        src={media_url || PLACEHOLDER_IMAGE}
        alt={english_name || "Pose"}
        className="tree-node__image"
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE;
        }}
      />
    </li>
  );
};

export default TreeNode;
