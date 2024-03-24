const validator = require("validator");

const LoginController = (req, res) => {
  const { username, password } = req.body;

  if (!username) return res.render("login", { message: "empty username" });
  if (!password) return res.render("login", { message: "empty password" });

  if (!validator.isEmail(username)) {
    return res.render("login", { message: "username is not a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.render("login", { message: "password is not strong" });
  }

  return res.render("login", { message: "login successfully" });
};

module.exports = LoginController;
