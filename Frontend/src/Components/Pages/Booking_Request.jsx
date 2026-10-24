import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";
import { showFlashMessage } from "./FlashMessage.jsx";

const API_URL = "http://localhost:8080";
const BOOKING_API = API_URL;

const Booking_Request = () => {
  const { token } = useContext(ServerContext);
  const navigate = useNavigate();

  const [equipmentList, setEquipmentList] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");

  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch incoming requests and bookings made by the logged-in user
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const [incomingResponse, myBookingsResponse] = await Promise.all([
        axios.get(`${BOOKING_API}/listedAppointments`, {
          headers: { token },
        }),
        axios.get(`${BOOKING_API}/viewMyBooking`, {
          headers: { token },
        }),
      ]);

      setEquipmentList(incomingResponse.data.myEquipmentsWithBookings || []);

      setMyBookings(myBookingsResponse.data.myBookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);

      setError(
        err.response?.data?.msg || "Unable to load booking information.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Please log in to view booking information.");
      return;
    }

    fetchRequests();
  }, [token]);

  // Combine equipment information with its incoming bookings
  const allBookings = equipmentList.flatMap((equipment) =>
    (equipment.bookings || []).map((booking) => ({
      ...booking,
      equipmentName: equipment.name,
      equipmentId: equipment._id,
    })),
  );

  // Approve a customer's booking request
  const handleApprove = async (bookingId) => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setApprovingId(bookingId);
      setError("");

      await axios.post(
        `${BOOKING_API}/${bookingId}/approve`,
        {},
        {
          headers: { token },
        },
      );

      showFlashMessage("success", "Booking approved successfully.");

      await fetchRequests();
    } catch (err) {
      console.error("Error approving booking:", err);

      setError(err.response?.data?.msg || "Unable to approve this booking.");

      showFlashMessage(
        "error",
        err.response?.data?.msg || "Unable to approve this booking.",
      );
    } finally {
      setApprovingId(null);
    }
  };

  // reject booking request
  const handleReject = async (bookingId) => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setApprovingId(bookingId);
      setError("");

      await axios.post(
        `${BOOKING_API}/${bookingId}/reject`,
        {},
        {
          headers: { token },
        },
      );

      showFlashMessage("success", "Booking marked as not approved.");

      await fetchRequests();
    } catch (err) {
      console.error("Error rejecting booking:", err);

      const message =
        err.response?.data?.msg || "Unable to reject this booking.";

      setError(message);
      showFlashMessage("error", message);
    } finally {
      setApprovingId(null);
    }
  };

  // Format booking date
  const formatDate = (date) => {
    if (!date) return "Not provided";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Booking status labels
  const getStatus = (status) => {
    switch (Number(status)) {
      case -1:
        return {
          label: "Pending",
          className: "bg-warning text-dark",
        };

      case 0:
        return {
          label: "Approved",
          className: "bg-success",
        };

      case 1:
        return {
          label: "Payment Completed",
          className: "bg-primary",
        };

      case 2:
        return {
          label: "Not Approved",
          className: "bg-danger",
        };

      default:
        return {
          label: "Unknown",
          className: "bg-secondary",
        };
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status" />
        <p className="text-muted mt-2">Loading booking information...</p>
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
        {/* Page heading */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Booking Management</h2>

            <p className="text-muted mb-0">
              Manage equipment requests and track your bookings.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Section selector */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`btn ${
              activeTab === "incoming" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("incoming")}
          >
            Incoming Requests ({allBookings.length})
          </button>

          <button
            type="button"
            className={`btn ${
              activeTab === "mine" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("mine")}
          >
            My Booking Status ({myBookings.length})
          </button>
        </div>

        {/* SECTION 1: Requests for equipment owned by this user */}
        {activeTab === "incoming" && (
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="fw-bold mb-1">Incoming Booking Requests</h5>

              <p className="text-muted mb-4">
                Review requests from customers who want to rent your equipment.
              </p>

              {allBookings.length === 0 ? (
                <div className="text-center py-5">
                  <div className="fs-1 mb-2">📅</div>

                  <h6 className="fw-bold">No Booking Requests Yet</h6>

                  <p className="text-muted mb-0">
                    Requests for your equipment will appear here.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Equipment</th>
                        <th>Customer</th>
                        <th>Booking Date</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allBookings.map((booking) => {
                        const status = getStatus(booking.booking_status);

                        const customer = booking.who_booked;

                        return (
                          <tr key={booking._id}>
                            <td className="fw-semibold">
                              {booking.equipmentName}
                            </td>

                            <td>
                              <div className="fw-semibold">
                                {customer?.name ||
                                  customer?.username ||
                                  "Customer"}
                              </div>

                              <small className="text-muted">
                                {customer?.email || ""}
                              </small>
                            </td>

                            <td>{formatDate(booking.date)}</td>

                            <td>{booking.location || "Not provided"}</td>

                            <td>
                              <span className={`badge ${status.className}`}>
                                {status.label}
                              </span>
                            </td>

                            <td>
                              {Number(booking.booking_status) === -1 ? (
                                <div className="d-flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    disabled={approvingId === booking._id}
                                    onClick={() => handleApprove(booking._id)}
                                  >
                                    {approvingId === booking._id
                                      ? "Processing..."
                                      : "Approve"}
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    disabled={approvingId === booking._id}
                                    onClick={() => handleReject(booking._id)}
                                  >
                                    {approvingId === booking._id
                                      ? "Processing..."
                                      : "Not Approved"}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-muted small">
                                  No action needed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2: Bookings made by this user */}
        {activeTab === "mine" && (
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="fw-bold mb-1">My Booking Status</h5>

              <p className="text-muted mb-4">
                Track requests you have submitted to other equipment owners.
              </p>

              {myBookings.length === 0 ? (
                <div className="text-center py-5">
                  <div className="fs-1 mb-2">📋</div>

                  <h6 className="fw-bold">No Bookings Found</h6>

                  <p className="text-muted mb-0">
                    Equipment you request to rent will appear here.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Equipment</th>
                        <th>Booking Date</th>
                        <th>Location</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {myBookings.map((booking) => {
                        const status = getStatus(booking.booking_status);

                        return (
                          <tr key={booking._id}>
                            <td className="fw-semibold">
                              {booking.equipment?.name || "Equipment"}
                            </td>

                            <td>{formatDate(booking.date)}</td>

                            <td>{booking.location || "Not provided"}</td>

                            <td>
                              <span className={`badge ${status.className}`}>
                                {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking_Request;
