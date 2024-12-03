//SplashScreen.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./SplashScreen.scss";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Redirect after timeout
    }, 1500);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-screen__content-wrapper">
        <div className="splash-screen__image-wrapper">
          <img
            className="splash-screen__image"
            src="assets/images/splash_animation.gif"
            alt="Animation of man doing forearm stand"
          />
        </div>
        <section className="splash-screen__cta-buttons">
          <Button variant="hidden" type="button">
            Get Started
          </Button>
          <Button variant="hidden" type="button">
            I Already Have An Account
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SplashScreen;
