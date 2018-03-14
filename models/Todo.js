const
    mongoose = require('mongoose'),
    todoSchema = new mongoose.Schema({
        body: String,
        completed: { type: Boolean, default: false }
    })

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo  
