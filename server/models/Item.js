const { Schema, model } = require("mongoose");
const { DateTime } = require("luxon");

const Item = new Schema({
  username: { type: String, required: true },
  collectionID: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "No Description" },
  image: { type: String, default: "" },
  tags: { type: Array, default: [] },
  price: { type: Number, default: null },
  year: { type: String, default: null },
  from: { type: String, default: "" },
  link: { type: String, default: "" },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
});

module.exports = model("item", Item);