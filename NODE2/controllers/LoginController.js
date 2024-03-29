const validator = require("validator");
const UserModel = require("./../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "empty email" });
  if (!password) return res.status(400).json({ message: "empty password" });

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "username is not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "password is not strong" });
  }

  const hashingAlgorithm = crypto.createHash("sha256");

  hashingAlgorithm.update(password);

  const hashedPassword = hashingAlgorithm.digest("hex");

  const user = await UserModel.findOne({
    where: { email, password: hashedPassword },
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).json({ message: token });
  }

  return res.status(400).json({ message: "login failed" });
};

module.exports = LoginController;
