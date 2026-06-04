require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const adminRoutes = require("./routes/adminRoutes");
const recordApprovalRoutes = require("./routes/recordApprovalRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const doctorRecordsRoutes = require("./routes/doctorRecordsRoutes");

// ✅ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ✅ CSP FIX
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/medicalRecordRoutes"));
app.use("/api/permissions", require("./routes/permissionRoutes"));
app.use("/api/audit", require("./routes/auditRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/insurance-rules", require("./routes/insuranceRuleRoutes"));
app.use("/api/insurance-link", require("./routes/insuranceLinkRoutes"));

app.use("/api/admin", adminRoutes);
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/record-approval", recordApprovalRoutes);
app.use("/api/emergency", require("./routes/emergencyRoutes"));
app.use("/api/doctor-records", doctorRecordsRoutes);


// ✅ TEST ROUTE
app.get("/test", (req, res) => {
  res.json({ message: "Backend working" });
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ✅ DB CONNECT
require("./config/db");
