//ProfileSettings
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited: ", { name, email, password });
  };

  // Handle account deletion
  const handleDelete = () => {
    console.log("Account deleted");
    setIsModalOpen(false);
    navigate("/"); // Redirect to the landing page after deletion
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleOpenModal}>Delete Account</button>

      {isModalOpen && (
        <DeleteModal onDelete={handleDelete} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProfileSettings;
