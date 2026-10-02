import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/search`, {
          params: { search },
        });

        setEquipments(response.data.Equipments || []);
      } catch (err) {
        console.error("Search error:", err);

        setError(err.response?.data?.msg || "Unable to fetch equipment.");
      } finally {
        setLoading(false);
      }
    };

    if (search.trim()) {
      fetchSearchResults();
    } else {
      setEquipments([]);
      setLoading(false);
    }
  }, [search]);

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
        <p className="mt-3">Searching equipment...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          {/* Back to Home Button - Left Side */}
          <button
            className="btn btn-outline-success mb-3"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

          {/* Search Results Heading */}
          <h2 className="fw-bold">Search Results</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!error && equipments.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No Equipment Found</h4>

          <p className="text-muted">
            Try searching with another name, brand or category.
          </p>

          <button className="btn btn-success" onClick={() => navigate("/")}>
            Explore Equipment
          </button>
        </div>
      )}

      <div className="row g-4">
        {equipments.map((equipment) => (
          <div className="col-lg-4 col-md-6" key={equipment._id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={
                  getImageUrl(equipment.images?.[0]?.url) || "/placeholder.png"
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

                <p className="text-muted mb-2">Brand: {equipment.brand}</p>

                <span className="badge bg-success mb-3">
                  {equipment.catergory}
                </span>

                <p className="mb-2">
                  <strong>₹{equipment.price}</strong>
                  <span className="text-muted"> / day</span>
                </p>

                <p className="text-muted small">
                  {equipment.description?.length > 90
                    ? equipment.description.slice(0, 90) + "..."
                    : equipment.description}
                </p>

                <button
                  className="btn btn-success w-100"
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

export default SearchResults;
