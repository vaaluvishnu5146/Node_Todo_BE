const express = require("express");
const cowsay = require("cowsay");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require('./databaseConfig/mongooseConnectionConfig');

// Import Resources
const TodosRoute = require("./routes/todos/todos.controller");
// Import Resources
const UsersController = require("./routes/users/users.controller");
const NotificationsController = require("./routes/notifications/notification.controller");
const { logRequest, checkTokenInHeader, checkIsUserAdmin } = require("./routes/middlwares/Authentication.midddleware");
const AuthenticationController = require("./routes/authentication/Authentication.controller");
const ReportsController = require("./routes/reports/Reports.controller");

// 1. Define configs
const configs = {
    hostName: process.env.HOSTNAME,
    port: process.env.PORT
};

// 2. Create the server
const HTTP_SERVER = express();

// Enable middlewares
HTTP_SERVER.use(express.json());
HTTP_SERVER.use(cors());

// Inject Resources
HTTP_SERVER.use('/v1/auth', logRequest, AuthenticationController)
HTTP_SERVER.use('/users', logRequest, UsersController)
HTTP_SERVER.use('/todos', logRequest, checkTokenInHeader, TodosRoute)
HTTP_SERVER.use('/v1/notifications', logRequest, checkTokenInHeader, NotificationsController)
HTTP_SERVER.use('/v1/reports', logRequest, checkTokenInHeader, checkIsUserAdmin, ReportsController)


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
