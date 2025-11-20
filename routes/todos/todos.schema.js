const mongoose = require("mongoose");
const usersModel = require("../users/users.model");

const TodosSchema = mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  color: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: usersModel },
  tag: { type: String, enum: ["personal", "official"], required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

module.exports = TodosSchema;
