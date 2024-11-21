import "./DeleteModal.scss";

const DeleteModal = ({ onDelete, onClose }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Delete Account</h2>
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" onClick={onDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
