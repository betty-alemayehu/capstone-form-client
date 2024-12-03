//DeleteModal.scss
import "./DeleteModal.scss";
import Button from "../components/Button";

const DeleteModal = ({ completedCount, onDelete, onClose }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2 id="delete-modal-title" className="delete-modal__title">
          Are you sure?
        </h2>
        <p className="delete-modal__message">
          Are you sure you want to delete your bodylingo account forever?{" "}
        </p>
        <h3>
          {completedCount === 0
            ? "There's still time to learn!"
            : completedCount === 1
            ? "You will lose progress on 1 Pose!"
            : `You will lose progress on ${completedCount} poses!`}
        </h3>
        <img src="/assets/images/duolingo_2.1544716157.gif" alt="site logo" />
        <div className="delete-modal__actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="delete" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
