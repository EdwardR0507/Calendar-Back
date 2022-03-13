const authCreateUser = (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    message: "Successful registration ",
    user: {
      name,
      email,
      password,
    },
  });
};

const authLoginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    message: "Successful login",
    user: {
      email,
      password,
    },
  });
};

const authRevalidateToken = (req, res) => {
  res.status(201).json({
    ok: true,
    message: "Renew",
  });
};

module.exports = {
  authCreateUser,
  authLoginUser,
  authRevalidateToken,
};
