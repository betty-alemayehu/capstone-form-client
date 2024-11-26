//App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomeTree from "./pages/HomeTree";
import PoseDetails from "./pages/PoseDetails";
import ProfileSettings from "./pages/ProfileSettings";
import NavBar from "./components/NavBar";
import SplashScreen from "./components/SplashScreen";
import { UserContext } from "./contexts/UserContext"; // Import UserContext for user data
import "./App.scss";
import "./styles/_global.scss";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext); // Access user and loading state

  if (loading) {
    return <p>Loading...</p>; // Show loading while user data is being retrieved
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if user is not authenticated
  }

  return children; // Render protected content if user exists
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check sessionStorage to see if the splash screen has been shown
    return !sessionStorage.getItem("splashShown");
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true"); // Mark splash as shown for the session
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [showSplash]);

  const AppContent = () => {
    const location = useLocation();
    const { loading } = useContext(UserContext);

    // Determine if NavBar should be shown
    const showNavBar =
      !["/", "/login", "/logout"].includes(location.pathname) &&
      !location.pathname.startsWith("/pose-card/");

    if (loading) {
      return <p>Loading application...</p>; // Optional global loading state
    }

    return (
      <div className="app-container">
        {showSplash ? (
          <SplashScreen /> // Show splash screen animation
        ) : (
          <>
            {showNavBar && <NavBar />}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/home-tree"
                element={
                  <ProtectedRoute>
                    <HomeTree />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pose-card/:id"
                element={
                  <ProtectedRoute>
                    <PoseDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile-settings"
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </>
        )}
      </div>
    );
  };

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <AppContent />
    </Router>
  );
};

export default App;
