import { useEffect, useState } from "react";
import axios from "axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/audit/my-logs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setLogs(res.data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Activity Logs</h2>

      {logs.length === 0 && <p>No activity found</p>}

      {logs.map((log, i) => (
        <div key={i} className="card" style={{ marginBottom: "10px" }}>
          <b>{log.action}</b>
          <p>Target ID: {log.target_id || "N/A"}</p>
          <small>{new Date(log.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
