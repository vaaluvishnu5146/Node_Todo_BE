const express = require("express");
const cowsay = require("cowsay");
const dotenv = require("dotenv");
dotenv.config();

// Import Resources
const TodosRoute = require("./routes/todos/todos.routes");
// Import Resources
const UsersRoute = require("./routes/users/users.routes");

// 1. Define configs
const configs = {
    hostName: process.env.HOSTNAME,
    port: process.env.PORT
};

// 2. Create the server
const HTTP_SERVER = express();

// Enable middlewares
HTTP_SERVER.use(express.json());

// Inject Resources
HTTP_SERVER.use('/todos', TodosRoute)
HTTP_SERVER.use('/users', UsersRoute)

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

HTTP_SERVER.get("/", function (request, response) {
    return response.status(201).json({
        message: "Api is working"
    })
})
