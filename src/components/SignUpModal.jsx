import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import the function

const SignUpModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="sign-up-modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button button--primary" type="submit">
            Sign Up
          </button>
        </form>

        <button className="button button--secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
