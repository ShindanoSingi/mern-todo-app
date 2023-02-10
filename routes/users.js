const router = require('express').Router();
const express = require('express');

// import todo and User models
const models = require('../models/model')
const User = models.User;
const Todo = models.Todo;

const app = express();


const bcrypt = require("bcryptjs")


// Register a user
router.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                errors: [{ message: "User already exists", }]
            })
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

// Create a user model
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        let pass = await User.findOne({ password });

        if (user._id.toString().length > 5) {
            res.send({
                id: user._id.toString(),
                username: user.username,
                todos: user.todos
            })
        }

        else {
            res.send('User not found')
        }

        //     if (user) {
        //         return res.status(400).json({
        //             errors: [{ message: "User already exists", }]
        //         })
        //     }

        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPassword = await bcrypt.hash(password, salt);

        //     user = new User({ username, password: hashedPassword });
        //     await user.save();
        //     res.status(200).json({ message: "User Created successfully" });
    }

    catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
}
)

// Get all users
router.get('/api/users', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}
)

// Update a user
router.put('/api/users/:userId', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
)

// Delete a user
router.delete('/api/users/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}
)



// routes
router.post('/api/:userId/todo', async (req, res) => {
    const { task, priority, completed } = req.body;

    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ errors: [{ message: "User not found" }] });
        }

        const todo = new Todo({
            task,
            priority,
            completed,
            user: req.params.userId
        });

        user.todos.push(todo);

        await user.save();
        await todo.save();

        res.status(201).json({ todo });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// Get todos for this user
router.get('/api/:userId/todos', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).send();
        }
        res.send(user.todos);
    }
    catch (error) {
        res.status(400).send(error);
    }
})


// Update a todo
router.put('/api/:userId/todos/:todoId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).send();
        }

        const todo = user.todos.id(req.params.todoId);

        if (!todo) {
            return res.status(404).send();
        }

        todo.task = req.body.task;
        todo.priority = req.body.priority;
        todo.completed = req.body.completed;

        await user.save();

        res.send(todo);
    } catch (error) {
        res.status(404).send(error);
    }
}
)

// Delete a todo
router.delete('/api/:userId/todos/:todoId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).send();
        }

        const todo = user.todos.id(req.params.todoId);

        if (!todo) {
            return res.status(404).send();
        }

        user.todos = user.todos.filter(todo => todo._id.toString() !== req.params.todoId);

        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
);




router.put('/api/todo/:id', async (req, res) => {
    try {
        const updateItem = Todo.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item Updated')
    }
    catch (err) {
        res.json(err);
    }
})

module.exports = router;