const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    throw new Error("One or more fields are missing");
  }
  const note = new Note({
    user: req.user._id,
    title,
    content,
    category,
  });

  const createdNote = await note.save();

  if (createdNote) {
    res.status(201).json({
      createdNote,
    });
  } else {
    response.status(400);
    throw new Error("Error Occured");
  }
});

const getNotebyId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const note = await Note.findById(id);

  if (note) {
    res.status(201).json({
      note,
    });
  } else {
    res.status(400);
    throw new Error("Note does not exist");
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    throw new Error("One or more fields are empty");
  }

  const note = await Note.findById(id);

  if (note) {
    if (note.user._id.toString() === req.user._id.toString()) {
      note.title = title;
      note.content = content;
      note.category = category;

      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("You may not alter this note");
    }
  } else {
    res.status(404);
    throw new Error("Note does not exist");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const note = await Note.findById(id);

  if (note) {
    if (note.user._id.toString() === req.user._id.toString()) {
      const deletedNote = note.remove();
      if (deletedNote) {
        res.status(201).json({
          deletedNote,
        });
      } else {
        response.status(400);
        throw new Error("Error Occured");
      }
    } else {
      res.status(404);
      throw new Error("You may not alter this note");
    }
  } else {
    response.status(400);
    throw new Error("Note does not exist");
  }
});

module.exports = { getNotes, createNote, getNotebyId, updateNote, deleteNote };
