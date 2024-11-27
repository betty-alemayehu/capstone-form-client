//HomeTree.jsx
import "./HomeTree.scss";
import { useEffect, useState, useContext } from "react";
import TreeNode from "../components/TreeNode";
import { getUserProgressions } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const HomeTree = () => {
  const [progressions, setProgressions] = useState([]);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProgressions = async () => {
      if (!user) return;

      try {
        // setLoading(true);
        const response = await getUserProgressions(user.user_id);
        setProgressions(response.data || []);
      } catch (err) {
        console.error("Error fetching progressions:", err);
        setError("Failed to load progressions. Please try again.");
      } finally {
        // setLoading(false);
      }
    };

    fetchProgressions();
  }, [user]);

  // Calculate completed progressions
  const completedCount = progressions.filter(
    (progression) => progression.status === "Completed"
  ).length;
  const percentageComplete =
    progressions.length > 0
      ? Math.round((completedCount / progressions.length) * 100)
      : 0;

  // Alignment pattern for pose nodes
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

  return (
    <div className="tree">
      <div className="tree__header">
        <h1>Yoga</h1>
        <div className="tree__progress-circle">
          <CircularProgressbar
            value={percentageComplete}
            text={`${percentageComplete}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#4caf50", // Green progress bar
              textColor: "#4caf50", // Green text
              trailColor: "#d6d6d6", // Light gray trail
            })}
          />
        </div>
      </div>
      <div className="tree__content">
        {/* {loading && <p>Loading tree...</p>} */}
        {/* {error && <p className="error">{error}</p>} */}
        {/* {!loading &&
          !error && */}
        {progressions.map((progression, index) => (
          <div
            key={progression.id}
            className={`tree-node tree-node--${getAlignment(index)}`}
          >
            <TreeNode progression={progression} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTree;
