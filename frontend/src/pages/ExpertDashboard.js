import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ExpertDashboard.css";

export default function ExpertDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH PENDING ================= */
  const fetchPendingRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/doctor-records/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  /* ================= APPROVE ================= */
  const approveRequest = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/doctor-records/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Approved successfully");

      // remove from UI instantly
      setRequests((prev) => prev.filter((req) => req.id !== id));

    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  /* ================= REJECT ================= */
  const rejectRequest = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/doctor-records/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Rejected successfully");

      setRequests((prev) => prev.filter((req) => req.id !== id));

    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  /* ================= LOAD ONCE ================= */
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div className="expert-dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <div className="expert-sidebar">
        <h2>Expert Doctor</h2>

        <button onClick={fetchPendingRequests}>
          Refresh Requests
        </button>

        <button
          className="expert-logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="expert-main-content">
        <div className="expert-card">
          <h3>Pending Record Modification Requests</h3>

          {loading && <p>Loading...</p>}

          {!loading && requests.length === 0 && (
            <p>No pending requests</p>
          )}

          {!loading && requests.length > 0 && (
            <div className="expert-request-list">
              {requests.map((req) => (
                <div key={req.id} className="expert-request-item">

                  <p><strong>Patient ID:</strong> {req.patient_id}</p>
                  <p><strong>Requested By Doctor:</strong> {req.doctor_name}</p>
                  <p><strong>Record Type:</strong> {req.record_type}</p>

                  <hr />

                  <p>
                    <strong>Current Title:</strong> {req.current_title}
                  </p>
                  <p>
                    <strong>Requested Title:</strong> {req.new_title}
                  </p>

                  {req.current_description && (
                    <p>
                      <strong>Current Description:</strong> {req.current_description}
                    </p>
                  )}

                  {req.new_description && (
                    <p>
                      <strong>Requested Description:</strong> {req.new_description}
                    </p>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    <button
                      className="approve-btn"
                      onClick={() => approveRequest(req.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => rejectRequest(req.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Reject
                    </button>
                  </div>

                  <hr />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}