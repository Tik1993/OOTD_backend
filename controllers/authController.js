const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc login user
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a username and password" });
  }
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { UserInfo: { username: user.username, roles: user.roles } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const rehreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", rehreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return res.status(200).json({ accessToken });
});

// @desc refresh user
// @route POST /auth/register
// @access Private
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Access denied" });
  } else {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      asyncHandler(async (err, userDecoded) => {
        if (err) {
          return res.status(403).json({ message: "Access denied" });
        } else {
          const user = await User.findOne({
            username: userDecoded.username,
          }).lean();
          if (!user) {
            return res.status(403).json({ message: "User not found" });
          }
          const accessToken = jwt.sign(
            { UserInfo: { username: user.username, roles: user.roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          res.status(200).json({ accessToken });
        }
      })
    );
  }
});

//@desc logout a user
//@route POST /auth/logout
//@access Private
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    return res.status(200).json({ message: "Not logged in" });
  }
  res.clearCookie("refreshToken"),
    { httpOnly: true, sameSite: "None", secure: true };
  return res.status(200).json({ message: "Logged out" });
});

module.exports = { login, refresh, logout };
