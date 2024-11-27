//ProfileSettings.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; // Access the logged-in user
import { getUserById, updateUserById, deleteUserById } from "../services/api"; // Import necessary API functions
import DeleteModal from "../components/DeleteModal";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Optional password update
  const [error, setError] = useState(null); // Handle potential errors
  const [loading, setLoading] = useState(true); // Indicate loading state
  const { user, logout, updateUser } = useContext(UserContext); // Access logged-in user, logout, and updateUser function
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id); // Fetch user details by ID
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false); // Set loading state to false after fetch
      }
    };

    if (user) {
      fetchUserDetails();
    } else {
      setLoading(false); // No user logged in, stop loading
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with updated fields
      const updatedData = { name, email };
      if (password) {
        updatedData.password = password; // Include password if updated
      }

      // Update user details via API
      await updateUserById(user.user_id, updatedData);

      // Refetch updated user details
      const response = await getUserById(user.user_id);
      updateUser({ name: response.data.name, email: response.data.email });

      // Reset form state to reflect the updated user details
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(""); // Clear password field
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    try {
      await deleteUserById(user.user_id); // Call API to delete user
      logout(); // Clear user session
      alert("Account deleted successfully.");
      navigate("/"); // Redirect to the landing page after deletion
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="profile-settings">
      <h1 className="profile-settings__title">Settings</h1>
      <div className="profile-card">
        <img
          className="profile-card__avatar"
          src="/assets/icons/image-placeholder.png"
          alt="Profile avatar"
          loading="lazy"
        />
        <div className="profile-card__info">
          <h2 className="profile-card__name">{name}</h2>
          <p className="profile-card__username">{email}</p>
        </div>
      </div>
      <form className="profile-settings__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="profile-settings__input input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-settings__input input"
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="profile-settings__input input"
        />
        <button type="submit" className="button button--primary">
          Save
        </button>
      </form>
      <hr></hr>
      <button className="button button--secondary" onClick={logout}>
        Logout
      </button>
      <button className="button button--tertiary" onClick={handleOpenModal}>
        Delete Account
      </button>
      {isModalOpen && (
        <DeleteModal onDelete={handleDelete} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default ProfileSettings;
