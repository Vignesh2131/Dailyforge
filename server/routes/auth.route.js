const express = require('express');
const protectRouter = require("../middleware/auth.middleware")
const router = express.Router();

const {signin,signup,checkAuth} = require("../controllers/auth.controller")

router.post("/signup",signup);
router.post("/signin", signin);
router.get("/checkAuth",protectRouter,checkAuth)

module.exports = router