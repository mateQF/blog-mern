const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ message: "[ACCESS DENIED] - No token provided" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;

    next();
  });
};

module.exports = authRequired;
