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
import CollectionsPage from "./pages/CollectionsPage";
import PoseAICamPage from "./pages/PoseAICamPage";
import NavBar from "./components/NavBar";
import SplashScreen from "./components/SplashScreen";
import { UserContext } from "./utils/UserContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.scss";
import "./styles/_global.scss";

const App = () => {
  const [showSplash, setShowSplash] = useState(
    !sessionStorage.getItem("splashShown")
  );

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const AppContent = () => {
    const location = useLocation();
    const { loading } = useContext(UserContext);

    const showNavBar =
      !["/", "/login", "/logout", "/pose-AI-cam"].includes(location.pathname) &&
      !location.pathname.startsWith("/pose-card/");

    if (loading) {
      return <p>Loading application...</p>;
    }

    return (
      <div className="app-container">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <div className="app-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
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
                <Route
                  path="/collections"
                  element={
                    <ProtectedRoute>
                      <CollectionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pose-AI-cam"
                  element={
                    <ProtectedRoute>
                      <PoseAICamPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            {showNavBar && <NavBar />}
          </>
        )}
      </div>
    );
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

export default App;
