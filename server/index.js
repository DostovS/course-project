const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
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
