const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all doctors
router.get("/", (req, res) => {
  const query = `
    SELECT id, name, specialization, languages, experience, is_expert
    FROM users
    WHERE role='doctor'
  `;

  db.query(query, (err, doctors) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(doctors);
  });
});

module.exports = router;
