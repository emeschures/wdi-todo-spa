const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),

  Todo = require('./models/Todo.js'),

  PORT = 3000

mongoose.connect('mongodb://localhost/todo-spa', (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/api/todos', (req, res) => {
  Todo.find({}, (err, allDemTodos) => {
    res.json(allDemTodos)
  })
})

app.post('/api/todos', (req, res) => {
  Todo.create(req.body, (err, brandNewTodo) => {
    if(err) return res.json({ success: false }) 
    res.json({ success: true, message: "todo created.", todo: brandNewTodo })
  })
})

app.delete('/api/todos/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
    if(err) return res.json({ success: false })
    res.json({ success: true, message: "todo deleted." })
  })
})

app.patch('/api/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, thatTodo) => {
    thatTodo.completed = !thatTodo.completed
    thatTodo.save((err, updatedTodo) => {
      res.json({ success: true, message: "todo updated", todo: updatedTodo })
    })
  })
})

app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}.`)
})