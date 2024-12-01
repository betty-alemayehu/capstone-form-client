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
        <h2 id="delete-modal-title" className="delete-modal__title">
          Are you sure?
        </h2>
        <p className="delete-modal__message">
          Are you sure you want to delete your BodyLingo account forever?{" "}
        </p>
        <h3>
          {completedCount === 0
            ? "There's still time to learn!"
            : completedCount === 1
            ? "You will lose progress on 1 Pose!"
            : `You will lose progress on ${completedCount} poses!`}
        </h3>
        <img src="/assets/images/pincha_animation-logo.png" alt="site logo" />
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
