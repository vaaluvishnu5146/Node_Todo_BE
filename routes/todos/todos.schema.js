const mongoose = require('mongoose');
const usersModel = require('../users/users.model');

const TodosSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: usersModel },
    type: { type: String, enum: ["personal", "official"] },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports = TodosSchema;