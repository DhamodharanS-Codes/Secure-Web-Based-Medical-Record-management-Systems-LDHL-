const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

/* ==============================
   MULTER CONFIG
============================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =========================================================
   1️ GET DOCTOR RECORDS FOR PATIENT (FOR DOCTOR DASHBOARD)
========================================================= */
router.get("/patient-records/:patientId", authMiddleware, (req, res) => {

  const patientId = req.params.patientId;

  const query = `
    SELECT dr.*, u.name AS doctor_name
    FROM doctor_records dr
    JOIN users u ON dr.doctor_id = u.id
    WHERE dr.patient_id = ?
    ORDER BY dr.created_at DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({ message: "Fetch failed" });
    }

    res.json(results);
  });
});


/* =========================================================
   2️ DOCTOR UPLOAD RECORD
========================================================= */
router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {

  const doctorId = req.user.id;
  const role = req.user.role;

  if (role !== "doctor" && role !== "expert") {
    return res.status(403).json({ message: "Only doctors can upload" });
  }

  const { patient_id, record_type, title, description } = req.body;

  if (!patient_id || !record_type || !title) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const filePath = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO doctor_records
    (patient_id, doctor_id, record_type, title, description, file_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patient_id, doctorId, record_type, title, description, filePath], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload failed" });
    }

    db.query(
      `INSERT INTO notifications (patient_id, message) VALUES (?, ?)`,
      [patient_id, "MOD_UPLOAD"]
    );

    res.json({ message: "Record uploaded successfully" });
  });
});


/* =========================================================
   3️ REQUEST MODIFICATION
========================================================= */
router.post("/request-modification", authMiddleware, (req, res) => {

  const doctorId = req.user.id;
  const { record_id, new_title, new_description } = req.body;

  db.query(
    `SELECT patient_id FROM doctor_records WHERE id = ?`,
    [record_id],
    (err, result) => {

      if (err || result.length === 0) {
        return res.status(400).json({ message: "Record not found" });
      }

      const patientId = result[0].patient_id;

      db.query(
        `INSERT INTO record_modifications
         (record_id, patient_id, doctor_id, new_title, new_description, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [record_id, patientId, doctorId, new_title, new_description],
        (err2) => {

          if (err2) {
            console.error(err2);
            return res.status(500).json({ message: "Insert failed" });
          }

          db.query(
            `INSERT INTO notifications (patient_id, message) VALUES (?, ?)`,
            [patientId, "MOD_REQUESTED"]
          );

          res.json({ message: "Modification request sent" });
        }
      );
    }
  );
});


/* =========================================================
   4️ GET PENDING FOR EXPERT
========================================================= */
router.get("/pending", authMiddleware, (req, res) => {

  if (req.user.role !== "expert") {
    return res.status(403).json({ message: "Only expert allowed" });
  }

  const query = `
    SELECT 
      rm.id,
      rm.patient_id,
      rm.record_id,
      rm.new_title,
      rm.new_description,
      rm.status,
      dr.record_type,
      dr.title AS current_title,
      dr.description AS current_description,
      u.name AS doctor_name
    FROM record_modifications rm
    JOIN doctor_records dr ON rm.record_id = dr.id
    JOIN users u ON rm.doctor_id = u.id
    WHERE rm.status = 'pending'
    ORDER BY rm.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to load requests" });
    }

    res.json(results);
  });
});


/* =========================================================
   5️ APPROVE
========================================================= */
router.post("/approve/:modId", authMiddleware, (req, res) => {

  if (req.user.role !== "expert") {
    return res.status(403).json({ message: "Only expert can approve" });
  }

  const modId = req.params.modId;

  db.query(
    `SELECT * FROM record_modifications WHERE id = ?`,
    [modId],
    (err, results) => {

      if (err || results.length === 0) {
        return res.status(400).json({ message: "Modification not found" });
      }

      const mod = results[0];

      db.query(
        `UPDATE doctor_records
         SET title = ?, description = ?
         WHERE id = ?`,
        [mod.new_title, mod.new_description, mod.record_id],
        (err2) => {

          if (err2) {
            return res.status(500).json({ message: "Update failed" });
          }

          db.query(
            `UPDATE record_modifications SET status='approved' WHERE id=?`,
            [modId]
          );

          db.query(
            `INSERT INTO notifications (patient_id, message) VALUES (?, ?)`,
            [mod.patient_id, "MOD_APPROVED"]
          );

          res.json({ message: "Approved successfully" });
        }
      );
    }
  );
});


/* =========================================================
   6️ REJECT
========================================================= */
router.post("/reject/:modId", authMiddleware, (req, res) => {

  if (req.user.role !== "expert") {
    return res.status(403).json({ message: "Only expert can reject" });
  }

  const modId = req.params.modId;

  db.query(
    `SELECT * FROM record_modifications WHERE id = ?`,
    [modId],
    (err, results) => {

      if (err || results.length === 0) {
        return res.status(400).json({ message: "Modification not found" });
      }

      const mod = results[0];

      db.query(
        `UPDATE record_modifications SET status='rejected' WHERE id=?`,
        [modId]
      );

      db.query(
        `INSERT INTO notifications (patient_id, message) VALUES (?, ?)`,
        [mod.patient_id, "MOD_REJECTED"]
      );

      res.json({ message: "Rejected successfully" });
    }
  );
});


/* =========================================================
   7️ PATIENT NOTIFICATIONS
========================================================= */
router.get("/patient-notifications", authMiddleware, (req, res) => {

  const patientId = req.user.id;

  db.query(
    `SELECT * FROM notifications
     WHERE patient_id = ?
     ORDER BY created_at DESC`,
    [patientId],
    (err, results) => {

      if (err) {
        return res.status(500).json({ message: "Error fetching notifications" });
      }

      res.json(results);
    }
  );
});

module.exports = router;