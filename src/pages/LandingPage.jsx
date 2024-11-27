//LandingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";

const LandingPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleOpenModal = () => setShowSignUpModal(true);
  const handleCloseModal = () => setShowSignUpModal(false);

  const handleNavigateToLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="landing-page">
      <img src="/assets/images/large_image_placeholder.png" />
      {/* Get Started is the future home of the onboarding journey/tutorial */}
      <button className="button button--primary" onClick={handleOpenModal}>
        Get Started
      </button>
      <button
        className="button button--secondary"
        onClick={handleNavigateToLogin}
      >
        I Already Have An Account
      </button>

      {showSignUpModal && <SignUpModal onClose={handleCloseModal} />}
    </div>
  );
};

export default LandingPage;
