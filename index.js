const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

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

app.use('/', TodoItemsRoute)

app.listen(PORT, () =>
    console.log(`Server connected`)
    // console.log(`Listening on PORT ${PORT}`)
)