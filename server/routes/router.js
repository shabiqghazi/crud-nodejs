const express = require("express");
const router = express.Router();
const { homePage, addUser, updateUser } = require("../services/render");
const controller = require("../controller/controller");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");

router.get("/", homePage);
router.get("/add_user", addUser);
router.get("/update_user", updateUser);

// API ROUTES
router.post("/api/users", verifyUser, controller.addUser);
router.get("/api/users", verifyUser, controller.findUser);
router.put("/api/users/:id", verifyUser, controller.updateUser);
router.delete("/api/users/:id", verifyUser, controller.deleteUser);

// jwt-auth
router.post('/login', (req,res) => {
  const user = {
    id: 1,
    nama: 'Shabiq Ghazi Arkaan',
    email: 'shabiqghazi@gmail.com'
  }
  jwt.sign(user, 'pr1v4t3 k3y', {expiresIn:'30m'}, (err,token) => {
    if(err){
      console.log(err)
      res.sendStatus(304)
      return
    }
    const Token = token
    res.json({
      user, token:token
    })
  })
})

function verifyUser(req,res,next) {
  const token = req.headers.bearer
  jwt.verify(token, 'pr1v4t3 k3y', (err, data) => {
    if(err){
      console.log(err)
      res.json(err)
      return
    }
    req.body = data
    next()
  })
  
}

module.exports = router;
