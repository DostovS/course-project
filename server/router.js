const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);
router.get("/users", authController.getAllUsers);
router.put("/user/update/:id", authController.updateUser);
router.get("/user/:id", authController.getUser);
router.post("/user", authController.getUserByUsername);
router.put("/user/:id/change-status", authController.changeStatus);
router.delete("/user/:id/delete", authController.deleteUser);

module.exports = router;