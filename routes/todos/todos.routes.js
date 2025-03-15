const TodosRoute = require("express").Router();
const { v4: uuid } = require('uuid');

let todos = [];

TodosRoute.get("/", function (request, response) {
    return response.status(200).json({
        message: "Todos fetched successfully",
        data: todos
    })
})

TodosRoute.get("/todo/:todoId", function (request, response) {
   const { todoId } = request.params; // gets url params *required
   const queryParams = request.query; // get query params (optional)
   if(!todoId) {
        return response.status(400).json({
            message: "Necessary input is missing in request"
        })
   } else {
        const matchedTodo = todos.find((todo) => todo.id === todoId);
        if(matchedTodo) {
            return response.status(200).json({
                message: "Todo fetched successfully",
                todo: matchedTodo
            })
        } else {
            return response.status(200).json({
                message: "No Todo found",
                todo: matchedTodo
            })
        }
   }
})

TodosRoute.post("/createTodo", function (request, response) {
    if(!request.body.title || !request.body.description) {
        return response.status(400).json({
            message: "Bad request",
        })
    } else {
        todos.push({
            id: uuid(),
            ...request.body
        })
        return response.status(201).json({
            message: "Todos created successfully",
        })
    }
})

TodosRoute.patch("/updateTodo/:todoId", function (request, response) {
    const { todoId } = request.params;
    if(!todoId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const filteredTodo = todos.filter((user) => user.id !== todoId);
        filteredTodo.push(request.body)
        todos = filteredTodo;
        return response
            .status(201)
            .json({message: "Todo updated successfully!"})
    }
})

TodosRoute.delete("/deleteTodo/:todoId", function (request, response) {
    const {todoId} = request.params;
    if(!todoId) {
        return response.status(400).json({
            message: "Necessary input is missing in request"
        })
   } else {
        const filteredTodos = todos.filter((todo) => todo.id !== todoId);
        todos = filteredTodos;
        return response.status(200).json({
            message: "Todos deleted successfully",
        })
   }
})

module.exports = TodosRoute;