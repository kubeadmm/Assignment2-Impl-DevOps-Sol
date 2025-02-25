const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// Define routes
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// Get the port from environment variables, defaulting to 8080
const port = process.env.PORT || 8080;

db.init().then(() => {
    // Use the dynamic port value for the log
    app.listen(port, () => console.log(`App listening on port ${port}`)); // Start listening on the dynamic port
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon

