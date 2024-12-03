//HomeTree.jsx
import "./HomeTree.scss";
import { useEffect, useState, useContext } from "react";
import TreeNode from "../components/TreeNode";
import { getUserProgressionsWithMedia } from "../services/api";
import { UserContext } from "../utils/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const HomeTree = () => {
  const [progressions, setProgressions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProgressionsWithMedia = async () => {
      if (!user) return;

      try {
        const response = await getUserProgressionsWithMedia(user.user_id);
        const data = response.data;

        const updatedData = data.map((progression) => ({
          ...progression,
          media_url:
            progression.status === "Completed" &&
            progression.media_url &&
            !progression.media_url.startsWith("http")
              ? `${BASE_URL}${progression.media_url}`
              : progression.media_url,
        }));

        setProgressions(updatedData);
      } catch (err) {
        console.error("Error fetching progressions with media:", err);
        setError("Failed to load progressions. Please try again.");
      }
    };

    fetchProgressionsWithMedia();
  }, [user]);

  const groupByDifficulty = (progressions) =>
    progressions.reduce((groups, progression) => {
      const { difficulty } = progression;
      groups[difficulty] = groups[difficulty] || [];
      groups[difficulty].push(progression);
      return groups;
    }, {});

  const difficultyGroups = groupByDifficulty(progressions);
  const difficultyOrder = ["Beginner", "Intermediate", "Advanced"];

  const completedCount = progressions.filter(
    (progression) => progression.status === "Completed"
  ).length;

  const percentageComplete =
    progressions.length > 0
      ? Math.round((completedCount / progressions.length) * 100)
      : 0;

  return (
    <div className="tree">
      <div className="tree__header">
        <div className="tree__header-container">
          <div className="tree__header-logo-container">
            <h1 className="tree__header-logo">bodylingo</h1>
          </div>
          <div className="tree__progress-circle">
            <img
              src="public/assets/icons/light_icon.svg"
              alt="light bolt icon"
            />
            <CircularProgressbar
              value={percentageComplete}
              text={`${percentageComplete}%`}
              styles={buildStyles({
                textSize: "24px",
                pathColor: "#ffc800",
                textColor: "#1A1A1A",
                trailColor: "#E5E5E5",
              })}
            />
          </div>
        </div>
      </div>
      <div className="tree__content">
        {error && <p className="error">{error}</p>}
        {difficultyOrder.map((difficulty) =>
          difficultyGroups[difficulty] ? (
            <div
              key={difficulty}
              className={`tree__section tree__section--${difficulty}`}
            >
              <h3 className="tree__section-title">{difficulty}</h3>
              <div className="tree__nodes">
                {difficultyGroups[difficulty].map((progression, index) => (
                  <TreeNode
                    key={progression.progression_id}
                    progression={progression}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default HomeTree;
