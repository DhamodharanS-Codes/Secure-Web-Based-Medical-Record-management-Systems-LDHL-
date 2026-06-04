const db = require("../config/db");

const logAudit = (
  userId,
  role,
  action,
  description = "",
  targetId = null,
  sensitivity = "NORMAL"
) => {
  console.log("AUDIT VALUES:", {
    userId,
    role,
    action,
    description,
    targetId,
    sensitivity
  });
  const query = `
    INSERT INTO audit_logs 
    (user_id, role, action, description, target_id, sensitivity)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, role, action, description, targetId, sensitivity],
    (err) => {
      if (err) {
        console.error("Audit log failed:", err.message);
      }
    }
  );
};

module.exports = logAudit;
