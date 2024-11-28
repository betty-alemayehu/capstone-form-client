//TreeNode.jsx
import { useNavigate } from "react-router-dom";

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
    <li className="tree-node" onClick={handleNodeClick}>
      <img
        src={media_url || PLACEHOLDER_IMAGE} // Use placeholder if media_url is null
        alt={english_name || "Pose"}
        className={`${status} pose-image`}
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE; // Fallback to placeholder on error
        }}
      />
    </li>
  );
};

export default TreeNode;
