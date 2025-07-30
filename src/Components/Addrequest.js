import React, { useState } from "react";
import axios from "axios";

function AddRequest() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    age: "",
    height: "",
    job: "",
    time: "",
    type: "",
    badgeColor: ""
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      setError("");
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError("Only JPEG, PNG, JPG, or SVG files are allowed");
      setImage(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const imageBase64 = reader.result; // base64 format

        const finalData = {
          ...formData,
          image: imageBase64 // send image to backend
        };

        await axios.post("http://localhost:5000/api/requests", finalData);
        alert("Request added successfully!");
      } catch (error) {
        alert("Error adding request");
        console.error(error);
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="container mt-4">
      <h4>Add New Request</h4>
      <form onSubmit={handleSubmit}>
        {["name", "city", "age", "height", "job", "time", "type", "badgeColor"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Image upload */}
        <div className="mb-3">
          <label className="form-label">Image (jpeg, jpg, png, svg only)</label>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.svg"
            className="form-control"
            onChange={handleImageChange}
          />
          {error && <p className="text-danger">{error}</p>}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2"
              style={{ width: "120px", borderRadius: "10px" }}
            />
          )}
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRequest;
