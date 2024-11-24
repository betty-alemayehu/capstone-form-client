//UploadEvaluation.jsx
const UploadEvaluation = ({
  uploadedImages,
  setUploadedImages,
  setFeedback,
}) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Use `setUploadedImages` correctly to update the state in the parent component
        setUploadedImages([...uploadedImages, { url: reader.result }]);
        setFeedback("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-evaluation">
      <h3>Upload Your Image</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default UploadEvaluation;
