//HomeTree.jsx
import "./HomeTree.scss";
import { useEffect, useState, useContext } from "react";
import TreeNode from "../components/TreeNode";
import { getUserProgressions } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const HomeTree = () => {
  const [progressions, setProgressions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProgressions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await getUserProgressions(user.user_id);
        setProgressions(response.data || []);
      } catch (err) {
        console.error("Error fetching progressions:", err);
        setError("Failed to load progressions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressions();
  }, [user]);

  // Calculate completed progressions
  const completedCount = progressions.filter(
    (progression) => progression.status === "Completed"
  ).length;

  // Alignment pattern for pose nodes
  const getAlignment = (index) => {
    const pattern = ["center", "right", "center", "left"];
    return pattern[index % pattern.length];
  };

  return (
    <div className="tree">
      <h1 className="tree__header">
        Practiced: {completedCount}/{progressions.length}
      </h1>
      {loading && <p>Loading tree...</p>}
      {error && <p className="error">{error}</p>}
      {!loading &&
        !error &&
        progressions.map((progression, index) => (
          <div
            key={progression.id}
            className={`tree-node tree-node--${getAlignment(index)}`}
          >
            <TreeNode progression={progression} />
          </div>
        ))}
    </div>
  );
};

export default HomeTree;
