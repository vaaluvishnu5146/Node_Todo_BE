const express = require("express");
const cowsay = require("cowsay");
const { v4: uuid } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();

// 1. Define configs
const configs = {
    hostName: process.env.HOSTNAME,
    port: process.env.port
};

// 2. Create the server
const HTTP_SERVER = express();

// Enable middlewares
HTTP_SERVER.use(express.json());

// 3. Start and listen to server
try {
    HTTP_SERVER.listen(configs.port, configs.hostName, function () {
       console.log(`http://${configs.hostName}:${configs.port}/`)
        console.log(cowsay.say({
            text : "Server started",
            e : "oO",
            T : "U "
        }))
    });
} catch (error) {
    console.log(cowsay.say({
        text : "Sorry issue starting the server",
        e : "oO",
        T : "U "
    }))
}

let todos = [];

HTTP_SERVER.get("/", function (request, response) {
    return response.status(201).json({
        message: "Api is working"
    })
})

HTTP_SERVER.get("/todos", function (request, response) {
    return response.status(200).json({
        message: "Todos fetched successfully",
        data: todos
    })
})

HTTP_SERVER.get("/todo/:todoId", function (request, response) {
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


HTTP_SERVER.post("/createTodo", function (request, response) {
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

HTTP_SERVER.patch("/updateTodo", function (request, response) {
    return response.status(200).json({
        message: "Todos updated successfully",
    })
})

HTTP_SERVER.delete("/deleteTodo/:todoId", function (request, response) {
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