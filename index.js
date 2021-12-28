// load up the express framework and body-parser helper
const express = require("express");
const cors = require("cors");

// create an instance of express to serve our end points
const app = express();

app.use(cors());
app.use(express.json());
// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");

// this is where we'll handle our various routes from
const routes = require("./src/routes/routes.js")(app, fs);

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
