//LoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; // Import UserContext
import API from "../services/api";
import "./LoginPage.scss";

const LoginPage = () => {
  const { login } = useContext(UserContext); // Access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await API.post("/users/login", { email, password });
      const { token, user_id, email: userEmail } = response.data;

      // Save user data in context
      login({ token, user_id, email: userEmail });

      // Redirect to home tree
      console.log("Login successful:", response.data);
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
          src="/assets/images/large_image_placeholder.png"
        />
      </div>
      <section className="login-page__ctas">
        <h1>Log In</h1>
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
      </section>
    </div>
  );
};

export default LoginPage;
