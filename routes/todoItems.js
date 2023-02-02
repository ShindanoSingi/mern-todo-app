const router = require('express').Router();

// import todo model
const todoItemsModel = require('../models/todoItems')

// routes
router.post('/api/item', async (req, res) => {
    try {
        const newTodo = new todoItemsModel({
            task: req.body.task,
            priority: req.body.priority,
            completed: req.body.completed
        })
        const saveItem = await newTodo.save()
        res.status(200).json('Item Added Successfully.')
    }
    catch (err) {
        res.json(err);
    }
})

router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }
    catch (err) {
        res.json(err);
    }
})

router.put('/api/item/:id', async (req, res) => {
    try {
        const updateItem = todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item Updated')
    }
    catch (err) {
        res.json(err);
    }
})

module.exports = router;