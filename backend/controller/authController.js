const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "please add all fields" });
  }

  //check if user exist
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400).json({ message: "User already exixt" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "invalid user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Unauthorized access" });
  }
};

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SEC,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  register,
  login,
};
