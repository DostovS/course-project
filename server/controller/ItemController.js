const Item = require("../models/Item");
const User = require("../models/User");
const Collection = require("../models/Collection");

class ItemController {
  async createItem(req, res) {
    try {
      const r = req.body;
      const username = req.params.username;
      const collectionID = req.params.collectionID;
      const item = new Item({
        username: username,
        collectionID: collectionID,
        name: r.name,
        description: r.description,
        image: r.image,
        tags: r.tags,
        price: r.price,
        year: r.year,
        from: r.from,
      });
      await item.save().then(() => {
        res.status(202).json(`Item ${r.name} by ${username} is created`);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async updateItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        res.status(404).json("Item not found");
      }
      const r = req.body;
      item.name = r.name;
      item.description = r.description;
      item.image = r.image;
      item.tags = r.tags;
      item.price = r.price;
      item.year = r.year;
      item.from = r.from;
      await item.save();
      res.status(204).json({ message: "Item updated" });
    } catch (err) {
      console.log(err);
    }
  }
  async getItemsFromCollection(req, res) {
    try {
      const collectionID = req.params.collectionID;
      const result = await Item.find({ collectionID: collectionID });
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async getAllItems(req, res) {
    try {
      const result = await Item.find({});
      res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async getRecentItems(req, res) {
    try {
      const page = req.params.page * 1;
      const result = await Item.find({});
      res.status(200).json(result.reverse().splice(page * 5, 5));
      //   res.status(202).json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async likeItem(req, res) {
    try {
      const { username, itemID } = req.body;
      const item = await Item.findOne({ _id: itemID });
      item.likes.push(username);
      await item.save();
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async unlikeItem(req, res) {
    try {
      const { username, itemID } = req.body;
      const item = await Item.findOne({ _id: itemID });
      item.likes.pop(username);
      await item.save();
      res.status(202).json(item);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        res.status(404).json("Item not found");
      }
      await item.remove();
      res.status(204).json({ message: "Item deleted" });
    } catch (err) {
      console.log(err);
    }
  }
  async commentItem(req, res) {
    const id = req.params.itemID;
    const { commentID, username, comment } = req.body;
    const item = await Item.findById(id);
    const date = new Date();
    const data = {
      commentID: commentID,
      username: username,
      comment: comment,
      date: date,
    };
    item.comments.unshift(data);
    await item.save();
    res.status(202).json(item);
  }
  async searchTags(req, res) {
    const { tag } = req.body;
    const items = await Item.find({});
    const result = [];
    for (let i = 0; i < items.length; i++) {
      for (let x = 0; x < items[i].tags.length; x++) {
        if (items[i].tags[x].tag == tag) {
          result.push(items[i]);
        }
      }
    }
    res.status(202).json(result);
  }
}

module.exports = new ItemController();