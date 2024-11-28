import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./SplashScreen.scss";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Navigate after x seconds
    }, 1500);

    return () => clearTimeout(timeout); // Cleanup timeout, refer to scss for zoom effect
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-screen__image-wrapper">
        <img
          className="splash-screen__image"
          src="assets/images/pincha_animation.gif"
          alt="gif animation of man doing forearm stand"
        />
      </div>
      <section className="splash-screen__ctas">
        <Button variant="hidden" type="submit">
          Get Started
        </Button>
        <Button variant="hidden" type="submit">
          I Already Have An Account
        </Button>
      </section>
    </div>
  );
};

export default SplashScreen;
