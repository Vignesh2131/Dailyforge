const express = require("express");
const router = express.Router();

const { Todos, Habit, Journal } = require("../schemas/routine.schema")
const authMiddleware = require("../middleware/auth.middleware")
router.get("/check", authMiddleware, async (req, res) => {
   
})

module.exports = router