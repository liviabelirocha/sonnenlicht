const { verify } = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken)
    return res.status(401).json({ message: "Token not provided" });

  const [, token] = authToken.split(" ");

  try {
    const { user } = verify(token, process.env.jwtSecret);

    req.user_id = user.id;

    return next();
  } catch {
    return res.status(401).json({ message: "Expired token" });
  }
};

module.exports = ensureAuth;
