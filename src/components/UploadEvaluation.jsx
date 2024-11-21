import React from "react";

const UploadEvaluation = ({ setUploadedImages, setFeedback }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Add the uploaded image to the array of images
        setUploadedImages((prevImages) => [
          ...prevImages,
          {
            url: reader.result,
            name: "Link to feedback caption from server here",
          },
        ]);

        // Simulate feedback from the server (future state: replace with actual server feedback)
        setFeedback("Great posture! Keep your back straight.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pose-evaluation">
      <label htmlFor="image-upload" className="upload-button">
        Check Your Form
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadEvaluation;
