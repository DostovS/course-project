const Router = require("express");
const router = new Router();
const authController = require("./controller/authController");

//Auth routes
router.post("/user/registration", authController.registration);
router.post("/user/login", authController.login);

module.exports = router;
