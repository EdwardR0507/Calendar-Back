const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  const payload = {
    uid,
    name,
  };
  return jwt.sign(payload, process.env.SECRET_JWT_KEY, {
    expiresIn: "2h",
  });
};
module.exports = {
  generateJWT,
};
