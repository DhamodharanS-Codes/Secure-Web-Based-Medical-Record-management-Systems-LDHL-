import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function EmergencyView() {
  const { token } = useParams();
const { t } = useContext(LanguageContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/emergency/view/${token}`
        );

        setData(res.data);
      } catch (err) {
        console.error("Emergency Error:", err);
        setError("Invalid or expired emergency access");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyData();
  }, [token]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3>Loading emergency data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>🚨 {t.emergencyTitle}</h2>

      <p><strong>Blood Group:</strong> {data.blood_group || "N/A"}</p>
      <p><strong>Allergies:</strong> {data.allergies || "N/A"}</p>
      <p><strong>Chronic Conditions:</strong> {data.chronic_conditions || "N/A"}</p>
      <p><strong>Emergency Contact:</strong> {data.emergency_contact || "N/A"}</p>

      <p style={{ color: "red", marginTop: "20px" }}>
        Read-only emergency access. Editing is disabled.
      </p>
    </div>
  );
}