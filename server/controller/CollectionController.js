const User = require("../models/User");
const Collection = require("../models/Collection");

class collectionRouter{
    async create(req, res){
        const {title, owner, description} = req.body;
        const collection = new Collection({
            title: title,
            owner: owner,
            description: description
        })
        await collection.save();
        res.status(200).json({message: `Collection ${title} created by ${owner}`});
    }
    async getCollection(req, res) {
      try {
        const result = await Collection.findOne({ _id: req.params.id });
        res.status(202).json(result);
      } catch (err) {
        console.log(err);
      }
    }
  
    async getAllCollections(req, res) {
      try {
        const result = await Collection.find({});
        res.status(202).json(result);
      } catch (err) {
        console.log(err);
      }
    }
  
    async getUserCollections(req, res) {
      try {
        const id = req.params.id;
        const result = await Collection.find();
        const userCollections = result.filter((collection) => {
          return collection.user_id === id;
        });
        res.status(200).json(userCollections);
      } catch (err) {
        console.log(err);
      }
    }
    async getBiggestCollections(req, res) {
      try {
        const temp = [];
        const collections = await Collection.find({});
        for (let i = 0; i < collections.length; i++) {
          const items = await Item.find({ collectionID: collections[i].id });
          temp.push({
            collectionID: collections[i]._id,
            itemsNum: items.length,
          });
        }
        temp.sort((a, b) => parseFloat(b.itemsNum) - parseFloat(a.itemsNum));
        const result = [];
        for (let x = 0; x < temp.length; x++) {
          const collection = await Collection.findById({
            _id: temp[x].collectionID,
          });
          result.push(collection);
        }
        res.status(202).json(result.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    }
    async getCollectionsLength(req, res) {
      try {
        const collectionID = req.params.id;
        const result = await Item.find({ collectionID: collectionID });
        res.status(202).json(result.length);
      } catch (err) {
        console.log(err);
      }
    }
  
    async updateCollection(req, res) {
      try {
        const { id, title, description } = req.body;
        await Collection.findOneAndUpdate(
          { _id: req.params.id },
          { title: title, description: description }
        );
        res.status(202).json({ message: `Collection ${title} updated` });
      } catch (err) {
        console.log(err);
      }
    }
  
    async deleteCollection(req, res) {
      try {
        await Collection.findOneAndDelete({ _id: req.params.id });
        res.status(204).json({ message: `Collection deleted` });
      } catch (err) {
        console.log(err);
      }
    }
}
module.exports = new collectionRouter();