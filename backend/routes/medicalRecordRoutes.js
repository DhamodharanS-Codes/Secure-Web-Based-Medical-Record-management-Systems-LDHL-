const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const verifyToken = require("../middleware/authMiddleware");
/* =======================
   MULTER CONFIG
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =======================
   UPLOAD RECORD
======================= */
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    const { title, category, description, patient_id } = req.body;

    if (!req.file || !title) {
      return res.status(400).json({ message: "File and title required" });
    }

    let patientId;

    // If doctor uploads → patient_id comes from frontend
    if (req.user.role === "doctor") {
      if (!patient_id) {
        return res.status(400).json({ message: "Patient ID required" });
      }
      patientId = patient_id;
    } else {
      // Patient uploads for themselves
      patientId = req.user.id;
    }

    const query = `
      INSERT INTO medical_records
      (patient_id, title, description, category, file_path, status, uploaded_by)
      VALUES (?, ?, ?, ?, ?, 'approved', ?)
    `;

    db.query(
      query,
      [
        patientId,
        title,
        description || "",
        category || "General",
        req.file.filename,
        req.user.id,
      ],
      (err) => {
        if (err) {
          console.error("Upload Error:", err);
          return res.status(500).json({ message: "Upload failed" });
        }

        res.json({ message: "Upload successful" });
      }
    );
  }
);

/* =======================
   GET MY RECORDS (Patient)
======================= */
router.get("/my-records", authMiddleware, (req, res) => {
  const patientId = req.user.id;

  const query = `
    SELECT id, title, description, category, file_path, uploaded_at, status
    FROM medical_records
    WHERE patient_id = ?
    ORDER BY uploaded_at DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error("FETCH RECORD ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(results);
  });
});
/* =======================
   RENAME RECORD
======================= */
router.put("/rename/:id", verifyToken, (req, res) => {
  const { title } = req.body;
  const recordId = req.params.id;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  db.query(
    "UPDATE medical_records SET title = ? WHERE id = ?",
    [title, recordId],
    (err, result) => {
      if (err) {
        console.error("Rename Error:", err);
        return res.status(500).json({ message: "Rename failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Record not found" });
      }

      res.json({ message: "Renamed successfully" });
    }
  );
});   // ✅ THIS WAS MISSING
/* =======================
   GET PATIENT RECORDS (Doctor View)
======================= */
router.get("/patient-records/:patientId", authMiddleware, (req, res) => {
  const patientId = req.params.patientId;

  const query = `
    SELECT id, title, description, category, file_path, uploaded_at, status
    FROM medical_records
    WHERE patient_id = ?
    ORDER BY uploaded_at DESC
  `;

  db.query(query, [patientId], (err, results) => {
    if (err) {
      console.error("FETCH RECORD ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(results);
  });
});
// =======================
// DELETE PATIENT RECORD
// =======================
router.delete("/delete/:id", authMiddleware, (req, res) => {
  const recordId = req.params.id;
  const patientId = req.user.id;

  const checkQuery = `
    SELECT * FROM medical_records
    WHERE id = ? AND patient_id = ?
  `;

  db.query(checkQuery, [recordId, patientId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    db.query(
      `DELETE FROM medical_records WHERE id = ?`,
      [recordId],
      (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ message: "Delete failed" });
        }

        res.json({ message: "Deleted successfully" });
      }
    );
  });
});

module.exports = router;