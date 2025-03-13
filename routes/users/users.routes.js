const { v4: uuid } = require('uuid');
const Users  = require("./users.model");
let users = [];

// GET ALL USERS
async function getAllUsers(request, response) {
    try {
        const results = await Users.find();
        return response
            .status(200)
            .json({message: "Users fetched successfully", data: results})
    } catch(error) {
        return response
        .status(500)
        .json({message: "Internal server error", error: error.message})
    }
}

// GET A USER
function getAUser(request, response) {
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
}

// CREATE A USER
async function createAUser(request, response) {
    try {
        const newUser = new Users(request.body);
        const result = await newUser.save();
        return response
            .status(200)
            .json({message: "Users created successfully", result: result})
    } catch(error) {
        return response
        .status(500)
        .json({message: "Internal server error", error: error.message})
    }
}

// UPDATE A USER
function updateAUser(request, response) {
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
}

// DELETE A USER
function deleteAUser(request, response) {
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
}

module.exports = {
    getAllUsers,
    getAUser,
    createAUser,
    updateAUser,
    deleteAUser
};