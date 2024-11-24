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
        //cleanup actions that should always occur regardless of success or failure
        setLoading(false);
      }
    };

    fetchProgressions();
  }, [user]);

  // Calculate completed progressions
  const completedCount = progressions.filter(
    (progression) => progression.status === "Completed"
  ).length;

  const levels = [];
  for (let i = 0; i < progressions.length; i += 10) {
    levels.push(progressions.slice(i, i + 10));
  }

  return (
    <div className="tree">
      <h1>
        Practiced: {completedCount}/{progressions.length}
      </h1>
      {loading && <p>Loading tree...</p>}
      {error && <p className="error">{error}</p>}
      {!loading &&
        !error &&
        levels.map((level, index) => (
          <div key={index} className="tree-level">
            <h2>Level {index + 1}</h2>
            <ul className="pose-list">
              {level.map((progression) => (
                <TreeNode key={progression.id} progression={progression} />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default HomeTree;
