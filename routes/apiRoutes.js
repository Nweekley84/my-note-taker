// Dependencies 
const path = require('path');
const fs = require('fs')

// npm package for unique ids
var uniqid = require('uniqid');

// routing to..
module.exports = (app) => {

  // GET /api/notes, read db.json & then return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // POST receives a new note to save on the request body, 
  // Add to the db.json file & then return the new note to client. 
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    // Body for note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // Unique id for each note
      id: uniqid(),
    };
    // Push note to be written in the db.json file
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


  // DELETE /api/notes/:id Receives a query parameter containing the id of the note to delete.
  app.delete('/api/notes/:id', (req, res) => {
    // Read notes form db.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // Remove note with id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // Rewrite note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};