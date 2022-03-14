const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No token provided",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }
};
module.exports = { validateJWT };
