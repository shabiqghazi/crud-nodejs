const express = require("express");
const router = express.Router();
const { homePage, addUser, updateUser } = require("../services/render");

router.get("/", homePage);
router.get("/add_user", addUser);
router.get("/update_user", updateUser);

module.exports = router;
