import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import default styles

const PoseWidget = ({ pose, uploadedImages }) => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Combine the default image and uploaded images
    const items = [{ url: pose.url_png, name: null }, ...uploadedImages];
    setCarouselItems(items);
  }, [pose.url_png, uploadedImages]);

  return (
    <div className="pose-widget">
      <Carousel showThumbs={false} infiniteLoop>
        {carouselItems.map((item, index) => (
          <figure className="pose-widget__item" key={index}>
            <img
              className="pose-widget__image"
              src={item.url}
              alt={item.name || "Yoga Pose"}
            />
          </figure>
        ))}
      </Carousel>
    </div>
  );
};

export default PoseWidget;
