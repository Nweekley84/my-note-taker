const router = require('express').Router(); // Initialize Express Router
const { v4: uuidv4 } = require('uuid'); // Import UUID module for generating unique IDs
const fs = require ("fs"); // Import Node.js File System module for file operations

// Route to get all notes from the database
router.get('/api/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8")); // Read and parse the JSON file
  res.json(dbJson); // Send the JSON response containing the notes
});

// Route to add a new note to the database
router.post('/api/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8")); // Read and parse the JSON file
  const newFeedback = {
    title: req.body.title, // Get title from request body
    text: req.body.text, // Get text from request body
    id: uuidv4(), // Generate a unique ID using UUID
  };
  dbJson.push(newFeedback); // Add the new feedback to the array
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson)); // Write the updated data back to the file
  res.json(dbJson); // Send the updated JSON response
});

// Route to delete a note from the database
router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8"); // Read the JSON file
  const dataJSON =  JSON.parse(data); // Parse the JSON data
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id; // Filter out the note with the specified ID
  });
  fs.writeFileSync("db/db.json",JSON.stringify(newNotes)); // Write the updated data back to the file
  res.json("Note deleted."); // Send a confirmation message
});

module.exports = router; // Export the router for use in other parts of the application