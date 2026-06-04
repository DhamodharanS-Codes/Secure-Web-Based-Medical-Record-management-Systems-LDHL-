const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logAudit = require("../utils/auditLogger");

// ===============================
// REGISTER USER
// ===============================
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const checkSql = "SELECT id FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, results) => {
      if (err) {
        console.error("CHECK USER ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [name, email, hashedPassword, role],
        (err, result) => {
          if (err) {
            console.error("REGISTER ERROR:", err);
            return res.status(500).json({ message: "Registration failed" });
          }

          logAudit(
            result.insertId,
            role,
            "REGISTER_SUCCESS",
            "User registered successfully",
            result.insertId,
            "NORMAL"
          );

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });

  } catch (error) {
    console.error("REGISTER EXCEPTION:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// LOGIN USER
// ===============================
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    logAudit(
      user.id,
      user.role,
      "LOGIN_SUCCESS",
      "User logged in successfully",
      user.id,
      "NORMAL"
    );

    res.json({
      token,
      role: user.role,
      userId: user.id
    });
  });
};