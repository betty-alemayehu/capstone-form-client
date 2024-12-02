//PoseCarousel.jsx
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import "./PoseCarousel.scss";

const PoseCarousel = ({ pose, media, onSlideChange }) => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;

    const sortedMedia = media.map((item) => ({
      id: item.id,
      url: `${baseURL}${item.custom_media}`,
      name: item.created_at
        ? format(new Date(item.created_at), "MMM yyyy")
        : "User Uploaded Image",
      isDefault: false,
    }));

    const defaultImage = {
      id: null,
      url: pose.url_png,
      name: "Default Pose Image",
      isDefault: true,
    };

    setCarouselItems([...sortedMedia, defaultImage]);
  }, [pose, media]);

  useEffect(() => {
    if (carouselItems[currentSlide]) {
      onSlideChange(carouselItems[currentSlide]?.id);
    }
  }, [currentSlide, carouselItems, onSlideChange]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Swipe functionality, refer to https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
  const handleSwipe = (e) => {
    const threshold = 50; // Minimum swipe distance to register
    const touchStartX = e.changedTouches[0].clientX;

    let touchEndX = null;

    const onTouchMove = (event) => {
      touchEndX = event.changedTouches[0].clientX;
    };

    const onTouchEnd = () => {
      if (touchEndX !== null) {
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > threshold) {
          if (swipeDistance > 0 && currentSlide < carouselItems.length - 1) {
            // Swipe left, go to next slide
            setCurrentSlide((prev) => prev + 1);
          } else if (swipeDistance < 0 && currentSlide > 0) {
            // Swipe right, go to previous slide
            setCurrentSlide((prev) => prev - 1);
          }
        }
      }

      // Cleanup listeners
      carouselRef.current.removeEventListener("touchmove", onTouchMove);
      carouselRef.current.removeEventListener("touchend", onTouchEnd);
    };

    // Add listeners
    carouselRef.current.addEventListener("touchmove", onTouchMove);
    carouselRef.current.addEventListener("touchend", onTouchEnd);
  };

  return (
    <div className="pose-carousel" ref={carouselRef} onTouchStart={handleSwipe}>
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
