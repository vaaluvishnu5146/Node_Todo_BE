const ReportsController = require('express').Router();

// GET USER REPORTS
ReportsController.get('/users', function (request, response) {
    return response.status(200).json({
        message: "Reports fetched successfully"
    })
})


// GET TODOS REPORTS


module.exports = ReportsController;