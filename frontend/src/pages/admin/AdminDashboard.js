import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <Link to="/admin-dashboard">System Summary</Link>
        <Link to="/admin-dashboard/users">Users</Link>
        <Link to="/admin-dashboard/audit">Audit Logs</Link>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  );
}