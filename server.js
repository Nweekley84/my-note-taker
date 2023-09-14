const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

// Define the port number to use, either from environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "Develop/public" directory
app.use(express.static("Develop/public"));

// Route to serve the main HTML file
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/index.html"))
);

// Route to serve the notes HTML file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
);

// Route to get all notes from the JSON file
app.get("/api/notes", function (req, res) {
  fs.readFile("Develop/db/db.json", "utf8", (err, data) => {
    var jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// Function to read a file, append content, and write it back
const readThenAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      createNewNote(file, parsedData);
    }
  });
};

// Function to write content to a file
const createNewNote = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Route to handle POST request for creating a new note
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      id: uniqid(),
    };

    // Append the new note to the JSON file
    readThenAppend(newNote, "Develop/db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting new note");
  }
});

// Route to handle DELETE request for removing a note by ID
app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let parsedData;
  fs.readFile("Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      parsedData = JSON.parse(data);
      const filterData = parsedData.filter((note) => note.id !== id);
      createNewNote("Develop/db/db.json", filterData);
    }
  });
  res.send(`Deleted note with ${req.params.id}`);
});

// Start the server and listen on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);