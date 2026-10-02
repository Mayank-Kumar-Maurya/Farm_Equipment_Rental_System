import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ServerContext from "../../Context/ServerContext.js";

const API_URL = "http://localhost:8080";

const MyProfile = () => {
  const { token } = useContext(ServerContext);

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    phone_no: "",
  });

  const [originalProfile, setOriginalProfile] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/user/viewMyProfile`,
        {
          headers: {
            token: token,
          },
        }
      );

      const userData = {
        name: response.data.name || "",
        username: response.data.username || "",
        email: response.data.email || "",
        phone_no: response.data.phone_no || "",
      };

      setProfile(userData);
      setOriginalProfile(userData);
    } catch (err) {
      console.error("Error fetching profile:", err);

      setError(
        err.response?.data?.msg || "Unable to fetch profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError("Please login to view your profile.");
    }
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enable editing
  const handleEdit = () => {
    setOriginalProfile({ ...profile });
    setEditMode(true);
    setSuccess("");
    setError("");
  };

  // Cancel editing
  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setError("");
    setSuccess("");
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name.trim() || !profile.email.trim() || !profile.phone_no) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(String(profile.phone_no))) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await axios.put(
        `${API_URL}/user/viewMyProfile`,
        {
          name: profile.name.trim(),
          email: profile.email.trim(),
          phone_no: Number(profile.phone_no),
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setSuccess(
        response.data.msg || "Profile updated successfully!"
      );

      setEditMode(false);
      await fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);

      setError(
        err.response?.data?.msg || "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-success"
          role="status"
        />
        <p className="mt-2 text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "85vh",
        backgroundColor: "#f1f4f3",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">

            {/* Page Heading */}
            <h3 className="fw-bold mb-4">
              User Profile
            </h3>

            {/* Profile Card */}
            <div
              className="card border-0 shadow-sm rounded-3"
            >
              <div className="card-body p-4">

                {/* Profile Avatar */}
                <div className="text-center mb-4">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#512DA8",
                      color: "#fff",
                      fontSize: "38px",
                      fontWeight: 400,
                    }}
                  >
                    {profile.name
                      ? profile.name.charAt(0).toUpperCase()
                      : "M"}
                  </div>

                  <h5 className="fw-bold mt-2 mb-1">
                    {profile.name}
                  </h5>

                  <small className="text-muted">
                    @{profile.username}
                  </small>
                </div>

                {/* Success Message */}
                {success && (
                  <div className="alert alert-success py-2">
                    {success}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                {/* Profile Form */}
                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Username
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={profile.username}
                      disabled
                    />

                    <small className="text-muted">
                      Username cannot be changed.
                    </small>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      name="phone_no"
                      value={profile.phone_no}
                      onChange={handleChange}
                      disabled={!editMode}
                      maxLength="10"
                      required
                    />
                  </div>

                  {/* Buttons */}
                  {!editMode ? (
                    <button
                      type="button"
                      className="btn btn-warning px-4 fw-semibold"
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-success px-4 fw-semibold"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={handleCancel}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
