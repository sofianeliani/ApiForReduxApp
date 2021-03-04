const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

exports.content = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.userContent = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminContent = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getUserById =  async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};