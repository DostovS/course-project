const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");
const collectionsController = require("./controller/CollectionController");
const itemController = require("./controller/ItemController");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);
router.get("/users", authController.getAllUsers);
router.put("/user/update/:id", authController.updateUser);
router.get("/user/:id", authController.getUser);
router.post("/user", authController.getUserByUsername);
router.put("/user/:id/change-status", authController.changeStatus);
router.delete("/user/:id/delete", authController.deleteUser);

//Colleciton routes
router.post("/collection/create", collectionsController.create);
router.get("/feed/collection", collectionsController.getBiggestCollections);
router.get("/collection/:id", collectionsController.getCollection);
router.get("/collection", collectionsController.getAllCollections);
router.get(
  "/collection/length/:id",
  collectionsController.getCollectionsLength
);
router.get("/collection/user/:id", collectionsController.getUserCollections);
router.put("/update/collection/:id", collectionsController.updateCollection);
router.delete("/delete/collection/:id", collectionsController.deleteCollection);

//Item router
router.post("/item/create/:username/:collectionID", itemController.createItem);
router.get("/items", itemController.getAllItems);
router.get("/item/get/:id", itemController.getItem);
router.put("/item/update/:id", itemController.updateItem);
router.get("/items/:collectionID", itemController.getItemsFromCollection);
router.get("/recent/:page", itemController.getRecentItems);
router.put("/item/like", itemController.likeItem);
router.put("/item/unlike", itemController.unlikeItem);
router.delete("/item/delete/:id", itemController.deleteItem);
router.put("/item/comment/:itemID", itemController.commentItem);
router.post("/item/tag", itemController.searchTags);


module.exports = router;