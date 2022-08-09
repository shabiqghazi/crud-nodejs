const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

exports.homePage = async (req, res) => {
  let users = [];
  await axios(`${process.env.BASE_URL}api/users`)
    .then((res) => (users = res.data))
    .catch((err) => console.log(err));

  res.render("index", { users });
};

exports.addUser = (req, res) => {
  res.render("add_user");
};

exports.updateUser = async (req, res) => {
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

exports.setSession = (req,res) => {
  req.session.name = "Shabiq Ghazi Arkaan"
  req.session.nim = 1207050118
  return res.send("Session set")
}

exports.getSession = (req, res) => {
  return res.send(`nama : ${req.session.name}
  nim : ${req.session.nim}`)
}

exports.destroySession = (req,res) => {
  req.session.destroy(err => console.log('Session destroyed'))
  return res.end()
}

exports.setCookie = (req,res) => {
  res.cookie('username', 'shabiq ghazi')
  res.cookie('email', 'sgarkaan02@gmail.com')
  return res.send("Cookie set")
}

exports.getCookie = (req, res) => {
  return res.send(`nama : ${req.cookies.username}
  email : ${req.cookies.email}`)
}

exports.destroyCookie = (req,res) => {
  res.clearCookie('username')
  res.clearCookie('email')
  return res.end()
}