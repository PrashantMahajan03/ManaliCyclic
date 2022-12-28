//jshint esversion:6
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbConfig = require("./config/dbConfig");
const storage = require("./config/firebase");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./client/build")));

// app.use("/", express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Node Server Started at Port " + port);
});
