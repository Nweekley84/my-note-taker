// Importing necessary modules
const router = require('express').Router(); // Express Router
const path = require('path'); // Node.js path module for handling file paths

// Route to serve the main HTML file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); // Send the index.html file located in the public directory
});

// Route to serve the notes HTML file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html')); // Send the notes.html file located in the public directory
});

module.exports = router; // Export the router for use in other parts of the application