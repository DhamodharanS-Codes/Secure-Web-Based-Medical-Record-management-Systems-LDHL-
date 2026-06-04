const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/* ===============================
   GET PENDING RECORDS
=================================*/
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware(["doctor"]),
  (req, res) => {
    if (!req.user.is_expert) {
      return res.status(403).json({ message: "Not expert doctor" });
    }

    db.query(
      "SELECT * FROM medical_records WHERE status='pending'",
      (err, records) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json(records);
      }
    );
  }
);

/* ===============================
   APPROVE RECORD
=================================*/
router.post(
  "/approve/:recordId",
  authMiddleware,
  roleMiddleware(["doctor"]),
  (req, res) => {
    if (!req.user.is_expert) {
      return res.status(403).json({ message: "Not expert doctor" });
    }

    db.query(
      "UPDATE medical_records SET status='approved' WHERE id=?",
      [req.params.recordId],
      (err) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json({ message: "Record approved" });
      }
    );
  }
);

module.exports = router;
