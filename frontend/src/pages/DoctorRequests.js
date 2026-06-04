import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/doctorRequests.css";

export default function DoctorRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/permissions/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.post(
        `http://localhost:5000/api/permissions/${action}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="requests-page">
      <div className="requests-card">
        <h2>Patient Access Requests</h2>
        <p className="subtitle">Approve or reject patient permissions</p>

        {requests.length === 0 ? (
          <p className="empty-text">No pending requests</p>
        ) : (
          requests.map((req) => (
            <div className="request-item" key={req.id}>
              <div>
                <strong>Patient ID:</strong> {req.patient_id}
              </div>

              <div className="actions">
                <button
                  className="approve"
                  onClick={() => handleAction(req.id, "approve")}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => handleAction(req.id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
