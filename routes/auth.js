/*
    User routes /auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  authCreateUser,
  authLoginUser,
  authRevalidateToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/jwtValidator");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
    validateFields,
  ],
  authCreateUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
    validateFields,
  ],
  authLoginUser
);

router.get("/renew", validateJWT, authRevalidateToken);

module.exports = router;
