const TodosResource = require("express").Router();
const { v4: uuid } = require('uuid');

let todos = [];

TodosResource.get("/", function (request, response) {
    return response.status(200).json({
        message: "Todos fetched successfully",
        data: todos
    })
})

TodosResource.get("/todo/:todoId", function (request, response) {
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

TodosResource.post("/createTodo", function (request, response) {
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

TodosResource.patch("/updateTodo", function (request, response) {
    return response.status(200).json({
        message: "Todos updated successfully",
    })
})

TodosResource.delete("/deleteTodo/:todoId", function (request, response) {
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

module.exports = TodosResource;