//ProfileSettings.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getUserById, updateUserById, deleteUserById } from "../services/api";
import DeleteModal from "../components/DeleteModal";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const updatedData = { name, email };
        if (password) {
          updatedData.password = password;
        }

        await updateUserById(user.user_id, updatedData);

        const response = await getUserById(user.user_id);
        updateUser({ name: response.data.name, email: response.data.email });

        setName(response.data.name);
        setEmail(response.data.email);
        setPassword("");
        setErrors({}); // Clear errors after a successful update
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="profile-settings">
      <h1 className="profile-settings__title">Settings</h1>

      <img
        className="profile-card__avatar"
        src="/assets/images/User_placeholder.jpg"
        alt="Profile avatar"
        loading="lazy"
      />

      <form className="profile-settings__form" onSubmit={handleSubmit}>
        {/* Name Input */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          className={`profile-settings__input input ${
            errors.name ? "input--error" : ""
          }`}
        />
        {errors.name && (
          <span className="error-message">
            <img
              src="/assets/icons/error-24px.svg"
              alt="error icon"
              className="error-icon"
            />
            {errors.name}
          </span>
        )}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          className={`profile-settings__input input ${
            errors.email ? "input--error" : ""
          }`}
        />
        {errors.email && (
          <span className="error-message">
            <img
              src="/assets/icons/error-24px.svg"
              alt="error icon"
              className="error-icon"
            />
            {errors.email}
          </span>
        )}

        {/* Password Input */}
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

      <hr />

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
