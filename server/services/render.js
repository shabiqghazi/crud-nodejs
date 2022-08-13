const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

const checkAuthFailed = (req, res) => {
  if(!req.session.isLogin){
    res.redirect('/login')
  }
}

exports.homePage = async (req, res) => {
  checkAuthFailed(req,res)
  const loggedUser = {
    email: req.session.email,
    isLogin: req.session.isLogin
  }
  let users = [];
  await axios(`${process.env.BASE_URL}api/users`)
    .then((res) => (users = res.data))
    .catch((err) => console.log(err));

  res.render("index", { users, loggedUser });
};

exports.addUser = (req, res) => {
  checkAuthFailed(req,res)
  res.render("add_user");
};

exports.updateUser = async (req, res) => {
  checkAuthFailed(req,res)
  let user = {};
  await axios(`${process.env.BASE_URL}api/users`, {
    params: {
      id: req.query.id,
    },
  })
    .then((res) => {
      user = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("update_user", { user });
};

exports.loginPage = (req, res) => {
  res.render("login")
}