import { useEffect, useState } from "react";
import TreeNode from "../components/TreeNode";
import { getAllPoses } from "../services/api";

const HomeTree = () => {
  const [poses, setPoses] = useState([]);
  const [error, setError] = useState(null);
  const [totalPoses, setTotalPoses] = useState(0); // State to track the total count of poses

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await getAllPoses();
        setPoses(response.data);
        setTotalPoses(response.data.length); // Set the total count of poses
      } catch (err) {
        console.error("Error fetching poses:", err);
        setError("Failed to load poses. Please try again.");
      }
    };

    fetchPoses();
  }, []);

  // Group poses into levels of 10 each
  const levels = [];
  for (let i = 0; i < poses.length; i += 10) {
    levels.push(poses.slice(i, i + 10));
  }

  return (
    <div className="tree">
      <h1>Total Poses: {totalPoses}</h1>
      {/* Future state: Update count to show completed poses */}

      {error && <p className="error">{error}</p>}

      {levels.map((level, index) => (
        <div key={index} className="tree-level">
          <h2>Level {index + 1}</h2>
          <ul className="pose-list">
            {level.map((pose) => (
              <TreeNode key={pose.id} pose={pose} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomeTree;
