import { sign } from "jsonwebtoken";
import { accessTokenExpirationTimeInSeconds } from "../configs/jwtConfig";
require("dotenv").config();

function generateJwt(
  user_id,
  user_email,
  user_document,
  user_role,
  user_subroles
) {
  const payload = {
    user: {
      id: user_id,
      email: user_email,
      document: user_document,
      role: user_role,
      subroles: user_subroles,
    },
  };

  return sign(payload, process.env.jwtSecret, {
    expiresIn: accessTokenExpirationTimeInSeconds,
  });
}

export default generateJwt;
