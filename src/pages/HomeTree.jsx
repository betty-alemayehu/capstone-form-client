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

  const [activeSection, setActiveSection] = useState("Beginner"); // Track the active section

  const sectionRefs = {
    Beginner: useRef(null),
    Intermediate: useRef(null),
    Advanced: useRef(null),
  };

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

  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport as root
      threshold: 0.1, // Trigger when at least 10% of the section is visible
    };

    const observerCallback = (entries) => {
      // Sort by intersection ratio to handle overlapping sections
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].target.dataset.level); // Use the most visible section
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all section elements
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Initial check for the current scroll position
    const initialSection = Object.keys(sectionRefs).find((level) => {
      const section = sectionRefs[level]?.current;
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight / 2; // Check if section is near the top
    });

    if (initialSection) {
      setActiveSection(initialSection); // Set the active section based on initial viewport
    } else {
      setActiveSection("Beginner"); // Default fallback
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="tree">
      <div className="tree__header">
        <div className="tree__header-container">
          <h1>Logo Here</h1>
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
      <div className="tree__sub-header">
        <h2>{activeSection}</h2> {/* Sub-header for active section */}
      </div>
      <div className="tree__content">
        {error && <p className="error">{error}</p>}
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <div
            key={level}
            className={`tree__section--${level}`}
            data-level={level} // Add data attribute for Intersection Observer
            ref={sectionRefs[level]} // Attach reference for observer
          >
            <div className="tree__nodes">
              {difficultyGroups[level].map((progression, index) => (
                <div
                  key={progression.progression_id}
                  className={`tree-node tree-node--${getAlignment(index)}`}
                >
                  <TreeNode progression={progression} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTree;
