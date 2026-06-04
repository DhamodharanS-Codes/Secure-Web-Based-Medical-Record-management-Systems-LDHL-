import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch(
      "http://localhost:5000/api/permissions/doctor/approved",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    setPatients(data);
  };

  return (
    <div className="dashboard-container">
      <h2>Approved Patients</h2>

      {patients.length === 0 ? (
        <p>No approved patients</p>
      ) : (
        patients.map((p) => (
          <div
            className="card"
            key={p.patient_id}
            onClick={() =>
              navigate(`/doctor-patient-records/${p.patient_id}`)
            }
          >
            <h3>{p.patient_name}</h3>
            <p>{p.email}</p>
          </div>
        ))
      )}
    </div>
  );
}
