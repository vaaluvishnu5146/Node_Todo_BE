const mongoose = require('mongoose');
const TodosSchema = require('./todos.schema');

// Create Model and export
module.exports = mongoose.model("todos", TodosSchema);