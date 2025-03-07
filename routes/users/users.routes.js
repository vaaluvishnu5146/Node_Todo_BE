const UsersRoute = require("express").Router();
const { v4: uuid } = require('uuid');

let users = [];

// GET ALL USERS
UsersRoute.get("/", function (request, response) {
    return response
        .status(200)
        .json({message: "Users fetched successfully", data: users})
})

// GET A USER
UsersRoute.get("/:userId", function (request, response) {
    const { userId } = request.params;
    if(!userId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const matchingUser = users.find((user) => user.id === userId)
        if(matchingUser) {
            return response
            .status(200)
            .json({message: "User fetched successfully", data: matchingUser})
        } else {
            return response
            .status(201)
            .json({message: "No user found"})
        }
    }
})

// CREATE A USER
UsersRoute.post("/createUser", function (request, response) {
    const { name, email, password } = request.body;
    if(!name || !email || !password) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        users.push({
            id: uuid(),
            ...request.body
        })
        return response
            .status(201)
            .json({message: "Users created successfully"})
    }
});

// UPDATE A USER
UsersRoute.patch("/updateUser/:userId", function (request, response) {
    const { userId } = request.params;
    if(!userId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const filteredUsers = users.filter((user) => user.id !== userId);
        filteredUsers.push(request.body)
        users = filteredUsers;
        return response
            .status(201)
            .json({message: "Users updated successfully!"})
    }
})

// DELETE A USER
UsersRoute.patch("/deleteUser/:userId", function (request, response) {
    const { userId } = request.params;
    if(!userId) {
        return response.status(400).json({
            message: "Bad request"
        })
    } else {
        const filteredUsers = users.filter((user) => user.id !== userId);
        users = filteredUsers;
        return response
            .status(201)
            .json({message: "Users deleted successfully!"})
    }
})

module.exports = UsersRoute;