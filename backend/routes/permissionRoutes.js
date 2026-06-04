const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* =====================================================
   Doctor sends access request
   ===================================================== */
router.post("/request/:patientId", (req, res) => {
  const doctorId = req.body.doctorId;   // from frontend
  const patientId = req.params.patientId;

  const checkQuery = `
    SELECT * FROM doctor_permissions
    WHERE doctor_id = ? AND patient_id = ?
  `;

  db.query(checkQuery, [doctorId, patientId], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error (check)" });

    if (rows.length > 0) {
      return res.json({ message: "Request already exists" });
    }

    const insertQuery = `
      INSERT INTO doctor_permissions (doctor_id, patient_id, status)
      VALUES (?, ?, 'pending')
    `;

    db.query(insertQuery, [doctorId, patientId], (err2) => {
      if (err2) return res.status(500).json({ message: "DB error (insert)" });

      res.json({ message: "Access request sent" });
    });
  });
});

/* =====================================================
   Patient views pending requests
   ===================================================== */
router.get("/pending/:patientId", (req, res) => {
  const patientId = req.params.patientId;

  const query = `
    SELECT * FROM doctor_permissions
    WHERE patient_id = ? AND status = 'pending'
  `;

  db.query(query, [patientId], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(rows);
  });
});

/* =====================================================
   Patient approves
   ===================================================== */
router.post("/approve/:requestId", (req, res) => {
  const requestId = req.params.requestId;

  db.query(
    `UPDATE doctor_permissions 
     SET status='approved', granted_at=NOW() 
     WHERE id=?`,
    [requestId],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ message: "Doctor approved" });
    }
  );
});

/* =====================================================
   Patient rejects
   ===================================================== */
router.post("/reject/:requestId", (req, res) => {
  const requestId = req.params.requestId;

  db.query(
    `UPDATE doctor_permissions 
     SET status='rejected' 
     WHERE id=?`,
    [requestId],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ message: "Doctor rejected" });
    }
  );
});

/* =====================================================
   Doctor views approved patients
   ===================================================== */
router.get("/approved/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;

  const query = `
    SELECT * FROM doctor_permissions
    WHERE doctor_id = ? AND status='approved'
  `;

  db.query(query, [doctorId], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(rows);
  });
});
/* =====================================================
   Doctor views all his requests (status)
===================================================== */
/* =====================================================
   Doctor views ALL request status (pending / approved / rejected)
===================================================== */
router.get("/status/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;

  const query = `
    SELECT id, patient_id, status, created_at, granted_at
    FROM doctor_permissions
    WHERE doctor_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [doctorId], (err, rows) => {
    if (err) {
      console.error("STATUS ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(rows || []);
  });
});
/* =====================================================
   Doctor views all his requests (status)
   ===================================================== */
router.get("/doctor/:doctorId", (req, res) => {
  const doctorId = req.params.doctorId;

  const query = `
    SELECT patient_id, status, created_at
    FROM doctor_permissions
    WHERE doctor_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [doctorId], (err, rows) => {
    if (err) {
      console.error("DOCTOR STATUS ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(rows || []);
  });
});


module.exports = router;
