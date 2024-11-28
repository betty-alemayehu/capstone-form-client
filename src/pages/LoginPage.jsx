//LoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import SignUpModal from "../components/SignUpModal";
import { loginUser } from "../services/api";
import "./LoginPage.scss";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => setShowSignUpModal(false);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format

    // Check for blank email field
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      // Check for invalid email format
      newErrors.email = "Please enter a valid email address.";
    }

    // Check for blank password field
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await loginUser({ email, password });
        const { token, user_id, email: userEmail } = response.data;
        login({ token, user_id, email: userEmail });
        navigate("/home-tree");
      } catch (err) {
        const status = err.response?.status;

        if (status === 404) {
          setErrors((prev) => ({
            ...prev,
            general: "User does not exist. Please register first.",
          }));
        } else if (status === 401) {
          setErrors((prev) => ({
            ...prev,
            general: "Invalid email or password. Please try again.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "An error occurred. Please try again later.",
          }));
        }
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__image-wrapper">
        <img
          className="login-page__image"
          src="/assets/images/Grid_figures.png"
          alt="Login Illustration"
        />
      </div>
      <section className="login-page__ctas">
        <h1>Welcome!</h1>
        <form className="login-page__form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <label className="h3">Email</label>
          <input
            type="email"
            placeholder="Email"
            className={`input ${errors.email ? "input--error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            required
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
            placeholder="Password"
            className={`input ${errors.password ? "input--error" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: "" }));
            }}
            required
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

          {/* General Error */}
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
            Log In
          </button>
        </form>

        <p className="login-page__register">
          Not a member?{" "}
          <button
            type="button"
            className="button-link"
            onClick={handleOpenSignUpModal}
          >
            Register now
          </button>
        </p>

        <hr className="login-page__divider" />

        <p className="login-page__continue">Or continue with</p>

        <div className="login-page__oauth-icons">
          <button className="oauth-icon">
            <img
              src="https://pipedream.com/s.v0/app_m02hPO/logo/orig"
              alt="Google"
            />
          </button>
          <button className="oauth-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/0/747.png"
              alt="Apple"
            />
          </button>
          <button className="oauth-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
              alt="Facebook"
            />
          </button>
        </div>
      </section>
      {showSignUpModal && <SignUpModal onClose={handleCloseSignUpModal} />}
    </div>
  );
};

export default LoginPage;
