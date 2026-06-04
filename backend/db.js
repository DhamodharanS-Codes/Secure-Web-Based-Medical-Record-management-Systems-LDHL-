const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // change only if your MySQL user is different
  password: "Dhamudsj@21",          // add password if you have set one
  database: "health_locker", // your database name
  multipleStatements: true
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

// Export connection
module.exports = db;
