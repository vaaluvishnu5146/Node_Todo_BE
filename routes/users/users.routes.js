const { v4: uuid } = require('uuid');
const Users  = require("./users.model");
const { createHashFromPassword, isPasswordMatching, createJWTToken } = require('./users.utils');
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

// CREATE ACCOUNT
async function createAccount(request, response) {
    try {
        const newUser = new Users(request.body); // First layer of validation done
        newUser.password = await createHashFromPassword(newUser.password)
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

// SIGNIN USER
async function signinUser(request, response) {
    try {
        console.log("HIIT")
        console.log(request.body)
        const { email, password } = request.body;
        // First layer of defence
        if(!email || !password) {
            return response
            .status(400)
            .json({message: "Invalid credentials", error: "Bad credentials"})
        }
        
        const matchingUser = await Users.findOne({ email: email });

        if(!matchingUser) {
            return response
            .status(404)
            .json({message: "No user found", error: "Error finding user"})
        }

        const isMatching = await isPasswordMatching(password, matchingUser.password)

        if(!isMatching) {
            return response
            .status(401)
            .json({message: "Bad credentials", error: "Password isn't matching"})
        }

        const token = await createJWTToken({ _id: matchingUser._id, email: matchingUser.email })

        response.header("Authorization", token);
        
        return response.status(200).json({
            message: "Login successful"
        });

    
    } catch(error) {
        console.log(error)
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
    deleteAUser,
    createAccount,
    signinUser
};