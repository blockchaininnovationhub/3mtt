const validator = require("validator");
const jwt = require("jsonwebtoken");

const AuthVerifyController = async (req, res) => {
  const token = req.headers?.authorization;

  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (isVerified) {
      return res.status(200).json({});
    }
  } catch (err) {}

  return res.status(401).json({});
};

module.exports = AuthVerifyController;
