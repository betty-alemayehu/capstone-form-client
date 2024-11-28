//PoseCarousel.jsx
import React, { useEffect, useState } from "react";
import "./PoseCarousel.scss";

const PoseCarousel = ({ pose, media }) => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;

    const sortedMedia = media.map((item) => ({
      url: `${baseURL}${item.custom_media}`,
      name: item.caption_feedback || "User Uploaded Image",
    }));

    const defaultImage = { url: pose.url_png, name: "Default Pose Image" };
    setCarouselItems([...sortedMedia, defaultImage]);
  }, [pose, media]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="pose-widget">
      <div className="pose-widget__carousel">
        <div className="pose-widget__image-wrapper">
          <img
            className="pose-widget__image"
            src={carouselItems[currentSlide]?.url}
            alt={carouselItems[currentSlide]?.name || "Pose Image"}
          />
        </div>
        <nav className="pose-widget__dots">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`pose-widget__dot ${
                index === currentSlide ? "pose-widget__dot--active" : ""
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={
                index === currentSlide
                  ? "Current slide"
                  : `Go to slide ${index + 1}`
              }
            ></button>
          ))}
        </nav>
      </div>
      <figcaption className="pose-widget__caption">
        {carouselItems[currentSlide]?.name}
      </figcaption>
    </div>
  );
};

export default PoseCarousel;
