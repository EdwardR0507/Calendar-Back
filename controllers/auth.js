const bcrypt = require("bcryptjs");
const User = require("../models/User");

const authCreateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "User already exists with this email",
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      message: "Successful registration",
      uid: user._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }

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
