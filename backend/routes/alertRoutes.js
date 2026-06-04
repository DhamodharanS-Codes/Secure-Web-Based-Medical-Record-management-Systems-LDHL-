const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// -------------------------------
// View own alerts (Patient / Doctor)
// -------------------------------
router.get(
  "/my-alerts",
  authMiddleware,
  (req, res) => {
    const query = `
      SELECT alert_type, message, created_at
      FROM audit_alerts
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    db.query(query, [req.user.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch alerts" });
      }
      res.json(results);
    });
  }
);

// -------------------------------
// View all alerts (Admin only)
// -------------------------------
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    const query = `
      SELECT user_id, role, alert_type, message, created_at
      FROM audit_alerts
      ORDER BY created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch alerts" });
      }
      res.json(results);
    });
  }
);

module.exports = router;
