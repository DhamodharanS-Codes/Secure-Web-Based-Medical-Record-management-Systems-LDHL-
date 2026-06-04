const bcrypt = require("bcryptjs");

bcrypt.hash("doctor123", 10).then(hash => {
  console.log(hash);
});
