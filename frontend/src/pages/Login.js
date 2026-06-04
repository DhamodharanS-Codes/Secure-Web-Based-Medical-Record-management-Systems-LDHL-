import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();   // 🔥 VERY IMPORTANT

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    console.log("LOGIN RESPONSE:", res.data);  // 🔥 DEBUG

   localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
localStorage.setItem("userId", res.data.userId);


    console.log("AFTER STORAGE:", localStorage); // 🔥 DEBUG

    if (res.data.role === "patient") {
      navigate("/patient-dashboard");
    } else if (res.data.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (res.data.role === "admin") {
      navigate("/admin-dashboard");
    } else if (res.data.role === "expert") {
      navigate("/expert-dashboard");
    }

  } catch (error) {
    alert("Invalid credentials");
    console.error(error);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Lifetime Digital Health Locker</h2>
        <p className="subtitle">Secure Medical Record Access</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" className="primary-btn" onClick={handleLogin}>
  Login
</button>

        <p>
  Don't have an account?{" "}
  <span onClick={() => navigate("/register")} style={{cursor:"pointer",color:"blue"}}>
    Register
  </span>
</p>


        <p className="footer-text">
          © 2026 Digital Health Locker
        </p>
      </div>
    </div>
  );
}
