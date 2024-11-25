//UserContext.jsx// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Provide UserContext to children
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user info
  const [loading, setLoading] = useState(true); // Indicates loading state

  // Check localStorage for stored user on load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Set loading to false once check is complete
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Update user details dynamically
  const updateUser = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser }; // Merge updated fields with existing user data
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData)); // Persist changes
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Named exports for context and provider
export { UserContext, UserProvider };
