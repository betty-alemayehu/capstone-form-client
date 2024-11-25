//NavBar.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getUserById } from "../services/api.js";

const NavBar = () => {
  const { user, logout } = useContext(UserContext); // Access user and logout from context
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user.user_id);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userName]);

  const handleLogout = () => {
    logout(); // Clear user session
    navigate("/"); // Redirect to login page
  };

  console.log("Current user:", user); // Debugging log

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home-tree">Home</Link>
        </li>
        <li>
          <Link to="/profile-settings">Profile</Link>
        </li>
        {user ? (
          <>
            <li>
              <span>Welcome, {userName}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
