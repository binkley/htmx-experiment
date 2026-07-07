const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [{ id: 1, title: 'Explore HTMX capabilities', completed: false }];
let nextId = 2;

// Serve the initial index page with server-side rendered state
app.get('/', (req, res) => {
    res.render('index', { todos });
});

// Get all todos (with Active Search support)
app.get('/todos', (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : '';
    const filtered = todos.filter((t) => t.title.toLowerCase().includes(q));
    res.render('responses/todos', { filtered, todos });
});

// Get single todo (used to cancel edit)
app.get('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Not found');
    res.render('partials/todo', { todo });
});

// Get edit form for a todo
app.get('/todos/:id/edit', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Not found');
    res.render('partials/edit', { todo });
});

// Update a todo (save edit)
app.put('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Not found');
    const title = req.body.title;
    if (title && title.trim() !== '') {
        todo.title = title.trim();
    }
    // No stats update needed since count/completion doesn't change
    res.render('partials/todo', { todo });
});

// Create a new todo
app.post('/todos', (req, res) => {
    const title = req.body.title;
    if (!title || title.trim() === '') {
        return res.status(400).send('Title is required');
    }
    const newTodo = { id: nextId++, title: title.trim(), completed: false };
    todos.push(newTodo);
    res.render('responses/todo-and-stats', { todo: newTodo, todos });
});

// Toggle todo completion
app.patch('/todos/:id/toggle', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).send('Not found');

    todo.completed = !todo.completed;
    res.render('responses/todo-and-stats', { todo, todos });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((t) => t.id !== id);
    res.render('partials/stats', { todos });
});

// Export app for testing
module.exports = {
    app,
    resetTodos: () => {
        todos = [];
        nextId = 1;
    },
};
