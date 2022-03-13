const { response } = require("express");

const authCreateUser = (req, res = response) => {
  res.json({
    ok: true,
    message: "Register",
  });
};

const authLoginUser = (req, res) => {
  res.json({
    ok: true,
    message: "loginUser",
  });
};

const authRevalidateToken = (req, res) => {
  res.json({
    ok: true,
    message: "Renew",
  });
};

module.exports = {
  authCreateUser,
  authLoginUser,
  authRevalidateToken,
};
