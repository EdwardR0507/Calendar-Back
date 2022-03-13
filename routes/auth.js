/*
    User routes /auth
    host + /api/auth
*/
const { Router } = require("express");
const {
  authCreateUser,
  authLoginUser,
  authRevalidateToken,
} = require("../controllers/auth");

const router = Router();

router.post("/new", authCreateUser);

router.post("/", authLoginUser);

router.get("/renew", authRevalidateToken);

module.exports = router;
