const TodosController = require("express").Router();
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodosV2 } = require("./todos.routes");

TodosController.get("/", getTodos);

TodosController.get("/v2/", getTodosV2);

TodosController.get("/todo/:todoId", getTodoById);

TodosController.post("/createTodo", createTodo);

TodosController.patch("/updateTodo/:todoId", updateTodo);

TodosController.delete("/deleteTodo/:todoId", deleteTodo);

module.exports = TodosController;