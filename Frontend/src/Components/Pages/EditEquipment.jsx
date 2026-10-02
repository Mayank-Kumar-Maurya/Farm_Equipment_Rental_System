import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ServerContext from "../../Context/ServerContext";

const API_URL = "http://localhost:8080";

const clr = {
  primary: "#4a7c59",
  dark: "#2d5a3d",
  light: "#f0f5f1",
  border: "#c8ddd0",
  text: "#2d3a30",
  muted: "#7a9485",
};

const categories = [
  "Tractor",
  "Harvester",
  "Tiller",
  "Sprayer",
  "Seeder",
  "Irrigation",
  "Plough",
  "Other",
];

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #e8f0ea 0%, #f5f9f6 60%, #ddeee3 100%)",
    padding: "40px 16px",
    fontFamily: "cursive",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 8px 40px rgba(74,124,89,0.13)",
    overflow: "hidden",
    maxWidth: "700px",
    margin: "0 auto",
  },
  topBar: {
    background: `linear-gradient(135deg, ${clr.dark}, ${clr.primary})`,
    padding: "24px 28px 20px",
  },
  topTitle: {
    color: "#fff",
    fontSize: "1.25rem",
    fontWeight: 800,
    margin: 0,
  },
  topSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.82rem",
    marginTop: "4px",
  },
  body: {
    padding: "28px",
  },
  label: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: clr.text,
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${clr.border}`,
    borderRadius: "10px",
    fontSize: "0.92rem",
    outline: "none",
    color: clr.text,
    background: clr.light,
    boxSizing: "border-box",
    fontFamily: "cursive",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${clr.border}`,
    borderRadius: "10px",
    fontSize: "0.92rem",
    outline: "none",
    color: clr.text,
    background: clr.light,
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: "100px",
    fontFamily: "cursive",
  },
  group: {
    marginBottom: "20px",
    minWidth: 0,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: clr.primary,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "16px",
    paddingBottom: "6px",
    borderBottom: `1.5px solid ${clr.border}`,
  },
  hint: {
    fontSize: "0.78rem",
    color: clr.muted,
    marginTop: "5px",
  },
  stars: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
  },
  star: (active) => ({
    fontSize: "1.6rem",
    cursor: "pointer",
    color: active ? "#e6a817" : clr.border,
    lineHeight: 1,
  }),
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr))",
    gap: "12px",
    marginTop: "14px",
  },
  previewImg: {
    width: "100%",
    aspectRatio: "1",
    objectFit: "cover",
    borderRadius: "8px",
    border: `1.5px solid ${clr.border}`,
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: `linear-gradient(135deg, ${clr.dark}, ${clr.primary})`,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "8px",
    fontFamily: "cursive",
  },
  cancelBtn: {
    width: "100%",
    padding: "13px",
    background: "#fff",
    color: clr.muted,
    border: `1.5px solid ${clr.border}`,
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
    fontFamily: "cursive",
  },
};

function EditEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(ServerContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [equipment, setEquipment] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    catergory: "",
    price: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/showEquipment/${id}`);

        const data = response.data.Equipment;

        if (!data) {
          throw new Error("Equipment not found");
        }

        setEquipment(data);

        setFormData({
          name: data.name || "",
          brand: data.brand || "",
          catergory: data.catergory || "",
          price: data.price ?? "",
          description: data.description || "",
          address: data.location?.address || "",
          lat: data.location?.coordinates?.[1] ?? "",
          lng: data.location?.coordinates?.[0] ?? "",
        });

        setRating(Number(data.rating) || 0);
        setExistingImages(data.images || []);
      } catch (error) {
        console.error("Fetch equipment error:", error);
        alert(
          error.response?.data?.msg ||
            error.message ||
            "Unable to load equipment details.",
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id, navigate]);

  // Cleanup temporary image URLs
  useEffect(() => {
    return () => {
      newPhotos.forEach((photo) => {
        URL.revokeObjectURL(photo.url);
      });
    };
  }, [newPhotos]);

  const getImageUrl = (image) => {
    if (!image?.url) return "";

    if (image.url.startsWith("http://") || image.url.startsWith("https://")) {
      return image.url;
    }

    return `${API_URL}${
      image.url.startsWith("/") ? image.url : `/${image.url}`
    }`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new images
  const handleFiles = (files) => {
    const selectedFiles = Array.from(files || []);

    const availableSlots = 6 - existingImages.length - newPhotos.length;

    if (availableSlots <= 0) {
      alert("You can have a maximum of 6 photos.");
      return;
    }

    const selected = selectedFiles.slice(0, availableSlots);

    if (selected.length < selectedFiles.length) {
      alert(`You can select only ${availableSlots} more photo(s).`);
    }

    const validFiles = selected.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validFiles.length !== selected.length) {
      alert("Please select only image files.");
    }

    const photos = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setNewPhotos((prev) => [...prev, ...photos]);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const removeNewPhoto = (index) => {
    setNewPhotos((prev) => {
      const photo = prev[index];

      if (photo?.url) {
        URL.revokeObjectURL(photo.url);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // Submit updated equipment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (!formData.name.trim()) {
      alert("Please enter equipment name.");
      return;
    }

    if (!formData.brand.trim()) {
      alert("Please enter brand.");
      return;
    }

    if (!formData.catergory) {
      alert("Please select category.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      alert("Please enter a valid rental price.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter description.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter equipment address.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

    const lat = Number(formData.lat);
    const lng = Number(formData.lng);

    if (
      formData.lat === "" ||
      formData.lng === "" ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      alert("Please enter valid latitude and longitude.");
      return;
    }

    if (existingImages.length + newPhotos.length === 0) {
      alert("Please keep or upload at least one photo.");
      return;
    }

    if (existingImages.length + newPhotos.length > 6) {
      alert("Maximum 6 photos are allowed.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("brand", formData.brand.trim());
      data.append("catergory", formData.catergory);
      data.append("price", Number(formData.price));
      data.append("description", formData.description.trim());
      data.append("rating", rating);
      data.append("address", formData.address.trim());
      data.append("lat", lat);
      data.append("lng", lng);

      // Existing images to retain
      data.append("keepImages", JSON.stringify(existingImages));

      // Newly uploaded image files
      newPhotos.forEach((photo) => {
        data.append("images", photo.file);
      });

      await axios.put(`${API_URL}/showEquipment/${id}`, data, {
        headers: {
          token: token,
        },
      });

      alert("Equipment updated successfully!");
      navigate(`/product/${id}`);
    } catch (error) {
      console.error("Update equipment error:", error);
      console.log("Backend response:", error.response?.data);

      alert(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Failed to update equipment.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" />
      </div>
    );
  }

  if (!equipment) return null;

  // Frontend ownership check
  const currentUserId = user?._id || user?.userId || user?.id;

  const ownerId =
    equipment.owner?._id || equipment.owner?.userId || equipment.owner;

  if (currentUserId && ownerId && String(currentUserId) !== String(ownerId)) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.body} className="text-center">
            <h4 style={{ color: "#dc3545" }}>
              You are not authorized to edit this equipment.
            </h4>

            <button
              style={styles.submitBtn}
              onClick={() => navigate(`/product/${id}`)}
            >
              Back to Equipment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{`
        .edit-row-2 {
          grid-template-columns: 1fr 1fr;
        }

        .edit-input:focus,
        .edit-textarea:focus {
          border-color: ${clr.primary} !important;
          box-shadow: 0 0 0 3px rgba(74,124,89,0.12);
        }

        .edit-star-button {
          background: transparent;
          border: none;
          padding: 0;
          line-height: 1;
        }

        .edit-action-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        @media (max-width: 560px) {
          .edit-row-2 {
            grid-template-columns: 1fr !important;
          }

          .edit-form-body {
            padding: 20px 16px 28px !important;
          }
        }
      `}</style>

      <div style={styles.card}>
        <div style={styles.topBar}>
          <h4 style={styles.topTitle}>✏️ Update Equipment Details</h4>

          <div style={styles.topSub}>
            Edit your equipment information and save the changes.
          </div>
        </div>

        <form
          style={styles.body}
          className="edit-form-body"
          onSubmit={handleSubmit}
        >
          {/* Basic Information */}
          <div style={styles.sectionTitle}>Basic Information</div>

          <div style={styles.row} className="edit-row-2">
            <div style={styles.group}>
              <label style={styles.label}>Equipment Name *</label>
              <input
                name="name"
                value={formData.name}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Brand *</label>
              <input
                name="brand"
                value={formData.brand}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={styles.row} className="edit-row-2">
            <div style={styles.group}>
              <label style={styles.label}>Category *</label>
              <select
                name="catergory"
                value={formData.catergory}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Rental Price *</label>
              <input
                name="price"
                type="number"
                min="1"
                value={formData.price}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              />
              <div style={styles.hint}>Amount in ₹ per day</div>
            </div>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              style={styles.textarea}
              className="edit-textarea"
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div style={styles.sectionTitle}>Equipment Location</div>

          <div style={styles.group}>
            <label style={styles.label}>Full Address *</label>
            <input
              name="address"
              value={formData.address}
              style={styles.input}
              className="edit-input"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.row} className="edit-row-2">
            <div style={styles.group}>
              <label style={styles.label}>Latitude *</label>
              <input
                name="lat"
                type="number"
                step="any"
                value={formData.lat}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Longitude *</label>
              <input
                name="lng"
                type="number"
                step="any"
                value={formData.lng}
                style={styles.input}
                className="edit-input"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div style={styles.sectionTitle}>Equipment Rating</div>

          <div style={styles.group}>
            <label style={styles.label}>Rating *</label>

            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="edit-star-button"
                  style={styles.star(star <= (hoverRating || rating))}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Set rating to ${star}`}
                >
                  ★
                </button>
              ))}
            </div>

            <div style={styles.hint}>
              {rating > 0 ? `Selected rating: ${rating}/5` : "Select a rating"}
            </div>
          </div>

          {/* Images */}
          <div style={styles.sectionTitle}>Equipment Photos</div>

          <div style={styles.group}>
            <label style={styles.label}>
              Existing Photos ({existingImages.length})
            </label>

            {existingImages.length > 0 ? (
              <div style={styles.previewGrid}>
                {existingImages.map((image, index) => (
                  <div
                    key={image._id || image.filename || index}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Existing equipment ${index + 1}`}
                      style={styles.previewImg}
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        background: "rgba(0,0,0,0.65)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: 23,
                        height: 23,
                        cursor: "pointer",
                      }}
                      title="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.hint}>
                No existing photos. Please upload a photo.
              </p>
            )}
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Add New Photos</label>

            <input
              type="file"
              accept="image/*"
              multiple
              className="form-control"
              disabled={existingImages.length + newPhotos.length >= 6}
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />

            <div style={styles.hint}>
              Maximum 6 photos in total. You can keep, remove or add photos.{" "}
              {6 - existingImages.length - newPhotos.length} slot(s) remaining.
            </div>

            {newPhotos.length > 0 && (
              <div style={styles.previewGrid}>
                {newPhotos.map((photo, index) => (
                  <div
                    key={`${photo.name}-${index}`}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      style={styles.previewImg}
                    />

                    <button
                      type="button"
                      onClick={() => removeNewPhoto(index)}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        background: "rgba(0,0,0,0.65)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: 23,
                        height: 23,
                        cursor: "pointer",
                      }}
                      title="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="edit-action-button"
            style={{
              ...styles.submitBtn,
              opacity: saving ? 0.7 : 1,
            }}
            disabled={saving}
          >
            {saving ? "Updating Equipment..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="edit-action-button"
            style={styles.cancelBtn}
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEquipment;