//SignUpModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import the function
import "./SignUpModal.scss";

const SignUpModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation Logic
  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks for a valid email format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim() || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include both letters and numbers.";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the Terms and Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        await registerUser({ name, email, password });
        onClose(); // Close the modal
        navigate("/login");
      } catch (err) {
        console.error("Registration failed:", err);
        setErrors((prev) => ({
          ...prev,
          general: "An error occurred during registration. Please try again.",
        }));
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "sign-up-modal") {
      onClose(); // Close modal if the overlay is clicked
    }
  };

  return (
    <div className="sign-up-modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h1>Sign Up</h1>
        <p>Create an account to get started.</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <label className="h3">Name</label>
          <input
            type="text"
            placeholder="Insert your name"
            className={`input ${errors.name ? "input--error" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
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
          <label className="h3">Email</label>
          <input
            type="email"
            placeholder="Insert your email address"
            className={`input ${errors.email ? "input--error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
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
          <label className="h3">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className={`input ${errors.password ? "input--error" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && (
            <span className="error-message">
              <img
                src="/assets/icons/error-24px.svg"
                alt="error icon"
                className="error-icon"
              />
              {errors.password}
            </span>
          )}

          {/* Terms Checkbox */}
          <div className="terms">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (errors.termsAccepted)
                  setErrors((prev) => ({ ...prev, termsAccepted: "" }));
              }}
            />
            <label htmlFor="terms-checkbox">
              {" "}
              I’ve read and agree with the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <strong>Terms and Conditions</strong>
              </a>{" "}
              and the{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                <strong>Privacy Policy</strong>
              </a>
              .
            </label>
          </div>
          {errors.termsAccepted && (
            <span className="error-message">
              <img
                src="/assets/icons/error-24px.svg"
                alt="error icon"
                className="error-icon"
              />
              {errors.termsAccepted}
            </span>
          )}

          {/* General Error Message */}
          {errors.general && (
            <span className="error-message error-message--general">
              <img
                src="/assets/icons/error-24px.svg"
                alt="error icon"
                className="error-icon"
              />
              {errors.general}
            </span>
          )}

          {/* Submit Button */}
          <button className="button button--primary" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
