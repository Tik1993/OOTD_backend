const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { default: mongoose, get } = require("mongoose");

// @desc Get all Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();
  if (users.length === 0) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Creat a new User
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provde a username and password" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const checkedUser = await User.findOne({ username }).lean();
  if (checkedUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new User({ username, password: hashedPassword, roles });
  const result = await user.save();
  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json({ message: "User could not be created" });
  }
});

// @desc Update User
// @route PATCH /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  // Check if the user exists
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // hadnle the update of username
  if (req.body.username) {
    const checkedUser = await User.findOne({
      username: req.body.username,
    }).lean();
    if (checkedUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    user.username = req.body.username;
  }

  // handle the update of password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }

  // handle the update of roles
  if (req.body.roles) {
    if (!Array.isArray(req.body.roles) || req.body.roles.length === 0) {
      return res
        .status(400)
        .json({ message: "Roles must be an array with values" });
    }
    user.roles = req.body.roles;
  }

  //handle the update of favouriteItems
  if (req.body.itemId) {
    if (!user.favouriteItems.includes(req.body.itemId)) {
      user.favouriteItems.push(req.body.itemId);
    } else {
      return res
        .status(400)
        .json({ message: "Item is already in the favourite list" });
    }
  }
  const updatedUser = await user.save();
  return res.json(updatedUser);
});

// @desc Get User detail by access token
// @route Get /users/detail
// @access Private
const getUserDetail = asyncHandler(async (req, res) => {
  const userid = req.userId;

  const userInfo = await User.findOne(
    { _id: userid },
    "username favouriteItems currentItems -_id"
  ).lean();

  return res.json(userInfo);
});
module.exports = { getAllUsers, createUser, updateUser, getUserDetail };
