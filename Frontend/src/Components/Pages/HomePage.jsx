import React, { useEffect, useState } from "react";
import axios from "axios";

import Slider from "../Slider";
import Card from "../Card";

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

const features = [
  {
    icon: "🚜",
    title: "Wide Range",
    desc: "Access 100+ farm equipment types for every need.",
  },
  {
    icon: "💰",
    title: "Affordable Rates",
    desc: "Rent by day, week, or season at competitive prices.",
  },
  {
    icon: "📍",
    title: "Local Pickup",
    desc: "Find equipment available near your location.",
  },
  {
    icon: "🔧",
    title: "Well Maintained",
    desc: "All equipment is serviced and ready to use.",
  },
];

function HomePage() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch all equipment from backend
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:8080/showAllEquipments",
      );

      console.log("Equipment response:", response.data);

      if (response.data.Equipments) {
        setEquipments(response.data.Equipments);
      } else {
        setEquipments([]);
      }
    } catch (error) {
      console.error("Error fetching equipment:", error.response?.data || error);

      setError(error.response?.data?.msg || "Unable to load equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  // Filter equipment by category
  const filteredEquipments =
    selectedCategory === "All"
      ? equipments
      : equipments.filter(
          (equipment) =>
            equipment.catergory?.toLowerCase() ===
            selectedCategory.toLowerCase(),
        );

  return (
    <>
      {/* HERO SLIDER */}
      <Slider />

      {/* WELCOME BANNER */}
      <div className="text-center py-4 px-3" style={{ background: "#f4f9f0" }}>
        <h2 style={{ color: "#2e7d32" }}>Welcome to FERS</h2>

        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Farm Equipment Rental System — rent the right tools for your farm,
          when you need them.
        </p>

        <a href="#equipment" className="btn btn-success mt-2">
          Browse Equipment
        </a>
      </div>

      {/* FEATURES */}
      <div className="container py-4">
        <div className="row g-3">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 text-center p-3 border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div style={{ fontSize: "2rem" }}>{feature.icon}</div>

                <h6 className="mt-2">{feature.title}</h6>

                <p className="text-muted small mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="container py-3">
        <h5 className="mb-3">Browse by Category</h5>

        <div className="d-flex flex-wrap gap-2">
          <button
            className={`btn btn-sm ${
              selectedCategory === "All" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-sm ${
                selectedCategory === category
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* EQUIPMENT LISTING */}
      <div
        id="equipment"
        className="container-fluid py-4"
        style={{ background: "#fafafa" }}
      >
        <h5 className="text-center mb-4">Available Equipment</h5>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-muted mt-2">Loading equipment...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-4">
            <p className="text-danger">{error}</p>

            <button
              className="btn btn-outline-success"
              onClick={fetchEquipments}
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Equipment */}
        {!loading && !error && filteredEquipments.length === 0 && (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem" }}>🚜</div>

            <h6 className="mt-3">No equipment available</h6>

            <p className="text-muted">
              Equipment added by owners will appear here.
            </p>
          </div>
        )}

        {/* Equipment Cards */}
        {!loading && !error && filteredEquipments.length > 0 && (
          <div className="row m-0">
            {filteredEquipments.map((equipment) => (
              <Card key={equipment._id} equipment={equipment} />
            ))}
          </div>
        )}
      </div>

      {/* CTA BANNER */}
      <div
        className="text-center py-5"
        style={{
          background: "#2e7d32",
          color: "#fff",
        }}
      >
        <h4>Own farm equipment? List it for rent!</h4>

        <p className="mb-3">
          Earn extra income by renting out your idle machinery.
        </p>

        <a href="/addEquipments" className="btn btn-light">
          List Your Equipment
        </a>
      </div>
    </>
  );
}

export default HomePage;
