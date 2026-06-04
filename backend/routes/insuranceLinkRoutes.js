const express = require("express");
const router = express.Router();
const db = require("../config/db");

/*
  Link insurance recommendations with patient uploads
*/

// ===============================
// POST: Link recommendations with patient policies
// ===============================
router.post("/link", (req, res) => {
  const { patientId, diagnosis } = req.body;

  if (!patientId || !diagnosis) {
    return res.status(400).json({ message: "patientId and diagnosis required" });
  }

  const diag = diagnosis.toLowerCase();

  // 1️⃣ Get all policy rules
  const rulesQuery = `SELECT * FROM insurance_policy_rules`;

  db.query(rulesQuery, (err, rules) => {
    if (err) {
      console.error("RULE FETCH ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    // 2️⃣ Get patient uploaded policies
    const patientPoliciesQuery = `
      SELECT provider_name, policy_number, valid_to
      FROM insurance_policies
      WHERE patient_id = ?
    `;

    db.query(patientPoliciesQuery, [patientId], (err2, uploads) => {
      if (err2) {
        console.error("PATIENT POLICY ERROR:", err2);
        return res.status(500).json({ message: "DB error" });
      }

      const uploadedProviders = uploads.map(
        (p) => p.provider_name.toLowerCase()
      );

      const recommended = [];
      const avoid = [];

      rules.forEach((rule) => {
        const covered = rule.covered_conditions
          ? rule.covered_conditions.toLowerCase()
          : "";
        const excluded = rule.excluded_conditions
          ? rule.excluded_conditions.toLowerCase()
          : "";

        const hasPolicy = uploadedProviders.includes(
          rule.provider_name.toLowerCase()
        );

        const policyInfo = {
          provider_name: rule.provider_name,
          policy_type: rule.policy_type,
          already_uploaded: hasPolicy,
        };

        if (covered.includes(diag)) {
          recommended.push(policyInfo);
        } else if (excluded.includes(diag)) {
          avoid.push(policyInfo);
        }
      });

      res.json({ diagnosis, recommended, avoid });
    });
  });
});

module.exports = router;
