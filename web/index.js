const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", async (req, res) => {
  const response = await axios.get("http://mailer/");

  res.render("index", { emails: response.data });
});

app.post("/newsletter", async (req, res) => {
  const response = await axios.post("http://mailer/", {
    email: req.body.email,
  });
  res.json(response.data);
});

app.listen(80, () => {
  console.log(`Server run on port 80`);
});
