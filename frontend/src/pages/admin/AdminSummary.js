import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";

const AdminSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="admin-card">
      <h2>System Summary</h2>

      <p>Total Users: {summary.totalUsers || 0}</p>
      <p>Total Doctors: {summary.totalDoctors || 0}</p>
      <p>Total Audit Logs: {summary.totalAuditLogs || 0}</p>
    </div>
  );
};

export default AdminSummary;