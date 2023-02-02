// import mongoose to create new Schema
const mongoose = require('mongoose');

// create a new Schema
const TodoItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    priority: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("todo", TodoItemSchema)