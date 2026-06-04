const db = require("../config/db");

const logAlert = (userId, role, alertType, message) => {
  console.log("🚨 ALERT LOG INPUT:", {
    userId,
    role,
    alertType,
    message,
  });

  const query = `
    INSERT INTO audit_alerts (user_id, role, alert_type, message)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    userId || 0,
    role || "unknown",
    alertType || "UNKNOWN_ALERT",
    message || "No message"
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Alert log DB error:", err.sqlMessage);
    } else {
      console.log("✅ Alert logged, ID:", result.insertId);
    }
  });
};

module.exports = logAlert;
