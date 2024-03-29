const express = require("express");
const LoginController = require("./controllers/LoginController");

if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv");

  console.log("hshishih");

  dotenv.config();
}

const app = express();
const sequelize = require("./models/sequelize");
const RegistrationController = require("./controllers/RegistrationController");
const DashboardController = require("./controllers/DashboardController");
const AuthVerifyController = require("./controllers/AuthVerifyController");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/dashboard", DashboardController);
app.get("/verify-auth", AuthVerifyController);

app.get("/register", (req, res) => {
  return res.render("registration", { message: "" });
});

app.post("/register", RegistrationController);

app.post("/login", LoginController);

app.delete("/user/:id", (req, res) => {
  return res.send("user deleted");
});

app.get("/user/:id", (req, res) => {
  return res.send("user data returned");
});

app.get("/products/:category/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  return res.send("This is a static page from the server!");
});

app.listen(3000, function () {
  sequelize.sync();
});

// localhost:3000/profile/1
