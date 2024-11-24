//PoseWidget.jsx
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const PoseWidget = ({ pose, media }) => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Sort user media by date and place default image last
    const sortedMedia = media.map((item) => ({
      url: item.custom_media,
      name: item.caption_feedback || "User Uploaded Image",
    }));

    // Add default image at the end
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
