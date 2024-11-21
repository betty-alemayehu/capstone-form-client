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
    <div className="splash-screen">
      <img
        className="splash-img"
        src="https://media1.tenor.com/m/t5rCDbus_cgAAAAC/blob-fufi.gif"
      />
    </div>
  );
};

export default SplashScreen;
