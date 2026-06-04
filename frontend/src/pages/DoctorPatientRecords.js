import React, { useState } from "react";
import axios from "axios";

export default function DoctorPatientRecords({ records }) {
  const [newTitles, setNewTitles] = useState({});

  const token = localStorage.getItem("token");

  const handleChangeRequest = async (recordId) => {
    const newTitle = newTitles[recordId];

    if (!newTitle) {
      alert("Enter new title");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/record-approval/request-change",
        { recordId, newTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Change request sent to expert doctor");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  return (
    <div className="doctor-card">
      <h3>Patient Records</h3>

      {records.length === 0 ? (
        <p>No records</p>
      ) : (
        <ul>
          {records.map((r) => (
            <li key={r.id}>
              <strong>{r.title}</strong>
              <br />
              <a
                href={`http://localhost:5000/uploads/${r.file_path}`}
                target="_blank"
                rel="noreferrer"
              >
                View File
              </a>

              <br /><br />

              <input
                type="text"
                placeholder="Enter new title"
                onChange={(e) =>
                  setNewTitles({
                    ...newTitles,
                    [r.id]: e.target.value,
                  })
                }
              />

              <button
                onClick={() => handleChangeRequest(r.id)}
                style={{ marginLeft: "10px" }}
              >
                Request Change
              </button>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
