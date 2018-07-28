"use strict";

var express = require("express");

var todoRoutes = express.Router();

var todos = [
  { id: 1, name: "Holis1", done: false },
  { id: 2, name: "Holis2", done: true },
  { id: 3, name: "Holis3", done: false }
];
var incremental = 3;

todoRoutes.route("/all").get(function(req, res, next) {
  res.status(200).json(todos); // return all todos
});

// create a todo item
todoRoutes.route("/add").post(function(req, res) {
  incremental++;
  var todo = {
    id: incremental,
    name: req.body.name,
    done: false
  };
  todos.push(todo);
  res.json(todo);
});

// delete a todo item

todoRoutes.route("/delete/:id").get(function(req, res, next) {
  var id = req.params.id;
  Todo.findByIdAndRemove(id, function(err, todo) {
    if (err) {
      return next(new Error("Todo was not found"));
    }
    res.json("Successfully removed");
  });
});

// perform update on todo item

todoRoutes.route("/update/:id").post(function(req, res, next) {
  var id = req.params.id;
  Todo.findById(id, function(error, todo) {
    if (error) {
      return next(new Error("Todo was not found"));
    } else {
      todo.name = req.body.name;
      todo.done = req.body.done;

      todo.save({
        function(error, todo) {
          if (error) {
            res.status(400).send("Unable to update todo");
          } else {
            res.status(200).json(todo);
          }
        }
      });
    }
  });
});

module.exports = todoRoutes;
