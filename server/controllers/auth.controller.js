
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user.schema");


const signup =  async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (user) return res.status(400).json({ message: "User exists" });
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    username,
    password: hashed,
    email,
  });
  const token = await jwt.sign(
    { username: newUser.username, userId: newUser._id },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);
  res.status(201).json({
    token,
  });
};

const signin =  async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User doesn't exist" });
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (verifyPassword && user) {
    const token = await jwt.sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET
    );
    console.log(token)
    res.cookie("token", token);
    res.status(201).json({
      token,
    });
  } else {
    res.status(400).json({ message: "Wrong credentials" });
  }
};




module.exports = {signin, signup}