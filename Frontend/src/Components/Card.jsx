import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ equipment }) {
  const navigate = useNavigate();
  const imageUrl =
    equipment.images?.length > 0
      ? equipment.images[0].url
      : "https://placehold.co/400x250?text=No+Image";

  const rating = Math.min(5, Math.max(0, Number(equipment.rating) || 0));

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-2">
      <div
        className="card h-100 shadow-sm border-0"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Equipment Image */}
        <img
          src={imageUrl}
          className="card-img-top"
          alt={equipment.name || "Farm equipment"}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x250?text=No+Image";
          }}
        />

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          {/* Equipment Name */}
          <h5 className="card-title fw-bold" style={{ color: "#2e7d32" }}>
            {equipment.name}
          </h5>

          {/* Brand */}
          <p className="mb-1">
            <strong>Brand:</strong> {equipment.brand}
          </p>

          {/* Category */}
          <p className="mb-1">
            <strong>Category:</strong> {equipment.catergory}
          </p>

          {/* Price */}
          <p className="mb-1">
            <strong>Rent:</strong>{" "}
            <span className="text-success fw-bold">₹{equipment.price}</span>
            <span className="text-muted"> / day</span>
          </p>

          {/* Rating */}
          <p className="mb-2">
            <strong>Rating:</strong>{" "}
            <span>{"⭐".repeat(Math.floor(rating))}</span>
            <span className="text-muted small"> ({rating}/5)</span>
          </p>

          {/* Address */}
          {equipment.location?.address && (
            <p className="small text-muted mb-3">
              <strong>📍 Location:</strong> {equipment.location.address}
            </p>
          )}

          {/* View Details */}
          <button
            className="btn btn-success mt-auto w-100"
            style={{
              borderRadius: "8px",
              backgroundColor: "#2e7d32",
              border: "none",
            }}
            onClick={() => navigate(`/product/${equipment._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
