//SignUpModal.jsx
//SignUpModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import the function
import "./SignUpModal.scss";

const SignUpModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State for checkbox
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
    try {
      await registerUser({ name, email, password });
      onClose(); // Close the modal
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "sign-up-modal") {
      onClose(); // Close modal if the overlay is clicked
      navigate("/"); // Navigate back to landing page
    }
  };

  return (
    <div className="sign-up-modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h1>Sign Up</h1>
        <p>Create an account to get started.</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="h3">Name</label>
          <input
            type="text"
            placeholder="Insert your name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="h3">Email</label>
          <input
            type="email"
            placeholder="Insert your email address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="h3">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="terms">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
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
          <button className="button button--primary" type="submit">
            Sign Up
          </button>
        </form>
        {/* <button className="button button--secondary" onClick={onClose}>
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default SignUpModal;
