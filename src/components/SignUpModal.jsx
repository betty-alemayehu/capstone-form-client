//SignUpModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { validateSignUpForm } from "../utils/validation";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form using the utility function
    const validationErrors = validateSignUpForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await registerUser(form);
        onClose();
        navigate("/login");
      } catch (err) {
        console.error("Registration failed:", err);

        // Handle backend error for duplicate email
        if (err.response?.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: "User with this email already exists.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "An error occurred during registration. Please try again.",
          }));
        }
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
              className={errors.termsAccepted ? "input--error" : ""}
            />
            <label htmlFor="terms-checkbox">
              {" "}
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                <strong>Terms and Conditions</strong>
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                <strong>Privacy Policy</strong>
              </a>
              .
            </label>
            {errors.termsAccepted && (
              <div className="error-message">
                <img
                  src="/assets/icons/error-24px.svg"
                  alt="Error"
                  className="error-icon"
                />
                {errors.termsAccepted}
              </div>
            )}
          </div>
          <Button type="submit">Sign Up</Button>
          {errors.general && (
            <div className="error">
              <img
                src="/assets/icons/error-24px.svg"
                alt="Error"
                className="error-icon"
              />
              {errors.general}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
