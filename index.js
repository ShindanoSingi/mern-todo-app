const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// import todo and User models
const models = require('./models/model')
const User = models.User;
const Todo = models.Todo;

var session = require('express-session');
var bodyParser = require('body-parser');

const app = express();

// Set up the express-session middleware
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));

// Set up the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

// Port
const PORT = process.env.PORT || 5500;

// Import routes
const TodoItemsRoute = require('./routes/users')

// Let's connect to mongodb

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Database connection established.'))
    .catch(err => console.log(err))

app.use('/', TodoItemsRoute);

app.listen(PORT, () =>
    console.log(`Server connected`)
    // console.log(`Listening on PORT ${PORT}`)
);