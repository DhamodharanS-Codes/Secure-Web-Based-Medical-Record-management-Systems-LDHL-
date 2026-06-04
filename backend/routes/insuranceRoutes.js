const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
const logAudit = require("../utils/auditLogger");

/*
---------------------------------------
MULTER CONFIG (reuse uploads folder)
---------------------------------------
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/*
---------------------------------------
 Patient uploads insurance policy
---------------------------------------
POST /api/insurance/upload
*/
router.post("/upload", verifyToken, upload.single("document"), (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  const {
    provider_name,
    policy_number,
    policy_type,
    valid_from,
    valid_to
  } = req.body;

  if (role !== "patient") {
    return res.status(403).json({ message: "Only patients can upload insurance" });
  }

  if (!provider_name || !policy_number) {
    return res.status(400).json({ message: "Provider name and policy number are required" });
  }

  const documentPath = req.file ? req.file.path : null;

  const query = `
    INSERT INTO insurance_policies
    (patient_id, provider_name, policy_number, policy_type, valid_from, valid_to, document_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      userId,
      provider_name,
      policy_number,
      policy_type,
      valid_from,
      valid_to,
      documentPath
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to upload insurance policy" });
      }

      res.json({ message: "Insurance policy uploaded successfully" });
    }
  );
});

/*
---------------------------------------
 Patient views own insurance policies
(With ACTIVE / EXPIRED status)  ✅ 4.7
---------------------------------------
GET /api/insurance/my
*/
router.get("/my", verifyToken, (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  if (role !== "patient") {
    return res.status(403).json({ message: "Only patients can view insurance" });
  }

  const query = `
    SELECT 
      id,
      provider_name,
      policy_number,
      policy_type,
      valid_from,
      valid_to,
      CASE
        WHEN valid_to < CURDATE() THEN 'expired'
        ELSE 'active'
      END AS status
    FROM insurance_policies
    WHERE patient_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch insurance policies" });
    }

    res.json(results);
  });
});

/*
---------------------------------------
 Doctor views patient insurance
(Approved + NOT expired only)  ✅ 4.7
---------------------------------------
GET /api/insurance/doctor/:patientId
*/
router.get("/doctor/:patientId", verifyToken, (req, res) => {
  const doctorId = req.user.id;
  const role = req.user.role;
  const patientId = req.params.patientId;

  if (role !== "doctor") {
    return res.status(403).json({ message: "Only doctors can view insurance" });
  }

  // Permission check (Module 3)
  const permissionQuery = `
    SELECT 1
    FROM doctor_permissions
    WHERE doctor_id = ?
      AND patient_id = ?
      AND status = 'approved'
      AND expires_at > NOW()
  `;

  db.query(permissionQuery, [doctorId, patientId], (err, permission) => {
    if (err || permission.length === 0) {
      return res.status(403).json({ message: "No permission to view insurance" });
    }

    const query = `
      SELECT
        provider_name,
        policy_number,
        policy_type,
        valid_from,
        valid_to
      FROM insurance_policies
      WHERE patient_id = ?
        AND valid_to >= CURDATE()
    `;

    db.query(query, [patientId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch insurance data" });
      }
logAudit(doctorId, "doctor", "VIEW_INSURANCE", `Viewed insurance of patient ${patientId}`);

      res.json(results);
    });
  });
});

module.exports = router;
