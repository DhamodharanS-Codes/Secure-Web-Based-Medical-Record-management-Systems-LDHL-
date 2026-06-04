import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/Dashboard.css";
import "../styles/patientDashboard.css";

export default function PatientDashboard() {
  const [loading, setLoading] = useState(false);
  const { t, setLanguage } = useContext(LanguageContext);

  const [view, setView] = useState("home");
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [insuranceSuggestions, setInsuranceSuggestions] = useState([]);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [emergencyLink, setEmergencyLink] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [notRecommended, setNotRecommended] = useState([]);
  const [riskLevel, setRiskLevel] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [doctorRecords, setDoctorRecords] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [editingId, setEditingId] = useState(null);
const [newTitle, setNewTitle] = useState("");
  /* ================= RECORDS ================= */
const fetchRecords = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:5000/api/records/my-records`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRecords(res.data);
  } catch (err) {
    console.error(err);
    alert("Failed to load records");
  } finally {
    setLoading(false);
  }
};
const handleRename = async (id) => {
  if (!newTitle.trim()) return alert("Enter new title");

  try {
    await axios.put(
      `http://localhost:5000/api/records/rename/${id}`,
      { title: newTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditingId(null);
    setNewTitle("");
    fetchRecords();
  } catch (err) {
    alert("Rename failed");
  }
};
const fetchDoctorRecords = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/doctor-records/patient-records/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setDoctorRecords(res.data);
  } catch (err) {
    console.error("Failed to fetch doctor records");
  }
};

  /* ================= DOCTOR REQUESTS ================= */
  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/permissions/pending/${userId}`
      );
      setPendingRequests(res.data);
    } catch {
      alert("Failed to load requests");
    }
  };

  const approveDoctor = async (id) => {
    await axios.post(
      `http://localhost:5000/api/permissions/approve/${id}`
    );
    fetchPendingRequests();
  };

  const rejectDoctor = async (id) => {
    await axios.post(
      `http://localhost:5000/api/permissions/reject/${id}`
    );
    fetchPendingRequests();
  };

  /* ================= INSURANCE ================= */
  const fetchInsuranceSuggestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/insurance-rules/${diagnosisInput}`
      );
      setInsuranceSuggestions(res.data);
    } catch {
      alert("No insurance suggestions");
    }
  };
  const detectCategory = (title) => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("scan") || lowerTitle.includes("mri") || lowerTitle.includes("ct")) {
    return "Scan Report";
  }

  if (lowerTitle.includes("prescription") || lowerTitle.includes("medicine")) {
    return "Prescription";
  }

  if (lowerTitle.includes("blood") || lowerTitle.includes("test") || lowerTitle.includes("lab")) {
    return "Lab Report";
  }

  if (lowerTitle.includes("discharge")) {
    return "Discharge Summary";
  }

  return "Other";
};
const fetchNotifications = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/doctor-records/patient-notifications",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotifications(res.data);
  } catch {
    console.log("Failed to fetch notifications");
  }
};
  /* ================= UPLOAD ================= */
  const handleUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", titleInput);
  formData.append("category", categoryInput);
  formData.append("file", e.target.file.files[0]);

  try {
    await axios.post(
      "http://localhost:5000/api/records/upload",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Upload successful");

    setTitleInput("");
    setCategoryInput("");

    setView("records");
  } catch {
    alert("Upload failed");
  }
};

  // ==============================
// CHECK INSURANCE
// ==============================
const checkInsurance = async () => {
  if (!diagnosis) {
    alert("Enter diagnosis");
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:5000/api/insurance-rules/${diagnosis}`
    );

    setRecommended(res.data.recommended || []);
    setNotRecommended(res.data.notRecommended || []);
    setRiskLevel(res.data.riskLevel || "");
    setAiMessage(res.data.aiMessage || "");

  } catch (err) {
    console.error(err);
    alert("Failed to fetch insurance suggestions");
  }
};


  /* ================= EMERGENCY ================= */
  const generateEmergencyLink = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/emergency/generate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmergencyLink(res.data.url);
    } catch {
      alert("Failed to generate QR");
    }
  };
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/records/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRecords();
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

