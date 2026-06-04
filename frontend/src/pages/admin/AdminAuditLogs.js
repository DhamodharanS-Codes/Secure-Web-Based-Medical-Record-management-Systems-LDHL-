import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";   // ✅ IMPORTANT

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/audit-logs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLogs(res.data);
      } catch (error) {
        alert("Failed to load audit logs");
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="admin-content">
      <div className="admin-card">
        <h2>System Audit Logs</h2>

        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Role</th>
                <th>Action</th>
                <th>Description</th>
                <th>Target</th>
                <th>Sensitivity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="7">No audit logs available</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user_id}</td>
                    <td>{log.role}</td>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                    <td>{log.target_id}</td>
                    <td>{log.sensitivity}</td>
                    <td>
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;