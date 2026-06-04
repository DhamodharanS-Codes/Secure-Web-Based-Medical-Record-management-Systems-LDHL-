import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/patientRecords.css";

export default function PatientRecords() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const token = localStorage.getItem("token");

  // ======================
  // FETCH RECORDS
  // ======================
  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/records/my-records",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRecords();
    }
  }, []);

  // ======================
  // UPLOAD RECORD
  // ======================
  const handleUpload = async () => {
    if (!token) {
      setMessage("❌ Login again. Token missing.");
      return;
    }

    if (!title || !file) {
      setMessage("❌ Title and file required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/api/records/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Record uploaded successfully");
      setTitle("");
      setFile(null);
      fetchRecords(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed");
    }
  };

  // ======================
  // FILTER LOGIC
  // ======================
  const filteredRecords = records.filter((record) => {
    const matchesTitle = record.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDate = dateFilter
      ? record.uploaded_at.startsWith(dateFilter)
      : true;

    return matchesTitle && matchesDate;
  });

  return (
    <div className="patient-layout">
      <h2 className="patient-title">Medical Records</h2>

      {/* Upload Section */}
      <div className="patient-upload-card">
        <h3>Upload Record</h3>

        <input
          type="text"
          placeholder="Record Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>Upload</button>

        {message && <p className="upload-message">{message}</p>}
      </div>

      {/* Search & Filter */}
      <div className="patient-filter-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Record List */}
      <div className="patient-record-list">
        {filteredRecords.length === 0 ? (
          <p className="no-records">No records found.</p>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="patient-record-card">
              <h4>{record.title}</h4>
              <p>Date: {record.uploaded_at?.split("T")[0]}</p>
              <a
                href={`http://localhost:5000/uploads/${record.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}