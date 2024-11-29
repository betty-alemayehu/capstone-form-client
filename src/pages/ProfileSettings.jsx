//ProfileSettings.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import {
  getUserById,
  updateUserById,
  deleteUserById,
  getUserProgressionsWithMedia,
} from "../services/api";
import DeleteModal from "../components/DeleteModal";
import FormInput from "../components/FormInput";
import "./ProfileSettings.scss";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState(""); // For displayed name
  const [displayEmail, setDisplayEmail] = useState(""); // For displayed email
  const [formName, setFormName] = useState(""); // For form-controlled name input
  const [formEmail, setFormEmail] = useState(""); // For form-controlled email input
  const [password, setPassword] = useState(""); // For password input
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0); // Completed poses count
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id);
        const { name, email } = response.data;
        setDisplayName(name || ""); // Set displayed name
        setDisplayEmail(email || ""); // Set displayed email
        setFormName(name || ""); // Initialize form-controlled name
        setFormEmail(email || ""); // Initialize form-controlled email
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCompletedCount = async () => {
      if (!user) return;

      try {
        const response = await getUserProgressionsWithMedia(user.user_id);
        const progressions = response.data || [];
        const count = progressions.filter(
          (progression) => progression.status === "Completed"
        ).length;
        setCompletedCount(count);
      } catch (err) {
        console.error("Error fetching progressions:", err);
      }
    };

    if (user) {
      fetchUserDetails();
      fetchCompletedCount();
    } else {
      setLoading(false);
    }
  }, [user]);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formName.trim()) newErrors.name = "Name is required.";
    if (!formEmail.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formEmail))
      newErrors.email = "Enter a valid email address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const updatedData = {
          name: formName,
          email: formEmail,
          ...(password && { password }),
        };

        const response = await updateUserById(user.user_id, updatedData);
        updateUser({ name: response.data.name, email: response.data.email });

        // Update displayed name and email after successful update
        setDisplayName(response.data.name);
        setDisplayEmail(response.data.email);

        // Reset form fields
        setFormName(response.data.name);
        setFormEmail(response.data.email);
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
      <h1 className="profile-settings__title">Profile Settings</h1>
      <section className="profile-settings__hero">
        <img
          className="profile-settings__avatar"
          src="/assets/images/user_image_placeholder.png"
          alt="Profile avatar"
          loading="lazy"
        />
        <h3>{displayName}</h3>
        <p>{displayEmail}</p>
      </section>
      <form className="profile-settings__form" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          value={formName} // Controlled by form state
          onChange={(e) => setFormName(e.target.value)}
          error={errors.name}
          placeholder="Name"
        />
        <FormInput
          label="Email"
          type="email"
          value={formEmail} // Controlled by form state
          onChange={(e) => setFormEmail(e.target.value)}
          error={errors.email}
          placeholder="Email"
        />
        <FormInput
          label="Password"
          type="password"
          value={password} // Controlled by form state
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Update Your Password"
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
          completedCount={completedCount} // Pass the completed count as a prop
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProfileSettings;
