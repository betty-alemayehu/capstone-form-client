import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/login", { email, password });
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Log In</button>{" "}
      </form>
    </div>
  );
};

export default LoginPage;
