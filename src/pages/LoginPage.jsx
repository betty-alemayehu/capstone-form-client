//LoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import SignUpModal from "../components/SignUpModal";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { loginUser } from "../services/api";
import { validateEmail, validateRequired } from "../utils/validation";
import "./LoginPage.scss";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!validateEmail(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!validateRequired(form.password))
      newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await loginUser(form);
        const { token, user_id, email: userEmail } = response.data;
        login({ token, user_id, email: userEmail });
        navigate("/home-tree");
      } catch (err) {
        const status = err.response?.status;
        setErrors((prev) => ({
          ...prev,
          general:
            status === 404
              ? "User does not exist. Please register first."
              : status === 401
              ? "Invalid email or password. Please try again."
              : "An error occurred. Please try again later.",
        }));
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__content-wrapper">
        <div className="login-page__image-wrapper">
          <img
            className="login-page__image"
            src="/assets/images/site-logo.png"
            alt="Login Illustration"
          />
        </div>
        <section className="login-page__ctas">
          <h1>Welcome!</h1>
          <form className="login-page__form" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              error={errors.email}
            />
            <FormInput
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              error={errors.password}
            />
            {errors.general && (
              <span className="error-message error-message--general">
                <img
                  src="/assets/icons/error-24px.svg"
                  alt="Error icon"
                  className="error-icon"
                />
                {errors.general}
              </span>
            )}
            <a href="#" className="login-page__passwordreset-link">
              Forgot password?
            </a>
            <Button type="submit">Login</Button>
          </form>
          <section className="login-page__options">
            <p className="login-page__register">
              Not a member?{" "}
              <a
                href="#"
                className="login-page__register-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSignUpModal(true);
                }}
              >
                Register now
              </a>
            </p>
            <div className="login-page__ORoauth">
              <hr className="login-page__divider" />
              <p className="login-page__continue">OR</p>
              <hr className="login-page__divider" />
            </div>
            <div className="login-page__oauth-icons">
              <button className="oauth-icon">
                <img
                  src="https://pipedream.com/s.v0/app_m02hPO/logo/orig"
                  alt="Google Login"
                />
              </button>
              <button className="oauth-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                  alt="Apple Login"
                />
              </button>
              <button className="oauth-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
                  alt="Facebook Login"
                />
              </button>
            </div>
          </section>
        </section>
      </div>
      {showSignUpModal && (
        <SignUpModal onClose={() => setShowSignUpModal(false)} />
      )}
    </div>
  );
};

export default LoginPage;
