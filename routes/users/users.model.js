const mongoose = require('mongoose');
const UsersSchema = require('./users.schema');

// Create Model and export
module.exports = mongoose.model("users", UsersSchema);