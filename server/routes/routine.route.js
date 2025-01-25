const express = require("express");
const router = express.Router();

const { addTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todos.controller")
const {addJournal,getJournals,updateJournal,deleteJournal} = require("../controllers/journal.controller")
const logout = require("../controllers/logout.controller")

router.post("/addTodo",addTodo)
router.get("/todos",getTodos)
router.patch("/updateTodo",updateTodo)
router.delete("/deleteTodo",deleteTodo)

router.post("/addJournal",addJournal)
router.get("/journals",getJournals)
router.patch("/updateJournal",updateJournal)
router.delete("/deleteJournal/", deleteJournal)

router.delete("/logout", logout);


module.exports = router