import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import EmergencyView from "./pages/EmergencyView";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminSummary from "./pages/admin/AdminSummary";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import ExpertDashboard from "./pages/ExpertDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
       
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/emergency/:token" element={<EmergencyView />} />
<Route path="/expert-dashboard" element={<ExpertDashboard />} />

        {/* Admin Nested Routes */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminSummary />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="audit" element={<AdminAuditLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
