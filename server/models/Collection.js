const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const Collection = new Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "No description" },
  createdAt: { type: Object, default: DateTime.now().c },
});

module.exports = model("collection", Collection);