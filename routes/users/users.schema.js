const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    password: {type: String, required: true},
    role: { type: String, default: "customer", enum: ['customer', 'admin'] },
    entitlements: { type: Array, default: [] },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports = UsersSchema;