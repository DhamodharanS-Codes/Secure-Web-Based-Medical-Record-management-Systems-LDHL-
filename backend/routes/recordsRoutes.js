const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/*
====================================
GET PATIENT MEDICAL RECORDS
====================================
*/
router.get("/patient/:patientId", authMiddleware, (req, res) => {
  const patientId = req.params.patientId;

  const query = `
    SELECT id, title, file_path, uploaded_at
    FROM medical_records
    WHERE patient_id = ?
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error("FETCH RECORD ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(results);
  });
});

module.exports = router;
