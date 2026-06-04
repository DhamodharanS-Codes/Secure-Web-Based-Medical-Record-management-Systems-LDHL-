const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/* ===============================
   GET SYSTEM SUMMARY
=================================*/
router.get(
  "/summary",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    const summary = {};

    db.query("SELECT COUNT(*) AS total_users FROM users", (err, users) => {
      if (err) return res.status(500).json({ message: "DB error users" });

      summary.totalUsers = users[0].total_users;

      db.query(
        "SELECT COUNT(*) AS total_doctors FROM users WHERE role='doctor'",
        (err, doctors) => {
          if (err)
            return res.status(500).json({ message: "DB error doctors" });

          summary.totalDoctors = doctors[0].total_doctors;

          db.query(
            "SELECT COUNT(*) AS total_logs FROM audit_logs",
            (err, logs) => {
              if (err)
                return res.status(500).json({ message: "DB error logs" });

              summary.totalAuditLogs = logs[0].total_logs;

              res.json(summary);
            }
          );
        }
      );
    });
  }
);

/* ===============================
   GET ALL AUDIT LOGS
=================================*/
router.get(
  "/audit-logs",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    db.query(
      "SELECT * FROM audit_logs ORDER BY created_at DESC",
      (err, logs) => {
        if (err) return res.status(500).json({ message: "DB error logs" });
        res.json(logs);
      }
    );
  }
);
/* ===============================
   GET ALL USERS
=================================*/
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC",
      (err, users) => {
        if (err)
          return res.status(500).json({ message: "DB error users" });

        res.json(users);
      }
    );
  }
);

module.exports = router;
