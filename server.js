const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/testUserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  whatsapp: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", (req, res) => {
  if (!req.body.name || !req.body.whatsapp || !req.body.email) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newUser = new User({
    name: req.body.name,
    whatsapp: req.body.whatsapp,
    email: req.body.email,
  });

  newUser.save((err) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
