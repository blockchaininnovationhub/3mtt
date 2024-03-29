const validator = require("validator");
const jwt = require("jsonwebtoken");

const DashboardController = async (req, res) => {
  return res.render("dashboard", {});
};

module.exports = DashboardController;
