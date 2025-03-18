const NotificationsController = require("express").Router();

NotificationsController.get("/", (request, response) => {
    return response.status(200).json({
        message: "Notifications fetched successfully"
    })
})

NotificationsController.post("/createNotification", (request, response) => {
    return response.status(200).json({
        message: "Notifications created successfully"
    })
})

module.exports = NotificationsController;