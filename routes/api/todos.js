const express = require("express");
const router = express.Router();
const passport = require("passport");

const Todo = require("../../models/Todo");
const User = require("../../models/User");

const validateTodoInput = require("../../validation/Todo");

// @route GET api/todo/test
// @desc Tests todo route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "todos works" }));


module.exports = router;