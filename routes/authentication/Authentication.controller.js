const AuthenticationController = require("express").Router();
const { createAccount, signinUser } = require("../users/users.routes");

// CREATE A USER ACCOUNT
AuthenticationController.post("/createAccount", createAccount);

// SIGN USER
AuthenticationController.post("/signin", signinUser);

module.exports = AuthenticationController;