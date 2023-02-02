const router = require('express').Router();

// import todo model
const todoItemsModel = require('../models/todoItems')

// routes
router.get('/api/item', (req, res) => {
    try {
        const newTodo = new todoItemsModel({
            task: req.body.task,
            priority: req.body.priority,
            completed: req.body.completed
        })
        const saveItem = newTodo.save()
        res.status(200).json('Item Added Successfully.')
    }
    catch (err) {
        res.json(err);
    }
})

module.exports = router;