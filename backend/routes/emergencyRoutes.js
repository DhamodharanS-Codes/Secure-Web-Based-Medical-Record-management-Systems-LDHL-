const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/* =====================================
   GENERATE QR LINK
===================================== */
router.post("/generate", authMiddleware, (req, res) => {

  const patientId = req.user.id;   // 🔥 TAKE FROM JWT

  try {
    const emergencyToken = jwt.sign(
      { patientId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const url = `http://localhost:3000/emergency/${emergencyToken}`;

    res.json({ url });

  } catch (err) {
    console.error("Generate Error:", err);
    res.status(500).json({ message: "Failed to generate emergency link" });
  }
});

/* =====================================
   VIEW EMERGENCY PROFILE
===================================== */
router.get("/view/:token", async (req, res) => {

  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decoded.patientId;
console.log("Decoded patientId:", patientId);
    const checkQuery = `
      SELECT * FROM emergency_profiles
      WHERE patient_id = ?
    `;

    db.query(checkQuery, [patientId], (err, results) => {

      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // IF PROFILE DOES NOT EXIST → CREATE IT AUTOMATICALLY
      if (results.length === 0) {

        const insertQuery = `
          INSERT INTO emergency_profiles
          (patient_id, blood_group, allergies, chronic_conditions, emergency_contact)
          VALUES (?, '', '', '', '')
        `;

        db.query(insertQuery, [patientId], (insertErr) => {

          if (insertErr) {
            console.error("Insert Error:", insertErr);
            return res.status(500).json({ message: "Failed to create emergency profile" });
          }

          // Return empty profile safely
          return res.json({
            blood_group: "",
            allergies: "",
            chronic_conditions: "",
            emergency_contact: ""
          });
        });

      } else {
        // 🔥 PROFILE EXISTS → RETURN IT
        res.json(results[0]);
      }

    });

  } catch (err) {
    console.error("Token Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired emergency access" });
  }
});
/* =====================================
   UPDATE EMERGENCY PROFILE (PATIENT)
===================================== */
router.post("/update", authMiddleware, (req, res) => {

  const patientId = req.user.id;
  const { blood_group, allergies, chronic_conditions, emergency_contact } = req.body;

  const query = `
    UPDATE emergency_profiles
    SET blood_group = ?, 
        allergies = ?, 
        chronic_conditions = ?, 
        emergency_contact = ?
    WHERE patient_id = ?
  `;

  db.query(
    query,
    [
      blood_group || "",
      allergies || "",
      chronic_conditions || "",
      emergency_contact || "",
      patientId
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
      }

      res.json({ message: "Emergency info updated successfully" });
    }
  );
});
module.exports = router;
