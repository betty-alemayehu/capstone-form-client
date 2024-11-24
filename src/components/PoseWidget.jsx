//PoseWidget.jsx
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import API from "../services/api";

const PoseWidget = ({ pose, media }) => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Get the base URL from the API instance
    const baseURL = API.defaults.baseURL;

    // Add base URL only to media table URLs
    const sortedMedia = media.map((item) => ({
      url: `${baseURL}${item.custom_media}`, // Prepend base URL for media table items
      name: item.caption_feedback || "User Uploaded Image",
    }));

    // Add default image at the end (no base URL for default)
    const defaultImage = { url: pose.url_png, name: "Default Pose Image" };
    setCarouselItems([...sortedMedia, defaultImage]);
  }, [pose, media]);

  return (
    <div className="pose-widget">
      <Carousel showThumbs={true} infiniteLoop>
        {carouselItems.map((item, index) => (
          <figure className="pose-widget__item" key={index}>
            <img
              className="pose-widget__image"
              src={item.url}
              alt={item.name || "Pose Image"}
            />
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </Carousel>
    </div>
  );
};

export default PoseWidget;
