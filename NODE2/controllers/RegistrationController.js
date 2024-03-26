const validator = require("validator");
const UserModel = require("./../models/user.model");

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

  const user = UserModel.findOne({
    where: { email },
  });

  if (user) {
    return res.render("registration", {
      message: "user already exist",
    });
  }

  try {
    await UserModel.create({ email, password });
  } catch (err) {
    console.error(err);
    return res.render("registration", { message: "unexpected error" });
  }

  return res.render("registration", { message: "registration successful" });
};

module.exports = RegistrationController;
