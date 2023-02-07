// import mongoose to create new Schema
const mongoose = require('mongoose');

// create a new Schema
const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', "Medium", "Low"],
        default: 'Low'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("todo", TodoSchema)