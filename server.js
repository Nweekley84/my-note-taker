// All dependencies
const express = require('express');

// Use express
const app = express();

// Create the environment variable port
const PORT = process.env.PORT || 3001;

// Express will make a route per file in the 'public' folder and give it a '/'
app.use(express.static('public'));
// Express handels the data parser, middle wear req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Location of the route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starts the server *hopefully*
app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});