//ProfileSettings.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { getUserById, updateUserById, deleteUserById } from "../services/api";
import DeleteModal from "../components/DeleteModal";
import FormInput from "../components/FormInput";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(""); // Default to empty string
  const [email, setEmail] = useState(""); // Default to empty string
  const [password, setPassword] = useState(""); // Default to empty string
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id);
        setName(response.data.name || ""); // Ensure fallback to empty string
        setEmail(response.data.email || "");
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserDetails();
    else setLoading(false);
  }, [user]);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const updatedData = { name, email, ...(password && { password }) };

        const response = await updateUserById(user.user_id, updatedData);
        updateUser({ name: response.data.name, email: response.data.email });

        setName(response.data.name);
        setEmail(response.data.email);
        setPassword("");
        setErrors({});
      } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserById(user.user_id);
      logout();
      alert("Account deleted successfully.");
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="profile-settings__error">{error}</p>;

  return (
    <main className="profile-settings">
      <h1 className="profile-settings__title">Settings</h1>
      <img
        className="profile-settings__avatar"
        src="/assets/icons/user_placeholder.png"
        alt="Profile avatar"
        loading="lazy"
      />
      <form className="profile-settings__form" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          value={name || ""} // Ensure controlled input
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Name"
        />
        <FormInput
          label="Email"
          type="email"
          value={email || ""} // Ensure controlled input
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="Email"
        />
        <FormInput
          label="New Password (optional)"
          type="password"
          value={password || ""} // Ensure controlled input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button type="submit" className="button button--primary">
          Save
        </button>
      </form>
      <hr />
      <button className="button button--secondary" onClick={logout}>
        Logout
      </button>
      <button
        className="button button--tertiary"
        onClick={() => setIsModalOpen(true)}
      >
        Delete Account
      </button>
      {isModalOpen && (
        <DeleteModal
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProfileSettings;
