//SignUpModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/validation";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import "./SignUpModal.scss";

const SignUpModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};

    if (!validateRequired(form.name)) newErrors.name = "Name is required.";
    if (!validateEmail(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!validatePassword(form.password))
      newErrors.password =
        "Password must have at least 8 characters, 1 letter, and 1 number.";
    if (!form.termsAccepted)
      newErrors.termsAccepted = "You must accept the Terms and Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        await registerUser(form);
        onClose();
        navigate("/login");
      } catch (err) {
        console.error("Registration failed:", err);
        setErrors((prev) => ({
          ...prev,
          general: "An error occurred during registration.",
        }));
      }
    }
  };

  return (
    <div
      className="sign-up-modal"
      onClick={(e) => e.target.className === "sign-up-modal" && onClose()}
    >
      <div className="modal-content">
        <h1>Sign Up</h1>
        <p>Create an account to get started.</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            placeholder="Insert your name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            error={errors.name}
          />
          <FormInput
            label="Email"
            placeholder="Insert your email address"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            error={errors.email}
          />
          <FormInput
            label="Password"
            placeholder="Create a password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            error={errors.password}
          />
          <div className="terms">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={form.termsAccepted}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  termsAccepted: e.target.checked,
                }))
              }
            />
            <label htmlFor="terms-checkbox">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
