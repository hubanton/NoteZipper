const express = require("express");
const {
  getNotes,
  createNote,
  getNotebyId,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNotebyId)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
