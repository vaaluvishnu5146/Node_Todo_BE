const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    password: {type: String, required: true},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports = UsersSchema;