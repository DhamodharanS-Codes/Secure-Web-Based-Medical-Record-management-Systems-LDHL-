const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");



/* ===============================
   APPROVE MODIFICATION REQUEST
================================ */
router.put("/approve/:id", authMiddleware, (req, res) => {
  const modificationId = req.params.id;

  // 1️⃣ Get modification details first
  const getModificationQuery = `
    SELECT * FROM record_modifications
    WHERE id = ?
  `;

  db.query(getModificationQuery, [modificationId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Modification not found" });
    }

    const modification = results[0];

    const patientId = modification.patient_id;
    const recordId = modification.record_id;
    const newTitle = modification.new_title;
    const newDescription = modification.new_description;

    // 2️⃣ Update original doctor_records table
    const updateRecordQuery = `
      UPDATE doctor_records
      SET title = ?, description = ?
      WHERE id = ?
    `;

    db.query(updateRecordQuery, [newTitle, newDescription, recordId], (err2) => {
      if (err2) {
        return res.status(500).json({ message: "Record update failed" });
      }

      // 3️⃣ Update modification status
      const updateStatusQuery = `
        UPDATE record_modifications
        SET status = 'approved'
        WHERE id = ?
      `;

      db.query(updateStatusQuery, [modificationId], (err3) => {
        if (err3) {
          return res.status(500).json({ message: "Status update failed" });
        }

        // 4️⃣ Insert Notification
        const notifyQuery = `
          INSERT INTO notifications (patient_id, message)
          VALUES (?, ?)
        `;

        const message =
          "Your record modification has been APPROVED by expert doctor.";

        db.query(notifyQuery, [patientId, message]);

        res.json({ message: "Approved successfully" });
      });
    });
  });
});



/* ===============================
   REJECT MODIFICATION REQUEST
================================ */
router.put("/reject/:id", authMiddleware, (req, res) => {
  const modificationId = req.params.id;

  const getModificationQuery = `
    SELECT * FROM record_modifications
    WHERE id = ?
  `;

  db.query(getModificationQuery, [modificationId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Modification not found" });
    }

    const modification = results[0];
    const patientId = modification.patient_id;

    // Update status only
    const updateStatusQuery = `
      UPDATE record_modifications
      SET status = 'rejected'
      WHERE id = ?
    `;

    db.query(updateStatusQuery, [modificationId], (err2) => {
      if (err2) {
        return res.status(500).json({ message: "Reject failed" });
      }

      // Insert Notification
      const notifyQuery = `
        INSERT INTO notifications (patient_id, message)
        VALUES (?, ?)
      `;

      const message =
        "Your record modification request has been REJECTED by expert doctor.";

      db.query(notifyQuery, [patientId, message]);

      res.json({ message: "Rejected successfully" });
    });
  });
});

module.exports = router;