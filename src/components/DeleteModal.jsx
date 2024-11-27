import "./DeleteModal.scss";
import { getUserProgressions } from "../services/api.js";
import { UserContext } from "../contexts/UserContext";
import { useEffect, useState, useContext } from "react";

const DeleteModal = ({ onDelete, onClose }) => {
  const [progressions, setProgressions] = useState([]);
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

  const completedCount = progressions.filter(
    (progression) => progression.status === "Completed"
  ).length;

  return (
    <div
      className="delete-modal-overlay"
      role="dialog"
      aria-labelledby="delete-modal-title"
    >
      <div className="delete-modal">
        <h2 id="delete-modal-title" className="delete-modal__title">
          Are you sure?
        </h2>
        <p className="delete-modal__message">
          Are you sure you want to delete your account forever?
          <br />
          <br />
          You will lose progress on:{" "}
          <strong className="delete-modal__highlight">
            {completedCount} Pose(s)
          </strong>
        </p>
        <div className="delete-modal__actions">
          <button className="button button--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="button button--delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
