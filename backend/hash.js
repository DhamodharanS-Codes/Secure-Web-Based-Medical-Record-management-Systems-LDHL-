const bcrypt = require("bcrypt");

async function generateHash() {
  const password = "doctor123";   // change password here if needed
  const hash = await bcrypt.hash(password, 10);
  console.log("Generated Hash:");
  console.log(hash);
}

generateHash();
