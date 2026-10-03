import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";

const API_URL = "http://localhost:8080";

function MyEquipment() {
  const { token } = useContext(ServerContext);
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyEquipments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/showMyEquipments`, {
        headers: {
          token: token,
        },
      });

      setEquipments(response.data.Equipments || []);
    } catch (error) {
      console.error("Error fetching my equipment:", error);

      setError(error.response?.data?.msg || "Unable to load your equipment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyEquipments();
    } else {
      setLoading(false);
      setError("Please login to view your equipment.");
    }
  }, [token]);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" />
        <p className="mt-3">Loading your equipment...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-success mb-1">My Equipment</h2>
          <p className="text-muted mb-0">
            Manage the equipment you have added.
          </p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => navigate("/addEquipments")}
        >
          + Add Equipment
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!error && equipments.length === 0 && (
        <div className="text-center py-5 bg-light rounded-4">
          <h5 className="text-muted">You have not added any equipment yet.</h5>

          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/addEquipments")}
          >
            Add Your First Equipment
          </button>
        </div>
      )}

      <div className="row g-4">
        {equipments.map((equipment) => (
          <div className="col-lg-4 col-md-6" key={equipment._id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img
                src={
                  equipment.images?.length > 0
                    ? getImageUrl(equipment.images[0].url)
                    : "https://placehold.co/600x400?text=No+Image"
                }
                className="card-img-top"
                alt={equipment.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5 className="card-title fw-bold">{equipment.name}</h5>

                <p className="text-muted mb-2">{equipment.brand}</p>

                <span className="badge bg-success mb-3">
                  {equipment.catergory}
                </span>

                <p className="mb-2">
                  <strong>Price:</strong> ₹{equipment.price} / day
                </p>

                <p className="mb-2">
                  <strong>Rating:</strong> ⭐{equipment.rating || "N/A"}
                </p>

                <p className="text-muted small">
                  {equipment.location?.address || "Location not available"}
                </p>

                <button
                  className="btn btn-outline-success w-100 mt-2"
                  onClick={() => navigate(`/product/${equipment._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEquipment;