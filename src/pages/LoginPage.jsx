//LoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; // Import UserContext
import API from "../services/api";

const LoginPage = () => {
  const { login } = useContext(UserContext); // Access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
