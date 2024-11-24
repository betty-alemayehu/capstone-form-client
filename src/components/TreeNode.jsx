import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestMediaByProgression } from "../services/api";

const TreeNode = ({ progression }) => {
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await getLatestMediaByProgression(progression.id);
        setMedia(response.data); // Use `.data` to handle Axios response
      } catch (err) {
        console.error("Error fetching media:", err);
        setError("Failed to load media.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [progression.id]);

  const handleClick = () => {
    navigate(`/pose-card/${progression.pose_id}`);
  };

  return (
    <li className="tree-node" onClick={handleClick}>
      {loading && <p>Loading media...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <img
            src={media ? media.custom_media : "/placeholder.png"} // Fallback to placeholder
            alt={progression.english_name || "Pose"}
            className="pose-image"
          />
          <p className="pose-name">{progression.english_name}</p>
          <p className="pose-status">{progression.status}</p>
        </>
      )}
    </li>
  );
};

export default TreeNode;
