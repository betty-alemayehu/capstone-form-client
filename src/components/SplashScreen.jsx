import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="landing-page">
      <div className="landing-page__image-wrapper">
        <img
          className="landing-page__image"
          src="assets/images/pincha_animation.gif"
          alt="gif animation of man doing forearm stand"
        />
      </div>
      <section className="landing-page__ctas">
        <button className="splash-screen__button">Get Started</button>
        <button className="splash-screen__button">
          I Already Have An Account
        </button>
      </section>
    </div>
  );
};

export default SplashScreen;
