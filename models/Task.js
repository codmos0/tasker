const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength: 5,
        maxLength: 64
    },
    created: Number,
    deadline: Number,
    completed: {
        type: Number,
        default: null
    }
})

taskSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        return retObj
    }
})

module.exports = mongoose.model('Task', taskSchema)