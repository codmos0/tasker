const tasksRouter = require('express').Router()
const Task = require('../models/Task')

tasksRouter.get('/', (req, res) => {
    Task
    .find()
    .then(result => res.json(result))
    .catch(error => res.status(500).json({message: error.message}))
})

tasksRouter.get('/:id', (req, res) => {
    const id = req.params.id
    console.log("Get Single Task: ", id)
    Task
    .findById(id)
    .then(result => res.json(result))
    .catch(error => res.status(404).json({message: error.message}))
})

tasksRouter.post('/', (req, res) => {
    const body = req.body
    if(!body.text || !body.deadline){
        res.status(400).json({message:"Missing content."})
    }
    const task = new Task ({
        text: body.text.trim(),
        created: Date.now(),
        deadline: body.deadline,
        completed: null
    })
    task
    .save()
    .then(result => res.json(task))
    .catch(error => res.status(400).json({message: error.message}))
})

tasksRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    Task
    .findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => res.status(404).send({message: error.message}))
})

tasksRouter.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    if(!body.text || !body.deadline){
        res.status(400).json({message:"Missing content."})
    }
    Task
    .findByIdAndUpdate(id, {completed: Date.now()})
    .then(result => res.json(result))
    .catch(error => res.status(404).json({message: error.message}))
})

module.exports = tasksRouter
