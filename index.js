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

const todos = [];

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

HTTP_SERVER.delete("/deleteTodo", function (request, response) {
    return response.status(200).json({
        message: "Todos deleted successfully",
    })
})