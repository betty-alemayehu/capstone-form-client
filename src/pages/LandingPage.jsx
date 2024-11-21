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
      <h1>Form Landing Page</h1>
      {/* Get Started is the future home of the onboarding journey/tutorial */}
      <button onClick={handleOpenModal}>Get Started</button>
      <button onClick={handleNavigateToLogin}>I Already Have An Account</button>

      {showSignUpModal && <SignUpModal onClose={handleCloseModal} />}
    </div>
  );
};

export default LandingPage;
