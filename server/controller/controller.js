const mongoose = require("mongoose");
const usersModel = require("../model/model");

module.exports.addUser = (req, res) => {
  // console.log(req.body);
  const user = new usersModel({
    nama: req.body.nama,
    email: req.body.email,
    jenisKelamin: req.body.jenisKelamin,
    status: req.body.status,
  });
  user.save();
  try {
    res.send({
      data: req.body,
    });
  } catch (error) {}
};

module.exports.findUser = (req, res) => {
  usersModel
    .find()
    .then((users) => {
      res.send({
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

module.exports.updateUser = async (req, res) => {};

module.exports.deleteUser = async (req, res) => {};
