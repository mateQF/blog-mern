const User = require("../models/User.js");
const Post = require("../models/Post.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { password, username } = req.body;
  const salt = bcrypt.genSaltSync(10);

  try {
    if (!username || !password) {
      return res.status(400).json("Invalid credentials");
    }
    const userFound = await User.findOne({ username });
    if (userFound)
      return res.status(400).json("The username is already in use");

    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ password: passwordHash, username });
    const userSaved = await newUser.save();
    const token = await createAccessToken({
      id: userSaved.id,
      username: userSaved.username,
    });

    res.cookie("token", token);
    res.status(200).json({
      id: userSaved._id,
      username: userSaved.username,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username }).select("+password");
    if (!userFound) return res.status(400).json("Invalid credentials");

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = await createAccessToken({
      id: userFound.id,
      username: userFound.username,
    });

    res.cookie("token", token);
    res.status(200).json({
      id: userFound.id,
      username: userFound.username,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(404).json({ message: "User not found" });

  const userPosts = await Post.find({ author: userFound._id }).populate("author", ["username"])

  return res.status(200).json({
    id: userFound.id,
    username: userFound.username,
    posts: userPosts
  });
}

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
    });
  });
};

module.exports = {
  register,
  login,
  verifyToken,
  logout,
  profile,
};
