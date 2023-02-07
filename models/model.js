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
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },
    todos: [TodoSchema]
}, {
    timestamps: true
});

module.exports = {
    User: mongoose.model("User", UserSchema),
    Todo: mongoose.model("Todo", TodoSchema)
};