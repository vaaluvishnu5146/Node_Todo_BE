const UsersController = require("express").Router();
const { getAllUsers, getAUser, createAUser, updateAUser, deleteAUser, createAccount, signinUser } = require("./users.routes");


// GET ALL USERS
UsersController.get("/", getAllUsers);

// GET A USER
UsersController.get("/:userId", getAUser);

// CREATE A USER
UsersController.post("/createUser", createAUser);


// CREATE A USER ACCOUNT
UsersController.post("/auth/createAccount", createAccount);

// SIGN USER
UsersController.post("/auth/signin", signinUser);

// UPDATE A USER
UsersController.patch("/updateUser/:userId", updateAUser);

// DELETE A USER
UsersController.delete("/deleteUser/:userId", deleteAUser);

module.exports = UsersController;