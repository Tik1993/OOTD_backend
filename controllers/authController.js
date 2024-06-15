const asyncHandler = require("express-async-handler");

// @desc login user
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  console.log("login");
  res.send("login");
});

// @desc refresh user
// @route POST /auth/register
// @access Private
const refresh = asyncHandler(async (req, res) => {
  console.log("refresh");
  res.send("refresh");
});

//@desc logout a user
//@route POST /auth/logout
//@access Private
const logout = asyncHandler(async (req, res) => {
  console.log("logout");
  res.send("logout");
});

module.exports = { login, refresh, logout };
