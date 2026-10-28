import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";

const AllIssues = () => {
  const { server, token } = useContext(ServerContext);
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await server.get("/contact/getIssues", {
          headers: { token },
        });

        setIssues(response.data.all_issues || []);
      } catch (err) {
        const status = err.response?.status;

        if (status === 401 || status === 403) {
          setError(
            "Access denied. Only the app administrator can view issues.",
          );
        } else {
          setError(
            err.response?.data?.msg ||
              "Unable to load issues. Please try again.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      setError("Please log in as the app administrator.");
      setLoading(false);
      return;
    }

    fetchIssues();
  }, [server, token]);

  return (
    <div className="container py-5" style={{ minHeight: "75vh" }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#1b5e20" }}>
            All Issues
          </h2>
          <p className="text-muted mb-0">
            Review issues and messages submitted by users.
          </p>
        </div>

        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-3 text-muted">Loading issues...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && issues.length === 0 && (
        <div className="text-center bg-light rounded-4 p-5">
          <div style={{ fontSize: "3rem" }}>📭</div>
          <h4 className="mt-3">No Issues Yet</h4>
          <p className="text-muted mb-0">
            User-submitted issues will appear here.
          </p>
        </div>
      )}

      {!loading && !error && issues.length > 0 && (
        <div className="row g-4">
          {issues.map((issue) => (
            <div className="col-12 col-lg-6" key={issue._id}>
              <div
                className="card h-100 border-0 rounded-4"
                style={{
                  boxShadow: "0 5px 22px rgba(0,0,0,0.08)",
                  borderTop: "4px solid #2e7d32",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 48,
                        height: 48,
                        background: "#e8f5e9",
                        color: "#1b5e20",
                        fontSize: 22,
                      }}
                    >
                      ✉️
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">{issue.subject}</h5>
                      <span className="badge text-bg-success">User Issue</span>
                    </div>
                  </div>

                  <div
                    className="rounded-3 p-3 mb-3"
                    style={{ background: "#f6faf6" }}
                  >
                    <p
                      className="mb-0"
                      style={{
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                        lineHeight: 1.7,
                      }}
                    >
                      {issue.message}
                    </p>
                  </div>

                  <hr />

                  <h6 className="fw-bold mb-3">Sender Information</h6>

                  <p className="mb-2">
                    <strong>👤 Name:</strong> {issue.full_name}
                  </p>

                  <p className="mb-2">
                    <strong>📧 Email:</strong>{" "}
                    <a href={`mailto:${issue.email}`} className="text-success">
                      {issue.email}
                    </a>
                  </p>

                  <p className="mb-0">
                    <strong>📞 Phone:</strong>{" "}
                    {issue.phone_no || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
