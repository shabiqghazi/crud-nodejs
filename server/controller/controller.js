const mongoose = require("mongoose");
const usersModel = require("../model/model");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config({ path: "../../config.env" });

module.exports.addUser = (req, res) => {
  const user = new usersModel({
    nama: req.body.nama,
    email: req.body.email,
    jenisKelamin: req.body.jenisKelamin,
    status: req.body.status,
  });
  user.save();
  try {
    res.redirect(process.env.BASE_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports.findUser = (req, res) => {
  if (req.query.id) {
    usersModel
      .findById(req.query.id)
      .then((user) => res.send(user))
      .catch((err) => console.log(err));
  } else {
    usersModel
      .find()
      .then((users) => {
        res.send(users);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }
};

module.exports.updateUser = (req, res) => {
  usersModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((response) => res.send({ message: "Data berhasil diubah" }))
    .catch((err) => console.log(err));
};

module.exports.deleteUser = async (req, res) => {
  usersModel
    .findByIdAndDelete(req.params.id)
    .then((response) => res.send({ message: "Data berhasil dihapus" }))
    .catch((err) => console.log(err));
};
