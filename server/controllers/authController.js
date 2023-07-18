const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");



const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "user already exists." });
  }
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id, user.email);

  res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ error: "password is incorrect" });
  }
  const token = generateToken(user._id, user.email);

  res.status(200).json({ token });
};

const getAllUsers = async(req,res,next)=>{
  const users = await User.find({})
  res.status(200).json(users)
}

const getUser = async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(user){
    res.status(200).json(user)
  }
  else{
    res.status(404).json({"error":"user not found"})
  }
}

module.exports = { register, login,getAllUsers,getUser };
