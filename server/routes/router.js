const express = require("express");
const router = express.Router();
const { homePage, addUser, updateUser } = require("../services/render");
const controller = require("../controller/controller");

router.get("/", homePage);
router.get("/add_user", addUser);
router.get("/update_user", updateUser);

// API ROUTES
router.post("/api/users", controller.addUser);
router.get("/api/users", controller.findUser);
router.put("/api/users/:id", controller.updateUser);
router.delete("/api/users/:id", controller.deleteUser);

module.exports = router;
