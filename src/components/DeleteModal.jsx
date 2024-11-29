//DeleteModal.scss
import "./DeleteModal.scss";

const DeleteModal = ({ completedCount, onDelete, onClose }) => {
  return (
    <div
      className="delete-modal-overlay"
      role="dialog"
      aria-labelledby="delete-modal-title"
    >
      <div className="delete-modal">
        <h1 id="delete-modal-title" className="delete-modal__title">
          Are you sure?
        </h1>
        <p className="delete-modal__message">
          Are you sure you want to delete your account forever?{" "}
        </p>
        <h2>
          {completedCount === 0
            ? "There's still time to learn!"
            : completedCount === 1
            ? "You will lose progress on 1 Pose!"
            : `You will lose progress on ${completedCount} poses!`}
        </h2>

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
