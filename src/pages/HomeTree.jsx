//HomeTree.jsx
import "./HomeTree.scss";
import { useEffect, useState, useContext } from "react";
import TreeNode from "../components/TreeNode";
import { getUserProgressionsWithMedia } from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const HomeTree = () => {
  const [progressions, setProgressions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProgressionsWithMedia = async () => {
      if (!user) return;

      try {
        const response = await getUserProgressionsWithMedia(user.user_id);
        console.log("API Response:", response); // Debugging

        // Access the `data` property from the response object
        const data = response.data;
        setProgressions(Array.isArray(data) ? data : []); // Validate array response
      } catch (err) {
        console.error("Error fetching progressions with media:", err);
        setError("Failed to load progressions. Please try again.");
      }
    };

    fetchProgressionsWithMedia();
  }, [user]);

  const completedCount = Array.isArray(progressions)
    ? progressions.filter((progression) => progression.status === "Completed")
        .length
    : 0;

  const percentageComplete =
    progressions.length > 0
      ? Math.round((completedCount / progressions.length) * 100)
      : 0;

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
              pathColor: "#4caf50",
              textColor: "#4caf50",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
      <div className="tree__content">
        {error && <p className="error">{error}</p>}
        {Array.isArray(progressions) &&
          progressions.map((progression, index) => (
            <div
              key={progression.progression_id}
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
