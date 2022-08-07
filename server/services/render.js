const axios = require("axios");

exports.homePage = async (req, res) => {
  let users = [];
  await axios("http://localhost:3000/api/users")
    .then((res) => (users = res.data.data))
    .catch((err) => console.log(err));

  res.render("index", { users });
};

exports.addUser = (req, res) => {
  res.render("add_user");
};

exports.updateUser = (req, res) => {
  res.render("update_user");
};
