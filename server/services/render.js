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
