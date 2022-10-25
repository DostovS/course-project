const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: "./.env" });
const {DateTime} = require("luxon")

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected");
    })
    app.listen(PORT, () => {
      console.log(`\nServer started on port ${PORT}🚀`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
