const express = require("express");
const router = express.Router();
const passport = require("passport");

const Todo = require("../../models/Todo");
const User = require("../../models/User");

const validateTodoInput = require("../../validation/Todo");

// @route GET api/todos/test
// @desc Tests todo route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "todos works" }));

// @route POST api/todos
// @desc Create todo route
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTodo = new Todo({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      duedate: req.body.duedate
    });

    newTodo.save().then(todo => res.json(todo));
  }
);

// @route PUT api/todos/:todo_id
// @desc Update todo to done
// @access Private
router.put(
  "/:todo_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findByIdAndUpdate(
      req.params.todo_id,
      { $set: { isdone: true } },
      { new: true }
    ).then(todo => res.json(todo));
  }
);

// @route GET api/todos
// @desc Get todos route
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({
      user: req.user.id
    })
      .then(todos => res.json(todos))
      .catch(err => res.status(404).json({ todosnotfound: "No todos found" }));
  }
);

// @route GET api/todos/:todo_id
// @desc Get todo route
// @access Private
router.get(
  "/:todo_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.todo_id)
      .then(todo => res.json(todo))
      .catch(err => res.status(404).json({ todonotfound: "No todo found" }));
  }
);

// @route DELETE api/todos/:todo_id
// @desc Delete todo route
// @access Private
router.delete(
  "/:todo_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findByIdAndRemove({ _id: req.params.todo_id }).then(() =>
      res.json({ success: true })
    );
  }
);

module.exports = router;
