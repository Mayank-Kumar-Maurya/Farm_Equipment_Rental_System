import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ServerContext from "../../Context/ServerContext";

const API_URL = "http://localhost:8080";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, token } = useContext(ServerContext);

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  // review
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  // complain
  const [showComplainForm, setShowComplainForm] = useState(false);
  const [complainMessage, setComplainMessage] = useState("");
  const [complainLoading, setComplainLoading] = useState(false);
  const [deletingComplainId, setDeletingComplainId] = useState(null);

  // Fetch equipment details
  const fetchEquipment = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/showEquipment/${id}`);

      setEquipment(response.data.Equipment);
      setError("");
    } catch (error) {
      console.error("Error fetching equipment:", error);

      setError(
        error.response?.data?.msg || "Failed to load equipment details.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEquipment();
  }, [id]);
  // Check equipment ownership
  const currentUserId = user?._id || user?.userId || user?.id;

  const ownerId = equipment?.owner?._id || equipment?.owner?.userId;

  const isOwner =
    currentUserId && ownerId && String(currentUserId) === String(ownerId);

  // Convert local upload path into complete image URL
  const getImageUrl = (image) => {
    if (!image?.url) return "";

    if (image.url.startsWith("http://") || image.url.startsWith("https://")) {
      return image.url;
    }

    const imagePath = image.url.startsWith("/") ? image.url : `/${image.url}`;

    return `${API_URL}${imagePath}`;
  };

  // Delete equipment
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this equipment?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await axios.delete(`${API_URL}/showEquipment/${id}`, {
        headers: {
          token: token,
        },
      });

      alert("Equipment deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err);

      alert(err.response?.data?.msg || "Unable to delete equipment.");
    } finally {
      setDeleting(false);
    }
  };

  // handleReview
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to give a review.");
      navigate("/login");
      return;
    }

    if (!reviewComment.trim()) {
      alert("Please enter your comment.");
      return;
    }

    try {
      setReviewLoading(true);

      const response = await axios.post(
        `${API_URL}/${id}/reviews`,
        {
          rating: Number(reviewRating),
          comment: reviewComment.trim(),
        },
        {
          headers: {
            token: token,
          },
        },
      );

      alert(response.data.msg || "Review submitted successfully!");

      setReviewComment("");
      setReviewRating(5);
      setShowReviewForm(false);

      // Refresh equipment details to display the new review
      const updatedResponse = await axios.get(`${API_URL}/showEquipment/${id}`);

      setEquipment(updatedResponse.data.Equipment);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        error.response?.data?.msg ||
          "Failed to submit review. Please try again.",
      );
    } finally {
      setReviewLoading(false);
    }
  };

  // deleteReview
  const handleDeleteReview = async (reviewId) => {
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingReviewId(reviewId);

      const response = await axios.delete(
        `${API_URL}/${id}/reviews/${reviewId}`,
        {
          headers: {
            token: token,
          },
        },
      );

      alert(response.data.msg || "Review deleted successfully!");

      await fetchEquipment();
    } catch (error) {
      console.error("Error deleting review:", error);

      alert(error.response?.data?.msg || "Failed to delete review.");
    } finally {
      setDeletingReviewId(null);
    }
  };

  // handleComplains
  const handleSubmitComplain = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to report an issue.");
      navigate("/login");
      return;
    }

    if (!complainMessage.trim()) {
      alert("Please enter your complaint.");
      return;
    }

    try {
      setComplainLoading(true);

      const response = await axios.post(
        `${API_URL}/${id}/complains`,
        {
          message: complainMessage.trim(),
        },
        {
          headers: {
            token: token,
          },
        },
      );

      alert(response.data.msg || "Complaint registered successfully!");

      setComplainMessage("");
      setShowComplainForm(false);

      await fetchEquipment();
    } catch (error) {
      console.error("Error submitting complaint:", error);

      alert(
        error.response?.data?.msg ||
          "Failed to submit complaint. Please try again.",
      );
    } finally {
      setComplainLoading(false);
    }
  };

  // handleDeleteComplain
  const handleDeleteComplain = async (complainId) => {
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingComplainId(complainId);

      const response = await axios.delete(
        `${API_URL}/${id}/complains/${complainId}`,
        {
          headers: {
            token: token,
          },
        },
      );

      alert(response.data.msg || "Complaint deleted successfully!");

      await fetchEquipment();
    } catch (error) {
      console.error("Error deleting complaint:", error);

      alert(error.response?.data?.msg || "Failed to delete complaint.");
    } finally {
      setDeletingComplainId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <h5 className="text-secondary">Loading equipment details...</h5>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !equipment) {
    return (
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <h3 className="text-danger mb-3">{error || "Equipment not found"}</h3>

        <button onClick={() => navigate("/")} className="btn btn-primary px-4">
          Go Home
        </button>
      </div>
    );
  }

  const images = equipment.images || [];
  const owner = equipment.owner || {};

  const rating = Math.min(5, Math.max(0, Number(equipment.rating) || 0));

  return (
    <div className="container py-4 py-md-5">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-primary mb-4"
      >
        ← Back
      </button>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Main Equipment Section */}
        <div className="card-body p-3 p-md-4 p-lg-5">
          <div className="row g-4 g-lg-5">
            {/* Equipment Images */}
            <div className="col-12 col-lg-6">
              <div
                className="bg-light rounded-4 overflow-hidden"
                style={{ height: "400px" }}
              >
                {images.length > 0 ? (
                  <img
                    src={getImageUrl(images[activeImage])}
                    alt={equipment.name}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="h-100 d-flex justify-content-center align-items-center text-secondary">
                    <div className="text-center">
                      <div style={{ fontSize: "50px" }}>📷</div>
                      <p className="mb-0">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-3 mt-3 overflow-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image._id || index}
                      onClick={() => setActiveImage(index)}
                      className={`btn p-0 flex-shrink-0 rounded-3 overflow-hidden ${
                        activeImage === index
                          ? "border border-3 border-success"
                          : "border border-2 border-light"
                      }`}
                      style={{
                        width: "85px",
                        height: "75px",
                      }}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`Equipment ${index + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Equipment Information */}
            <div className="col-12 col-lg-6">
              {/* Heading and Price */}
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                    {equipment.catergory}
                  </span>

                  <h1 className="fw-bold text-dark mt-3 mb-2">
                    {equipment.name}
                  </h1>

                  <p className="text-secondary mb-0">
                    Brand: {equipment.brand}
                  </p>
                </div>

                <div className="text-lg-end">
                  <h3 className="fw-bold text-success mb-0">
                    ₹{equipment.price}
                  </h3>

                  <small className="text-secondary">Per day</small>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4 d-flex align-items-center gap-2">
                <span
                  className="text-warning fs-4"
                  style={{ letterSpacing: "2px" }}
                >
                  {"★".repeat(Math.floor(rating))}
                  {"☆".repeat(5 - Math.floor(rating))}
                </span>

                <span className="text-secondary">{rating}/5</span>
              </div>

              <hr className="my-4" />

              {/* Description */}
              <h5 className="fw-bold text-dark">Description</h5>

              <p
                className="text-secondary mt-2"
                style={{
                  lineHeight: "1.8",
                  whiteSpace: "pre-line",
                }}
              >
                {equipment.description || "No description available."}
              </p>

              <hr className="my-4" />

              {/* Location */}
              <h5 className="fw-bold text-dark">Equipment Location</h5>

              <p className="text-secondary mt-2 mb-2">
                📍 {equipment.location?.address || "Location not provided"}
              </p>

              {equipment.location?.coordinates?.length === 2 && (
                <p className="small text-muted mb-0">
                  Longitude: {equipment.location.coordinates[0]}, Latitude:{" "}
                  {equipment.location.coordinates[1]}
                </p>
              )}

              <hr className="my-4" />

              {/* Owner Information */}
              <h5 className="fw-bold text-dark">Equipment Owner</h5>

              <div className="bg-light rounded-3 p-3 mt-3">
                <p className="mb-2 text-dark">
                  <strong>Name:</strong>{" "}
                  {owner.name || owner.username || "Owner name unavailable"}
                </p>

                <p className="mb-0 text-dark">
                  <strong>Phone:</strong>{" "}
                  {owner.phone_no ||
                    equipment.phone_no ||
                    "Phone number unavailable"}
                </p>

                <p className="mb-0 text-dark">
                  <strong>Email:</strong>{" "}
                  {owner.email ||
                    equipment.email ||
                    "email address unavailable"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-2 mt-4">
                {/* Book Button */}
                <button
                  onClick={() => navigate(`/book-equipment/${equipment._id}`)}
                  className="btn btn-success flex-grow-1 py-2 fw-semibold"
                >
                  Book Equipment
                </button>

                {/* Owner Actions */}
                {isOwner && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/edit-equipment/${equipment._id}`)
                      }
                      className="btn btn-primary flex-grow-1 py-2 fw-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="btn btn-danger flex-grow-1 py-2 fw-semibold"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-body p-4">
            {/* Heading and Give Review Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Customer Reviews</h4>

              <button
                type="button"
                className="btn btn-dark px-4"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Close" : "Give Review"}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="card border rounded-3 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3">Write Your Review</h5>

                  <form onSubmit={handleSubmitReview}>
                    {/* Rating */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Rating</label>

                      <select
                        className="form-select"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(e.target.value)}
                        required
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </select>
                    </div>

                    {/* Comment */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Your Comment
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Share your experience with this equipment..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      disabled={reviewLoading}
                    >
                      {reviewLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Reviews List */}
            {equipment.reviews && equipment.reviews.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {equipment.reviews.map((review) => {
                  // Current logged-in user ID
                  const currentUserId = user?._id || user?.userId || user?.id;

                  // Review author's ID
                  const reviewOwnerId =
                    review.author?._id ||
                    review.author?.userId ||
                    review.author;

                  // Check whether current user owns this review
                  const isReviewOwner =
                    currentUserId &&
                    reviewOwnerId &&
                    String(currentUserId) === String(reviewOwnerId);

                  return (
                    <div key={review._id} className="border rounded-3 p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        {/* Reviewer Details */}
                        <div>
                          <h6 className="fw-bold mb-1">
                            {review.author?.name ||
                              review.author?.username ||
                              "Anonymous"}
                          </h6>

                          <div className="text-warning mb-2">
                            {"★".repeat(review.rating)}
                            <span className="text-secondary">
                              {"☆".repeat(5 - review.rating)}
                            </span>
                          </div>
                        </div>

                        {/* Date and Delete Button */}
                        <div className="text-end">
                          <small className="text-muted d-block mb-2">
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString()
                              : ""}
                          </small>

                          {/* Delete button only for review owner */}
                          {isReviewOwner && (
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteReview(review._id)}
                              disabled={deletingReviewId === review._id}
                            >
                              {deletingReviewId === review._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Review Comment */}
                      <p className="text-secondary mb-0">{review.comment}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted text-center py-4 mb-0">
                No reviews yet. Be the first to review this equipment!
              </p>
            )}
          </div>
        </div>
        {/* Complaints Section */}
        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-body p-4">
            {/* Heading and Report Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Complaints</h4>

              <button
                type="button"
                className="btn btn-dark px-4"
                onClick={() => setShowComplainForm(!showComplainForm)}
              >
                {showComplainForm ? "Close" : "Report an Issue"}
              </button>
            </div>

            {/* Complaint Form */}
            {showComplainForm && (
              <div className="card border rounded-3 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-semibold mb-3">Report an Issue</h5>

                  <form onSubmit={handleSubmitComplain}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Describe Your Issue
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Explain the issue you are facing with this equipment..."
                        value={complainMessage}
                        onChange={(e) => setComplainMessage(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      disabled={complainLoading}
                    >
                      {complainLoading ? "Submitting..." : "Submit Complaint"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Complaints List */}
            {equipment.complains && equipment.complains.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {equipment.complains.map((complain) => {
                  const currentUserId = user?._id || user?.userId || user?.id;

                  const complainOwnerId =
                    complain.author?._id ||
                    complain.author?.userId ||
                    complain.author;

                  const isComplaintOwner =
                    currentUserId &&
                    complainOwnerId &&
                    String(currentUserId) === String(complainOwnerId);

                  return (
                    <div key={complain._id} className="border rounded-3 p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-1">
                            {complain.author?.name ||
                              complain.author?.username ||
                              "Anonymous"}
                          </h6>

                          <small className="text-muted">
                            {complain.time
                              ? new Date(complain.time).toLocaleString()
                              : ""}
                          </small>
                        </div>

                        {/* Delete button only for complaint owner */}
                        {isComplaintOwner && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteComplain(complain._id)}
                            disabled={deletingComplainId === complain._id}
                          >
                            {deletingComplainId === complain._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        )}
                      </div>

                      <p className="text-secondary mt-3 mb-0">
                        {complain.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted text-center py-4 mb-0">
                No complaints have been reported for this equipment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
