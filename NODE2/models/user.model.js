const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const UserModel = sequelize.define("UserModel", {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
});

module.exports = UserModel;
