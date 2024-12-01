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
import Button from "../components/Button";
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
  const [completedCount, setCompletedCount] = useState(0);
  const { user, logout, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await getUserById(user.user_id);
        const { name, email } = data;
        setDisplayName(name || "");
        setDisplayEmail(email || "");
        setFormName(name || "");
        setFormEmail(email || "");
      } catch {
        setError("Failed to load user details.");
      }
    };

    const fetchCompletedCount = async () => {
      if (!user) return;
      try {
        const { data: progressions } = await getUserProgressionsWithMedia(
          user.user_id
        );
        setCompletedCount(
          progressions.filter((p) => p.status === "Completed").length
        );
      } catch {
        console.error("Error fetching progressions.");
      }
    };

    if (user) {
      fetchUserDetails();
      fetchCompletedCount();
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedData = {
      ...(formData.name && { name: formData.name }),
      ...(formData.email && { email: formData.email }),
      ...(formData.password && { password: formData.password.trim() }),
    };

    if (!Object.keys(updatedData).length) {
      setError("Please update at least one field before submitting.");
      return;
    }

    try {
      const { data } = await updateUserById(user.user_id, updatedData);
      updateUser({ name: data.name, email: data.email });
      setDisplayName(data.name);
      setDisplayEmail(data.email);
      setFormName("");
      setFormEmail("");
      setPassword("");
      setErrors({});
      setError(null);
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors((prev) => ({ ...prev, email: "Email is already in use." }));
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserById(user.user_id);
      logout();
      navigate("/");
    } catch {
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <main className="profile-settings">
      <h1 className="profile-settings__title">Profile Settings</h1>
      {error && <p className="profile-settings__error">{error}</p>}
      <section className="profile-settings__hero">
        <img
          className="profile-settings__avatar"
          src="/assets/icons/user_icon.png"
          alt="Profile avatar"
        />
        <h3>{displayName}</h3>
        <p>{displayEmail}</p>
      </section>
      <form className="profile-settings__form" onSubmit={handleSubmit}>
        <FormInput
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          error={errors.name}
          placeholder={displayName || "Name"}
        />
        <FormInput
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
          error={errors.email}
          placeholder={displayEmail || "Email"}
        />
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Update Your Password"
        />
        <Button type="submit" variant="primary">
          Save
        </Button>
      </form>
      <section className="profile-settings__ctas">
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
        <Button variant="tertiary-delete" onClick={() => setIsModalOpen(true)}>
          Delete Account
        </Button>
      </section>
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
