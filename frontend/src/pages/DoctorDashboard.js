import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DoctorDashboard.css";

export default function DoctorDashboard() {
  const [view, setView] = useState("home");
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [patientIdInput, setPatientIdInput] = useState("");
  const [requestStatus, setRequestStatus] = useState([]);
  const [doctorRecords, setDoctorRecords] = useState([]);
  const [patientIdInput2, setPatientIdInput2] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadType, setUploadType] = useState("prescription");
  const [uploadFile, setUploadFile] = useState(null);
const [selectedPatientId, setSelectedPatientId] = useState(null);
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  /* ================= SEND ACCESS REQUEST ================= */
  const sendRequest = async () => {
    if (!patientIdInput) {
      alert("Enter patient ID");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/permissions/request/${patientIdInput}`,
        { doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      setPatientIdInput("");
    } catch {
      alert("Request failed");
    }
  };

  /* ================= FETCH REQUEST STATUS ================= */
 const fetchRequestStatus = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/permissions/doctor/${doctorId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setRequestStatus(res.data);
  } catch {
    alert("Failed to load request status");
  }
};

  /* ================= FETCH APPROVED PATIENTS ================= */
 const fetchApprovedPatients = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/permissions/approved/${doctorId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setApprovedPatients(res.data);
  } catch {
    alert("Failed to load approved patients");
  }
};

  /* ================= FETCH PATIENT RECORDS ================= */
  const fetchPatientRecords = async (patientId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/doctor-records/patient-records/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setDoctorRecords(res.data);

  } catch (err) {
    console.error("Load error:", err.response?.data || err.message);
    alert("Failed to load records");
  }
};
const fetchDoctorRecords = async () => {
  if (!patientIdInput2) {
    alert("Enter patient ID");
    return;
  }

try {
  const res = await axios.get(
    `http://localhost:5000/api/doctor-records/patient-records/${patientIdInput2}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setDoctorRecords(res.data);

} catch (err) {
  console.error(err);
  alert("Failed to load records");
}
};
const uploadDoctorRecord = async () => {
  if (!patientIdInput2 || !uploadTitle) {
    alert("Fill required fields");
    return;
  }

  const formData = new FormData();
  formData.append("patient_id", patientIdInput2);
  formData.append("record_type", uploadType);
  formData.append("title", uploadTitle);
  formData.append("description", uploadDesc);
  if (uploadFile) formData.append("file", uploadFile);

  try {
    await axios.post(
      "http://localhost:5000/api/doctor-records/upload",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Record uploaded");
    fetchDoctorRecords();
  } catch {
    alert("Upload failed");
  }
};
const requestModification = async (recordId, newTitle, newDesc) => {
  if (!newTitle) {
    alert("Enter new title");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/doctor-records/request-modification",
      {
        record_id: recordId,
        new_title: newTitle,
        new_description: newDesc
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Modification request sent");
  } catch {
    alert("Request failed");
  }
};

  /* ================= REQUEST TITLE CHANGE ================= */
  const requestTitleChange = async (recordId, newTitle) => {
    if (!newTitle) {
      alert("Enter new title");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/record-approval/request-change",
        { recordId, newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Change request sent to expert doctor");
    } catch {
      alert("Failed to send change request");
    }
  };

  /* ================= AUTO LOAD ================= */
  useEffect(() => {
    if (view === "approved") fetchApprovedPatients();
    if (view === "status") fetchRequestStatus();
  }, [view]);

  return (
    <div className="doctor-layout">

      {/* ================= SIDEBAR ================= */}
      <div className="doctor-sidebar">
        <h2>Doctor</h2>

        <button onClick={() => setView("home")}>Home</button>
        <button onClick={() => setView("request")}>Send Request</button>
        <button onClick={() => setView("status")}>My Request Status</button>
        <button onClick={() => setView("approved")}>
          Approved Patients
        </button>
        <button onClick={() => setView("doctorRecords")}>
  Doctor Records
</button>

        <button
          className="doctor-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="doctor-content">

        {view === "home" && (
          <div className="doctor-card">
            <h3>Welcome Doctor 👨‍⚕️</h3>
            <p>Access patient records securely.</p>
          </div>
        )}

        {view === "request" && (
          <div className="doctor-card">
            <h3>Send Access Request</h3>

            <input
              type="number"
              placeholder="Enter Patient ID"
              value={patientIdInput}
              onChange={(e) => setPatientIdInput(e.target.value)}
            />

            <button onClick={sendRequest}>
              Send Request
            </button>
          </div>
        )}

        {view === "status" && (
          <div className="doctor-card">
            <h3>My Request Status</h3>

            {requestStatus.length === 0 ? (
              <p>No requests found</p>
            ) : (
              <ul className="doctor-list">
                {requestStatus.map((req, index) => (
                  <li key={index}>
                    <strong>Patient ID:</strong> {req.patient_id}
                    <br />
                    <strong>Status:</strong> {req.status}
                    <br />
                    <strong>Requested At:</strong> {req.created_at}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {view === "doctorRecords" && (
  <div className="doctor-card">

    <h3>Doctor Records Management</h3>

    <input
      type="number"
      placeholder="Enter Patient ID"
      value={patientIdInput2}
      onChange={(e) => setPatientIdInput2(e.target.value)}
    />

    <button onClick={fetchDoctorRecords}>
      Load Records
    </button>

    <hr />

    <h4>Upload New Record</h4>

    <select
      value={uploadType}
      onChange={(e) => setUploadType(e.target.value)}
    >
      <option value="prescription">Prescription</option>
      <option value="scan">Scan</option>
      <option value="diagnosis">Diagnosis</option>
    </select>

    <input
      type="text"
      placeholder="Title"
      value={uploadTitle}
      onChange={(e) => setUploadTitle(e.target.value)}
    />

    <input
      type="text"
      placeholder="Description"
      value={uploadDesc}
      onChange={(e) => setUploadDesc(e.target.value)}
    />

    <input
      type="file"
      onChange={(e) => setUploadFile(e.target.files[0])}
    />

    <button onClick={uploadDoctorRecord}>
      Upload
    </button>

    <hr />

    <h4>Existing Records</h4>

    {doctorRecords.map((r) => (
      <div key={r.id} style={{ marginBottom: "15px" }}>
        <strong>{r.title}</strong>
        <br />
        <small>{r.description}</small>
        <br />
        <a
          href={`http://localhost:5000/uploads/${r.file_path}`}
          target="_blank"
          rel="noreferrer"
        >
          View File
        </a>

        <br />

        <input
          type="text"
          placeholder="New title"
          onChange={(e) => (r.newTitle = e.target.value)}
        />

        <input
          type="text"
          placeholder="New description"
          onChange={(e) => (r.newDesc = e.target.value)}
        />

        <button
          onClick={() =>
            requestModification(r.id, r.newTitle, r.newDesc)
          }
        >
          Request Modification
        </button>
      </div>
    ))}

  </div>
)}

        {view === "approved" && (
          <div className="doctor-card">
            <h3>Approved Patients</h3>

            {approvedPatients.length === 0 ? (
              <p>No approved patients</p>
            ) : (
              approvedPatients.map((p, index) => (
                <div key={index} className="doctor-approved-block">

                  <div className="approved-row">
                    <div className="approved-info">
                      <p><strong>Patient ID:</strong> {p.patient_id}</p>
                      <p><strong>Granted At:</strong> {p.granted_at}</p>
                    </div>

                    <button
                      className="view-records-btn"
                      onClick={() => {
  setSelectedPatientId(p.patient_id);
  fetchPatientRecords(p.patient_id);
}}
                    >
                      View Records
                    </button>
                  </div>
{selectedPatientId === p.patient_id && (
  <ul className="doctor-list">
    {doctorRecords.length === 0 ? (
      <li>No records found</li>
    ) : (
      doctorRecords.map((r) => (
        <li key={r.id}>
          <strong>{r.title}</strong>
          <br />

          <a
            href={`http://localhost:5000/uploads/${r.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View File
          </a>

          
        </li>
      ))
    )}
  </ul>
)}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}