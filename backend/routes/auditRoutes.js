const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// -------------------------------
// GET MY OWN AUDIT LOGS (Patient / Doctor)
// -------------------------------
router.get("/my-logs", authMiddleware, (req, res) => {
  const query = `
    SELECT action, target_id, created_at
    FROM audit_logs
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [req.user.id], (err, logs) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(logs);
  });
});

// -------------------------------
// GET ALL AUDIT LOGS (ADMIN ONLY)
// -------------------------------
router.get(
  "/all-logs",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    const query = `
      SELECT user_id, role, action, target_id, created_at
      FROM audit_logs
      ORDER BY created_at DESC
    `;

    db.query(query, (err, logs) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(logs);
    });
  }
);

module.exports = router;
