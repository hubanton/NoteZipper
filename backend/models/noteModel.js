const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
