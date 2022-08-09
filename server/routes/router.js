const express = require("express");
const router = express.Router();
const { homePage, addUser, updateUser, setSession,getSession,destroySession,setCookie,getCookie,destroyCookie } = require("../services/render");
const controller = require("../controller/controller");

router.get("/", homePage);
router.get("/add_user", addUser);
router.get("/update_user", updateUser);
router.get("/session", setSession);
router.get("/view-session", getSession);
router.get("/destroy", destroySession);
router.get("/cookie", setCookie);
router.get("/view-cookie", getCookie);
router.get("/destroy-cookie", destroyCookie);

// API ROUTES
router.post("/api/users", controller.addUser);
router.get("/api/users", controller.findUser);
router.put("/api/users/:id", controller.updateUser);
router.delete("/api/users/:id", controller.deleteUser);

module.exports = router;
