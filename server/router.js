const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");
const collectionsController = require("./controller/CollectionController");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);
router.get("/users", authController.getAllUsers);
router.put("/user/update/:id", authController.updateUser);
router.get("/user/:id", authController.getUser);
router.post("/user", authController.getUserByUsername);
router.put("/user/:id/change-status", authController.changeStatus);
router.delete("/user/:id/delete", authController.deleteUser);

//Collection router
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
module.exports = router;
