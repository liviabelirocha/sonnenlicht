const { sign } = require("jsonwebtoken");

require("dotenv").config();

function generateJwt(user_id, user_email, user_role, user_name) {
  const payload = {
    user: {
      id: user_id,
      email: user_email,
      role: user_role,
      name: user_name,
    },
  };

  return sign(payload, process.env.jwtSecret);
}

module.exports = generateJwt;
