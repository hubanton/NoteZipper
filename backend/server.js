const notes = require("./data/notes");
const dotenv = require("dotenv");
const express = require("express");

const app = express();

dotenv.config();

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((e) => e._id === req.params.id);
  console.log(note);
  res.send(note);
});

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Listening to ${PORT}`));
