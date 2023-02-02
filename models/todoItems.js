// import mongoose to create new Schema
const mongoose = require('mongoose');

// create a new Schema
const TodoItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'medium', 'low'],
    },
    dateCreated: {
        type: Date
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("todo", TodoItemSchema)