import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomeTree from "./pages/HomeTree";
import PoseDetails from "./pages/PoseDetails";
import ProfileSettings from "./pages/ProfileSettings";
import NavBar from "./components/NavBar";
import SplashScreen from "./components/SplashScreen";
import "./App.scss";

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
    // Determine if NavBar should be shown
    const showNavBar =
      !["/", "/login", "/logout"].includes(location.pathname) &&
      !location.pathname.startsWith("/pose-card/");

    return (
      <div className="app-container">
        {showSplash ? (
          <SplashScreen /> // Show splash screen animation
        ) : (
          <>
            {showNavBar && <NavBar />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home-tree" element={<HomeTree />} />
              <Route path="/pose-card/:id" element={<PoseDetails />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
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
