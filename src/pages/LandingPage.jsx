//LandingPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";
import Button from "../components/Button";
import "./LandingPage.scss";

const LandingPage = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page__content-wrapper">
        <div className="landing-page__image-wrapper">
          <img
            className="landing-page__image"
            src="/assets/images/site-logo.png"
            alt="site-logo"
          />
        </div>
        <section className="landing-page__ctas">
          <Button onClick={() => setShowSignUpModal(true)}>Get Started</Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            I Already Have An Account
          </Button>
        </section>
      </div>
      {showSignUpModal && (
        <SignUpModal onClose={() => setShowSignUpModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;
