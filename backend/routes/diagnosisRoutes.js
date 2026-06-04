const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
const logAudit = require("../utils/auditLogger");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


router.post("/add", verifyToken, upload.single("proof"), (req, res) => {
  const doctorId = req.user.id;
  const role = req.user.role;

  const {
    patientId,
    recordId,
    diagnosis_title,
    diagnosis_details,
    severity
  } = req.body;

  if (role !== "doctor") {
    return res.status(403).json({ message: "Only doctors can add diagnosis" });
  }

  if (!patientId || !recordId || !diagnosis_title || !diagnosis_details || !severity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  const permissionQuery = `
    SELECT * FROM doctor_permissions
    WHERE doctor_id = ?
      AND patient_id = ?
      AND status = 'approved'
      AND expires_at > NOW()
  `;

  db.query(permissionQuery, [doctorId, patientId], (err, permission) => {
    if (err || permission.length === 0) {
      return res.status(403).json({ message: "No permission to add diagnosis" });
    }

    const proofPath = req.file ? req.file.path : null;

    const insertQuery = `
      INSERT INTO doctor_diagnosis
      (patient_id, doctor_id, record_id, diagnosis_title, diagnosis_details, severity, proof_file)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        patientId,
        doctorId,
        recordId,
        diagnosis_title,
        diagnosis_details,
        severity,
        proofPath
      ],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to add diagnosis" });
        }
logAudit(doctorId, "doctor", "ADD_DIAGNOSIS", `Diagnosis added for patient ${patientId}`);

        res.json({ message: "Diagnosis added successfully" });
      }
    );
  });
});


router.get("/patient", verifyToken, (req, res) => {
  const patientId = req.user.id;
  const role = req.user.role;

  if (role !== "patient") {
    return res.status(403).json({ message: "Only patients can view diagnosis" });
  }

  const query = `
    SELECT 
      d.id,
      d.diagnosis_title,
      d.diagnosis_details,
      d.severity,
      d.created_at,
      u.name AS doctor_name
    FROM doctor_diagnosis d
    JOIN users u ON d.doctor_id = u.id
    WHERE d.patient_id = ?
    ORDER BY d.created_at DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch diagnosis" });
    }

    res.json(results);
  });
});

router.get("/doctor", verifyToken, (req, res) => {
  const doctorId = req.user.id;
  const role = req.user.role;

  if (role !== "doctor") {
    return res.status(403).json({ message: "Only doctors can view diagnosis" });
  }

  const query = `
    SELECT 
      d.id,
      d.diagnosis_title,
      d.diagnosis_details,
      d.severity,
      d.created_at,
      u.name AS patient_name
    FROM doctor_diagnosis d
    JOIN users u ON d.patient_id = u.id
    JOIN doctor_permissions dp 
      ON dp.patient_id = d.patient_id
     AND dp.doctor_id = d.doctor_id
    WHERE d.doctor_id = ?
      AND dp.status = 'approved'
      AND dp.expires_at > NOW()
    ORDER BY d.created_at DESC
  `;

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch diagnosis" });
    }

    res.json(results);
  });
});


module.exports = router;
