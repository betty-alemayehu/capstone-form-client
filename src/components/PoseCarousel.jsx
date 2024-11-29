//PoseCarousel.jsx
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "./PoseCarousel.scss";

const PoseCarousel = ({ pose, media }) => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;

    const sortedMedia = media.map((item) => ({
      url: `${baseURL}${item.custom_media}`,
      name: item.created_at
        ? format(new Date(item.created_at), "MMM yyyy")
        : "User Uploaded Image",
    }));

    const defaultImage = { url: pose.url_png, name: "Default Pose Image" };
    setCarouselItems([...sortedMedia, defaultImage]);
  }, [pose, media]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="pose-carousel">
      <div className="pose-carousel__carousel">
        <div className="pose-carousel__image-wrapper">
          <img
            className="pose-carousel__image"
            src={carouselItems[currentSlide]?.url}
            alt={carouselItems[currentSlide]?.name || "Pose Image"}
          />
        </div>
        <nav className="pose-carousel__dots">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`pose-carousel__dot ${
                index === currentSlide ? "pose-carousel__dot--active" : ""
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
      <figcaption className="pose-carousel__caption">
        {carouselItems[currentSlide]?.name}
      </figcaption>
    </div>
  );
};

export default PoseCarousel;
