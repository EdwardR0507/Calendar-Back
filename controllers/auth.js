const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");
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

    // Generate token
    const token = generateJWT(user._id, user.name);

    res.status(201).json({
      ok: true,
      message: "Successful registration",
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }
};

const authLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "User does not exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = generateJWT(user._id, user.name);

    res.status(200).json({
      ok: true,
      message: "Successful login",
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }
};

const authRevalidateToken = (req, res) => {
  const { uid, name } = req;

  // Generate a new JWT token
  const token = generateJWT(uid, name);

  res.status(200).json({
    ok: true,
    message: "Revalidate token",
    token,
    uid,
    name,
  });
};

module.exports = {
  authCreateUser,
  authLoginUser,
  authRevalidateToken,
};
