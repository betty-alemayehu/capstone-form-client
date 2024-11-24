//UserContext.jsx
import { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// Provide UserContext to children
export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
