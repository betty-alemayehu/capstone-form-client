import "./DeleteModal.scss";

const DeleteModal = ({ onDelete, onClose }) => {
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
          <strong className="delete-modal__highlight">180 poses</strong>
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
