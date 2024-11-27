//LandingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";
import "./LandingPage.scss";

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
      <div className="landing-page__image-wrapper">
        <img
          className="landing-page__image"
          src="/assets/images/Grid_figures.png"
        />
      </div>
      {/* Get Started is the future home of the onboarding journey/tutorial */}
      <section className="landing-page__ctas">
        <button className="button button--primary" onClick={handleOpenModal}>
          Get Started
        </button>
        <button
          className="button button--secondary"
          onClick={handleNavigateToLogin}
        >
          I Already Have An Account
        </button>
      </section>
      {showSignUpModal && <SignUpModal onClose={handleCloseModal} />}
    </div>
  );
};

export default LandingPage;
