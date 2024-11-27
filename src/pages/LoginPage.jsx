//LoginPage.jsx// LoginPage.jsx
// LoginPage.jsx
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
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenSignUpModal = () => setShowSignUpModal(true);
  const handleCloseSignUpModal = () => setShowSignUpModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const { token, user_id, email: userEmail } = response.data;
      login({ token, user_id, email: userEmail });
      navigate("/home-tree");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__image-wrapper">
        <img
          className="login-page__image"
          src="public/assets/images/Grid_figures.png"
          alt="Login Illustration"
        />
      </div>
      <section className="login-page__ctas">
        <h1>Welcome!</h1>
        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="h3">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="h3">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
