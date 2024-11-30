//ProfileSettings.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { validateProfileForm } from "../utils/validation";

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
  const [displayName, setDisplayName] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id);
        const { name, email } = response.data;
        setDisplayName(name || "");
        setDisplayEmail(email || "");
        setFormName(name || "");
        setFormEmail(email || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: formName.trim(),
      email: formEmail.trim(),
      password: password,
    };

    const validationErrors = validateProfileForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // Stop if there are errors

    const updatedData = {
      ...(formData.name && { name: formData.name }),
      ...(formData.email && { email: formData.email }),
      ...(formData.password && { password: formData.password.trim() }),
    };

    if (Object.keys(updatedData).length === 0) {
      setError("Please update at least one field before submitting.");
      return;
    }

    try {
      const response = await updateUserById(user.user_id, updatedData);
      updateUser({ name: response.data.name, email: response.data.email });

      setDisplayName(response.data.name);
      setDisplayEmail(response.data.email);
      setFormName("");
      setFormEmail("");
      setPassword("");
      setErrors({});
      setError(null);
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: "Email is already in use.",
        }));
      } else {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserById(user.user_id);
      logout();
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="profile-settings">
      <h1 className="profile-settings__title">Profile Settings</h1>
      {error && <p className="profile-settings__error">{error}</p>}
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
          value={formName} // Keeps the input field empty
          onChange={(e) => setFormName(e.target.value)}
          error={errors.name}
          placeholder={displayName || "Name"} // Display current name as placeholder only
        />
        <FormInput
          label="Email"
          type="email"
          value={formEmail} // Keeps the input field empty
          onChange={(e) => setFormEmail(e.target.value)}
          error={errors.email}
          placeholder={displayEmail || "Email"} // Display current email as placeholder only
        />
        <FormInput
          label="Password"
          type="password"
          value={password} // Keeps the input field empty
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Update Your Password" // Static placeholder text
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
        className="button button--tertiary delete"
        onClick={() => setIsModalOpen(true)}
      >
        Delete Account
      </button>
      {isModalOpen && (
        <DeleteModal
          completedCount={completedCount}
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProfileSettings;
