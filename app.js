const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const tasksRouter = require('./controllers/tasks')
const logger = require('./utils/logger')

logger.info('Connecting to Database...')
mongoose
    .connect(config.MONGODB_URI)
    .then(result => logger.info('Connected to Database!'))
    .catch(error => logger.error('Error Connecting to Database! ', error.message))

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use('/api/tasks', tasksRouter)

module.exports = app