useEffect(() => {
  if (view === "records") {
    fetchRecords();
  }

  if (view === "doctorReports") {
    fetchDoctorRecords();
  }

  if (view === "requests") fetchPendingRequests();
  if (view === "notifications") fetchNotifications();

}, [view]);
  return (
   <div className="patient-layout">
      <div className="patient-sidebar">
        <h2>Patient</h2>

        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
        </select>

        <button 
  className={view === "home" ? "active-btn" : ""}
  onClick={() => setView("home")}
>
  {t.home}
</button>
        <button 
  className={view === "upload" ? "active-btn" : ""}
  onClick={() => setView("upload")}
>
  {t.upload}
</button>
       <button 
  className={view === "records" ? "active-btn" : ""}
  onClick={() => setView("records")}
>
  {t.records}
</button>
 <button onClick={() => setView("requests")}>
  {t.doctorRequests}
</button>

<button onClick={() => setView("insurance")}>
  {t.insuranceSuggestion}
</button>

<button onClick={() => setView("notifications")}>
  {t.notifications}
</button>
<button onClick={() => setView("doctorReports")}>
  {t.doctorReportsHeading}
</button>

<button onClick={() => setView("emergency")}>
  {t.emergencyQR}
</button>

        <button
          className="patient-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          {t.logout}
        </button>
      </div>

      <div className="patient-content">
        {view !== "home" && (
  <button
    onClick={() => setView("home")}
    style={{
      marginBottom: "15px",
      padding: "6px 12px",
      backgroundColor: "#444",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    ← Back to Home
  </button>
)}
{loading && <div className="loader"></div>}
        {view === "home" && (
  <div className="patient-card">
    <h2>{t.welcome}</h2>
<p>{t.secureMsg}</p>

    <br />

    <p><strong>{t.totalRecords}:</strong> {records.length}</p>
    <p><strong>{t.pendingRequests}:</strong> {pendingRequests.length}</p>
    <p><strong>{t.insuranceMatches}:</strong> {recommended.length}</p>
  </div>
)}
        {view === "upload" && (
  <div className="patient-card">
   <h3>{t.uploadTitle}</h3>

   <form onSubmit={handleUpload}>
  <input
    name="title"
    placeholder="Title"
    value={titleInput}
    onChange={(e) => {
      const value = e.target.value;
      setTitleInput(value);

      const detected = detectCategory(value);
      setCategoryInput(detected);
    }}
    required
  />

  <br /><br />

  <select
  name="category"
  value={categoryInput}
  onChange={(e) => setCategoryInput(e.target.value)}
  required
>
  <option value="">{t.selectCategory}</option>
  <option value="Lab Report">{t.labReport}</option>
  <option value="Prescription">{t.prescription}</option>
  <option value="Scan Report">{t.scanReport}</option>
  <option value="Discharge Summary">{t.dischargeSummary}</option>
  <option value="Other">{t.other}</option>
</select>

  <br /><br />

  <input type="file" name="file" required />

  <br /><br />

 <button type="submit">{t.uploadBtn}</button>
</form>
  </div>
)}

 {/* ================= MY RECORDS PAGE ================= */}
{view === "records" && (
  <div className="patient-card">
    <h3>{t.yourRecords}</h3>

    {/* Search & Date Filter */}
    <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder={t.titlePlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "6px", flex: 1 }}
      />

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        style={{ padding: "6px" }}
      />
    </div>

    {/* ================= PATIENT UPLOADED RECORDS ================= */}
    <div className="records-scroll">
      {records
        .filter((r) => {
          const matchesTitle = r.title
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDate = dateFilter
            ? r.uploaded_at?.startsWith(dateFilter)
            : true;

          return matchesTitle && matchesDate;
        })
        .map((r) => (
          <div key={r.id} className="record-item">

  {editingId === r.id ? (
    <>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ padding: "5px", width: "70%" }}
      />

      <button
        style={{ marginLeft: "5px" }}
        onClick={() => handleRename(r.id)}
      >
        {t.save}
      </button>

      <button
        style={{ marginLeft: "5px" }}
        onClick={() => setEditingId(null)}
      >
        {t.cancel}
      </button>
    </>
  ) : (
    <>
      <strong>{r.title}</strong>
      <br />

      <span style={{ fontSize: "12px", color: "#999" }}>
        {r.category}
      </span>

      <br />

      <a
        href={`http://localhost:5000/uploads/${r.file_path}`}
        target="_blank"
        rel="noreferrer"
      >
        {t.viewFile}
      </a>

      <br />

      <button
        style={{ marginTop: "6px", marginRight: "5px" }}
        onClick={() => {
          setEditingId(r.id);
          setNewTitle(r.title);
        }}
      >
        {t.rename}
      </button>

      <button
        style={{
          marginTop: "6px",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => handleDelete(r.id)}
      >
        {t.delete}
      </button>
    </>
  )}
</div>
        ))}
    </div>
  </div>
)}


{/* ================= DOCTOR REPORTS PAGE ================= */}
{view === "doctorReports" && (
  <div
    className="patient-card"
    style={{
      maxWidth: "900px",
      margin: "0 auto"
    }}
  >
    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
      {t.doctorReportsHeading}
    </h3>

    {doctorRecords.length === 0 ? (
      <p style={{ textAlign: "center", color: "#888" }}>
        No doctor uploaded records
      </p>
    ) : (
      doctorRecords.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            borderLeft: "6px solid #1976d2"
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>
            {r.title}
          </h4>

          <p style={{ fontSize: "14px", color: "#555" }}>
            {r.description}
          </p>

          <p style={{ fontSize: "12px", color: "#777" }}>
            Dr. {r.doctor_name}
          </p>

          <p style={{ fontSize: "12px", color: "#999" }}>
            {new Date(r.created_at).toLocaleString()}
          </p>

          <a
            href={`http://localhost:5000/uploads/${r.file_path}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 14px",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            View Report
          </a>
        </div>
      ))
    )}
  </div>
)}
        {view === "requests" && (
         <div className="patient-card">
            <h3>Pending Doctor Requests</h3>
            {pendingRequests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.id}>
                  Doctor ID: {req.doctor_id}
                  <br />
                  <button onClick={() => approveDoctor(req.id)}>
                    Approve
                  </button>
                  <button onClick={() => rejectDoctor(req.id)}>
                    Reject
                  </button>
                </div>
              ))
            )}
          </div>
        )}

       {view === "insurance" && (
  <div className="patient-card">
 <h3>{t.insuranceSuggestion}</h3>

    <input
      type="text"
      placeholder={t.enterDiagnosis}
      onChange={(e) => setDiagnosis(e.target.value)}
    />

    <br /><br />

   <button onClick={checkInsurance}>{t.check}</button>

    <br /><br />

    {aiMessage && (
      <div className="ai-box">
        <h4>🧠 AI Medical Risk Analysis</h4>

        <p>
          <strong>Diagnosis:</strong> {diagnosis}
        </p>

        <p>
          <strong>Risk Level:</strong>{" "}
          <span className={`risk-badge ${riskLevel.toLowerCase()}`}>
            {riskLevel}
          </span>
        </p>

        <p>{aiMessage}</p>
      </div>
    )}

    <h4 style={{ color: "lightgreen", marginTop: "15px" }}>
   {t.recommended}
    </h4>

    {recommended.length === 0 ? (
      <p>No recommended policies</p>
    ) : (
      <ul>
        {recommended.map((item, index) => (
          <li key={index}>
            {item.company_name} - {item.policy_name}
          </li>
        ))}
      </ul>
    )}

    <h4 style={{ color: "#ff6b6b", marginTop: "15px" }}>
      {t.notRecommended}
    </h4>

    {notRecommended.length === 0 ? (
      <p>No non-recommended policies</p>
    ) : (
      <ul>
        {notRecommended.map((item, index) => (
          <li key={index}>
            {item.company_name} - {item.policy_name}
          </li>
        ))}
      </ul>
    )}
  </div>
)}
{view === "notifications" && (
  <div className="patient-card">
    <h3>{t.notifications}</h3>

    {notifications.length === 0 ? (
      <p>{t.noNotifications}</p>
    ) : (
      notifications.map((note) => (
        <div key={note.id} className="notification-box">
          <p>{t[note.message] || note.message}</p>
          <small>
            {new Date(note.created_at).toLocaleString()}
          </small>
          <hr />
        </div>
      ))
    )}
  </div>
)}

        {view === "emergency" && (
        <div className="patient-card">
            <h3>{t.emergencyQR}</h3>
           <button
  type="button"
  onClick={generateEmergencyLink}
>
  {t.generateQR}
</button>
            {emergencyLink && (
  <div style={{ marginTop: 20, textAlign: "center" }}>
    <QRCodeCanvas value={emergencyLink} size={200} />

    <br /><br />

    <a
      href={emergencyLink}
      target="_blank"
      rel="noreferrer"
      style={{ color: "#1890ff", fontWeight: "bold" }}
    >
      Open Emergency Link
    </a>
  </div>
)}
          </div>
        )}
            </div>  
    </div>     
  );
}
