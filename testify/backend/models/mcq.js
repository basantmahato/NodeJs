const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: Number, required: true }, // index of correct option
  subject: { type: String, required: true } // subject name
});

module.exports = mongoose.model("MCQ", mcqSchema);
