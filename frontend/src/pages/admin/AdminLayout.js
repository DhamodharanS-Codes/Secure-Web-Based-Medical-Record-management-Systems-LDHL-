import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/AdminDashboard.css";

export default function AdminLayout() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>

        <Link className="admin-link" to="/admin-dashboard">
          System Summary
        </Link>

        <Link className="admin-link" to="/admin-dashboard/users">
          Users
        </Link>

        <Link className="admin-link" to="/admin-dashboard/audit">
          Audit Logs
        </Link>

        <button
          className="admin-logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  );
}