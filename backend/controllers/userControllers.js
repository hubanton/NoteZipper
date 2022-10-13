const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({ name, email, password, pic });
    console.log("BRUh");
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        password: user.password,
      });
    } else {
      response.status(400);
      throw new Error("Error Occured");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Email could not be found or password is not correct");
  }
});

module.exports = { registerUser, authUser };
