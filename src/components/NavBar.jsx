//NavBar.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getUserById } from "../services/api.js";
import "./NavBar.scss";

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.user_id) return;

      try {
        const response = await getUserById(user.user_id);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [user]);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  const tabs = [
    { name: "Learn", link: "/home-tree", active: false },
    { name: "Collections", link: "/collections", active: false },
    { name: "Settings", link: "/profile-settings", active: false },
  ];

  return (
    <nav className="navbar">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          to={tab.link}
          className={`navbar__button ${
            tab.active ? "navbar__button--active" : ""
          }`}
        >
          <span className="navbar__label">{tab.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
