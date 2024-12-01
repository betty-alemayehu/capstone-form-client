//HomeTree.jsx
import "./HomeTree.scss";
import { useEffect, useState, useContext, useRef } from "react";
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

  const sectionRefs = useRef({
    Beginner: null,
    Intermediate: null,
    Advanced: null,
  });

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
              ? `${BASE_URL}${progression.media_url}` // Prepend BASE_URL for relative paths
              : progression.media_url, // Leave absolute URLs as they are
        }));

        setProgressions(updatedData);
      } catch (err) {
        console.error("Error fetching progressions with media:", err);
        setError("Failed to load progressions. Please try again.");
      }
    };

    fetchProgressionsWithMedia();
  }, [user]);

  const groupByDifficulty = (progressions) => {
    return progressions.reduce(
      (groups, progression) => {
        const { difficulty } = progression;
        if (!groups[difficulty]) groups[difficulty] = [];
        groups[difficulty].push(progression);
        return groups;
      },
      { Beginner: [], Intermediate: [], Advanced: [] }
    );
  };

  const difficultyGroups = groupByDifficulty(progressions);

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
        <div className="tree__header-container">
          <div className="tree__header-logo-container">
            <h1>BodyLingo</h1>
          </div>
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
      </div>
      <div className="tree__content">
        {error && <p className="error">{error}</p>}
        <div
          ref={(el) => (sectionRefs.current.Beginner = el)}
          className="tree__section tree__section--Beginner"
        >
          <h3 className="tree__section-title">Beginner</h3>
          <div className="tree__nodes">
            {difficultyGroups.Beginner.map((progression, index) => (
              <div
                key={progression.progression_id}
                className={`tree-node tree-node--${getAlignment(index)}`}
              >
                <TreeNode progression={progression} />
              </div>
            ))}
          </div>
        </div>
        <div
          ref={(el) => (sectionRefs.current.Intermediate = el)}
          className="tree__section tree__section--Intermediate"
        >
          <h3 className="tree__section-title">Intermediate</h3>
          <div className="tree__nodes">
            {difficultyGroups.Intermediate.map((progression, index) => (
              <div
                key={progression.progression_id}
                className={`tree-node tree-node--${getAlignment(index)}`}
              >
                <TreeNode progression={progression} />
              </div>
            ))}
          </div>
        </div>
        <div
          ref={(el) => (sectionRefs.current.Advanced = el)}
          className="tree__section tree__section--Advanced"
        >
          <h3 className="tree__section-title">Advanced</h3>
          <div className="tree__nodes">
            {difficultyGroups.Advanced.map((progression, index) => (
              <div
                key={progression.progression_id}
                className={`tree-node tree-node--${getAlignment(index)}`}
              >
                <TreeNode progression={progression} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTree;
