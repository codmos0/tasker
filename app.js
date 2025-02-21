require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let tasks = []

app.get('/api/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const task = tasks.find(t => t.id === id)
    if(task){
        res.json(task)
    }
    else{
        res.status(404).json({msg:"Task not found."})
    }
})

const generateId = () => {
    return tasks.length <= 0 ? "1" : String(Math.max(...tasks.map(t=> Number(t.id))) + 1)
}

app.post('/api/tasks', (req, res) => {
    const body = req.body
    if(!body.text || !body.deadline){
        res.status(400).json({msg:"Missing content."})
    }
    const task = {
        id: generateId(),
        text: body.text,
        created: Date.now(),
        deadline: body.deadline,
        completed: null
    }
    tasks = tasks.concat(task)
    res.json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    tasks = tasks.filter(t => t.id !== id)
    res.status(204).end()
})

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    if(!body.text || !body.deadline){
        res.status(400).json({msg:"Missing content."})
    }
    const task = tasks.find(t => t.id === id)
    if(task){
        task.text = body.text
        task.deadline = body.deadline
        task.completed = Date.now()
        tasks = (tasks.filter(t => t.id !== id)).concat(task)
        res.json(task)
    }
    else{
        res.status(404).json({msg:"Task not found."})
    }
})

app.listen(PORT, () => {
    console.log(`Listening to PORT:${PORT}`)
})