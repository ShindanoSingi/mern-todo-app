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

app.use('/', TodoItemsRoute)

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            // req.session.user = user = req.body.username;
            // res.send(user);
            res.send('Login successful')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: "User Created successfully" });
    }

    catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
}
)

app.listen(PORT, () =>
    console.log(`Server connected`)
    // console.log(`Listening on PORT ${PORT}`)
);