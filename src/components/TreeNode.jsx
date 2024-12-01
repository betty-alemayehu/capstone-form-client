//TreeNode.jsx
import { useNavigate } from "react-router-dom";
import "./TreeNode.scss";

const PLACEHOLDER_IMAGE = "/assets/icons/image-placeholder.png";

const getAlignment = (index) => {
  const pattern = [
    "center",
    "center-right",
    "right",
    "center-right",
    "center",
    "center-left",
    "left",
    "center-left",
  ];
  return pattern[index % pattern.length];
};

const TreeNode = ({ progression, index }) => {
  const navigate = useNavigate();
  const { media_url, english_name, status, pose_id, progression_id } =
    progression;

  const handleNodeClick = () => {
    navigate(`/pose-card/${pose_id}`, {
      state: { progressionId: progression_id },
    });
  };

  return (
    <li className={`tree-node tree-node--${getAlignment(index)}`}>
      <img
        src={media_url || PLACEHOLDER_IMAGE}
        alt={english_name || "Pose"}
        className={`tree-node__image ${
          status === "Completed" ? "Completed" : ""
        }`}
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE;
        }}
        onClick={handleNodeClick} // Link behavior now tied only to the image
      />
    </li>
  );
};

export default TreeNode;
