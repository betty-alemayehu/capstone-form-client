// NavBar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const location = useLocation(); // Hook to get the current route
  const [activeTab, setActiveTab] = useState(location.pathname); // Initialize with current path

  const tabs = [
    { name: "Learn", link: "/home-tree" },
    { name: "Collections", link: "/collections" },
    { name: "Settings", link: "/profile-settings" },
  ];

  return (
    <nav className="navbar">
      {tabs.map((tab, index) => (
        <Link
          key={index}
          to={tab.link}
          className={`navbar__button ${
            activeTab === tab.link ? "navbar__button--active" : ""
          }`}
          onClick={() => setActiveTab(tab.link)} // Update active tab on click
        >
          <span className="navbar__label">{tab.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
