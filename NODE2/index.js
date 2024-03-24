const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("index");
});

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
  console.log("server is running");
});

// localhost:3000/profile/1
