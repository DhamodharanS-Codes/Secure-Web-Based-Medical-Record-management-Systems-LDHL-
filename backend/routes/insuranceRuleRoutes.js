const express = require("express");
const router = express.Router();
const db = require("../config/db");

/*
=========================================
SMART AI-STYLE INSURANCE MATCHING ENGINE
=========================================
*/

router.get("/:diagnosis", (req, res) => {
  const rawInput = req.params.diagnosis.toLowerCase().trim();

  /* =========================
     1️⃣ DIAGNOSIS NORMALIZER
  ========================= */

  const diagnosisMap = {
    diabetes: ["diabetes", "diabetic", "sugar", "high sugar"],
    heart: ["heart", "cardiac", "heart attack"],
    cancer: ["cancer", "tumor", "oncology"],
    kidney: ["kidney", "renal", "kidney failure"],
    liver: ["liver", "cirrhosis"],
    stroke: ["stroke", "brain stroke"],
    asthma: ["asthma", "breathing problem"],
    hypertension: ["hypertension", "bp", "high bp"],
    covid: ["covid", "corona"],
    arthritis: ["arthritis", "joint pain"]
  };

  let normalizedDiagnosis = null;

  for (const key in diagnosisMap) {
    if (diagnosisMap[key].some(keyword => rawInput.includes(keyword))) {
      normalizedDiagnosis = key;
      break;
    }
  }

  if (!normalizedDiagnosis) {
    return res.json({
      diagnosis: rawInput,
      riskLevel: "Unknown",
      aiMessage: "No matching diagnosis found in AI engine.",
      recommended: [],
      notRecommended: []
    });
  }

  /* =========================
     2️⃣ RISK CLASSIFICATION
  ========================= */

  const riskLevels = {
    diabetes: "High",
    heart: "Critical",
    cancer: "Critical",
    kidney: "Critical",
    liver: "High",
    stroke: "Critical",
    asthma: "Moderate",
    hypertension: "High",
    covid: "Moderate",
    arthritis: "Moderate"
  };

  const riskLevel = riskLevels[normalizedDiagnosis] || "Moderate";

  /* =========================
     3️⃣ FETCH POLICY RULES
  ========================= */

  const query = `
    SELECT company_name, policy_name, recommendation_type
    FROM insurance_rules
    WHERE LOWER(condition_keyword) LIKE ?
  `;

  db.query(query, [`%${normalizedDiagnosis}%`], (err, results) => {
    if (err) {
      console.error("Insurance Error:", err);
      return res.status(500).json({ message: "DB error" });
    }

    const recommended = results.filter(
      item => item.recommendation_type === "recommended"
    );

    const notRecommended = results.filter(
      item => item.recommendation_type === "not_recommended"
    );

    const aiMessage = `AI Analysis: ${normalizedDiagnosis.toUpperCase()} classified as ${riskLevel} risk condition. Policies covering long-term and critical care are prioritized.`;

    res.json({
      diagnosis: normalizedDiagnosis,
      riskLevel,
      aiMessage,
      recommended,
      notRecommended
    });
  });
});

module.exports = router;