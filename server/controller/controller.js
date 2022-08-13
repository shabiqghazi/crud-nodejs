const mongoose = require("mongoose");
const usersModel = require("../model/model");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

const checkAuthFailed = (req, res) => {
  if(!req.session.isLogin){
    res.redirect('/login')
  }
}

exports.addUser = (req, res) => {
  checkAuthFailed(req,res)
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

exports.findUser = (req, res) => {
  checkAuthFailed(req,res)
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

exports.updateUser = (req, res) => {
  checkAuthFailed(req,res)
  usersModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((response) => res.send({ message: "Data berhasil diubah" }))
    .catch((err) => console.log(err));
};

exports.deleteUser = async (req, res) => {
  checkAuthFailed(req,res)
  usersModel
    .findByIdAndDelete(req.params.id)
    .then((response) => res.send({ message: "Data berhasil dihapus" }))
    .catch((err) => console.log(err));
};

exports.login = (req, res) => {
  const credential = {
    email: 'shabiqghazi@gmail.com',
    password: '123456'
  }
  if(req.body.email){
    if(req.body.email === credential.email){
      if(req.body.password === credential.password){
        req.session.isLogin = true,
        req.session.email = credential.email
        res.redirect('/')
      } 
    }
  } 
  res.redirect('/login')
}
exports.logout = (req,res) => {
  req.session.destroy(err => 'logout success')
  return res.redirect('/login')
}