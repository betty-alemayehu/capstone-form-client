import { useEffect, useState, useContext } from "react";
import TreeNode from "../components/TreeNode";
import { getUserProgressions } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const HomeTree = () => {
  const [progressions, setProgressions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Get logged-in user's details

  useEffect(() => {
    const fetchProgressions = async () => {
      try {
        setLoading(true);
        const response = await getUserProgressions(user.user_id);
        setProgressions(response.data); // Use `.data` to handle Axios response
      } catch (err) {
        console.error("Error fetching progressions:", err);
        setError("Failed to load progressions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProgressions();
  }, [user]);

  // Group progressions into levels of 10 each
  const levels = [];
  for (let i = 0; i < progressions.length; i += 10) {
    levels.push(progressions.slice(i, i + 10));
  }

  return (
    <div className="tree">
      <h1>Total Progressions: {progressions.length}</h1>
      {loading && <p>Loading progressions...</p>}
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
