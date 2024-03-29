const validator = require("validator");
const UserModel = require("./../models/user.model");
const crypto = require("crypto");

const RegistrationController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.render("registration", { message: "empty email" });
  if (!password)
    return res.render("registration", { message: "empty password" });

  if (!validator.isEmail(email)) {
    return res.render("registration", { message: "email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.render("registration", { message: "password is not strong" });
  }

  const user = await UserModel.findOne({
    where: { email },
  });

  const hashingAlgorithm = crypto.createHash("sha256");

  hashingAlgorithm.update(password);

  const hashedPassword = hashingAlgorithm.digest("hex");

  if (user) {
    return res.render("registration", {
      message: "user already exist",
    });
  }

  try {
    await UserModel.create({ email, password: hashedPassword });
  } catch (err) {
    console.error(err);
    return res.render("registration", { message: "unexpected error" });
  }

  return res.render("registration", { message: "registration successful" });
};

module.exports = RegistrationController;
