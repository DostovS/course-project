const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const User = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  createdAt: { type: Object, default: DateTime.now().c },
});

module.exports = new model("user", User);