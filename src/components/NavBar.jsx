// NavBar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    {
      name: "Learn",
      link: "/home-tree",
      icon: "/assets/icons/home_icon.svg",
      iconAlt: "Learn icon",
    },
    {
      name: "Discover",
      link: "/collections",
      icon: "/assets/icons/weight_discover_icon.svg",
      iconAlt: "Collections icon",
    },
    {
      name: "Profile",
      link: "/profile-settings",
      icon: "/assets/icons/user_icon.svg",
      iconAlt: "Profile settings icon",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {tabs.map(({ link, icon, iconAlt }) => (
          <Link
            key={link}
            to={link}
            className={`navbar__button ${
              activeTab === link ? "navbar__button--active" : ""
            }`}
            onClick={() => setActiveTab(link)}
          >
            <img
              src={icon}
              alt={iconAlt}
              className={`navbar__icon ${
                activeTab === link ? "navbar__icon--active" : ""
              }`}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
