const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../schemas/user.schema')

router.post("/signup", async (req, res) => {
    const { username, password, email, imageUrl } = req.body;
    const user = await User.findOne({
        email
    })
    if (user) return res.json({ "message": "User exists" })
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt)
    const newUser = await User.create({
        username, password:hashed, email, imageUrl
    })
    const token = await jwt.sign({ username:newUser.username,userId:newUser._id}, process.env.JWT_SECRET);
    res.cookie('token',token)
    res.json({
        token
    })
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ "message": "User doesn't exist" })
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword && user) {
         const token = await jwt.sign(
           { username:user.username, userId: user._id },
           process.env.JWT_SECRET
         );
         res.cookie("token", token);
         res.json({
           token
         });
    } else {
        res.json({ "message": "Wrong credentials" });
    }
    
})


module.exports = router